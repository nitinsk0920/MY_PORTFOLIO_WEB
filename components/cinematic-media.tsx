import Image from "next/image";
import { cn } from "@/lib/utils";

type CinematicMediaProps = {
  src: string;
  alt: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  className?: string;
  containerClassName?: string;
  aspectClass?: string;
  maxWidthClass?: string;
  maxHeightClass?: string;
  vignette?: boolean;
  blurContainer?: boolean;
};

export function CinematicMedia({
  src,
  alt,
  priority = false,
  quality = 90,
  sizes = "(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 600px",
  className,
  containerClassName,
  aspectClass = "aspect-[3/4]",
  maxWidthClass = "max-w-4xl",
  maxHeightClass = "max-h-[85vh]",
  vignette = true,
  blurContainer = false,
}: CinematicMediaProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full",
        maxWidthClass,
        maxHeightClass,
        blurContainer && "backdrop-blur-sm",
        containerClassName,
      )}
    >
      <div className={cn("relative w-full", aspectClass)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={quality}
          sizes={sizes}
          className={cn("object-contain object-center", className)}
        />
        {vignette ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,transparent_35%,rgba(0,0,0,0.55)_72%,rgba(0,0,0,0.85)_100%)]"
          />
        ) : null}
      </div>
    </div>
  );
}
