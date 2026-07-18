"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { profile } from "@/lib/content";

const navItems = [
  { key: "nav.about", href: "#about" },
  { key: "nav.experience", href: "#career" },
  { key: "nav.work", href: "#work" },
  { key: "nav.contact", href: "#contact" },
] as const;

export default function Header() {
  const { t, locale, setLocale } = useI18n();

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-card fixed inset-x-0 top-0 z-50 border-b"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* 좌측 로고 — "J." 닷 워드마크. 호버 시 풀네임 "Jeshin."으로 확장 */}
        <a
          href="#top"
          aria-label={`${profile.name} — back to top`}
          className="group inline-flex items-baseline text-2xl font-extrabold tracking-tight text-foreground"
        >
          {profile.name.charAt(0).toUpperCase()}
          <span className="inline-block max-w-0 overflow-hidden opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-[7rem] group-hover:opacity-100">
            {profile.name.slice(1)}
          </span>
          <span className="text-accent">.</span>
        </a>

        {/* 우측 내비 + 언어 토글 */}
        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-7">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-semibold tracking-[0.2em] text-foreground/80 transition-colors hover:text-accent sm:text-sm"
            >
              {t(item.key)}
            </a>
          ))}
          <button
            type="button"
            onClick={() => setLocale(locale === "en" ? "ko" : "en")}
            aria-label={`Switch language to ${locale === "en" ? "Korean" : "English"}`}
            className="relative flex h-8 w-[76px] items-center rounded-full border border-border-soft bg-white/60 text-[11px] font-bold"
          >
            <motion.span
              layout
              className="absolute top-0.5 h-7 w-9 rounded-full bg-accent"
              animate={{ left: locale === "en" ? 2 : 36 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <span
              className={`relative z-10 flex-1 text-center ${locale === "en" ? "text-white" : "text-muted"}`}
            >
              EN
            </span>
            <span
              className={`relative z-10 flex-1 text-center ${locale === "ko" ? "text-white" : "text-muted"}`}
            >
              KO
            </span>
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
