import type { Metadata } from "next";
import { GlobalAtmosphere } from "@/components/global-atmosphere";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import "./globals.css";
import { Cormorant_Garamond, Manrope, Inter } from "next/font/google";
import { cn } from "@/lib/utils";

// ── Cormorant Garamond — cinematic editorial serif for headings ──
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// ── Manrope — clean modern sans for section labels / UI ─────────
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// ── Inter — unchanged body / UI text ────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
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
      className={cn("dark", "font-sans", cormorant.variable, manrope.variable, inter.variable)}
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
