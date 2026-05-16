"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const STAR_COUNT = 2200;
const NEBULA_COUNT = 280;
const DEPTH = 120;

const mouse = { x: 0, y: 0 };
const targetMouse = { x: 0, y: 0 };
let scrollY = 0;

function Scene() {
  const { camera } = useThree();

  const starData = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const sizes = new Float32Array(STAR_COUNT);
    const alphas = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * DEPTH;
      sizes[i] = Math.random() * 1.8 + 0.3;
      alphas[i] = Math.random() * 0.7 + 0.15;
    }
    return { positions, sizes, alphas };
  }, []);

  const nebulaData = useMemo(() => {
    const positions = new Float32Array(NEBULA_COUNT * 3);
    const sizes = new Float32Array(NEBULA_COUNT);

    for (let i = 0; i < NEBULA_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      sizes[i] = Math.random() * 4.5 + 2;
    }
    return { positions, sizes };
  }, []);

  const starsRef = useRef<THREE.Points>(null);
  const nebulaRef = useRef<THREE.Points>(null);
  const starGeoRef = useRef<THREE.BufferGeometry>(null);

  const twinkleRef = useRef(new Float32Array(STAR_COUNT).fill(0));
  const twinkleSpeeds = useMemo(
    () => new Float32Array(STAR_COUNT).map(() => Math.random() * 0.02 + 0.005),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    mouse.x += (targetMouse.x - mouse.x) * 0.04;
    mouse.y += (targetMouse.y - mouse.y) * 0.04;

    camera.position.x = mouse.x * 6;
    camera.position.y = -mouse.y * 4 + scrollY * 0.004;
    camera.rotation.y = -mouse.x * 0.015;
    camera.rotation.x = mouse.y * 0.008;

    if (starsRef.current) {
      starsRef.current.rotation.y = t * 0.006;
      starsRef.current.rotation.x = Math.sin(t * 0.003) * 0.04;
    }
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = -t * 0.004;
    }

    if (starGeoRef.current) {
      const alphaAttr = starGeoRef.current.getAttribute(
        "alpha"
      ) as THREE.BufferAttribute;
      if (alphaAttr) {
        for (let i = 0; i < STAR_COUNT; i++) {
          twinkleRef.current[i] += twinkleSpeeds[i];
          alphaAttr.array[i] =
            starData.alphas[i] *
            (0.5 + 0.5 * Math.sin(twinkleRef.current[i]));
        }
        alphaAttr.needsUpdate = true;
      }
    }
  });

  // Pure white star material
  const starMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          attribute float size;
          attribute float alpha;
          varying float vAlpha;
          void main() {
            vAlpha = alpha;
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (280.0 / -mvPos.z);
            gl_Position = projectionMatrix * mvPos;
          }
        `,
        fragmentShader: `
          varying float vAlpha;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
            gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  // Pure white nebula dust (no blue tint)
  const nebulaMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: `
          attribute float size;
          void main() {
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (320.0 / -mvPos.z);
            gl_Position = projectionMatrix * mvPos;
          }
        `,
        fragmentShader: `
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.0, d) * 0.06;
            gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  return (
    <>
      <points ref={starsRef}>
        <bufferGeometry ref={starGeoRef}>
          <bufferAttribute attach="attributes-position" args={[starData.positions, 3]} />
          <bufferAttribute attach="attributes-size" args={[starData.sizes, 1]} />
          <bufferAttribute attach="attributes-alpha" args={[starData.alphas, 1]} />
        </bufferGeometry>
        <primitive object={starMaterial} attach="material" />
      </points>

      <points ref={nebulaRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nebulaData.positions, 3]} />
          <bufferAttribute attach="attributes-size" args={[nebulaData.sizes, 1]} />
        </bufferGeometry>
        <primitive object={nebulaMaterial} attach="material" />
      </points>
    </>
  );
}

export function StarfieldScene() {
  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    }

    function onScroll() {
      scrollY = window.scrollY;
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background: "#000000" }}
    >
      {/* Radial vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #000000 0%, transparent 100%)",
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 50], fov: 75, near: 0.1, far: 1000 }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#000000"), 1);
        }}
        style={{ width: "100%", height: "100%" }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
