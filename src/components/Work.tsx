"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiExternalLink, FiGithub, FiX } from "react-icons/fi";
import { useI18n } from "@/lib/i18n";
import { projects, type Project } from "@/lib/content";
import { useFitScale } from "@/lib/useFitScale";

/** 스크린샷 (없으면 그라데이션 플레이스홀더). 카드/모달에서 공유. */
function Screenshot({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl border border-border-soft bg-gradient-to-br from-accent-soft/15 via-blob-blue/10 to-blob-mint/15">
      {project.image && !imgError ? (
        // cover: 카드를 꽉 채우고 넘치는 부분은 잘림(중앙 기준).
        // contain: 전체를 중앙에 담고 남는 여백은 그라데이션 배경으로 채움.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className={
            (project.imageFit ?? "cover") === "contain"
              ? "h-full w-full object-contain p-3"
              : "h-full w-full object-cover object-center"
          }
          loading="lazy"
          draggable={false}
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          aria-hidden
          className="flex h-full w-full items-center justify-center text-5xl font-black text-white/70"
          style={{
            background:
              "linear-gradient(135deg, var(--blob-violet) 0%, var(--blob-blue) 50%, var(--blob-mint) 100%)",
          }}
        >
          {project.title.charAt(0)}
        </div>
      )}
    </div>
  );
}

/**
 * 프로젝트 요약 카드 — 세로 흐름: 번호/카테고리 → 제목 → 한 줄 요약 → 이미지 →
 * 사용 기술 → 자세히 보기. GitHub·전체 설명 등 상세는 "자세히 보기" 모달에서만 노출한다.
 */
function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const { t, locale } = useI18n();
  // 이미지 경로는 있으나 파일이 없거나 로드 실패 시 그라데이션 플레이스홀더로 폴백
  const [imgError, setImgError] = useState(false);

  return (
    <article className="glass-card flex w-[85vw] max-w-[460px] shrink-0 flex-col rounded-3xl p-6 shadow-xl shadow-accent/5 sm:w-[460px]">
      {/* 번호 · 카테고리 (한 줄 가로 정렬) */}
      <div className="flex items-center justify-between">
        <span className="text-4xl font-extrabold leading-none text-accent-soft/70">
          {project.number}
        </span>
        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
          {project.category}
        </span>
      </div>

      <h3 className="mt-4 text-2xl font-bold">{project.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {project.tagline[locale]}
      </p>

      <div className="mt-4">
        <Screenshot project={project} />
      </div>

      <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
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

      {/* 자세히 보기 — 상세 모달을 연다. mt-auto로 카드 하단 정렬 */}
      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={onOpen}
          data-cursor="hover"
          className="group/lm flex items-center gap-1.5 rounded-full border border-accent/40 px-4 py-2 text-xs font-bold text-accent transition-transform hover:scale-105"
        >
          {t("work.learnMore")}
          <FiArrowRight
            size={14}
            className="transition-transform group-hover/lm:translate-x-1"
          />
        </button>
      </div>
    </article>
  );
}

/** 프로젝트 상세 모달 — 전체 설명·주요 기능·기술스택·링크(GitHub 포함). */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { t, locale } = useI18n();

  // 열려 있는 동안 ESC로 닫고, 배경 스크롤을 잠근다.
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm sm:p-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card relative flex max-h-[86vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl shadow-2xl shadow-accent/10"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t("work.close")}
              data-cursor="hover"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-foreground/70 transition-colors hover:text-accent"
            >
              <FiX size={18} />
            </button>

            <div className="overflow-y-auto p-7 sm:p-9 [scrollbar-width:thin]">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold leading-none text-accent-soft/70">
                  {project.number}
                </span>
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  {project.category}
                </span>
              </div>

              <h3 className="mt-3 text-3xl font-bold">{project.title}</h3>

              <div className="mt-5">
                <Screenshot project={project} />
              </div>

              <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base">
                {project.description[locale]}
              </p>

              <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
                {t("work.highlights")}
              </p>
              <ul className="mt-3 space-y-2">
                {project.highlights[locale].map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
                {t("work.tools")}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-border-soft bg-white/60 px-3 py-1 text-xs font-medium text-foreground/80"
                  >
                    {tool}
                  </li>
                ))}
              </ul>

              {(project.github || project.demo) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-bold text-white transition-transform hover:scale-105"
                    >
                      <FiGithub size={14} /> {t("work.viewGithub")}
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5 text-xs font-bold transition-transform hover:scale-105"
                    >
                      <FiExternalLink size={14} /> {t("work.viewDemo")}
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * My Work — 가로 프로젝트 캐러셀.
 * - 클릭 후 드래그(마우스/터치) 또는 트랙패드 좌우 스와이프로 카드를 좌우 이동
 * - 세로 스크롤(휠 deltaY)은 그대로 페이지(다음 주제)로 흐른다
 * - 카드 클릭 시 상세 모달(learn more)을 연다
 * - reduced-motion: 세로 스택 폴백
 */
export default function Work() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  const [active, setActive] = useState<Project | null>(null);
  const x = useMotionValue(0);
  const { containerRef, innerRef } = useFitScale<HTMLElement, HTMLDivElement>();

  // 가로 이동 가능량 = 마지막 카드 오른쪽 끝이 보이는 영역(overflow-hidden 박스) 밖으로
  // 튀어나온 만큼. scrollWidth/clientWidth는 useFitScale이 조상에 건 zoom 때문에 "로컬"
  // 단위를 반환해 실제 화면 픽셀과 어긋나므로(예: zoom 0.8일 때 1.25배로 뻥튀기),
  // 항상 실제 화면 좌표인 getBoundingClientRect()로 계산한다. track의 x(translateX)는
  // zoom이 걸린 조상 안에 있으므로 로컬 단위로 변환(realShift / zoom)해야 시각적으로
  // 정확한 거리만큼 이동한다.
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const view = viewportRef.current;
      if (!track || !view || track.children.length === 0) return;
      const last = track.children[track.children.length - 1].getBoundingClientRect();
      const viewRect = view.getBoundingClientRect();
      const zoom = parseFloat(innerRef.current?.style.zoom || "1") || 1;
      const realShift = Math.max(0, last.right - viewRect.right);
      const s = realShift / zoom;
      setShift(s);
      if (x.get() < -s) x.set(-s);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [x, innerRef]);

  // 트랙패드 좌우 스와이프(가로 우세 휠) → 카드 이동. 세로 우세면 페이지 스크롤에 양보.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el || reduceMotion) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const next = Math.min(0, Math.max(-shift, x.get() - e.deltaX));
      x.set(next);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [shift, x, reduceMotion]);

  const heading = (
    <div className="mx-auto w-full max-w-[100rem] px-6 lg:px-16">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
      >
        {t("work.title")}
      </motion.h2>
      <p className="mt-3 font-semibold text-accent">{t("work.subtitle")}</p>
    </div>
  );

  const modal = <ProjectModal project={active} onClose={() => setActive(null)} />;

  if (reduceMotion) {
    // reduced-motion 폴백: 세로 스택 (드래그/휠 없이 자연 스크롤)
    return (
      <>
        <section id="work" ref={containerRef} className="snap-section py-28">
          <div ref={innerRef}>
            {heading}
            <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center gap-8 px-6">
              {projects.map((p) => (
                <ProjectCard key={p.number} project={p} onOpen={() => setActive(p)} />
              ))}
            </div>
          </div>
        </section>
        {modal}
      </>
    );
  }

  return (
    <>
      <section id="work" ref={containerRef} className="snap-section py-20 md:py-8">
        <div ref={innerRef}>
          {heading}
          {/* 보이는 창(overflow-hidden) 안에서 트랙을 좌우로 드래그. 세로로 넘치면
              useFitScale이 이 블록 전체를 축소해 잘림 없이 화면에 맞춘다. */}
          <div
            ref={viewportRef}
            className="mx-auto mt-8 w-full max-w-[100rem] overflow-hidden px-6 sm:mt-12 lg:px-16"
          >
            <motion.div
              ref={trackRef}
              drag="x"
              dragConstraints={{ left: -shift, right: 0 }}
              dragElastic={0.06}
              style={{ x }}
              className="flex cursor-grab items-stretch gap-6 active:cursor-grabbing sm:gap-10"
            >
              {projects.map((p) => (
                <ProjectCard key={p.number} project={p} onOpen={() => setActive(p)} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      {modal}
    </>
  );
}
