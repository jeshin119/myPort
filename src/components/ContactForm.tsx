"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import {
  HONEYPOT_FIELD,
  validateContact,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact-validation";
import TurnstileWidget from "./TurnstileWidget";

// 사이트 키(공개값). 미설정 시 캡차 위젯을 렌더하지 않는다.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY = { email: "", subject: "", message: "" };

/** 전송 후 버튼 비활성화 시간(초). 서버 레이트리밋(IP당 1분 1회)과 맞춘 값. */
const COOLDOWN_SECONDS = 60;

/**
 * @param embedded 팝업 등 이미 카드 컨테이너 안에 들어갈 때 true.
 *   외곽 글래스 카드/여백을 제거하고 폼만 렌더한다.
 */
export default function ContactForm({ embedded = false }: { embedded?: boolean }) {
  const { t } = useI18n();

  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  // 폼 레벨 메시지 코드 (i18n errors.* 키)
  const [formError, setFormError] = useState<string | null>(null);
  // 허니팟 (봇 트랩) — ref로만 읽고 렌더에는 영향 주지 않음
  const honeypotRef = useRef<HTMLInputElement>(null);
  // 쿨다운 종료 시각(ms). null이면 쿨다운 없음.
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  // 표시용 남은 초 (0이면 다시 보낼 수 있음)
  const [cooldown, setCooldown] = useState(0);
  // Turnstile: 발급된 토큰과, 전송 후 위젯을 새로 렌더하기 위한 키
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);

  const submitting = status === "submitting";
  const disabled = submitting || cooldown > 0;

  // 전송 시도 후 1회용 토큰을 폐기하고 위젯을 새로 렌더한다.
  const resetCaptcha = () => {
    if (!TURNSTILE_SITE_KEY) return;
    setCaptchaToken("");
    setCaptchaKey((k) => k + 1);
  };

  const startCooldown = () => {
    setCooldownUntil(Date.now() + COOLDOWN_SECONDS * 1000);
    setCooldown(COOLDOWN_SECONDS); // 첫 렌더에서 버튼이 잠깐 열리는 것 방지
  };

  // 남은 시간은 매 틱마다 실제 시각으로 다시 계산한다.
  // (1초 setTimeout을 이어붙이면 메인 스레드가 바쁠 때 60초가 훨씬 길어진다)
  useEffect(() => {
    if (cooldownUntil === null) return;
    const tick = () => {
      const left = Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000));
      setCooldown(left);
      if (left === 0) setCooldownUntil(null);
    };
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [cooldownUntil]);

  const update =
    (field: ContactField) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      // 입력 중 해당 필드 에러는 즉시 해제 (자연스러운 피드백)
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
      if (status === "error") setFormError(null);
    };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (disabled) return; // 중복 클릭 · 쿨다운 중 재전송 방지

    // 1) 클라이언트 검증
    const result = validateContact(values);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus("error");
      setFormError(null);
      return;
    }

    // 2) 캡차 완료 여부 (사이트 키가 설정된 경우에만 요구)
    if (TURNSTILE_SITE_KEY && !captchaToken) {
      setStatus("error");
      setFormError("captcha");
      return;
    }

    setErrors({});
    setFormError(null);
    setStatus("submitting");

    // 3) 서버(Route Handler)로 전송
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          [HONEYPOT_FIELD]: honeypotRef.current?.value ?? "",
          turnstileToken: captchaToken,
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: boolean; error?: string; fields?: ContactErrors }
        | null;

      // 토큰은 1회용 — 서버로 보낸 뒤에는 성공·실패와 무관하게 새로 발급받는다
      resetCaptcha();

      if (res.ok && data?.ok) {
        setStatus("success");
        setValues(EMPTY); // 성공 후 초기화
        startCooldown();
        return;
      }

      // 서버 검증 실패 시 필드 에러 반영
      if (data?.fields) setErrors(data.fields);
      // 서버가 레이트리밋으로 막았으면 버튼도 쿨다운시켜 헛클릭을 줄인다
      if (data?.error === "rateLimited") startCooldown();
      setFormError(data?.error ?? "server");
      setStatus("error");
    } catch {
      // 네트워크 오류 — 서버에 도달 못 했으면 토큰은 아직 유효하나,
      // 상태를 단순하게 유지하기 위해 위젯을 새로 렌더한다.
      resetCaptcha();
      setFormError("network");
      setStatus("error");
    }
  }

  const fieldError = (field: ContactField) =>
    errors[field] ? t(`contact.form.errors.${errors[field]}`) : null;

  const inputClass = (field: ContactField) =>
    `mt-1.5 w-full rounded-xl border bg-white/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:ring-2 ${
      errors[field]
        ? "border-red-400 focus:border-red-400 focus:ring-red-300/40"
        : "border-border-soft focus:border-accent focus:ring-accent/30"
    }`;

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      initial={embedded ? false : { opacity: 0, y: 24 }}
      whileInView={embedded ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={
        embedded
          ? "text-left"
          : "glass-card mx-auto mt-12 max-w-xl rounded-3xl p-6 text-left shadow-xl shadow-accent/5 sm:p-8"
      }
    >
      {/* 허니팟: 사람에겐 보이지 않음, 봇이 채우면 서버에서 무시 */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px]">
        <label>
          {"Company"}
          <input
            ref={honeypotRef}
            type="text"
            name={HONEYPOT_FIELD}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="cf-email" className="block text-sm font-medium text-foreground/80">
          {t("contact.form.email")}
        </label>
        <input
          id="cf-email"
          type="email"
          value={values.email}
          onChange={update("email")}
          placeholder={t("contact.form.emailPlaceholder")}
          disabled={submitting}
          aria-invalid={!!errors.email}
          className={inputClass("email")}
        />
        {fieldError("email") && (
          <p className="mt-1 text-xs text-red-500">{fieldError("email")}</p>
        )}
      </div>

      {/* Subject */}
      <div className="mt-5">
        <label htmlFor="cf-subject" className="block text-sm font-medium text-foreground/80">
          {t("contact.form.subject")}
        </label>
        <input
          id="cf-subject"
          type="text"
          value={values.subject}
          onChange={update("subject")}
          placeholder={t("contact.form.subjectPlaceholder")}
          disabled={submitting}
          aria-invalid={!!errors.subject}
          className={inputClass("subject")}
        />
        {fieldError("subject") && (
          <p className="mt-1 text-xs text-red-500">{fieldError("subject")}</p>
        )}
      </div>

      {/* Message */}
      <div className="mt-5">
        <label htmlFor="cf-message" className="block text-sm font-medium text-foreground/80">
          {t("contact.form.message")}
        </label>
        <textarea
          id="cf-message"
          value={values.message}
          onChange={update("message")}
          placeholder={t("contact.form.messagePlaceholder")}
          disabled={submitting}
          rows={5}
          aria-invalid={!!errors.message}
          className={`${inputClass("message")} resize-y`}
        />
        {fieldError("message") && (
          <p className="mt-1 text-xs text-red-500">{fieldError("message")}</p>
        )}
      </div>

      {/* 상태 메시지 */}
      <div aria-live="polite" className="mt-4 min-h-[1.25rem] text-sm">
        {status === "success" && (
          <p className="text-emerald-600">{t("contact.form.success")}</p>
        )}
        {status === "error" && formError && (
          <p className="text-red-500">{t(`contact.form.errors.${formError}`)}</p>
        )}
      </div>

      {/* Cloudflare Turnstile (사이트 키가 설정된 경우에만) */}
      {TURNSTILE_SITE_KEY && (
        <div className="mt-4">
          <TurnstileWidget
            siteKey={TURNSTILE_SITE_KEY}
            onToken={setCaptchaToken}
            resetKey={captchaKey}
          />
        </div>
      )}

      {/* Send */}
      <motion.button
        type="submit"
        disabled={disabled}
        whileHover={disabled ? undefined : { scale: 1.03 }}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-10 py-4 text-sm font-bold tracking-[0.15em] text-white shadow-xl shadow-accent/30 transition-opacity disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting && (
          <span
            aria-hidden
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          />
        )}
        {submitting
          ? t("contact.form.sending")
          : cooldown > 0
            ? `${t("contact.form.cooldown")} ${cooldown}s`
            : t("contact.form.send")}
      </motion.button>
    </motion.form>
  );
}
