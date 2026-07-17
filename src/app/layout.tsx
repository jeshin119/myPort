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

const siteName = "Jeshin — Backend Developer"; // TODO: 실제 이름 반영
const description =
  "Backend developer portfolio. I build reliable APIs and infrastructure that scale — FastAPI, Spring, AWS.";

export const metadata: Metadata = {
  title: siteName,
  description,
  keywords: ["backend developer", "portfolio", "FastAPI", "Spring", "AWS"],
  openGraph: {
    title: siteName,
    description,
    type: "website",
    locale: "en_US",
    alternateLocale: "ko_KR",
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
