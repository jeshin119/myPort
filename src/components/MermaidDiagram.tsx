"use client";

import { useEffect, useState } from "react";

/** globals.css의 실제 팔레트 값(단일 라이트 테마)을 그대로 하드코딩해 mermaid 테마에 맞춘다. */
const THEME_VARIABLES = {
  fontFamily: "inherit",
  primaryColor: "#f5f1ff",
  primaryTextColor: "#2b2440",
  primaryBorderColor: "#7c3aed",
  lineColor: "#a78bfa",
  secondaryColor: "#bcd8f7",
  tertiaryColor: "#b5ecd4",
  clusterBkg: "#faf8ff",
  clusterBorder: "#e6e1f0",
  edgeLabelBackground: "#ffffff",
};

// 모달을 닫으면 다이어그램 컴포넌트는 언마운트된다. 결과를 모듈 단위로 보관해
// 같은 프로젝트를 다시 열 때 Mermaid 파싱·SVG 생성을 반복하지 않는다.
const renderedCharts = new Map<string, string | null>();
const renderingCharts = new Map<string, Promise<string | null>>();
let renderSequence = 0;

async function renderChart(chart: string) {
  if (renderedCharts.has(chart)) return renderedCharts.get(chart) ?? null;

  const pending = renderingCharts.get(chart);
  if (pending) return pending;

  const rendering = (async () => {
    const { default: mermaid } = await import("mermaid");
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      themeVariables: THEME_VARIABLES,
      securityLevel: "strict",
    });
    try {
      const { svg } = await mermaid.render(`mermaid-${++renderSequence}`, chart);
      renderedCharts.set(chart, svg);
      return svg;
    } catch {
      renderedCharts.set(chart, null);
      return null;
    } finally {
      renderingCharts.delete(chart);
    }
  })();

  renderingCharts.set(chart, rendering);
  return rendering;
}

/** Warden 프로젝트의 아키텍처 다이어그램처럼, mermaid 소스가 있는 경우에만 렌더링. */
export default function MermaidDiagram({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string | null>(() => renderedCharts.get(chart) ?? null);

  useEffect(() => {
    let cancelled = false;
    if (!renderedCharts.has(chart)) {
      void renderChart(chart).then((rendered) => {
        if (!cancelled) setSvg(rendered);
      });
    }

    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (!svg) {
    return (
      <div className="flex h-40 w-full items-center justify-center rounded-xl border border-border-soft bg-white/40 text-xs text-muted">
        …
      </div>
    );
  }

  return (
    <div
      className="mermaid-diagram w-full overflow-x-auto rounded-xl border border-border-soft bg-white/60 p-4 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-none"
      // mermaid.render 결과(SVG)는 신뢰 가능한 로컬 상수 문자열(diagram)에서만 생성됨
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
