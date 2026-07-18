import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 한글 전용 폰트(Pretendard, 가변) — 라틴은 Geist, 한글 글리프만 이 폰트로 fallback.
// self-host라 외부 런타임 요청이 없고, 가변폰트라 모든 weight를 실제로 렌더한다.
const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
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
      className={`${geistSans.variable} ${geistMono.variable} ${pretendard.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
