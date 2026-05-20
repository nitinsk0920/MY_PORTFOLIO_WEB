import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { GlobalAtmosphere } from "@/components/global-atmosphere";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { cn } from "@/lib/utils";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nitin S Katagihallimath | AI/ML Portfolio",
  description:
    "Portfolio of Nitin S Katagihallimath - AI/ML Developer, Full Stack Developer, and Freelancer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "font-sans", manrope.variable)}>
      <body>
        <SmoothScrollProvider>
          <GlobalAtmosphere />
          <div className="relative z-10">{children}</div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
