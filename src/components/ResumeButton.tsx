"use client";

import { motion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";
import { useI18n } from "@/lib/i18n";

/** 우측 하단 고정 RESUME 버튼 — 클릭 시 화면 최상단으로 스크롤 */
export default function ResumeButton() {
  const { t } = useI18n();

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      aria-label={t("resume")}
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-xs font-bold tracking-[0.2em] text-white shadow-lg shadow-accent/30"
    >
      <FiArrowUp size={16} />
      {t("resume")}
    </motion.button>
  );
}
