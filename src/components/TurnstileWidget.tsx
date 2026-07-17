"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

/**
 * Cloudflare Turnstile 위젯 (명시적 렌더).
 *
 * 폼이 MailPopup 안에서 열고 닫힐 때마다 마운트/언마운트되므로:
 *  - 스크립트는 next/script가 src 기준으로 중복 로드를 막고,
 *    onReady가 재마운트마다 실행돼 다시 렌더할 수 있게 한다.
 *  - 언마운트 시 remove()로 위젯을 정리해 중복 렌더를 막는다.
 *
 * 토큰은 1회용이라 부모가 전송 후 resetKey를 바꾸면 새 토큰을 발급받는다.
 */

interface TurnstileApi {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      callback: (token: string) => void;
      "error-callback"?: () => void;
      "expired-callback"?: () => void;
      theme?: "light" | "dark" | "auto";
      size?: "normal" | "flexible" | "compact";
    },
  ) => string;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export default function TurnstileWidget({
  siteKey,
  onToken,
  resetKey = 0,
}: {
  siteKey: string;
  /** 검증 성공 시 토큰, 실패·만료 시 빈 문자열 */
  onToken: (token: string) => void;
  /** 값이 바뀌면 위젯을 새로 렌더해 새 토큰을 받는다 */
  resetKey?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  // 스크립트가 이미 로드돼 있으면 즉시 준비 상태로 시작
  const [ready, setReady] = useState(
    typeof window !== "undefined" && !!window.turnstile,
  );
  // onToken을 렌더(위젯 재생성) 의존성에서 빼기 위해 ref로 최신값 유지
  const onTokenRef = useRef(onToken);
  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useEffect(() => {
    if (!ready || !containerRef.current || !window.turnstile) return;

    const id = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: "auto",
      callback: (token) => onTokenRef.current(token),
      "error-callback": () => onTokenRef.current(""),
      "expired-callback": () => onTokenRef.current(""),
    });
    widgetIdRef.current = id;

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [ready, siteKey, resetKey]);

  return (
    <>
      <Script
        src={SCRIPT_SRC}
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
        onReady={() => setReady(true)}
      />
      <div ref={containerRef} />
    </>
  );
}
