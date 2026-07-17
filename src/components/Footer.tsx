"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { useI18n } from "@/lib/i18n";
import { profile } from "@/lib/content";

/**
 * 화면 맨 하단 Footer — 개인 정보 재고지.
 * 레퍼런스 이미지 배치를 따름: 큰 이름 → 3열(Email/Location · Social · Credit).
 * 사이트 라이트 테마에 맞춰 색상은 재해석. Social은 GitHub / LinkedIn만.
 */
const socials = [
  { label: "Github", href: profile.github },
  { label: "Linkedin", href: profile.linkedin },
];

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative z-10 border-t border-border-soft/70 px-6 py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* 큰 이름 */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold uppercase tracking-tight sm:text-6xl lg:text-7xl"
        >
          {profile.name}
        </motion.h2>

        {/* 3열: Email/Location · Social · Credit */}
        <div className="mt-14 grid gap-12 md:grid-cols-3">
          {/* 좌: Email + Location */}
          <div className="space-y-8">
            <div>
              <p className="text-sm text-muted">{t("footer.emailLabel")}</p>
              {/* 표시용 텍스트 (mailto 링크 제거) */}
              <p className="mt-1 select-all text-base">{profile.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted">{t("footer.locationLabel")}</p>
              <p className="mt-1 text-base">{t("footer.location")}</p>
            </div>
          </div>

          {/* 중: Social (GitHub / LinkedIn) */}
          <div>
            <p className="text-sm text-muted">{t("footer.social")}</p>
            <ul className="mt-3 space-y-2">
              {socials.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-base transition-colors hover:text-accent"
                  >
                    {label}
                    <FiArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 우: Designed and Developed by + © */}
          <div className="md:text-right">
            <p className="text-base leading-snug">
              {t("footer.credit")}{" "}
              <span className="text-accent">{profile.name}</span>
            </p>
            <p className="mt-3 text-sm text-muted">
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
