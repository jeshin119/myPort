"use client";

import { I18nProvider } from "@/lib/i18n";
import { MailPopupProvider } from "@/lib/mail-popup";
import { useFitScale } from "@/lib/useFitScale";
import GradientBackground from "@/components/GradientBackground";
import SplashCursor from "@/components/SplashCursor";
import Header from "@/components/Header";
import SideSocials from "@/components/SideSocials";
import ResumeButton from "@/components/ResumeButton";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhatIDo from "@/components/WhatIDo";
import Timeline from "@/components/Timeline";
import Work from "@/components/Work";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MailPopup from "@/components/MailPopup";

export default function Home() {
  // Contact + Footer는 한 화면(스냅 슬라이드)에 함께 배치되며, 둘을 합친 높이가
  // 넘치면 useFitScale이 이 블록을 축소해 항상 한 화면에 들어오게 한다.
  const { containerRef, innerRef } = useFitScale<HTMLDivElement, HTMLDivElement>();

  return (
    <I18nProvider>
      <MailPopupProvider>
        <GradientBackground />
        <SplashCursor />
        <Header />
        <SideSocials />
        <main className="relative z-10">
          <Hero />
          <About />
          <WhatIDo />
          <Timeline />
          <Work />
          <TechStack />
          <div ref={containerRef} className="snap-section">
            <div ref={innerRef}>
              <Contact />
              <Footer />
            </div>
          </div>
        </main>
        <ResumeButton />
        <MailPopup />
      </MailPopupProvider>
    </I18nProvider>
  );
}
