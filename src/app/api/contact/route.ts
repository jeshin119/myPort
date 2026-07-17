import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  HONEYPOT_FIELD,
  validateContact,
  type ContactInput,
} from "@/lib/contact-validation";

/**
 * POST /api/contact
 * Contact 폼 → Resend로 메일 전송.
 *
 * 스팸 방지: 허니팟 필드 + IP 기반 경량 레이트리밋.
 *  - Turnstile 대비 외부 계정/키/스크립트가 필요 없어 유지보수가 쉽고
 *    Vercel 서버리스에서 바로 동작한다.
 *  - 인메모리 레이트리밋은 인스턴스 단위(콜드스타트 시 리셋)라 완벽하진 않지만,
 *    포트폴리오 규모의 남용 방지에는 충분한 best-effort 방어다.
 */

// 응답 타입
interface SuccessResponse {
  ok: true;
}
interface ErrorResponse {
  ok: false;
  /** 클라이언트 i18n 매핑용 에러 코드 */
  error: "invalid" | "rateLimited" | "server" | "config";
  /** 필드별 검증 에러 (error === "invalid"일 때) */
  fields?: Record<string, string>;
}

// ── 레이트리밋 (IP당 다단계: 1분 1회 · 1시간 5회 · 하루 20회) ──
const RATE_LIMITS = [
  { windowMs: 60_000, max: 1 }, // 1분 1회
  { windowMs: 3_600_000, max: 5 }, // 1시간 5회
  { windowMs: 86_400_000, max: 20 }, // 하루 20회
] as const;
// 가장 긴 창(하루)을 기준으로 오래된 타임스탬프는 폐기
const MAX_WINDOW_MS = Math.max(...RATE_LIMITS.map((r) => r.windowMs));
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < MAX_WINDOW_MS);
  recent.push(now); // 이번 요청 포함
  hits.set(ip, recent);
  // 어느 한 창이라도 한도를 초과하면 차단
  return RATE_LIMITS.some(
    ({ windowMs, max }) => recent.filter((t) => now - t < windowMs).length > max,
  );
}

function getClientIp(req: Request): string {
  // Vercel은 x-forwarded-for에 클라이언트 IP를 넣는다
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function json(body: SuccessResponse | ErrorResponse, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(req: Request) {
  // 환경변수 확인 (키는 코드에 하드코딩하지 않음)
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] Missing RESEND_API_KEY or CONTACT_EMAIL");
    return json({ ok: false, error: "config" }, 500);
  }

  // 레이트리밋
  if (isRateLimited(getClientIp(req))) {
    return json({ ok: false, error: "rateLimited" }, 429);
  }

  // 본문 파싱
  let body: ContactInput;
  try {
    body = (await req.json()) as ContactInput;
  } catch {
    return json({ ok: false, error: "invalid" }, 400);
  }

  // 허니팟: 값이 차 있으면 봇 → 성공한 척하고 조용히 무시
  if (typeof body[HONEYPOT_FIELD] === "string" && body[HONEYPOT_FIELD]!.trim()) {
    return json({ ok: true }, 200);
  }

  // 서버측 검증
  const result = validateContact(body);
  if (!result.ok) {
    return json({ ok: false, error: "invalid", fields: result.errors }, 400);
  }
  const { email, subject, message } = result.data;

  // Resend 호출
  const resend = new Resend(apiKey);
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Email: ${email}\nSubject: ${subject}\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return json({ ok: false, error: "server" }, 502);
    }
    return json({ ok: true }, 200);
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return json({ ok: false, error: "server" }, 500);
  }
}
