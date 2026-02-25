import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "날씨 서비스 | Weather App",
  description: "지역을 선택하여 현재 날씨와 예보를 확인하세요",
  keywords: ["날씨", "weather", "예보", "forecast", "기온", "temperature"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-gradient-to-br from-blue-50 to-sky-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
