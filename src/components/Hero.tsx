"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: "easeOut" as const },
  }),
};

/**
 * Hero — 텍스트 중심 중앙 정렬 히어로.
 * 인사 → 이름(대형) → 직함(액센트) → 태그라인 순으로 위계를 두어 가독성 확보.
 */
export default function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.15}
        className="mb-5 text-base font-medium tracking-[0.2em] text-muted sm:text-lg"
      >
        {t("hero.greeting")}
      </motion.p>

      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.3}
        className="text-6xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl"
      >
        {t("hero.name")}
        <span className="text-accent">.</span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.45}
        className="mt-6 text-lg font-bold tracking-[0.35em] text-accent sm:text-xl lg:text-2xl"
      >
        {t("hero.role")}
      </motion.p>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.6}
        className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
      >
        {t("hero.tagline")}
      </motion.p>

      {/* 하단 스크롤 힌트 */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold tracking-[0.3em] text-muted md:flex"
      >
        {t("hero.scroll")}
        <motion.span
          aria-hidden
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px bg-accent"
        />
      </motion.a>
    </section>
  );
}
