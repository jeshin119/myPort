"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

export interface TocEntry {
  id: string;
  level: 2 | 3;
  label: string;
  /** 호버 프리뷰에 보여줄 본문 스니펫(이미 로케일 처리·트리밍된 문자열) */
  preview?: string;
  thumbnail?: { src: string; alt: string };
}

interface HoverState {
  entry: TocEntry;
  top: number;
  left: number;
}

/**
 * 노션 스타일 목차 — 헤딩(#/##/### 레벨)에서 그대로 파생된 목록.
 * 항목에 마우스를 올리면(포커스 시에도 동일) 그 섹션의 미리보기 카드가 뜬다.
 *
 * 프리뷰는 이 컴포넌트 안의 로컬 state로만 관리되고 document.body에 포털로 그려진다.
 * 부모(ProjectModal)의 거대한 본문 트리는 호버 때문에 절대 리렌더되지 않음 — 모달 안
 * 스크롤이 버벅이던 원인 중 하나(호버 상태가 이미지·다이어그램까지 포함한 전체 콘텐츠를
 * 다시 그리게 만드는 것)를 구조적으로 차단한다. 절대 위치 대신 포털을 쓰는 이유는, 목차
 * 칼럼 자체가 overflow-y-auto라 순수 CSS 호버 카드는 옆으로 못 튀어나오고 잘리기 때문.
 */
export default function DetailToc({
  entries,
  onNavigate,
}: {
  entries: TocEntry[];
  onNavigate: (id: string) => void;
}) {
  const [hover, setHover] = useState<HoverState | null>(null);

  const showPreview = (entry: TocEntry, el: HTMLElement) => {
    if (!entry.preview && !entry.thumbnail) return;
    const rect = el.getBoundingClientRect();
    const top = Math.min(Math.max(rect.top, 12), window.innerHeight - 180);
    const left = Math.max(rect.left - 272, 12);
    setHover({ entry, top, left });
  };
  const hidePreview = () => setHover(null);

  const itemClass = (level: 2 | 3) =>
    level === 3
      ? "ml-3 text-[11px] leading-snug text-muted"
      : "text-xs font-bold leading-snug text-foreground/80";

  return (
    <>
      {/* 데스크톱: 모달 오른쪽 사이드바, 본문과 별개로 스크롤 */}
      <nav
        aria-label="Table of contents"
        className="hidden shrink-0 flex-col gap-0.5 overflow-y-auto border-l border-border-soft py-7 pl-4 pr-2 lg:order-2 lg:flex lg:w-56 sm:py-9 [scrollbar-width:thin]"
      >
        {entries.map((entry) => (
          <button
            key={entry.id}
            type="button"
            data-cursor="hover"
            onMouseEnter={(e) => showPreview(entry, e.currentTarget)}
            onMouseLeave={hidePreview}
            onFocus={(e) => showPreview(entry, e.currentTarget)}
            onBlur={hidePreview}
            onClick={() => onNavigate(entry.id)}
            className={`block w-full truncate rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent/10 hover:text-accent ${itemClass(entry.level)}`}
          >
            {entry.label}
          </button>
        ))}
      </nav>

      {/* 모바일: 가로 스크롤 pill — 호버 프리뷰 없이 클릭 이동만 */}
      <div className="-mx-7 flex gap-2 overflow-x-auto border-b border-border-soft bg-white/90 px-7 py-3 backdrop-blur [scrollbar-width:none] sm:-mx-9 sm:px-9 lg:hidden">
        {entries.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => onNavigate(entry.id)}
            data-cursor="hover"
            className={`shrink-0 rounded-full border border-border-soft px-3 py-1.5 text-xs font-semibold transition-colors hover:border-accent/50 hover:text-accent ${
              entry.level === 3 ? "text-muted" : "text-foreground/70"
            }`}
          >
            {entry.label}
          </button>
        ))}
      </div>

      {hover &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="pointer-events-none fixed z-[70] w-64 rounded-xl border border-border-soft bg-white p-3 shadow-2xl shadow-accent/10"
            style={{ top: hover.top, left: hover.left }}
          >
            {hover.entry.thumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={hover.entry.thumbnail.src}
                alt=""
                className="mb-2 h-20 w-full rounded-lg object-cover"
              />
            )}
            <p className="text-xs font-bold text-foreground/90">{hover.entry.label}</p>
            {hover.entry.preview && (
              <p className="mt-1 line-clamp-3 text-[11px] leading-relaxed text-muted">
                {hover.entry.preview}
              </p>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
