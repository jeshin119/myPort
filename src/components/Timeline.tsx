"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { careerItems } from "@/lib/content";

/**
 * My career & experience — 세로 타임라인.
 * 스크롤 진행도에 맞춰 빛나는 포인터(글로우 닷)가 라인을 따라 위아래로 이동.
 */
export default function Timeline() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.6", "end 0.6"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  const dotTop = useTransform(reduceMotion ? scrollYProgress : smooth, [0, 1], ["0%", "100%"]);

  return (
    <section id="career" className="mx-auto max-w-7xl px-6 py-28 lg:px-16">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
      >
        {t("career.title")}
      </motion.h2>

      <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
        {/* 좌측: 역할명 + 보라 서브텍스트 (데스크톱에선 sticky) */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h3 className="text-2xl font-bold">{t("career.role")}</h3>
          <p className="mt-2 font-semibold text-accent">{t("career.subtitle")}</p>
        </div>

        {/* 중앙~우측: 연도 + 라인 + 설명 */}
        <ol ref={listRef} className="relative">
          {/* 세로 라인 (연도와 설명 사이) */}
          <div
            aria-hidden
            className="absolute bottom-0 top-0 left-[64px] w-px bg-foreground/15 sm:left-[96px]"
          />
          {/* 스크롤 연동 글로우 닷 */}
          <motion.div
            aria-hidden
            style={{ top: dotTop }}
            className="absolute left-[64px] z-10 -translate-x-1/2 -translate-y-1/2 sm:left-[96px]"
          >
            <span className="block h-4 w-4 rounded-full bg-accent shadow-[0_0_18px_6px_rgba(124,58,237,0.45)]" />
          </motion.div>

          {careerItems.map(({ id }, i) => (
            <motion.li
              key={id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="grid grid-cols-[52px_24px_1fr] items-start gap-x-3 py-10 sm:grid-cols-[84px_24px_1fr] sm:gap-x-6"
            >
              {/* 연도 */}
              <span className="pt-1 text-right text-xl font-extrabold tracking-tight text-foreground/80 sm:text-3xl">
                {t(`career.items.${id}.label`)}
              </span>
              {/* 라인 위 고정 점 */}
              <span aria-hidden className="flex justify-center pt-3">
                <span className="h-2.5 w-2.5 rounded-full border-2 border-accent-soft bg-background" />
              </span>
              {/* 설명 */}
              <div>
                <h4 className="text-lg font-bold sm:text-xl">
                  {t(`career.items.${id}.heading`)}
                </h4>
                <p className="mt-2 max-w-xl leading-relaxed text-muted">
                  {t(`career.items.${id}.body`)}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
