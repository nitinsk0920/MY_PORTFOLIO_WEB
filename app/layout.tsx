import type { Metadata } from "next";
import { GlobalAtmosphere } from "@/components/global-atmosphere";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import "./globals.css";
import {
  Cormorant_Garamond,
  Manrope,
  Inter,
  Playfair_Display,
  Bebas_Neue,
  DM_Serif_Display,
} from "next/font/google";
import { cn } from "@/lib/utils";

// ── Cormorant Garamond — cinematic editorial serif ───────────────
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// ── Manrope — clean modern sans for section headings ────────────
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// ── Inter — body / UI text ───────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// ── Playfair Display — classic editorial serif ───────────────────
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// ── Bebas Neue — bold condensed display ─────────────────────────
const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: ["400"],
  display: "swap",
});

// ── DM Serif Display — modern editorial serif ────────────────────
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nitin S Katagihallimath | AI/ML Portfolio",
  description:
    "Portfolio of Nitin S Katagihallimath — AI/ML Developer, Full Stack Developer, and Freelancer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "dark",
        "font-sans",
        cormorant.variable,
        manrope.variable,
        inter.variable,
        playfair.variable,
        bebas.variable,
        dmSerif.variable,
      )}
    >
      <body>
        <SmoothScrollProvider>
          <GlobalAtmosphere />
          <div className="relative z-10">{children}</div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
