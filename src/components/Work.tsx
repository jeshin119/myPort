"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { FiArrowRight, FiExternalLink, FiGithub, FiX } from "react-icons/fi";
import { useI18n } from "@/lib/i18n";
import { projects, type Project } from "@/lib/content";
import { useFitScale } from "@/lib/useFitScale";
import { useModalPerformance } from "@/lib/modal-performance";
import MermaidDiagram from "@/components/MermaidDiagram";
import DetailToc, { type TocEntry } from "@/components/DetailToc";

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

      {/* 자세히 보기 — 상세 모달을 연다. + GitHub/데모(있으면) — 같은 pill 버튼 디자인으로 통일.
          mt-auto로 카드 하단 정렬 */}
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
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
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="flex items-center gap-1.5 rounded-full border border-accent/40 px-4 py-2 text-xs font-bold text-accent transition-transform hover:scale-105"
          >
            <FiGithub size={14} />
            {t("work.viewGithub")}
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="flex items-center gap-1.5 rounded-full border border-accent/40 px-4 py-2 text-xs font-bold text-accent transition-transform hover:scale-105"
          >
            <FiExternalLink size={14} />
            {t("work.viewDemo")}
          </a>
        )}
      </div>
    </article>
  );
}

/**
 * 프로젝트 상세 모달 — README 기반 헤딩 블록(##/###)을 그대로 렌더링하고,
 * 오른쪽에 그 헤딩들에서 파생된 목차(DetailToc)를 붙인다.
 * 레이아웃: 모바일은 세로 1컬럼(목차 pill이 맨 위) / lg 이상은 본문(좌) + 목차(우) 2컬럼.
 */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { t, locale } = useI18n();
  const { setModalOpen } = useModalPerformance();

  // 블록 id → DOM 엘리먼트. 목차 클릭 시 해당 블록으로 스크롤.
  const blockRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollToBlock = (id: string) => {
    blockRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // 열려 있는 동안 ESC로 닫고, 배경 스크롤을 잠근다.
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setModalOpen(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      setModalOpen(false);
    };
  }, [project, onClose, setModalOpen]);

  const entries: TocEntry[] = project
    ? project.detail.blocks.map((block) => ({
        id: block.id,
        level: block.level,
        label: block.heading[locale],
        preview: block.body
          ? block.body[locale].split("\n\n")[0].slice(0, 140)
          : undefined,
        thumbnail: block.image
          ? { src: block.image.src, alt: block.image.alt[locale] }
          : undefined,
      }))
    : [];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 sm:p-6"
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
            className="relative flex max-h-[86vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-border-soft bg-white/95 shadow-2xl shadow-accent/10"
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

            <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
              <DetailToc entries={entries} onNavigate={scrollToBlock} />

              <div className="order-2 min-w-0 flex-1 overflow-y-auto p-7 sm:p-9 lg:order-1 [scrollbar-width:thin]">
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

                {/* 메타 라인: 기간 · 인원 · 역할 + 보조 링크(발표자료/보고서/ERD 등) */}
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                  <span>
                    <strong className="font-semibold text-foreground/80">
                      {t("work.period")}
                    </strong>{" "}
                    {project.detail.meta.period}
                  </span>
                  <span aria-hidden>·</span>
                  <span>
                    <strong className="font-semibold text-foreground/80">
                      {t("work.team")}
                    </strong>{" "}
                    {project.detail.meta.team[locale]}
                  </span>
                  <span aria-hidden>·</span>
                  <span>
                    <strong className="font-semibold text-foreground/80">
                      {t("work.role")}
                    </strong>{" "}
                    {project.detail.meta.role[locale]}
                  </span>
                </div>
                {project.detail.meta.links &&
                  project.detail.meta.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      {project.detail.meta.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="hover"
                          className="text-xs font-semibold text-accent underline-offset-4 hover:underline"
                        >
                          {link.label[locale]} ↗
                        </a>
                      ))}
                    </div>
                  )}

                {/* README 헤딩 블록 — level 2(##)는 본문 헤딩, level 3(###)는 좌측 보더가 있는 하위 항목.
                    (이전엔 여기 content-visibility:auto를 걸었는데, contain-intrinsic-size 없이 쓰면
                    크롬이 화면 밖 블록의 높이를 잘못 추정했다가 스크롤 중 실제 크기로 보정하면서 그
                    아래 블록들이 계속 밀리는 리플로우가 생겨 오히려 더 버벅였다. 이미지·표처럼 블록마다
                    높이 편차가 큰 지금 콘텐츠 규모(프로젝트당 최대 20개 블록)에서는 그 비용이 skip으로
                    아끼는 비용보다 커서, 최적화가 아니라 역효과였다 — 제거.) */}
                {(() => {
                  // level-3 하위 항목이 여러 개 이어질 때(예: 42Seoul의 12개 프로젝트) 서로 구분이
                  // 어려워, 직전 level-2 헤딩 이후로 몇 번째 항목인지 번호를 매기고 짝/홀에 따라
                  // 배경을 교차시킨다.
                  let subIndex = 0;
                  return project.detail.blocks.map((block) => {
                    if (block.level === 2) {
                      subIndex = 0;
                    } else {
                      subIndex += 1;
                    }
                    const isEven = subIndex % 2 === 0;
                    return (
                      <div
                        key={block.id}
                        ref={(el) => {
                          blockRefs.current[block.id] = el;
                        }}
                        className={
                          block.level === 2
                            ? "mt-10 scroll-mt-6"
                            : `mt-4 scroll-mt-6 rounded-xl border-l-4 py-3 pl-4 pr-3 ${
                                isEven
                                  ? "border-border-soft bg-white/60"
                                  : "border-accent/30 bg-accent/5"
                              }`
                        }
                      >
                        {block.level === 2 ? (
                          <h4 className="text-lg font-bold text-foreground">
                            {block.heading[locale]}
                          </h4>
                        ) : (
                          <h5 className="text-sm font-bold text-foreground/90">
                            <span className="text-muted">
                              {String(subIndex).padStart(2, "0")}.
                            </span>{" "}
                            {block.heading[locale]}
                          </h5>
                        )}
                        {block.techTags && (
                          <ul className="mt-2 flex flex-wrap gap-1.5">
                            {block.techTags.map((tag) => (
                              <li
                                key={tag}
                                className="rounded-full border border-border-soft bg-white/60 px-2.5 py-0.5 text-[11px] font-medium text-foreground/80"
                              >
                                {tag}
                              </li>
                            ))}
                          </ul>
                        )}
                        {block.body && (
                          <div className="mt-2 space-y-2.5">
                            {block.body[locale].split("\n\n").map((para, i) => (
                              <p
                                key={i}
                                className="text-sm leading-relaxed text-muted sm:text-[15px]"
                              >
                                {para}
                              </p>
                            ))}
                          </div>
                        )}
                        {block.troubleshooting && (
                          <div className="mt-3">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
                              {t("work.troubleshooting")}
                            </p>
                            <div className="mt-1.5 space-y-2">
                              {block.troubleshooting[locale]
                                .split("\n\n")
                                .map((para, i) => (
                                  <p
                                    key={i}
                                    className="text-sm leading-relaxed text-muted"
                                  >
                                    {para}
                                  </p>
                                ))}
                            </div>
                          </div>
                        )}
                        {block.projectUrl && (
                          <a
                            href={block.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="hover"
                            className="mt-3 inline-block text-xs font-semibold text-accent underline-offset-4 hover:underline"
                          >
                            {t("work.viewGithub")} ↗
                          </a>
                        )}
                        {block.image && (
                          <figure className="mt-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={block.image.src}
                              alt={block.image.alt[locale]}
                              width={block.image.width}
                              height={block.image.height}
                              loading="lazy"
                              decoding="async"
                              className="h-auto w-full rounded-xl border border-border-soft"
                            />
                            {block.image.caption && (
                              <figcaption className="mt-1.5 text-center text-xs text-muted">
                                {block.image.caption[locale]}
                              </figcaption>
                            )}
                          </figure>
                        )}
                        {block.diagram && (
                          <div className="mt-4">
                            <MermaidDiagram
                              key={block.diagram[locale]}
                              chart={block.diagram[locale]}
                            />
                            {block.diagramNote && (
                              <p className="mt-2 text-xs italic text-muted">
                                {block.diagramNote[locale]}
                              </p>
                            )}
                          </div>
                        )}
                        {block.table && (
                          <div className="mt-4 overflow-x-auto rounded-xl border border-border-soft">
                            <table className="w-full border-collapse text-left">
                              <thead>
                                <tr className="border-b border-border-soft bg-accent/5">
                                  <th className="whitespace-nowrap px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-muted">
                                    {t("work.techTable.category")}
                                  </th>
                                  <th className="whitespace-nowrap px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-muted">
                                    {t("work.techTable.tech")}
                                  </th>
                                  <th className="px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-muted">
                                    {t("work.techTable.purpose")}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {block.table.map((row, i) => (
                                  <tr
                                    key={i}
                                    className="border-b border-border-soft align-top last:border-0"
                                  >
                                    <td className="whitespace-nowrap px-3 py-2.5 text-sm font-semibold text-foreground/80">
                                      {row.category[locale]}
                                    </td>
                                    <td className="px-3 py-2.5 text-sm text-foreground/80">
                                      {row.tech}
                                    </td>
                                    <td className="px-3 py-2.5 text-sm leading-relaxed text-muted">
                                      {row.purpose[locale]
                                        .split("\n")
                                        .map((line, li) => (
                                          <div key={li}>{line}</div>
                                        ))}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>
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
      const last =
        track.children[track.children.length - 1].getBoundingClientRect();
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

  const modal = (
    <ProjectModal project={active} onClose={() => setActive(null)} />
  );

  if (reduceMotion) {
    // reduced-motion 폴백: 세로 스택 (드래그/휠 없이 자연 스크롤)
    return (
      <>
        <section id="work" ref={containerRef} className="snap-section py-28">
          <div ref={innerRef}>
            {heading}
            <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center gap-8 px-6">
              {projects.map((p) => (
                <ProjectCard
                  key={p.number}
                  project={p}
                  onOpen={() => setActive(p)}
                />
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
      <section
        id="work"
        ref={containerRef}
        className="snap-section py-20 md:py-8"
      >
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
                <ProjectCard
                  key={p.number}
                  project={p}
                  onOpen={() => setActive(p)}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      {modal}
    </>
  );
}
