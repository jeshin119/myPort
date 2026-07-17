# Portfolio — Backend Developer

Next.js (App Router) + TypeScript + TailwindCSS + Framer Motion + react-three-fiber 로 만든 개인 포트폴리오.

## 실행

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # 프로덕션 빌드
```

## 내 정보로 교체하기 (TODO)

| 항목 | 파일 |
|---|---|
| 이름 / 이메일 / GitHub / LinkedIn / 이력서 경로 | `src/lib/content.ts` → `profile` |
| 프로젝트 목록 (제목·기술·링크·스크린샷) | `src/lib/content.ts` → `projects` |
| 커리어 타임라인 텍스트 | `src/locales/en.json`, `src/locales/ko.json` → `career.items` |
| 기술 스택 아이콘 | `src/lib/content.ts` → `techRows` |
| SEO 제목/설명 | `src/app/layout.tsx` → `metadata` |
| 이력서 PDF | `public/resume.pdf` 로 배치 |
| 프로젝트 스크린샷 | `public/` 에 넣고 `projects[].image` 에 경로 지정 |

## 구조

- `src/components/GradientBackground.tsx` — 파스텔 blob 배경
- `src/components/CustomCursor.tsx` — 커스텀 커서 (fine pointer 전용)
- `src/components/SplashCursor.tsx` — 무지개 유체(WebGL Fluid) 마우스 이펙트. Pavel Dobryakov의 WebGL-Fluid-Simulation(MIT)을 감싼 ReactBits `SplashCursor` 포트. 설정값은 aaabadcode.com 원본과 동일
- `src/components/Scene3D.tsx` — 스크롤 카메라 전환 3D 스테이지 (Hero→About→What I Do)
- `src/components/Timeline.tsx` — 스크롤 연동 글로우 닷 타임라인
- `src/components/Work.tsx` — 세로 스크롤 → 가로 이동 쇼케이스 (모바일은 세로 스택 폴백)
- `src/components/TechStack.tsx` — 피라미드 그리드 + 버블 이펙트
- `src/lib/i18n.tsx` — EN/KO 컨텍스트, localStorage 유지

## 접근성 / 성능

- `prefers-reduced-motion` 시 애니메이션·커서·버블 비활성
- 3D 캔버스는 `next/dynamic` lazy load (SSR 제외)
- 터치 기기에서는 시선 추적 대신 idle 애니메이션

## 배포

Vercel에 저장소 연결 후 기본 설정으로 배포하면 됩니다.
