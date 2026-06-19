import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Press_Start_2P,
  Bangers,
  Cinzel,
  Cormorant_Garamond,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Themed fonts, one per "room"
const pixel = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
});

const manga = Bangers({
  variable: "--font-manga",
  weight: "400",
  subsets: ["latin"],
});

const gothic = Cinzel({
  variable: "--font-gothic",
  subsets: ["latin"],
});

const chess = Cormorant_Garamond({
  variable: "--font-chess",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "gasemilauh",
  description: "A personal hub for chess, video games, manga and Warhammer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${pixel.variable} ${manga.variable} ${gothic.variable} ${chess.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
