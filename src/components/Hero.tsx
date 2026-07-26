"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useFitScale } from "@/lib/useFitScale";

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
  const { t, locale } = useI18n();
  // 한글 이름은 획이 두껍고 자간이 좁게 보이므로 굵기를 낮추고 자간을 넓힌다.
  const isKo = locale === "ko";
  const nameSuffix = t("hero.nameSuffix");
  const { containerRef, innerRef } = useFitScale<HTMLElement, HTMLDivElement>();

  return (
    <section id="top" ref={containerRef} className="snap-section relative w-full">
      {/* 중앙 정렬 콘텐츠 (모바일: 화면 가득, 데스크톱: 섹션 높이에 맞춤) */}
      <div
        ref={innerRef}
        className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center md:h-full md:min-h-0"
      >
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          custom={0.15}
          className="mb-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {t("hero.greeting")}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          custom={0.3}
          className={`text-6xl leading-[1.02] sm:text-7xl lg:text-8xl ${
            isKo
              ? "font-bold tracking-[0.04em]"
              : "font-extrabold tracking-tight"
          }`}
        >
          {t("hero.name")}
          {nameSuffix && (
            <span className="align-baseline text-[0.5em] font-medium text-foreground/70">
              {nameSuffix}
            </span>
          )}
          <span className="text-accent">.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          custom={0.6}
          className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {t("hero.tagline")}
        </motion.p>

        {/* 하단 스크롤 힌트 */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
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
      </div>

      {/* 우측 세로 직함 라벨 (데스크톱) — 예전 로봇 캐릭터 옆 세로 배치를 계승 */}
      <motion.p
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
        className="writing-vertical absolute right-6 top-1/2 hidden -translate-y-1/2 text-base font-bold tracking-[0.35em] text-accent md:block lg:right-10 lg:text-lg"
      >
        {t("hero.role")}
      </motion.p>
    </section>
  );
}
