"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "@/lib/content";
import { useMailPopup } from "@/lib/mail-popup";

const socialLinks = [
  { href: profile.github, label: "GitHub", Icon: FiGithub },
  { href: profile.linkedin, label: "LinkedIn", Icon: FiLinkedin },
];

// 아이콘 크기: 뷰포트 폭에 따라 20px~28px 반응형
const ICON_CLASS =
  "text-[clamp(1.25rem,1.9vw,1.75rem)] text-muted transition-all hover:-translate-y-1 hover:text-accent";

/** 좌측 고정 소셜 아이콘 세로 바 (데스크톱 전용) */
export default function SideSocials() {
  const { open } = useMailPopup();
  // footer의 하단 여백(padding-bottom)만큼 바닥에서 띄운다.
  const [bottomOffset, setBottomOffset] = useState(0);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const measure = () =>
      setBottomOffset(parseFloat(getComputedStyle(footer).paddingBottom) || 0);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(footer);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      style={{ bottom: bottomOffset }}
      className="fixed left-6 z-40 hidden flex-col items-center gap-8 lg:flex"
    >
      {socialLinks.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={ICON_CLASS}
        >
          <Icon size="1em" />
        </a>
      ))}
      {/* 메일: mailto 대신 Resend 기반 작성 팝업 열기 */}
      <button type="button" onClick={open} aria-label="Email" className={ICON_CLASS}>
        <FiMail size="1em" />
      </button>
    </motion.aside>
  );
}
