"use client";

import { useEffect, useRef } from "react";

/**
 * 콘텐츠가 고정 높이 컨테이너(스냅 섹션)보다 클 때, 실제 측정한 넘치는 만큼만
 * zoom으로 축소해 항상 안에 들어오도록 보장한다.
 *
 * clamp() 같은 뷰포트-너비 기반 추측과 달리 "실제 렌더된 높이"를 보고 판단하므로
 * 언어(영문이 더 김)·폰트 로딩·브라우저 확대율·화면 크기와 무관하게 결과를 보장한다.
 * transform:scale()이 아니라 zoom을 쓰는 이유: zoom은 레이아웃 크기 자체를 줄여
 * 부모의 flex 중앙 정렬이 축소된 크기를 기준으로 다시 계산되고, 컨테이너의
 * overflow-y:auto가 더 이상 트리거되지 않는다(순수 transform은 레이아웃 크기가
 * 그대로라 여전히 넘친 것으로 계산됨).
 */
export function useFitScale<
  C extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLDivElement,
>() {
  const containerRef = useRef<C>(null);
  const innerRef = useRef<I>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const measure = () => {
      // scrollHeight를 zoom!=1인 상태에서 읽으면 줄바꿈 재계산으로 비선형적인 값이
      // 나온다(zoom에 비례하지 않음). 매번 zoom을 1로 리셋해 깨끗한 기준으로 측정한다.
      // 같은 프레임 안에서 read 후 바로 write하므로 화면에 깜빡임은 없다.
      const prevApplied = parseFloat(inner.style.zoom || "1") || 1;
      inner.style.zoom = "1";
      const naturalHeight = inner.scrollHeight;
      const cs = getComputedStyle(container);
      const padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      const available = container.clientHeight - padY;
      const next =
        available > 0 && naturalHeight > available
          ? Math.max(0.5, available / naturalHeight)
          : 1;
      if (Math.abs(next - prevApplied) > 0.005) {
        inner.style.zoom = String(next);
      } else {
        inner.style.zoom = String(prevApplied);
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    ro.observe(inner);
    document.fonts?.ready?.then(measure).catch(() => {});
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return { containerRef, innerRef };
}
