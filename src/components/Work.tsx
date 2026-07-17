"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { useI18n } from "@/lib/i18n";
import { projects, type Project } from "@/lib/content";

function ProjectCard({ project }: { project: Project }) {
  const { t, locale } = useI18n();

  return (
    <article className="glass-card flex w-[85vw] max-w-[420px] shrink-0 flex-col rounded-3xl p-7 shadow-xl shadow-accent/5 sm:w-[420px]">
      <div className="flex items-baseline justify-between">
        <span className="text-4xl font-extrabold text-accent-soft/70">
          {project.number}
        </span>
        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
          {project.category}
        </span>
      </div>

      <h3 className="mt-4 text-2xl font-bold">{project.title}</h3>
      <p className="mt-2 min-h-[3.5rem] text-sm leading-relaxed text-muted">
        {project.description[locale]}
      </p>

      {/* 스크린샷 (없으면 그라데이션 플레이스홀더) */}
      <div className="mt-5 aspect-video w-full overflow-hidden rounded-xl border border-border-soft">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            aria-hidden
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-soft/30 via-blob-blue/40 to-blob-mint/40 text-5xl font-black text-white/70"
            style={{
              background:
                "linear-gradient(135deg, var(--blob-violet) 0%, var(--blob-blue) 50%, var(--blob-mint) 100%)",
            }}
          >
            {project.title.charAt(0)}
          </div>
        )}
      </div>

      <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
        {t("work.tools")}
      </p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {project.tools.map((tool) => (
          <li
            key={tool}
            className="rounded-full border border-border-soft bg-white/60 px-3 py-1 text-xs font-medium text-foreground/80"
          >
            {tool}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-bold text-white transition-transform hover:scale-105"
          >
            <FiGithub size={14} /> {t("work.viewGithub")}
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-xs font-bold transition-transform hover:scale-105"
          >
            <FiExternalLink size={14} /> {t("work.viewDemo")}
          </a>
        )}
      </div>
    </article>
  );
}

/**
 * My Work — 세로 스크롤을 가로 이동으로 변환하는 쇼케이스 (전 뷰포트 반응형).
 * - 뷰포트 폭에 따라 보이는 카드 수가 자연스럽게 결정됨
 * - 세로 스크롤량 = 가로 이동량(shift) 1:1: 마지막 카드가 오른쪽 끝에 닿으면
 *   그대로 아래로, 첫 카드가 왼쪽 끝일 때 올리면 그대로 위로 스크롤됨
 * - reduced-motion: 세로 스택 폴백
 */
export default function Work() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  // 가로 이동량 = 트랙 내용폭(카드 전체) - box 내부폭(트랙의 clientWidth).
  // 트랙은 중앙정렬된 max-w-7xl box 안에 있으므로, 카드는 그 box 안에서만 좌우로 움직인다.
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setShift(
          Math.max(0, trackRef.current.scrollWidth - trackRef.current.clientWidth),
        );
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduceMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -shift]);

  const heading = (
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-16">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
      >
        {t("work.title")}
      </motion.h2>
      <p className="mt-3 font-semibold text-accent">{t("work.subtitle")}</p>
    </div>
  );

  if (reduceMotion) {
    // reduced-motion 폴백: 세로 스택 (useScroll ref 유지를 위해 sectionRef 연결)
    return (
      <section id="work" ref={sectionRef} className="py-28">
        {heading}
        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center gap-8 px-6">
          {projects.map((p) => (
            <ProjectCard key={p.number} project={p} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="work" ref={sectionRef} style={{ height: `calc(100vh + ${shift}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center pt-16">
        {heading}
        {/* 중앙정렬된 box(heading과 동일한 max-w-7xl) — 카드는 이 안에서만 좌우로 이동, 넘치는 부분은 클립 */}
        <div className="mx-auto mt-8 w-full max-w-7xl overflow-hidden px-6 sm:mt-12 lg:px-16">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-stretch gap-6 sm:gap-10"
          >
            {projects.map((p) => (
              <ProjectCard key={p.number} project={p} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
