"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const cards = ["backend", "infra"] as const;

/**
 * What I Do — 중앙 타이틀 + 2열 카드(데스크톱).
 * 점선 프레임 + 코너 브래킷 스타일 유지.
 */
export default function WhatIDo() {
  const { t } = useI18n();

  return (
    <section className="mx-auto max-w-5xl px-6 py-24 lg:px-10">
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-center text-4xl font-black tracking-tight text-foreground/85 sm:text-5xl lg:text-6xl"
      >
        {t("whatido.title")}
      </motion.h2>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {cards.map((key, i) => (
          <motion.article
            key={key}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative rounded-lg border border-dashed border-foreground/30 bg-white/40 p-7 backdrop-blur-sm sm:p-8"
          >
            {/* 코너 브래킷 장식 */}
            {[
              "-top-px -left-px border-t-2 border-l-2",
              "-top-px -right-px border-t-2 border-r-2",
              "-bottom-px -left-px border-b-2 border-l-2",
              "-bottom-px -right-px border-b-2 border-r-2",
            ].map((cls) => (
              <span
                key={cls}
                aria-hidden
                className={`absolute h-4 w-4 border-accent ${cls}`}
              />
            ))}
            <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {t(`whatido.cards.${key}.title`)}
            </h3>
            <p className="mt-2 text-sm font-semibold text-accent">
              {t(`whatido.cards.${key}.subtitle`)}
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              {t(`whatido.cards.${key}.body`)}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
