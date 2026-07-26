"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";
import { FaAws, FaDatabase, FaJava } from "react-icons/fa6";
import {
  SiAnsible,
  SiBurpsuite,
  SiCplusplus,
  SiDocker,
  SiFastapi,
  SiGit,
  SiGithub,
  SiGnubash,
  SiJavascript,
  SiJenkins,
  SiLinux,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiSpring,
  SiVmware,
  SiWireshark,
} from "react-icons/si";
import { useI18n } from "@/lib/i18n";
import { techRows } from "@/lib/content";
import { useFitScale } from "@/lib/useFitScale";

const iconMap: Record<string, IconType> = {
  // 언어
  java: FaJava,
  python: SiPython,
  cpp: SiCplusplus,
  javascript: SiJavascript,
  sql: FaDatabase,
  shell: SiGnubash,
  // 백엔드 / 데이터 / OS
  spring: SiSpring,
  fastapi: SiFastapi,
  node: SiNodedotjs,
  nextjs: SiNextdotjs,
  mysql: SiMysql,
  linux: SiLinux,
  // 인프라 / DevOps
  docker: SiDocker,
  aws: FaAws,
  jenkins: SiJenkins,
  ansible: SiAnsible,
  vmware: SiVmware,
  // 버전관리 / 보안 툴
  git: SiGit,
  github: SiGithub,
  wireshark: SiWireshark,
  burpsuite: SiBurpsuite,
};

/** 수영장 위로 떠올랐다 가라앉는 비눗방울(구체) — 파스텔 톤 재해석 */
function Bubbles({ reduced }: { reduced: boolean }) {
  // (좌우 위치%, 크기px, 지속시간s, 딜레이s)
  const bubbles = [
    [8, 46, 9, 0],
    [20, 26, 7, 2.2],
    [33, 60, 11, 1],
    [47, 34, 8, 3.4],
    [58, 50, 10, 0.6],
    [70, 28, 7.5, 2.8],
    [82, 55, 10.5, 1.6],
    [92, 32, 8.5, 4],
  ] as const;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-72 overflow-hidden">
      {/* 수영장(그라데이션 보표수면) */}
      <div
        className="absolute inset-x-0 bottom-0 h-28"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--blob-blue) 35%, var(--blob-violet) 100%)",
          opacity: 0.5,
          filter: "blur(18px)",
        }}
      />
      {!reduced &&
        bubbles.map(([left, size, dur, delay], i) => (
          <motion.span
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(167,139,250,0.55) 60%, rgba(124,58,237,0.35))",
              boxShadow: "0 0 18px 4px rgba(167,139,250,0.35)",
            }}
            animate={{
              y: [20, -180 - size, 20],
              opacity: [0, 0.9, 0],
              scale: [0.7, 1, 0.75],
            }}
            transition={{
              duration: dur,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
    </div>
  );
}

/**
 * Tech Stack — 피라미드형 아이콘 그리드 + 버블 루프 이펙트.
 * 언어 → 프레임워크 → DB/인프라 → 툴 순으로 줄이 좁아진다.
 */
export default function TechStack() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const { containerRef, innerRef } = useFitScale<HTMLElement, HTMLDivElement>();

  return (
    <section ref={containerRef} className="snap-section relative overflow-hidden py-24 md:py-8">
      <div ref={innerRef} className="mx-auto w-full max-w-7xl px-6 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
        >
          {t("tech.title")}
        </motion.h2>
        <p className="mt-3 font-semibold text-accent">{t("tech.subtitle")}</p>

        <div className="relative z-10 mt-12 flex flex-col items-center gap-5 lg:mt-16">
          {techRows.map((row, rowIdx) => (
            <motion.ul
              key={rowIdx}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.5, delay: rowIdx * 0.12 }}
              className="flex flex-wrap justify-center gap-4 sm:gap-5 lg:flex-nowrap"
            >
              {row.map((tech) => {
                const Icon = iconMap[tech.icon];
                return (
                  <motion.li
                    key={tech.name}
                    whileHover={reduceMotion ? undefined : { y: -6, scale: 1.08 }}
                    data-cursor="hover"
                    className="glass-card flex flex-col items-center gap-2 rounded-2xl px-5 py-4 shadow-md shadow-accent/5"
                  >
                    {Icon && <Icon size={34} color={tech.color} aria-hidden />}
                    <span className="text-xs font-semibold text-foreground/80">
                      {tech.name}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>
          ))}
        </div>
      </div>

      <Bubbles reduced={!!reduceMotion} />
    </section>
  );
}
