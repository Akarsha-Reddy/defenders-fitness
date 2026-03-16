import type { Metadata } from "next";
import NavigationBar from "@/components/sections/NavigationBar";
import { Inter, Bebas_Neue, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-hero",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-head",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Defenders Fitness | Elite Training & Performance",
  description: "Transform your physique with the elite training programs at Defenders Fitness. Production-ready Next.js 15 site.",
  icons: { 
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' }
    ] 
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-body antialiased`}
      >
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
