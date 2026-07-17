"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

/**
 * About Me — 중앙 정렬된 읽기 좋은 컬럼.
 * 라벨(액센트) + 큰 본문으로 가독성 위주 구성.
 */
export default function About() {
  const { t } = useI18n();

  return (
    <section
      id="about"
      className="relative mx-auto max-w-3xl px-6 py-32 lg:py-40"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-sm font-bold tracking-[0.45em] text-accent"
      >
        {t("about.label")}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mt-7 text-2xl font-semibold leading-relaxed sm:text-3xl lg:text-[2rem] lg:leading-[1.5]"
      >
        {t("about.body")}
      </motion.p>
    </section>
  );
}
