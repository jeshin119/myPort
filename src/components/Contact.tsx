"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useI18n } from "@/lib/i18n";
import { profile } from "@/lib/content";
import { useMailPopup } from "@/lib/mail-popup";

export default function Contact() {
  const { t } = useI18n();
  const { open } = useMailPopup();

  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-32 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold tracking-tight sm:text-5xl"
      >
        {t("contact.title")}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mx-auto mt-5 max-w-xl text-lg text-muted"
      >
        {t("contact.subtitle")}
      </motion.p>

      {/* Say Hello → 우하단 메일 작성 팝업 열기 (Resend 기반) */}
      <motion.button
        type="button"
        onClick={open}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="mt-10 inline-block rounded-full bg-accent px-10 py-4 text-sm font-bold tracking-[0.15em] text-white shadow-xl shadow-accent/30"
      >
        {t("contact.cta")}
      </motion.button>

      {/* 모바일용 소셜 링크 (데스크톱은 좌측 사이드바) */}
      <div className="mt-12 flex justify-center gap-6 lg:hidden">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted hover:text-accent">
          <FiGithub size={22} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted hover:text-accent">
          <FiLinkedin size={22} />
        </a>
      </div>
    </section>
  );
}
