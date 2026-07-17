/**
 * Contact 폼 공유 검증 로직 (클라이언트 · 서버 공용).
 * 별도 검증 라이브러리 없이 경량으로 구현해 의존성을 늘리지 않는다.
 */

/** 봇 트랩용 허니팟 필드 이름 (사람에겐 숨김, 봇이 채우면 스팸으로 간주) */
export const HONEYPOT_FIELD = "company";

/** 필드별 최대 길이 */
export const LIMITS = {
  email: 120,
  subject: 120,
  message: 3000,
} as const;

/** 사용자가 입력하는 폼 값 (email·subject·message 모두 필수) */
export interface ContactInput {
  email: string;
  subject: string;
  message: string;
  /** 허니팟 (항상 빈 값이어야 함) */
  [HONEYPOT_FIELD]?: string;
}

export type ContactField = "email" | "subject" | "message";

/** 필드별 에러 메시지 코드 (i18n 키로 매핑) */
export type ContactErrors = Partial<Record<ContactField, string>>;

/** 검증 통과 시 정제된(trim된) 값 */
export interface CleanContact {
  email: string;
  subject: string;
  message: string;
}

export type ValidationResult =
  | { ok: true; data: CleanContact }
  | { ok: false; errors: ContactErrors };

// RFC 5322를 완전히 따르진 않지만 실무에서 충분한 이메일 패턴
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact 입력값을 검증한다.
 * @returns 통과 시 정제된 값, 실패 시 필드별 에러 코드(i18n 키)
 */
export function validateContact(input: ContactInput): ValidationResult {
  const email = (input.email ?? "").trim();
  const subject = (input.subject ?? "").trim();
  const message = (input.message ?? "").trim();

  const errors: ContactErrors = {};

  if (!email) errors.email = "required";
  else if (!EMAIL_RE.test(email)) errors.email = "invalidEmail";
  else if (email.length > LIMITS.email) errors.email = "tooLong";

  if (!subject) errors.subject = "required";
  else if (subject.length > LIMITS.subject) errors.subject = "tooLong";

  if (!message) errors.message = "required";
  else if (message.length > LIMITS.message) errors.message = "tooLong";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return { ok: true, data: { email, subject, message } };
}
