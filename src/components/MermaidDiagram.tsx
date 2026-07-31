"use client";

import { useEffect, useId, useRef, useState } from "react";

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

/** Warden 프로젝트의 아키텍처 다이어그램처럼, mermaid 소스가 있는 경우에만 렌더링. */
export default function MermaidDiagram({ chart }: { chart: string }) {
  const id = useId().replace(/[^a-zA-Z0-9-]/g, "");
  const [svg, setSvg] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    (async () => {
      const { default: mermaid } = await import("mermaid");
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        themeVariables: THEME_VARIABLES,
        securityLevel: "strict",
      });
      try {
        const { svg: rendered } = await mermaid.render(`mermaid-${id}`, chart);
        if (mountedRef.current) setSvg(rendered);
      } catch {
        if (mountedRef.current) setSvg(null);
      }
    })();
    return () => {
      mountedRef.current = false;
    };
  }, [chart, id]);

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
