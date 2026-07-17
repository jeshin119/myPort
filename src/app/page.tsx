"use client";

import { I18nProvider } from "@/lib/i18n";
import { MailPopupProvider } from "@/lib/mail-popup";
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
          <Contact />
          <Footer />
        </main>
        <ResumeButton />
        <MailPopup />
      </MailPopupProvider>
    </I18nProvider>
  );
}
