"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useFitScale } from "@/lib/useFitScale";

/**
 * About Me — 중앙 정렬된 읽기 좋은 컬럼.
 * 라벨(액센트) + 본문. 핵심 문구만 볼드로 강조해 스캔하기 쉽게 구성.
 */
const EMPHASIS: Record<"ko" | "en", string[]> = {
  ko: [
    "시스템 구조와 데이터 모델로 설계하고 구현하는",
    "개발 관점의 제약과 구현 방법을 조율",
    "AI 도구를 활용",
    "직접 검토하고 테스트해 품질을 검증",
  ],
  en: [
    "designs and implements them as system architecture and data models",
    "working through development-side constraints and implementation approaches",
    "AI tools",
    "personally reviewing and testing the results to verify",
  ],
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderWithEmphasis(text: string, phrases: string[]) {
  if (phrases.length === 0) return text;
  const regex = new RegExp(`(${phrases.map(escapeRegExp).join("|")})`, "g");
  return text
    .split(regex)
    .map((part, i) =>
      phrases.includes(part) ? (
        <strong key={i} className="font-semibold">
          {part}
        </strong>
      ) : (
        part
      ),
    );
}

export default function About() {
  const { t, locale } = useI18n();
  const { containerRef, innerRef } = useFitScale<HTMLElement, HTMLDivElement>();

  return (
    <section
      id="about"
      ref={containerRef}
      className="snap-section relative px-6 py-28 md:py-8"
    >
      <div ref={innerRef} className="mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-sm font-bold tracking-[0.45em] text-accent"
        >
          {t("about.label")}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-7 whitespace-pre-line text-xl font-normal leading-relaxed sm:text-2xl lg:text-[1.75rem] lg:leading-[1.65]"
        >
          {renderWithEmphasis(t("about.body"), EMPHASIS[locale])}
        </motion.p>
      </div>
    </section>
  );
}
