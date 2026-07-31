/**
 * ── 개인 정보/콘텐츠 데이터 ──────────────────────────────
 * TODO: 아래 값들을 실제 정보로 교체하세요.
 * 텍스트(제목/설명)는 src/locales/en.json, ko.json 에서 관리합니다.
 */

export const profile = {
  name: "Jeshin", // TODO: 실제 이름으로 교체
  email: "jsshin0201@gmail.com",
  github: "https://github.com/jeshin119",
  linkedin: "https://www.linkedin.com/in/jeongsu-shin-3848b4194",
  resumeUrl: "/resume.pdf", // TODO: public/resume.pdf 에 이력서 PDF 배치
};

/** 커리어 타임라인 — 텍스트는 locales의 career.items.<id> 키로 연결됨 */
export const careerItems = [
  { id: "now" },
  { id: "2025" },
  { id: "2024" },
  { id: "2023" },
] as const;

interface Localized {
  en: string;
  ko: string;
}

/** README에서 옮겨온 스크린샷/다이어그램. reflow 방지를 위해 실제 픽셀 크기를 함께 저장. */
export interface DetailImage {
  /** public/ 아래 경로 */
  src: string;
  width: number;
  height: number;
  alt: Localized;
  caption?: Localized;
}

/**
 * 프로젝트 상세 모달의 한 "헤딩 블록". 노션이 #/##/###로 목차를 만들 듯,
 * level 2(=##)는 목차 1단계, level 3(=###)는 목차 2단계(들여쓰기)로 렌더된다.
 * 배열 순서 + level만으로 계층이 정해지는 flat 구조 — 별도 트리 없이 마크다운 아웃라인과 동일한 원리.
 */
export interface DetailBlock {
  /** 앵커/스크롤 타깃 겸 React key */
  id: string;
  level: 2 | 3;
  heading: Localized;
  /** 이 블록 전용 기술 태그 pill 목록 — 42Seoul 개별 프로젝트 카드용(전체 프로젝트의 table과는 별개) */
  techTags?: string[];
  /** "\n\n"로 문단 구분 */
  body?: Localized;
  /** 본문 뒤에 별도 라벨로 노출되는 트러블슈팅 노트 — 42Seoul처럼 일부 항목에만 선택적으로 붙임 */
  troubleshooting?: Localized;
  /** 이 블록이 가리키는 개별 저장소 링크 */
  projectUrl?: string;
  image?: DetailImage;
  /** mermaid 소스 — 실제 다이어그램이 있는 프로젝트만 채움(Warden) */
  diagram?: Localized;
  /** 다이어그램 각주(설계 상태 등) */
  diagramNote?: Localized;
  /** 기술 스택 및 사용 목적 표. 42Seoul을 제외한 3개 프로젝트에만 사용 */
  table?: { category: Localized; tech: string; purpose: Localized }[];
}

export interface ProjectDetail {
  meta: {
    /** 로케일 무관 표기 (예: "2025.09.02 – 2025.09.15 (2주)") */
    period: string;
    team: Localized;
    role: Localized;
    /** GitHub/데모 외 보조 링크 — 발표자료·보고서·ERD·API 명세·시연영상 등 */
    links?: { label: Localized; url: string }[];
  };
  blocks: DetailBlock[];
}

export interface Project {
  number: string;
  title: string;
  category: string;
  tools: string[];
  /** public/ 아래 스크린샷 경로. 없으면 그라데이션 플레이스홀더 렌더링 */
  image?: string;
  /**
   * 이미지 맞춤 방식. 기본 "cover"(카드를 꽉 채우고 넘치는 부분은 잘림).
   * 로고처럼 잘리면 안 되는 이미지는 "contain"(전체를 보이고 여백은 그라데이션).
   */
  imageFit?: "cover" | "contain";
  github?: string;
  demo?: string;
  /** 카드에 노출되는 한 줄 요약(모달의 전체 설명을 압축). */
  tagline: Localized;
  /** "자세히 보기" 모달의 상세 콘텐츠(README 기반 헤딩 블록 배열). */
  detail: ProjectDetail;
}

export const projects: Project[] = [
  {
    number: "01",
    title: "Vintage Market",
    category: "Backend / Pentest",
    image: "/images/img_vintageMarket.png",
    tools: [
      "React",
      "Node.js / Express",
      "Socket.IO",
      "MySQL / Sequelize",
      "Docker",
      "Jenkins",
      "Burp Suite",
    ],
    github: "https://github.com/jeshin119/secure-marketplace-platform",
    tagline: {
      en: "Built a legacy marketplace, then attacked it in a simulated red-team engagement.",
      ko: "레거시 중고거래 플랫폼을 직접 구현하고 레드팀 관점에서 진단한 프로젝트.",
    },
    detail: {
      meta: {
        period: "2025.09.02 – 2025.09.15 (2 weeks)",
        team: { en: "Team of 4", ko: "4인" },
        role: {
          en: "Implemented the React/Node.js service, built network segmentation & CI/CD infra (Jenkins·Gitea), ran the SQL injection diagnosis scenario, and wrote the report",
          ko: "React·Node.js 서비스 구현, 망 분리·CI/CD 인프라 구축(Jenkins·Gitea), SQL Injection 진단 시나리오 수행, 결과 보고서 작성",
        },
        links: [
          {
            label: { en: "Slides", ko: "발표 자료" },
            url: "https://docs.google.com/presentation/d/1riU8wIi2z-_VI2-U1nVr8rti1VgtU9GIwHG_h8sCNA8/edit?usp=sharing",
          },
          {
            label: { en: "Report", ko: "상세 보고서" },
            url: "https://docs.google.com/document/d/1BKQHNQjZNZ8uO-JT-aFsX8uKic3Orea9c4mF0M2yiaE/edit?usp=sharing",
          },
        ],
      },
      blocks: [
        {
          id: "overview",
          level: 2,
          heading: { en: "Project Overview", ko: "프로젝트 개요" },
          body: {
            en: "Working from a fictional client's request, the goal was to proactively identify and remove security weaknesses before a new service launched, and to objectively prove the service was safe. We built production-grade service and infrastructure first, then demonstrated with a black-box diagnosis how code- and architecture-level weaknesses actually translate into business damage.\n\nInstead of a plain code review, we stood up operations-grade infrastructure with network segmentation and a CI/CD pipeline, then diagnosed the system from an external attacker's perspective with no prior information. Threats were derived with DFD/STRIDE and penetration scenarios were built on MITRE ATT&CK, verifying and evidencing a real path from the external entry point through the internal network and dev environment.\n\nCore features span product listing/edit/delete/search/category browsing/likes, buy-sell processing with transaction history, coupon validation, Socket.IO real-time chat, a community board with posts and comments, and an admin dashboard covering members, products, transactions, and system settings.",
            ko: "고객사 의뢰를 받아, 신규 서비스 론칭 전 잠재적 보안 취약점을 선제적으로 식별·제거하고 안전한 서비스 제공을 객관적으로 입증하는 것이 목표였다. 이를 위해 실제 운영 환경 수준의 서비스와 인프라를 구축한 뒤, 코드·아키텍처 레벨의 약점이 실제로 어떻게 비즈니스 피해로 이어지는지를 블랙박스 진단으로 실증했다.\n\n단순 코드 리뷰가 아니라, 망 분리와 CI/CD 파이프라인이 갖춰진 운영 수준의 인프라를 직접 구축하고, 사전 정보 없이 외부 공격자 입장에서 이 시스템을 진단했다. DFD·STRIDE로 위협을 도출하고 MITRE ATT&CK 기준으로 침투 시나리오를 수립해, 외부 진입점부터 내부망·개발 환경까지 이어지는 실제 침투 경로를 검증하고 증거를 남겼다.\n\n주요 기능은 상품 등록·수정·삭제·검색·카테고리 조회·좋아요, 구매/판매 처리와 거래 내역 조회, 쿠폰 검증·적용, Socket.IO 기반 실시간 채팅, 게시글·댓글 커뮤니티, 그리고 회원·상품·거래·시스템 설정을 다루는 관리자 대시보드로 구성된다.",
          },
          image: {
            src: "/images/details/vintage-market/service-overview.png",
            width: 905,
            height: 761,
            alt: {
              en: "Vintage Market overview — product listings, real-time chat, and community screens",
              ko: "Vintage Market 서비스 개요 — 상품 거래·실시간 채팅·커뮤니티 화면",
            },
            caption: {
              en: "Core feature screens: product trading, real-time chat, and community",
              ko: "상품 거래·실시간 채팅·커뮤니티 등 주요 기능 화면",
            },
          },
        },
        {
          id: "architecture",
          level: 2,
          heading: { en: "System Architecture", ko: "시스템 아키텍처" },
          body: {
            en: "To mirror a real corporate environment, the core structure separates an external (DMZ), internal, and dev network. The backend sits across both the external and internal networks since it has to accept outside requests while talking to the internal database; the database itself is isolated on the internal network so it's reachable only through the backend, never directly from outside.\n\nInstead of reusing an aging dev server stuck on an old OS, we stood up a separate Linux-based dev server and automated source control through build and deploy with Gitea and Jenkins. The dev network (Gitea·Jenkins) is physically separated from the production network — this also standardized the whole team's dev environment and removed the errors that used to come from environment drift between members.",
            ko: "실제 기업 환경을 모사하기 위해 외부망(DMZ)·내부망·개발망을 분리하는 걸 핵심 구조로 삼았다. Backend는 외부 요청을 받는 동시에 내부망 DB와 통신해야 해서 두 망에 걸쳐 배치했고, Database는 외부에서 직접 접근할 수 없도록 내부망에 격리해 백엔드를 통해서만 접근하도록 구성했다.\n\n구형 OS로 묶여 있던 기존 개발 서버 대신 최신 Linux 기반 별도 개발 서버를 구성하고, Gitea·Jenkins로 형상관리부터 빌드·배포까지 자동화했다. 개발망(Gitea·Jenkins)은 서비스 운영망과 물리적으로 분리해, 팀 전체 개발 환경을 표준화하고 구성원 간 환경 차이로 발생하던 오류도 함께 제거했다.",
          },
          image: {
            src: "/images/details/vintage-market/network-architecture.png",
            width: 682,
            height: 487,
            alt: {
              en: "Network segmentation across external, internal, and dev networks",
              ko: "외부망·내부망·개발망 분리 구조와 자산 배치",
            },
            caption: {
              en: "Segmented network layout and asset placement",
              ko: "망 분리 네트워크 구성과 자산 배치",
            },
          },
        },
        {
          id: "tech-stack",
          level: 2,
          heading: { en: "Tech Stack & Purpose", ko: "기술 스택 및 사용 목적" },
          table: [
            {
              category: { en: "Backend", ko: "Backend" },
              tech: "Node.js, Express",
              purpose: {
                en: "Good fit for fast prototyping and async I/O-driven real-time chat",
                ko: "빠른 프로토타이핑과 비동기 I/O 기반의 실시간 채팅 구현에 유리",
              },
            },
            {
              category: { en: "Database", ko: "Database" },
              tech: "MySQL 8.0, Sequelize",
              purpose: {
                en: "Relational modeling with ORM productivity; raw queries mixed in where speed mattered, e.g. real-time chat",
                ko: "관계형 모델링과 ORM 생산성 확보. 실시간 채팅 등 처리 속도가 중요한 일부 구간은 Raw Query를 혼용",
              },
            },
            {
              category: { en: "Real-time", ko: "Real-time" },
              tech: "Socket.IO",
              purpose: {
                en: "Real-time communication during trades; polling-to-WebSocket auto-upgrade keeps connections stable behind Docker/proxies",
                ko: "거래 중 발생하는 실시간 커뮤니케이션. Polling→WebSocket 자동 업그레이드로 Docker/Proxy 환경에서도 안정적 연결 확보",
              },
            },
            {
              category: { en: "Infrastructure", ko: "Infrastructure" },
              tech: "Docker, Docker Compose",
              purpose: {
                en: "Standardized the team's dev environment and managed the complex network-segmentation setup as code (IaC)",
                ko: "팀 개발 환경 표준화 및 복잡한 망 분리 구조를 코드로 관리(IaC)",
              },
            },
            {
              category: { en: "CI/CD", ko: "CI/CD" },
              tech: "Jenkins, Gitea",
              purpose: {
                en: "Enterprise-style deploy pipeline experience; automated source control through build and deploy",
                ko: "엔터프라이즈급 배포 파이프라인 경험 및 형상 관리–빌드–배포 자동화",
              },
            },
            {
              category: { en: "Diagnostic Tools", ko: "진단 도구" },
              tech: "Burp Suite, Postman, MITRE ATT&CK, DFD/STRIDE",
              purpose: {
                en: "Web traffic analysis and manual diagnosis, plus threat modeling and scenario design",
                ko: "웹 트래픽 분석·수동 진단 및 위협 모델링·시나리오 설계",
              },
            },
          ],
        },
        {
          id: "dfd",
          level: 2,
          heading: { en: "Data Flow Diagram (DFD)", ko: "데이터 흐름도 (DFD)" },
          body: {
            en: "The DFD maps out data flow and how components connect, giving a visual read on potential attack paths and their blast radius, and served as the baseline for the STRIDE threat modeling that followed. For every segment — the user/entry layer, auth, product management, transactions/payment, community, messaging, admin, and the DB/file system — we catalogued the potential attack path (auth bypass, SQL injection, payment logic tampering, XSS/CSRF, WebSocket attacks, access-control bypass) and its blast radius (PII leakage, data tampering, financial loss, full system takeover).",
            ko: "시스템의 데이터 흐름과 구성 요소 간 연결 관계를 DFD로 도식화해, 잠재적 공격 경로와 영향 범위를 시각적으로 파악하고 이후 STRIDE 위협 모델링의 기준선으로 삼았다. 사용자·진입 계층부터 인증/인가, 상품 관리, 거래/결제, 커뮤니티, 메시지, 관리자, DB/파일 시스템까지 구간별로 잠재 공격 경로(인증 우회·SQL 인젝션·결제 로직 조작·XSS/CSRF·WebSocket 공격·권한 우회 등)와 영향 범위(개인정보 유출·데이터 변조·금전 피해·전체 시스템 제어 등)를 정리했다.",
          },
          image: {
            src: "/images/details/vintage-market/dfd.png",
            width: 602,
            height: 543,
            alt: {
              en: "Target web server DFD — user/admin requests flowing through each process to the DB/file system",
              ko: "대상 웹서버 DFD — 사용자·관리자 요청이 각 프로세스를 거쳐 DB/파일시스템에 도달하는 흐름",
            },
          },
        },
        {
          id: "features",
          level: 2,
          heading: { en: "Key Feature Implementation", ko: "핵심 기능 구현" },
        },
        {
          id: "feature-chat",
          level: 3,
          heading: { en: "Real-time chat and messaging", ko: "실시간 채팅 및 메시징" },
          body: {
            en: "Second-hand trading needs instant back-and-forth between buyer and seller. Socket.IO's bidirectional channel handles it — `server.js` processes socket events and persists messages to the database. A pure WebSocket connection can be unstable behind Docker networking and proxies, so we kept Socket.IO's fallback mechanism of starting on polling and auto-upgrading to WebSocket rather than forcing raw WebSocket.",
            ko: "중고 거래 특성상 구매자–판매자 간 즉각적인 소통이 필요했다. Socket.IO의 양방향 통신으로 이를 구현했고, server.js가 소켓 이벤트를 처리하며 메시지를 DB에 영구 저장한다. 순수 WebSocket은 Docker·프록시 환경에서 연결이 불안정해질 수 있어, Polling으로 시작해 자동으로 WebSocket으로 업그레이드하는 Socket.IO의 폴백 메커니즘을 그대로 살렸다.",
          },
        },
        {
          id: "feature-purchase",
          level: 3,
          heading: { en: "Purchase & payment logic", ko: "상품 구매 및 결제 로직" },
          body: {
            en: "Virtual-credit-based purchases needed handling. The `/:id/purchase` endpoint in `products.js` runs: look up the product → check it's still for sale and the buyer has enough credit → deduct/transfer credit → flip the `isSold` flag. The lack of a transaction or lock between that check and the deduction was a side effect of using Sequelize as the default ORM for productivity while mixing in raw queries where speed mattered — and the later black-box diagnosis confirmed it as the root cause of a race-condition vulnerability (see Attack Scenarios below).",
            ko: "가상 크레딧 기반의 상품 거래를 처리해야 했다. products.js의 /:id/purchase 엔드포인트에서 상품 조회 → 판매 여부·크레딧 확인 → 크레딧 차감/이전 → isSold 업데이트 순으로 처리한다. 이 확인과 차감 사이에 트랜잭션이나 잠금이 없다는 점은 관계형 모델링과 ORM 생산성을 위해 Sequelize를 기본으로 쓰되 처리 속도가 중요한 구간엔 Raw Query를 혼용한 결과였고, 이후 블랙박스 진단에서 Race Condition 취약점의 원인으로 확인됐다(아래 공격 시나리오 참고).",
          },
        },
        {
          id: "decisions",
          level: 2,
          heading: { en: "Technical Decisions", ko: "기술적 의사결정" },
        },
        {
          id: "decision-jwt",
          level: 3,
          heading: { en: "Authentication: JWT vs. session", ko: "인증 방식: JWT vs Session" },
          body: {
            en: "Between session-based auth (server-side state, more secure but harder to scale) and JWT (stateless, more scalable but riskier if stolen), we went with JWT — weighing future microservice scalability and simpler client-side state handling.",
            ko: "세션(서버 상태 관리, 보안성은 높지만 확장성은 낮음)과 JWT(무상태, 확장성은 높지만 탈취 위험) 사이에서, 이후 마이크로서비스로 확장할 가능성과 클라이언트 측 상태 관리 편의성을 고려해 JWT를 선택했다.",
          },
        },
        {
          id: "decision-ws",
          level: 3,
          heading: { en: "Real-time transport: WebSocket vs. polling", ko: "실시간 통신: WebSocket vs Polling" },
          body: {
            en: "Between raw WebSocket (lower overhead) and long polling (more compatible, more resource-hungry), we picked Socket.IO's auto-fallback — starting on polling and upgrading to WebSocket — since a pure WebSocket connection can be unreliable behind Docker networking and proxies.",
            ko: "WebSocket(오버헤드 낮음)과 Long Polling(호환성 높음, 리소스 소모 큼) 사이에서, Docker·프록시 환경에서 순수 WebSocket 연결이 불안정할 수 있어 Polling으로 시작해 WebSocket으로 업그레이드하는 Socket.IO의 Auto-fallback을 선택했다.",
          },
        },
        {
          id: "assessment",
          level: 2,
          heading: { en: "Vulnerability Assessment", ko: "보안 진단 결과" },
          body: {
            en: "The black-box diagnosis confirmed the following weaknesses actually held up: SQL injection (chat-message insert query — fix: parameter binding/ORM query builder), a race condition (payment credit deduction — fix: transactions/atomic UPDATE), SSTI/RCE (community post rendering — fix: block dynamic evaluation of user input), broken authentication (the JWT-verification middleware only called `jwt.decode` — fix: enforce `jwt.verify`), broken access control/IDOR (transaction history lookup — fix: add ownership checks), and weak password storage (unsalted MD5 — fix: bcrypt/argon2 with a salt). Risk ratings (DREAD) and the ATT&CK mapping for each are in the separate report; the three attack chains we actually carried out and evidenced are covered next.",
            ko: "블랙박스 진단으로 다음 취약점이 실제로 성립함을 확인했다 — SQL Injection(채팅 메시지 저장 쿼리, 파라미터 바인딩·ORM 쿼리 빌더로 개선), Race Condition(결제 크레딧 차감 로직, 트랜잭션·원자적 UPDATE로 개선), SSTI·RCE(게시글 콘텐츠 렌더링, 사용자 입력 동적 평가 차단으로 개선), Broken Authentication(JWT 검증 미들웨어가 jwt.decode만 사용, jwt.verify 강제로 개선), Broken Access Control·IDOR(거래 내역 조회, 소유권 검증 추가로 개선), 취약한 비밀번호 저장(솔트 없는 MD5, bcrypt·argon2+솔트로 개선). 각 항목의 위험도(DREAD)와 ATT&CK 매핑은 별도 보고서에 정리했고, 그중 직접 수행하고 증거를 남긴 세 갈래 공격 흐름은 아래에 정리했다.",
          },
        },
        {
          id: "attack-scenarios",
          level: 2,
          heading: { en: "Attack Scenarios & Evidence", ko: "공격 시나리오 및 증거" },
          body: {
            en: "Threats identified through STRIDE and MITRE ATT&CK analysis were actually reproduced, each tagged with an evidence ID (E-xx/S-xx) and logged.",
            ko: "STRIDE·MITRE ATT&CK 분석으로 도출한 위협을 실제로 재현해 증거 ID(E-xx/S-xx)를 부여하고 결과를 기록했다.",
          },
        },
        {
          id: "e-01",
          level: 3,
          heading: { en: "E-01 · T1641 — A race condition breaks payment integrity", ko: "E-01 · T1641 — Race Condition으로 결제 로직 무결성 손상" },
          body: {
            en: "A ReDoS-style input (a `010-111111111111…!` pattern) stalled the server for 5–10 seconds; two purchase requests (₩13,000 and ₩83,000) were fired into that window. Both were approved out of a ₩100,000 balance, but only ₩13,000 was actually deducted — a ₩83,000 gain with no valid transaction behind it. Maps to MITRE ATT&CK Impact/Data Manipulation (T1641).",
            ko: "ReDoS성 입력(`010-111111111111…!` 패턴)으로 서버 처리를 5~10초 지연시킨 뒤, 그 지연 구간에 13,000원·83,000원 상품 구매 요청을 동시에 전송했다. 보유 크레딧 100,000원 중 두 상품(합계 96,000원)이 모두 구매 승인됐지만 실제 차감은 13,000원만 반영돼, 83,000원 상당의 부당 이득이 성립함을 확인했다. MITRE ATT&CK Impact/Data Manipulation(T1641)에 해당한다.",
          },
        },
        {
          id: "e-02",
          level: 3,
          heading: { en: "E-02 · T1505/T1041 — SQL injection exfiltrates the customer DB", ko: "E-02 · T1505/T1041 — SQL Injection으로 고객 DB 탈취" },
          body: {
            en: "A chat-message insert point that concatenated unvalidated input into the query string was exploited with UPDATE-based blind SQL injection. After confirming the DB name (`vintagemarket`), the MySQL version, and the connecting account, we reached 11 tables including `users`, `transactions`, and `products` — extracting personal data (email, phone, address, card number, national ID) and even the admin account's password hash. Maps to MITRE ATT&CK Credential Access/Exfiltration (T1505, T1041).",
            ko: "채팅 메시지 입력값이 검증 없이 쿼리 문자열에 결합되는 지점을 이용해 UPDATE 기반 Blind SQL Injection을 수행했다. DB명(`vintagemarket`)과 MySQL 버전, 접속 계정을 확인한 뒤 `users`·`transactions`·`products` 등 11개 테이블에 접근했고, 사용자 개인정보(이메일·전화번호·주소·카드번호·주민등록번호)와 관리자 계정 해시 비밀번호까지 추출했다. MITRE ATT&CK Credential Access/Exfiltration(T1505, T1041)에 해당한다.",
          },
        },
        {
          id: "e-03",
          level: 3,
          heading: { en: "E-03 · T1068 — SSTI and file upload lead to RCE", ko: "E-03 · T1068 — SSTI·파일 업로드로 RCE 확보" },
          body: {
            en: "A community post's server-side dynamic-evaluation point took an SSTI payload that ran `whoami`/`id`, confirming code execution. Following that, a double-extension filename (`webshell.txt.php`) bypassed the upload's extension check and planted a web shell, handing over remote command execution. Maps to MITRE ATT&CK Privilege Escalation/Initial Access (T1068), and became the foothold for the next stage (S-01/S-02).",
            ko: "게시글 작성 시 서버가 사용자 입력을 동적 평가하는 지점에 SSTI 페이로드를 삽입해 `whoami`/`id` 명령 실행을 확인했고, 이어 이중 확장자(`webshell.txt.php`)로 업로드 확장자 검증을 우회해 웹셸을 심어 원격 명령 실행 권한을 얻었다. MITRE ATT&CK Privilege Escalation/Initial Access(T1068)에 해당하며, 다음 단계 침투(S-01·S-02)의 발판이 됐다.",
          },
        },
        {
          id: "s-01-02",
          level: 3,
          heading: { en: "S-01·S-02 · T1110/T1098 — Privilege escalation to supply-chain compromise", ko: "S-01·S-02 · T1110/T1098 — 권한 상승과 공급망까지 이어진 후속 침투" },
          body: {
            en: "The shell from E-03 only had regular-user privileges, but its sudo version was vulnerable to CVE-2021-3156 (Baron Samedit); a public PoC got us root (S-01). From there, we spoofed the compromised web server as the gateway (ARP spoofing) to intercept a developer's traffic, sniffed plaintext HTTP credentials for phpMyAdmin and Gitea, and planted a reverse-shell backdoor in the Gitea source repository (S-02) — so that the next time a developer tested that code locally, it would auto-connect back to an attacker-controlled C2. Starting from a single web-server RCE, the full chain reached root, the DB admin console, and the source repo/deploy pipeline.",
            ko: "E-03에서 얻은 셸이 일반 권한이라, sudo 버전이 CVE-2021-3156(Baron Samedit)에 취약함을 확인하고 공개 PoC로 root 권한을 획득했다(S-01). 이어 장악한 웹서버를 게이트웨이로 위장(ARP Spoofing)해 개발자 PC의 트래픽을 가로챘고, phpMyAdmin·Gitea 접속 시 평문 HTTP로 오가는 로그인 정보를 스니핑한 뒤 Gitea 소스 저장소에 리버스 셸 백도어 코드를 삽입했다(S-02). 개발자가 로컬에서 그 코드를 테스트하면 공격자 C2로 자동 연결되는 구조까지 성립함을 확인했다. 웹서버 RCE 하나로 시작해 root 권한 → DB 관리 콘솔 → 소스 저장소·배포 파이프라인까지 이어지는 전체 침투 체인이 성립함을 실증했다.",
          },
        },
        {
          id: "troubleshooting",
          level: 2,
          heading: { en: "Troubleshooting", ko: "트러블슈팅" },
        },
        {
          id: "trouble-chat-room",
          level: 3,
          heading: { en: "Chat room identifier bug mixed up conversations", ko: "채팅방 식별자 설계 오류로 인한 대화 혼선" },
          body: {
            en: "Different users chatting about the same product would see their conversations blend together. The cause: the socket room key was the product's `productId`, not a unique room ID — so every conversation about the same product landed in one socket room. We split the room identifier out to the actual chat room's primary key (`room_id`) on both `server.js`'s `joinRoom`/`sendMessage` handlers and the frontend, isolating real-time messaging per conversation instead of per product.",
            ko: "서로 다른 사용자가 같은 상품을 두고 채팅을 시작하면 대화 내용이 뒤섞이는 현상이 있었다. 원인은 소켓 룸 식별자로 채팅방 고유 ID가 아닌 productId를 그대로 썼기 때문 — 같은 상품을 두고 오가는 서로 다른 대화가 하나의 소켓 룸에 묶인 것이다. server.js의 joinRoom/sendMessage 이벤트와 프론트엔드 양쪽에서 room 식별자를 실제 채팅방 PK(room_id)로 분리해, 상품 단위가 아닌 대화 단위로 격리된 실시간 통신 구조를 만들었다.",
          },
        },
        {
          id: "trouble-fk",
          level: 3,
          heading: { en: "Foreign-key violation on product deletion", ko: "상품 삭제 시 FK 제약조건 위반" },
          body: {
            en: "Deleting a product with chat history failed on a foreign-key constraint, because the delete tried to remove the product row while its chat rooms and messages still referenced it. We wrapped the deletion in a `sequelize.transaction` that removes the dependent rows first (messages, then the room) before the product itself, rolling back the whole thing on any failure in between — keeping referential integrity intact while fixing the delete.",
            ko: "채팅 이력이 있는 상품을 삭제하면 DB 외래키 제약조건 위반으로 삭제가 실패했다. 그 상품을 참조하는 채팅방·채팅 메시지 레코드가 남아있는 상태에서 상품 레코드만 바로 지우려 했기 때문이다. sequelize.transaction으로 묶어 하위 데이터(채팅 메시지 → 채팅방)를 먼저 삭제한 뒤 상품을 삭제하도록 순서를 바꾸고, 중간에 실패하면 전체가 롤백되도록 처리해 연관 데이터 무결성을 지키면서 삭제 기능을 정상화했다.",
          },
        },
        {
          id: "retrospective",
          level: 2,
          heading: { en: "Retrospective", ko: "회고" },
          body: {
            en: "Security gaps don't only come from careless mistakes — missing network segmentation or an undesigned transaction boundary can cause just as much damage. We only verified three core scenarios end-to-end this time; next round I'd like to extend verification to the remaining STRIDE-derived threats and back the recommendations with concrete code-level fixes.",
            ko: "보안 약점은 단순 실수뿐 아니라 망 분리 부재나 트랜잭션 미설계 같은 아키텍처 단계의 미흡함에서도 나온다는 걸 체감했다. 이번엔 핵심 시나리오 3가지만 직접 검증했는데, 다음엔 STRIDE로 도출한 나머지 위협까지 검증 범위를 넓히고 코드 레벨 조치안까지 제시하고 싶다.",
          },
        },
      ],
    },
    highlights: {
      en: [
        "Built the service in React & Node.js (team of 4)",
        "Segmented network (external / internal / dev) with Gitea + Jenkins CI/CD",
        "Threat modeling with DFD/STRIDE and MITRE ATT&CK",
        "Demonstrated SQL injection bypassing login auth and leaking member data; recommended parameter binding & input validation",
      ],
      ko: [
        "React·Node.js로 서비스 직접 구현 (4인)",
        "외부·내부·개발망 분리 + Gitea·Jenkins CI/CD 구축",
        "DFD/STRIDE·MITRE ATT&CK로 위협 모델링",
        "로그인 SQL Injection으로 인증 우회·회원정보 유출 실증 → 파라미터 바인딩·입력 검증 권고",
      ],
    },
  },
  {
    number: "02",
    title: "Secure Workspace",
    category: "Backend / Cloud",
    image: "/images/img_secWork4.png",
    imageFit: "contain",
    tools: [
      "FastAPI",
      "RBAC / JWT",
      "AWS EKS · RDS · DynamoDB · S3",
      "Terraform",
      "GitHub Actions",
    ],
    github: "https://github.com/jeshin119/secure-workspace-platform",
    tagline: {
      en: "Access-control & supply-chain security for a sensitive-data collaboration service.",
      ko: "민감정보 협업 서비스의 접근 통제·공급망 보안을 설계한 프로젝트.",
    },
    detail: {
      meta: {
        period: "2025.07.16 – 2025.08.04",
        team: { en: "Team of 5", ko: "5인" },
        role: {
          en: "Owned API/DB design, the FastAPI backend, and CI/CD & supply-chain security configuration",
          ko: "API·데이터베이스 설계, FastAPI 기반 백엔드 개발, CI/CD 및 공급망 보안 구성",
        },
        links: [
          {
            label: { en: "Slides", ko: "발표 자료" },
            url: "https://docs.google.com/presentation/d/1Y68Nl7-sIHdGcVJPiSEuLomG6lRROikoTd2ujOXB9bc/edit?usp=sharing",
          },
          {
            label: { en: "API Docs (Postman)", ko: "API 명세 (Postman)" },
            url: "https://documenter.getpostman.com/view/46454605/2sB3B7NDYM",
          },
          {
            label: { en: "Figma", ko: "화면 기획 (Figma)" },
            url: "https://www.figma.com/design/ynWWgfetCF9Z4kNvp9UsgJ/aws-%EB%B3%B4%EC%95%88-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-2%EC%B0%A8?node-id=0-1&t=B4JgkOdj2m98knfl-1",
          },
          {
            label: { en: "ERD", ko: "ERD" },
            url: "https://www.erdcloud.com/d/esyuuB6DMhpTR7oED",
          },
        ],
      },
      blocks: [
        {
          id: "background",
          level: 2,
          heading: { en: "Background & Goal", ko: "프로젝트 배경 및 목적" },
          body: {
            en: "Existing chat-based collaboration tools are strong on real-time convenience — channel-level permissions, web integrations — but weak on security management. Most only control permissions per channel, with no per-role settings, contractor expiry dates, or approval workflows, and no way to precisely restrict shared files or access windows — a real leak risk for organizations handling sensitive data.\n\nWe addressed this with multi-dimensional access control built into the service itself: per-role restrictions, public/private-with-approval channels, time-based access windows, and per-file permissions. Security scanning was folded directly into the CI/CD pipeline to auto-detect vulnerabilities before deploy, and the AWS security configuration itself was codified so the same policy applies consistently across the infrastructure, with a clear change history.",
            ko: "기존 채팅 기반 협업 서비스는 채널별 권한 제한, 웹 연동 등 실시간 협업 편의성에는 강점이 있지만 보안 관리 요소는 약했다. 대부분 채널 단위로만 권한을 제어할 뿐 직급별 세부 설정, 파견직 만료일 관리, 관리자 승인 체계가 없고, 공유 파일이나 접근 시간을 정밀하게 제한할 수 없어 중요 자산 유출 위험이 있었다.\n\n이 문제를, 직급별 접근 제한·공개/비공개 승인제·시간 기반 접근 제한·파일별 개별 권한을 서비스에 내재화하는 다차원 접근 통제로 풀었다. 보안 점검을 CI/CD 파이프라인에 통합해 배포 전 취약점을 자동 검출하고, AWS 보안 설정 자체를 코드화해 인프라 전체에 일관된 정책과 변경 이력을 남겼다.",
          },
        },
        {
          id: "architecture",
          level: 2,
          heading: { en: "System Architecture", ko: "시스템 아키텍처" },
          body: {
            en: "Storage is split three ways: chat on DynamoDB, files on S3, relational data on RDS. Chat's access pattern — partition by `channel_id`, sort by `timestamp` — fits DynamoDB's NoSQL model well, while data with a fixed, relationally complex shape (users, roles, file permissions) stayed on RDS (MySQL). A VPC isolates the network from outside threats, EKS runs the container workloads, and ECR stores the deploy images. The whole footprint — VPC, EKS, IAM — is codified in Terraform, giving both deploy stability and a clear change history.",
            ko: "채팅은 DynamoDB, 파일은 S3, 관계형 데이터는 RDS로 저장소를 나눴다. 실시간 채팅은 channel_id를 파티션 키, timestamp를 정렬 키로 쓰는 NoSQL 조회 패턴이 잘 맞아 DynamoDB를 택했고, 사용자·직급·파일 권한처럼 구조가 고정적이고 관계가 복잡한 데이터는 RDS(MySQL)로 남겼다. VPC로 독립된 네트워크 공간을 분리해 외부 위협을 차단하고, EKS로 컨테이너 런타임을, ECR로 배포 이미지를 관리한다. 인프라 전체(VPC·EKS·IAM 등)는 Terraform으로 코드화해 배포 안정성과 변경 이력 추적을 함께 확보했다.",
          },
          image: {
            src: "/images/details/secure-workspace/architecture.png",
            width: 755,
            height: 447,
            alt: { en: "Secure Workspace system architecture", ko: "Secure Workspace 시스템 아키텍처" },
          },
        },
        {
          id: "tech-stack",
          level: 2,
          heading: { en: "Tech Stack & Purpose", ko: "기술 스택 및 사용 목적" },
          table: [
            {
              category: { en: "Screen Planning", ko: "화면 기획" },
              tech: "Figma",
              purpose: {
                en: "Visualized the user-centered workflow and planned the screen structure.",
                ko: "사용자 중심의 업무 프로세스를 시각화하고 화면 구조를 기획함.",
              },
            },
            {
              category: { en: "Cloud / Infrastructure", ko: "클라우드 / 인프라" },
              tech: "AWS VPC, EKS, ECR",
              purpose: {
                en: "VPC: isolates a private network space to block outside threats.\nEKS: deploys a stable Kubernetes cluster and manages the container runtime.\nECR: securely stores the Docker images used for deployment.",
                ko: "VPC: 독립된 네트워크 공간을 분리하여 외부 위협을 차단함.\nEKS: 안정적인 쿠버네티스 클러스터 환경을 배포하고 컨테이너 런타임을 관리함.\nECR: 배포를 위한 도커 이미지를 안전하게 보관하는 저장소로 활용함.",
              },
            },
            {
              category: { en: "Database / Storage", ko: "데이터베이스 / 스토리지" },
              tech: "RDS, DynamoDB, S3",
              purpose: {
                en: "RDS (MySQL): structures and stores relational data — user info, role-based permissions, approvals.\nDynamoDB: NoSQL for fast, high-volume per-channel chat history.\nS3: manages large shared files; a private bucket policy plus backend-mediated access keeps file URLs from ever being exposed directly.",
                ko: "RDS(MySQL): 사용자 정보, 직급별 권한, 결재 승인 등 관계형 데이터를 구조화하여 저장함.\nDynamoDB: 채널별 대용량 실시간 채팅 기록을 고속으로 처리하기 위해 NoSQL 구조를 채택함.\nS3: 협업 시 공유되는 대용량 파일을 관리하며, 버킷 비공개 정책과 백엔드 경유 접근으로 파일 주소 직접 노출을 차단함.",
              },
            },
            {
              category: { en: "Backend / Auth", ko: "백엔드 / 인증" },
              tech: "FastAPI, JWT, RBAC",
              purpose: {
                en: "FastAPI: async processing handles real-time chat and post data requests quickly.\nJWT / RBAC: token-based auth plus fine-grained per-role/per-file access control.",
                ko: "FastAPI: 비동기 처리를 통해 실시간 채팅 및 게시글 데이터 요청을 빠르게 처리함.\nJWT / RBAC: 토큰 기반 인증을 수행하고 직급별·파일별 세부 접근 제어를 구현함.",
              },
            },
            {
              category: { en: "CI/CD / Infra-as-Code", ko: "CI/CD / 인프라 코드화" },
              tech: "Terraform, GitHub Actions",
              purpose: {
                en: "Terraform: codifies and manages AWS infrastructure and security policy.\nGitHub Actions: an automated pipeline including pre-deploy vulnerability scanning.",
                ko: "Terraform: AWS 인프라 및 보안 정책을 코드화하여 관리함.\nGitHub Actions: 배포 전 취약점 스캔을 포함한 자동화 파이프라인을 구축함.",
              },
            },
            {
              category: { en: "Security / Monitoring", ko: "보안 / 모니터링 관리" },
              tech: "IAM, CloudWatch, GuardDuty, CloudTrail, KMS",
              purpose: {
                en: "IAM: controls access permissions between services.\nCloudWatch: infra performance monitoring and anomaly alerts.\nGuardDuty: detects intelligent threats within the infrastructure.\nCloudTrail: logs every API call in the system for full transparency.\nKMS: centrally manages data and image-signing keys.",
                ko: "IAM: 서비스 간 접근 권한을 제어함.\nCloudWatch: 인프라 성능 모니터링 및 이상 징후 알림을 설정함.\nGuardDuty: 인프라 내 지능형 위협을 탐지함.\nCloudTrail: 시스템 내 모든 API 호출 이력을 기록하여 투명성을 확보함.\nKMS: 데이터 및 이미지 서명 키를 통합 관리함.",
              },
            },
          ],
        },
        {
          id: "rbac",
          level: 2,
          heading: { en: "Multi-dimensional RBAC Database Design", ko: "다차원 RBAC 데이터베이스 설계" },
          body: {
            en: "Beyond plain channel-level control, the schema handles per-role settings, contractor expiry dates, and per-channel independent admin assignment across 10 tables. Time-based access windows and per-file permissions live in dedicated mapping tables.",
            ko: "기존 채널 단위 통제를 넘어, 직급별 세부 설정·파견직 만료일 관리·채널별 독립적 관리자 지정을 처리할 수 있는 관계형 데이터베이스 구조를 10개 테이블로 설계했다. 시간 기반 접근 제한 정보와 파일마다 개별 권한을 설정할 수 있는 매핑 테이블도 함께 구조화했다.",
          },
          image: {
            src: "/images/details/secure-workspace/erd.png",
            width: 1600,
            height: 639,
            alt: { en: "ERD — 10 tables modeling users, roles, workspaces, channels, files, and message permissions", ko: "10개 테이블로 구성한 ERD — 사용자·직급·워크스페이스·채널·파일·메시지 권한 관계" },
          },
        },
        {
          id: "roles-schema",
          level: 3,
          heading: { en: "Role & contractor schema", ko: "직급·파견직 권한 스키마" },
          body: {
            en: "The `roles`/`workspace_members` schema differentiates access by role level plus contractor status and expiry date (`is_contractor`, `expires_at`).",
            ko: "roles·workspace_members 스키마가 직급(level)과 파견직 여부·만료일(is_contractor·expires_at) 조건으로 접근을 차등 제어한다.",
          },
          image: {
            src: "/images/details/secure-workspace/workspace-permission.png",
            width: 1280,
            height: 499,
            alt: { en: "Workspace permission model — role level and contractor expiry gating access", ko: "워크스페이스 권한 모델 — 직급(level)과 파견직(is_contractor·만료일) 조건으로 접근을 차등 제어" },
          },
        },
        {
          id: "auth",
          level: 2,
          heading: { en: "Authentication & Security Features", ko: "인증과 보안 기능" },
          body: {
            en: "A successful login issues a JWT, and every subsequent request runs through middleware that verifies the token and injects the user context. Passwords are bcrypt-hashed via passlib's `CryptContext`. User input like signup fields goes through a `sanitize_input` function — HTML entity escaping, stripping `<script>` tags and `on*` event handlers — before it's stored or displayed, to prevent stored XSS.",
            ko: "로그인 성공 시 JWT를 발급하고, 이후 요청마다 미들웨어가 토큰을 검증해 사용자 정보를 컨텍스트에 주입한다. 비밀번호는 passlib의 CryptContext로 bcrypt 해싱해 저장한다. 회원가입 등 사용자 입력은 저장·표시 전에 HTML 엔티티 이스케이프, <script> 태그·on* 이벤트 핸들러 제거를 수행하는 sanitize_input 함수로 저장형 XSS를 예방한다.",
          },
          image: {
            src: "/images/details/secure-workspace/auth-security.png",
            width: 1280,
            height: 499,
            alt: { en: "Signup/login screens and auth security — bcrypt hashing, input sanitization", ko: "회원가입·로그인 화면과 인증 보안 — bcrypt 비밀번호 해싱, 입력값 Sanitization(XSS 방지) 적용" },
          },
        },
        {
          id: "chat-storage",
          level: 2,
          heading: { en: "Real-time Chat on DynamoDB", ko: "DynamoDB 기반 실시간 채팅" },
          body: {
            en: "NoSQL was chosen for chat to keep it fast and flexible. `channel_id` is the partition key and `timestamp` the sort key, which separates each channel's history and keeps lookups fast.",
            ko: "실시간 채팅의 속도와 유연성을 위해 NoSQL을 채택했다. 채널 아이디(channel_id)를 파티션 키, 타임스탬프(timestamp)를 정렬 키로 구성해 채널별 채팅 기록을 분리하고 고속으로 조회한다.",
          },
          image: {
            src: "/images/details/secure-workspace/chat-dynamodb.png",
            width: 1280,
            height: 491,
            alt: { en: "Real-time chat screen and its DynamoDB storage layout", ko: "실시간 채팅 화면과 DynamoDB 저장 구조" },
          },
        },
        {
          id: "file-storage",
          level: 2,
          heading: { en: "File Management on S3", ko: "S3 기반 파일 관리" },
          body: {
            en: "The backend integrates with AWS S3 via Python's boto3. S3 objects sit under a private bucket policy and the client never sees the address directly. On a download request, the backend verifies role/validity-period permission, then streams the object back via `StreamingResponse` after fetching it with `get_object` — only an authorized user ever gets the file.",
            ko: "파이썬 boto3로 백엔드와 AWS S3를 연동했다. S3 객체는 버킷 비공개 정책 아래 보관하고 클라이언트에 주소를 직접 노출하지 않는다. 다운로드 요청 시 백엔드가 직급·유효기간 권한을 검증한 뒤 get_object로 받은 파일을 스트리밍(StreamingResponse)으로 전달해, 인가된 사용자만 파일을 받을 수 있다.",
          },
          image: {
            src: "/images/details/secure-workspace/file-s3.png",
            width: 1280,
            height: 491,
            alt: { en: "File upload/download screen backed by S3", ko: "파일 업로드·다운로드 화면과 S3 연동" },
          },
        },
        {
          id: "supply-chain",
          level: 2,
          heading: { en: "EKS Infra-as-Code & Supply-chain Security", ko: "EKS 인프라 코드화와 공급망 보안" },
          body: {
            en: "Terraform codifies the whole cloud footprint — VPC separation, the EKS cluster, IAM role assignment. GitHub Actions runs Trivy (image CVE scanning) and a static-analysis code audit (CWE detection) before deploy, with scan artifacts hashed (sha512sum) per file for integrity. Containers run as non-root with a minimal command/directory whitelist, and a Seccomp profile restricts available syscalls. On top of that, images pushed to ECR are signed with an AWS KMS asymmetric key via Cosign, and Connaisseur verifies that signature right before deploy — so a tampered image simply can't ship.",
            ko: "Terraform으로 VPC 분리·EKS 클러스터 구성·IAM 권한 할당 등 클라우드 인프라 전체를 코드화했다. GitHub Actions에 Trivy(이미지 CVE 스캔)와 Code Audit(정적 분석 기반 CWE 탐지)을 통합해 배포 전 결함을 걸러내고, 검사 산출물은 파일 단위 해시(sha512sum)로 무결성을 확보했다. 컨테이너는 비-root 계정으로 실행하고 명령어·디렉토리 권한을 화이트리스트로 최소화했으며 Seccomp 프로파일로 사용 가능한 시스템콜을 제한했다. 여기에 AWS KMS 비대칭 키와 Cosign으로 ECR 이미지를 서명하고 배포 직전 Connaisseur로 서명을 검증해, 변조된 이미지의 배포 자체를 차단했다.",
          },
        },
        {
          id: "websocket-reliability",
          level: 2,
          heading: { en: "WebSocket Connection Reliability Design", ko: "WebSocket 연결 안정성 설계" },
          body: {
            en: "Keeping real-time chat reliable meant handling three separate failure modes: server shutdown, malformed messages, and reconnection.",
            ko: "실시간 채팅을 안정적으로 유지하기 위해 서버 종료·비정상 메시지·재연결이라는 세 가지 실패 모드를 각각 다뤘다.",
          },
        },
        {
          id: "graceful-shutdown",
          level: 3,
          heading: { en: "The event loop wouldn't exit on shutdown signals", ko: "종료 시그널 중 이벤트 루프가 안 빠져나오던 문제" },
          body: {
            en: "Sending SIGINT/SIGTERM while a WebSocket connection was open didn't shut the server down — the active socket loop kept holding the event loop. A shutdown handler existed, but nothing tied it to actually closing open WebSocket connections. We rebuilt the signal handler in `ServerShutdownManager` into a graceful sequence: close every WebSocket connection, close DB connections, then restore the original handler — and registered a second, forceful handler that kills the process immediately on a repeat signal, so the server always comes down. Container redeploys and rollouts no longer hang just because a chat session was open.",
            ko: "WebSocket 연결이 열려 있는 상태에서 SIGINT/SIGTERM을 보내도 활성 소켓 루프가 이벤트 루프를 점유해 서버가 즉시 종료되지 않았다. 종료 핸들러는 있었지만 열린 WebSocket 연결을 정리하는 로직이 종료 흐름과 연결돼 있지 않았던 것. ServerShutdownManager에 시그널 핸들러를 정비해 (1) 모든 WebSocket 연결 정리 → (2) DB 연결 정리 → (3) 원본 핸들러 복원 순서의 graceful shutdown을 구성했고, 첫 신호 이후 한 번 더 신호가 들어오면 즉시 프로세스를 종료하는 강제 종료 핸들러를 이중으로 등록해 어떤 상황에서도 서버가 확실히 내려가도록 했다. 그 결과 실시간 채팅 세션이 열려 있어도 컨테이너 재배포·롤아웃 시 프로세스가 멈춰 있는 문제가 사라졌다.",
          },
        },
        {
          id: "session-isolation",
          level: 3,
          heading: { en: "Isolating sessions when malformed messages pile up", ko: "잘못된 메시지 누적 시 세션 격리" },
          body: {
            en: "When a client repeatedly sent malformed JSON or unprocessable messages, there was no accumulation guard in the message loop, so exceptions kept hitting the session directly. We added an error counter to the WebSocket endpoint — reset on a valid message, and once bad messages cross a threshold, the connection closes with the appropriate close code (1007/1011). Serious exceptions (`ValueError`, `TypeError`) close the connection immediately instead. One misbehaving client can no longer affect the rest of the chat system.",
            ko: "클라이언트가 JSON 파싱에 실패하거나 처리할 수 없는 메시지를 반복 전송하면, 메시지 처리 루프에 오류 누적 방어 로직이 없어 예외가 그대로 세션에 영향을 줬다. WebSocket 엔드포인트에 에러 카운터를 도입해 정상 메시지 처리 시 초기화하고, 잘못된 메시지가 허용 횟수를 넘으면 해당 연결을 적절한 close code(1007/1011)로 종료하도록 했다. ValueError·TypeError 같은 심각한 예외는 즉시 연결을 끊도록 구분해, 비정상 클라이언트 하나가 전체 채팅 처리에 영향을 주지 못하도록 격리했다.",
          },
        },
        {
          id: "reconnect-dedup",
          level: 3,
          heading: { en: "Preventing duplicate connections on reconnect", ko: "채널 전환·재연결 시 중복 연결 방지" },
          body: {
            en: "Rapid channel switches or a network drop-and-recover could create a new connection before the old one fully closed, producing duplicate sockets. The root cause was insufficient `readyState` checking before opening a new connection; we tightened it to skip reconnection when the socket is already `OPEN` or `CONNECTING`, and now also check the current channel context and attempt count (`MAX_RECONNECT_ATTEMPTS`) as part of the reconnect condition.",
            ko: "채널을 빠르게 전환하거나 네트워크가 끊겼다 복구되면, 기존 연결이 닫히기 전에 새 연결이 생성돼 중복 소켓이 발생했다. 연결 생성 전 소켓 상태(readyState)를 충분히 확인하지 않았던 게 원인이라, 이미 OPEN이거나 CONNECTING 상태면 재연결을 건너뛰도록 상태 체크를 강화하고 재연결 조건에 채널 컨텍스트와 시도 횟수(MAX_RECONNECT_ATTEMPTS)를 함께 확인하도록 정비했다.",
          },
        },
        {
          id: "troubleshooting",
          level: 2,
          heading: { en: "Troubleshooting", ko: "트러블슈팅" },
        },
        {
          id: "history-load-order",
          level: 3,
          heading: { en: "Chat history load order and scroll position", ko: "채팅 히스토리 로딩 기준과 스크롤 위치 문제" },
          body: {
            en: "History loaded in ascending order from a user's join time, so channels joined long ago wouldn't show recent messages first, and the scroll stayed pinned at the top. We added `get_latest_messages`, which uses DynamoDB Query's `ScanIndexForward=False` to fetch the most recent 50 first and re-sorts them chronologically for display, plus pinning the initial scroll position to the bottom. New messages now auto-scroll to bottom only if the user hasn't scrolled up manually — the usual messenger UX.",
            ko: "채널 입장 시 채팅 기록을 '가입 시점 이후' 오름차순으로 불러와서, 오래 전에 가입한 채널에서는 최근 대화가 바로 보이지 않고 스크롤도 최상단에 머물렀다. DynamoDB Query의 ScanIndexForward=False 옵션으로 가장 최근 50개를 먼저 조회한 뒤 화면 표시용으로 시간순 재정렬하는 get_latest_messages를 추가하고, 초기 로딩 시 스크롤을 최하단으로 고정했다. 이후 사용자가 스크롤을 위로 올리지 않은 경우에만 새 메시지 도착 시 자동으로 최하단을 유지하도록 처리해, 일반적인 메신저 UX를 확보했다.",
          },
        },
        {
          id: "infinite-scroll-dup",
          level: 3,
          heading: { en: "Duplicate requests on infinite-scroll history", ko: "과거 메시지 무한스크롤의 중복 요청" },
          body: {
            en: "Scrolling up to load older messages fired a burst of scroll events, each triggering the same fetch. The listener was registered more than once and there was no in-flight check; we cleaned up the listener registration to run once, and added debouncing plus a loading flag so a new request can't fire before the previous one finishes.",
            ko: "위로 스크롤해 과거 메시지를 불러올 때 스크롤 이벤트가 연속으로 발생하며 동일한 요청이 여러 번 중복 호출됐다. 리스너가 중복 등록돼 있었고 요청 진행 상태를 확인하지 않은 게 원인이라, 리스너를 한 번만 등록하도록 정리하고 디바운싱과 로딩 상태 플래그를 도입해 이전 요청이 끝나기 전에는 새 요청이 나가지 않도록 했다.",
          },
        },
        {
          id: "retrospective",
          level: 2,
          heading: { en: "Retrospective", ko: "회고" },
          body: {
            en: "Storing the JWT in `localStorage` leaves it exposed to theft if XSS ever occurs, and re-verifying role/contractor status on every file download means permission changes take effect instantly at the cost of backend load under heavier traffic. Next time I'd look at HttpOnly cookie storage, and a hybrid with short-lived pre-signed URLs that still check permission at issuance.",
            ko: "JWT를 localStorage에 저장해 XSS 발생 시 토큰이 탈취될 여지가 남았고, 파일 다운로드마다 직급·파견 기간을 재검증하는 구조는 권한 변경이 즉시 반영되는 대신 트래픽이 늘면 백엔드 부하로 이어질 수 있다는 트레이드오프가 있었다. 다음엔 HttpOnly 쿠키 저장과, 발급 시점에 권한을 검증하되 만료를 짧게 둔 Pre-signed URL 하이브리드를 검토하고 싶다.",
          },
        },
      ],
    },
    highlights: {
      en: [
        "Owned API/DB design and the FastAPI backend (team of 5)",
        "Multi-dimensional RBAC across 10 tables — per-role/per-file permissions, contractor expiry",
        "Chat on DynamoDB, files on S3 pre-signed URLs, relational data on RDS",
        "EKS infra codified with Terraform; pre-deploy vulnerability scanning in GitHub Actions",
      ],
      ko: [
        "API·DB 설계와 FastAPI 백엔드 담당 (5인)",
        "10개 테이블에 걸친 다차원 RBAC — 직급별·파일별 권한, 파견직 만료일",
        "채팅 DynamoDB, 파일 S3 Pre-signed URL, 관계형 데이터 RDS로 분리",
        "Terraform으로 EKS 인프라 코드화, GitHub Actions에 배포 전 취약점 스캔 통합",
      ],
    },
  },
  {
    number: "03",
    title: "IaC Security Automation",
    category: "DevSecOps / AI",
    image: "/images/img_iacSecAuto.png",
    tools: [
      "Ansible",
      "Python",
      "Trivy · Semgrep",
      "LangChain",
      "ChromaDB",
      "GPT-4",
      "Streamlit",
    ],
    github: "https://github.com/jeshin119/iac-security-automation",
    tagline: {
      en: "Automates security assessments and generates LLM-grounded remediation guides.",
      ko: "보안 점검을 자동화하고 LLM으로 근거 있는 조치 가이드를 생성한 파이프라인.",
    },
    detail: {
      meta: {
        period: "2025.06.17 – 2025.06.30 (2 weeks)",
        team: { en: "Team of 5", ko: "5인" },
        role: {
          en: "PM; built the Ansible environment and the RAG infrastructure",
          ko: "PM, Ansible 환경 구축 및 구현, RAG 인프라 구축",
        },
        links: [
          {
            label: { en: "Slides", ko: "발표 자료" },
            url: "https://docs.google.com/presentation/d/1guGEiFiD6iUZXv7AJaCWldETL0Vs8jj9YMCwJw9PpRA/edit?usp=sharing",
          },
          {
            label: { en: "Demo video", ko: "시연 영상" },
            url: "https://www.youtube.com/watch?v=irmOyAB5nq0",
          },
        ],
      },
      blocks: [
        {
          id: "problem",
          level: 2,
          heading: { en: "Background & Problem", ko: "배경 및 문제 정의" },
          body: {
            en: "Manually SSH-ing into each server to run scripts and collate results is resource-heavy and error-prone. On top of that, tools like the KISA guide, Semgrep, and Trivy each return results in a different shape, so it's hard to weigh vulnerability priority across all of them at once — and even after a finding, working out an environment-appropriate fix takes real time and security expertise.\n\nWe addressed all three at once: codify the checks themselves in Ansible for consistent quality and scalability; normalize the fragmented tool results into one standard structure and map them to MITRE ATT&CK; and combine security guides with an LLM so the output goes beyond a bare list of findings to suggest likely attack methods and concrete countermeasures.",
            ko: "인프라 서버 보안 점검을 담당자가 일일이 접속해 스크립트를 돌리고 결과를 취합하는 방식은 리소스 소모가 크고 실수 가능성도 높았다. KISA 가이드·Semgrep·Trivy처럼 도구마다 결과 형태가 달라 취약점 우선순위를 통합적으로 판단하기 어렵다는 문제, 취약점을 찾아도 실제 환경에 맞는 조치법을 찾는 데 시간과 전문성이 크게 든다는 문제도 있었다.\n\n이 문제를 세 갈래로 풀었다 — Ansible로 점검 프로세스 자체를 코드화해 일관된 품질과 확장성을 확보하고, 제각각인 도구 결과물을 표준 구조로 통합해 MITRE ATT&CK에 매핑하고, 보안 가이드와 LLM을 결합해 단순 나열을 넘어 예상 공격 방법과 구체적 대응법까지 제안하도록 했다.",
          },
        },
        {
          id: "architecture",
          level: 2,
          heading: { en: "System Architecture", ko: "시스템 아키텍처" },
          body: {
            en: "The control node (a Streamlit app plus Ansible) talks to each managed node over SSH only, so no extra program or port needs to run on the target. Once a scan comes back to the control node, results split into two paths: KISA guide findings are matched against pre-written remediation text item-by-item — a pure rule-based path with no LLM involved — while CVEs/CWEs from Trivy and Semgrep go through a RAG step first, searching MITRE ATT&CK's official documentation (pre-embedded in ChromaDB) before LangChain folds that context into the GPT-4 prompt.",
            ko: "컨트롤 노드(Streamlit 웹앱+Ansible)와 점검 대상 서버(Managed Node) 사이를 SSH로만 연결해, 대상 서버에 별도 프로그램이나 포트를 열지 않도록 했다. 사용자가 스캔을 실행하면 결과가 컨트롤 노드로 돌아온 뒤 두 경로로 나뉜다 — KISA 가이드북 항목은 항목별로 미리 써둔 조치 텍스트를 결과에 그대로 매칭하는 룰 기반 경로라 LLM이 관여하지 않고, Trivy·Semgrep이 찾은 CVE/CWE는 GPT-4의 사전 지식만으로 매핑하지 않도록 ChromaDB에 미리 임베딩해 둔 MITRE ATT&CK 공식 문서를 RAG로 먼저 검색한 뒤 그 결과를 LangChain이 프롬프트에 결합해 GPT-4를 호출하는 경로를 탔다.",
          },
          diagram: {
            en: `graph LR
    U((User)) -->|scan request| ST[Streamlit App<br/>Control Node]
    ST -->|Ansible/SSH| M1[(Managed Node)]
    M1 -->|scan result JSON| ST

    ST -->|KISA result| RULE[Rule-based match<br/>predefined remediation text]
    RULE --> ST

    ST -->|raw CVE/CWE data| RAG[ChromaDB<br/>MITRE ATT&CK doc RAG search]
    RAG -->|matched technique| LLM[LangChain + GPT-4<br/>ATT&CK mapping]
    LLM -->|structured result| ST

    ST -->|dashboard visualization| U`,
            ko: `graph LR
    U((사용자)) -->|스캔 요청| ST[Streamlit 웹앱<br/>Control Node]
    ST -->|Ansible·SSH| M1[(Managed Node)]
    M1 -->|점검 결과 JSON| ST

    ST -->|KISA 결과| RULE[룰 기반 매칭<br/>사전 정의 조치 텍스트]
    RULE --> ST

    ST -->|CVE·CWE 원시 데이터| RAG[ChromaDB<br/>MITRE ATT&CK 문서 RAG 검색]
    RAG -->|관련 Technique| LLM[LangChain + GPT-4<br/>ATT&CK 매핑]
    LLM -->|구조화된 결과| ST

    ST -->|대시보드 시각화| U`,
          },
          diagramNote: {
            en: "The ChromaDB/LangChain RAG pipeline for the ATT&CK-mapping step was designed and built, but that code hasn't been pushed to the repository yet — the currently published version maps ATT&CK using GPT-4's own knowledge only, without RAG.",
            ko: "ChromaDB·LangChain 기반 RAG 파이프라인(MITRE ATT&CK 매핑 단계)은 설계·구현까지 진행됐으나 해당 소스코드는 아직 저장소에 푸시되지 않았다. 현재 공개된 코드의 ATT&CK 매핑은 RAG 없이 GPT-4 자체 지식만으로 추론하는 이전 버전이다.",
          },
        },
        {
          id: "tech-stack",
          level: 2,
          heading: { en: "Tech Stack & Rationale", ko: "기술 스택 및 선정 이유" },
          table: [
            {
              category: { en: "Infra / Automation", ko: "인프라 / 자동화" },
              tech: "Ansible",
              purpose: {
                en: "No extra program needs installing on the target server, minimizing load. YAML playbooks make the KISA check logic easy to codify and treat as a reusable asset.",
                ko: "대상 서버에 추가적인 프로그램을 설치할 필요가 없어 서버 부담을 최소화함. YAML 기반의 파일 작성으로 KISA 점검 로직을 명확하게 코드화하고 자산화하기 용이함.",
              },
            },
            {
              category: { en: "Assessment Standard", ko: "점검 기준" },
              tech: "KISA Technical Vulnerability Assessment Guide",
              purpose: {
                en: "The project's core technical baseline — an authoritative standard for judging real host security posture (account management, service management, file/directory permissions), used as the basis for the playbook logic.",
                ko: "프로젝트의 핵심 기술 점검 기준. 계정 관리, 서비스 관리, 파일 및 디렉토리 권한 등 실제 호스트 보안 상태를 판별하는 공인된 표준 규격을 플레이북 로직의 기준으로 삼음.",
              },
            },
            {
              category: { en: "Security Scan Engines", ko: "보안 스캔 엔진" },
              tech: "Trivy, Semgrep, Web Fuzzing",
              purpose: {
                en: "Trivy: extracts known vulnerabilities in packages from a software bill of materials.\nSemgrep: static analysis that pattern-matches vulnerable logic in source code.\nWeb Fuzzing: detects dynamic vulnerabilities in the web application.",
                ko: "Trivy: 소프트웨어 자산 명세서를 기반으로 패키지 내부의 알려진 취약점을 추출함.\nSemgrep: 소스코드 내부의 패턴을 분석하여 취약한 로직을 찾아내는 정적 분석을 수행함.\nWeb Fuzzing: 웹 애플리케이션의 동적 취약점을 탐지함.",
              },
            },
            {
              category: { en: "Threat Modeling", ko: "위협 모델링" },
              tech: "MITRE ATT&CK",
              purpose: {
                en: "Links findings from the KISA guide and each scan engine to real attack-tactic scenarios, making risk visible.",
                ko: "KISA 가이드 및 각 스캔 엔진에서 발견된 취약점을 실제 공격 전술 시나리오와 연결하여 위험도의 가시성을 높임.",
              },
            },
            {
              category: { en: "AI / Data Pipeline", ko: "AI / 데이터 파이프라인" },
              tech: "LangChain, ChromaDB, OpenAI GPT-4, Python",
              purpose: {
                en: "ChromaDB: chunks MITRE ATT&CK's official docs at the technique level with metadata, used as a vector store that searches (RAG) for relevant techniques when a CVE/CWE comes in.\nLangChain: folds the ChromaDB search results into the GPT-4 prompt as context, and enforces structured (Pydantic) output.\nOpenAI GPT-4: judges the best-matching attack technique from the retrieved context, marking low confidence when unsure.",
                ko: "ChromaDB: MITRE ATT&CK 공식 문서를 Technique 단위로 청킹해 메타데이터와 함께 저장하고, CVE/CWE가 들어오면 관련 Technique을 먼저 검색(RAG)하는 벡터 스토어로 사용함.\nLangChain: ChromaDB 검색 결과를 컨텍스트로 결합해 GPT-4 호출 프롬프트를 구성하고, 구조화된 출력(Pydantic 스키마)으로 응답을 강제하는 파이프라인을 담당함.\nOpenAI GPT-4: 검색된 Technique 컨텍스트를 바탕으로 CVE/CWE와 가장 부합하는 공격 기법을 판단하고, 확신이 낮으면 낮은 confidence로 표시함.",
              },
            },
            {
              category: { en: "User Interface", ko: "사용자 인터페이스" },
              tech: "Streamlit",
              purpose: {
                en: "Chosen to validate the system within a tight 2-week window — easy to wire up to backend logic while minimizing UI development time.",
                ko: "2주의 제한된 개발 기간 내에 시스템을 검증하기 위해, 백엔드 로직과의 연동이 쉽고 화면 개발 시간을 최소화할 수 있는 프레임워크를 채택함.",
              },
            },
          ],
        },
        {
          id: "features",
          level: 2,
          heading: { en: "Key Features", ko: "핵심 기능" },
          body: {
            en: "How the checks run, how their results get normalized, and how the UI stays responsive while they run.",
            ko: "점검을 어떻게 실행하고, 결과를 어떻게 정규화하고, 실행 중에도 화면이 어떻게 반응하는지.",
          },
        },
        {
          id: "ansible-checks",
          level: 3,
          heading: { en: "~80 checks codified in Ansible", ko: "Ansible 기반 점검 코드화" },
          body: {
            en: "Working from KISA's technical vulnerability assessment guide, we defined checks across Server (Linux), MySQL, Apache, Nginx, PHP, and SQLite. Whichever ones could be auto-remediated became Ansible playbooks (U-01–U-74); ones needing policy judgment stayed manual, balancing automation coverage against safety. Each task's outcome is captured with `register`, and exception handling keeps a single failure from stopping the whole pipeline.",
            ko: "KISA 주요정보통신기반시설 기술적 취약점 분석·평가 가이드를 기준으로 Server(Linux)·MySQL·Apache·Nginx·PHP·SQLite 등 카테고리별 점검 항목을 정의하고, 이 중 자동 조치가 가능한 항목은 Ansible 플레이북(U-01~U-74)으로 코드화했다. 정책 판단이 필요해 자동화가 어려운 항목은 수동 확인 항목으로 분류해, 자동화 범위와 안전성을 함께 고려했다. 각 작업의 성공 여부는 register로 확인하고 실패해도 파이프라인 전체가 멈추지 않도록 예외 처리를 적용했다.",
          },
        },
        {
          id: "data-normalization",
          level: 3,
          heading: { en: "Normalizing results across multiple scan engines", ko: "멀티 스캔 엔진 통합과 데이터 정규화" },
          body: {
            en: "We built a Python pipeline to collect results from KISA checks, Semgrep static analysis, Trivy vulnerability scans, and web fuzzing — each shaped differently — and normalized all of it into structured JSON that could be safely handed off to the AI layer.",
            ko: "KISA 점검 결과, Semgrep 정적 분석, Trivy 취약점 스캔, Web Fuzzing 동적 분석처럼 형태가 제각각인 데이터를 수집하는 파이프라인을 Python으로 만들고, 이를 구조화된 JSON으로 정규화해 이후 AI 레이어로 안전하게 넘길 수 있게 했다.",
          },
          image: {
            src: "/images/details/warden/cve-summary.png",
            width: 806,
            height: 455,
            alt: { en: "Normalized scan results summarized by risk level (high/medium/low)", ko: "파편화된 스캔 결과를 표준화·집계해 위험도별(높음·보통·낮음)로 보여주는 요약 화면" },
          },
        },
        {
          id: "streaming-progress",
          level: 3,
          heading: { en: "Selective scans with live progress streaming", ko: "선택적 스캔 실행과 진행상황 스트리밍" },
          body: {
            en: "Users needed to run only the checks they picked, but each tool's runtime and resource use differ enough that always running them in sequence caused real lag. Conditional flags activate only the selected scans, and remote checks switched to `ansible_runner.run_async()`, polling the stdout log every second and streaming only the new lines so the screen shows live progress instead of appearing frozen.",
            ko: "사용자가 원하는 점검 항목만 골라 실행할 수 있어야 했는데, 도구마다 실행 시간·자원 소모가 달라 무조건 순차 실행하면 응답 지연이 컸다. 선택된 플래그만 조건부로 활성화하는 로직으로 필요한 스캔만 돌게 했고, 원격 점검 진행 중엔 ansible_runner.run_async()로 전환해 stdout 로그를 1초 간격으로 폴링하며 새 줄만 스트리밍해 화면에 실시간 진행 상황을 보여주도록 했다.",
          },
        },
        {
          id: "rag",
          level: 2,
          heading: { en: "A ChromaDB-based RAG Pipeline for MITRE ATT&CK Mapping", ko: "MITRE ATT&CK 매핑을 위한 ChromaDB 기반 RAG 파이프라인" },
          body: {
            en: "KISA guide remediation is rule-based, matching static per-item text. RAG and the LLM are used only for one step: mapping CVE/CWE findings from Trivy and Semgrep onto MITRE ATT&CK techniques.",
            ko: "KISA 가이드북 조치는 항목별 정적 텍스트를 매칭하는 룰 기반이고, RAG·LLM은 오직 Trivy·Semgrep이 찾은 CVE/CWE를 MITRE ATT&CK 기법에 매핑하는 단계에만 쓰인다.",
          },
          image: {
            src: "/images/details/warden/scan-selection.png",
            width: 783,
            height: 428,
            alt: { en: "Scan selection screen — pick from guidebook/CVE/code-audit/fuzzing and target servers", ko: "가이드북·CVE·Code audit·FUZZ 중 원하는 항목과 대상 서버만 선택해 실행하는 화면" },
          },
        },
        {
          id: "chunking",
          level: 3,
          heading: { en: "ChromaDB holds only official ATT&CK docs, chunked by technique", ko: "ChromaDB엔 ATT&CK 공식 문서만, Technique 단위로 청킹" },
          body: {
            en: "Only MITRE ATT&CK's official documentation goes into ChromaDB — not the KISA guide. Instead of embedding entire documents, we chunked them at the technique level (ID, name, description, detection, mitigation) and stored `technique_id`/`technique_name`/`tactic`/`platform` as metadata, which improves both search accuracy and filterability.",
            ko: "KISA 가이드북이 아니라 MITRE ATT&CK 공식 문서만 ChromaDB에 저장했다. 문서 전체를 통째로 넣는 대신 Technique 단위(ID·Name·Description·Detection·Mitigation)로 청킹하고, technique_id·technique_name·tactic·platform을 메타데이터로 함께 저장해 검색 정확도와 필터링 가능성을 확보했다.",
          },
        },
        {
          id: "hybrid-search",
          level: 3,
          heading: { en: "Hybrid search and structured output", ko: "하이브리드 검색과 구조화 출력" },
          body: {
            en: "Abbreviations that show up constantly in CVE/CWE text — RCE, LPE, C2 — are easy for embedding similarity alone to miss, so the design folds in hybrid search (vector plus BM25 keyword) or a two-stage search with a reranker over the first-pass candidates. Responses are forced through LangChain's `with_structured_output` (a Pydantic schema) into JSON with `technique_id`, `technique_name`, `confidence_score`, `reasoning`, and `mitigation` fields — no free text — so the result plugs straight into backend storage and the dashboard.",
            ko: "CVE/CWE 설명에 자주 등장하는 축약어(RCE, LPE, C2 등)는 임베딩 유사도만으로 놓치기 쉬워서, 벡터 검색과 키워드 검색(BM25)을 함께 쓰는 하이브리드 검색이나 1차 후보를 리랭커로 추리는 2단계 검색을 설계에 반영했다. 응답은 LLM이 자유 형식 텍스트 대신 technique_id·technique_name·confidence_score·reasoning·mitigation 필드를 가진 JSON만 내도록 LangChain의 with_structured_output(Pydantic 스키마)으로 강제해, 백엔드 저장과 대시보드 시각화에 바로 연결되도록 했다.",
          },
        },
        {
          id: "cti-prompt",
          level: 3,
          heading: { en: "A \"CTI analyst\" prompt that doesn't force an answer", ko: "'CTI 분석가' 프롬프트와 확신 없는 매핑의 처리" },
          body: {
            en: "The LLM is prompted to act as a CTI analyst, with an explicit instruction: if the evidence isn't solid, don't force a mapping. Lower the `confidence_score` instead, or return N/A. It's the same principle behind splitting KISA checks into automatic vs. manual remediation, applied to the LLM layer — an uncertain judgment doesn't get auto-finalized. The image below shows an example of the resulting report: a CVE's Korean summary, CVSS score, ATT&CK technique mapping, and mitigation guide together.",
            ko: "LLM에게 CTI 분석가 역할을 부여하고, 근거가 명확하지 않으면 매핑을 억지로 만들지 말라고 명시했다. 대신 confidence_score를 낮추거나 N/A로 처리하도록 했다. KISA 점검에서 자동조치/수동조치를 나눈 것과 같은 원칙을 LLM 계층에도 그대로 적용한 셈이다 — 확신이 없는 판단은 자동으로 확정하지 않는다. 아래는 그 결과로 나오는 리포트 예시로, CVE의 한글 설명·CVSS 점수·ATT&CK 기술 매핑·조치 가이드를 함께 제공한다.",
          },
          image: {
            src: "/images/details/warden/cve-detail.png",
            width: 686,
            height: 432,
            alt: { en: "Detailed CVE report with Korean summary, CVSS score, MITRE ATT&CK mapping (T1499), and mitigation guide", ko: "개별 CVE의 한글 설명·CVSS 점수·MITRE ATT&CK 기술 매핑(T1499)·조치 가이드를 함께 제공하는 상세 리포트" },
          },
        },
        {
          id: "troubleshooting",
          level: 2,
          heading: { en: "Troubleshooting", ko: "트러블슈팅" },
        },
        {
          id: "semgrep-trivy-mixup",
          level: 3,
          heading: { en: "The Semgrep playbook that was actually Trivy's logic", ko: "Trivy 로직을 잘못 복붙한 Semgrep 플레이북" },
          body: {
            en: "The initial `static_analysis.yml` was, despite its name, a straight copy of Trivy's install/run logic — not Semgrep's. Rewriting it to install Semgrep via `pipx` and scan with the `p/security-audit` ruleset surfaced a new problem: running under `become: true` (root escalation) resolved `$HOME` differently than expected, producing `semgrep: command not found`. The absolute path `/home/{{ ansible_user }}/.local/bin/semgrep` didn't work either; the fix was the path where Semgrep actually landed, `/root/.local/bin/semgrep`. Cleanup logic also went from four manual removal steps down to one: `pipx uninstall semgrep`.",
            ko: "초기 버전의 static_analysis.yml은 파일명과 달리 실제로는 Semgrep이 아니라 Trivy 설치·실행 로직을 그대로 복사한 상태였다. pipx로 Semgrep을 설치하고 p/security-audit 룰셋으로 스캔하는 로직으로 새로 작성하던 중, become: true(root 권한 승격)로 실행하면 $HOME이 예상과 다르게 해석돼 semgrep: command not found가 발생했다. /home/{{ansible_user}}/.local/bin/semgrep 절대경로도 맞지 않아, 실제 설치 경로인 /root/.local/bin/semgrep으로 최종 수정했다. 이후 결과 삭제 로직도 4단계 수동 정리에서 pipx uninstall semgrep 한 줄로 단순화했다.",
          },
        },
        {
          id: "unmodularized-code",
          level: 3,
          heading: { en: "Merge conflicts from an unmodularized codebase", ko: "코드 미모듈화로 인한 팀 작업 충돌" },
          body: {
            en: "Early on, the UI, scanner, and analysis logic were all crammed into a couple of files (`app.py`, `app_modularized.py`), so anyone working on a feature blocked whoever needed the same file. Commit history still shows the workaround — copies like `app(06-24).py`, `app(06-25).py` branched off by person and date. After a team discussion, we split responsibilities into `scanner` (Ansible execution), `analyzer` (result processing), `tabs` (UI), and `styles` (shared styling) directories, cleaning up duplicate implementations like `cve_scanner1.py` and `dynamic_scanner2.py` that had existed in parallel. Once each person could work independently, merge conflicts dropped.",
            ko: "초반엔 화면·스캐너·분석 로직이 app.py, app_modularized.py 등 소수 파일에 몰려 있어 한 명이 특정 기능을 작업 중이면 다른 담당자가 같은 파일을 건드리기 어려웠다. 실제로 커밋 히스토리에 app(06-24).py, app(06-25).py처럼 담당자·날짜별로 파일을 복사해 분기시킨 흔적이 남아 있다. 팀 논의를 거쳐 scanner(Ansible 실행)/analyzer(결과 분석)/tabs(화면 UI)/styles(공통 스타일) 디렉토리로 역할을 분리하고, 그 과정에서 병렬로 존재하던 cve_scanner1.py·dynamic_scanner2.py 같은 중복 구현체를 정리했다. 이후 담당자별로 독립적으로 작업할 수 있게 되면서 병합 충돌이 줄었다.",
          },
        },
        {
          id: "retrospective",
          level: 2,
          heading: { en: "Retrospective", ko: "회고" },
          body: {
            en: "The biggest win was turning a process of manually cross-checking the KISA guide and running each tool by hand into a few clicks. Next, I'd like to push the modularization further and reduce the manual input web fuzzing still needs, to raise the automation rate.",
            ko: "수동으로 KISA 가이드북을 대조하고 툴을 하나씩 돌리던 과정을 클릭 몇 번으로 자동화했다는 게 가장 큰 성과였다. 다음엔 코드 모듈화를 더 다듬고, Web Fuzzing에서 사용자 입력을 줄여 자동화율을 높이고 싶다.",
          },
        },
      ],
    },
    highlights: {
      en: [
        "PM of a team of 5; automated multiple assessments with Ansible",
        "Normalized KISA / static-dynamic / CVE findings into standardized JSON, mapped to MITRE ATT&CK",
        "ChromaDB + GPT-4 RAG for reference-grounded remediation guides",
        "SSH-only access to targets; cut GPT-4 token cost via distilled findings; Streamlit dashboard",
      ],
      ko: [
        "5인 팀 PM; Ansible로 다중 보안 점검 자동화",
        "KISA·정적/동적·CVE 결과를 표준 JSON으로 정규화해 MITRE ATT&CK 매핑",
        "ChromaDB·GPT-4 RAG로 근거 있는 조치 가이드 자동 생성",
        "대상엔 SSH만 사용, 정제 데이터로 GPT-4 토큰 비용 절감, Streamlit 대시보드",
      ],
    },
  },
  {
    number: "04",
    title: "42Seoul Projects",
    category: "Systems",
    image: "/images/img_42seoul.png",
    imageFit: "contain",
    tools: [
      "C",
      "C++",
      "pthread",
      "Socket Programming",
      "Docker",
      "Nginx",
      "Bash",
    ],
    github: "https://github.com/jeshin119/42Seoul_Projects",
    tagline: {
      en: "42Seoul curriculum — from language fundamentals to systems programming.",
      ko: "42서울 커리큘럼 — 언어 펀더멘탈부터 시스템 프로그래밍까지.",
    },
    detail: {
      meta: {
        period: "2024",
        team: { en: "Individual, plus pair/team projects", ko: "개인 프로젝트 + 팀 프로젝트 혼합" },
        role: {
          en: "Ran a requirements → design → implementation → test loop on each project, mostly via peer review",
          ko: "요구사항 정의→설계→구현→테스트 반복, 대부분 동료 코드리뷰로 진행",
        },
      },
      blocks: [
        {
          id: "overview",
          level: 2,
          heading: { en: "Curriculum Overview", ko: "커리큘럼 개요" },
          body: {
            en: "42Seoul's curriculum rebuilds each layer from scratch — from language fundamentals and memory management up through systems programming, data structures, concurrency, graphics, networking, and containers — with almost no standard library assumed. Every project follows the same loop (define requirements, design within tight constraints like an allowed-function list or a fixed language standard, implement, test) from a different starting point. Below are all 12 projects across the 5 circles, grouped as the curriculum itself groups them.",
            ko: "언어 펀더멘탈과 메모리 관리부터 시스템 프로그래밍·자료구조·동시성·그래픽스·네트워크·컨테이너까지, 42서울 커리큘럼은 매 프로젝트가 이전 단계에서 익힌 걸 바닥부터 다시 쌓아 올리는 방식이다. 문제마다 요구사항을 정의하고 제약(허용 함수 목록, 언어 표준 버전 등) 안에서 설계·구현·테스트를 반복하는 흐름을 매번 새로 적용했다. 아래는 5개 써클에 걸친 12개 프로젝트 전체를, 커리큘럼이 실제로 묶은 단위 그대로 정리한 것이다.",
          },
        },
        {
          id: "circle-0",
          level: 2,
          heading: { en: "Circle 0 — Language Fundamentals, Memory Management, System Setup", ko: "0써클 — 언어적 펀더멘탈, 메모리 관리, 시스템 환경 구축" },
        },
        {
          id: "libft",
          level: 3,
          heading: { en: "libft", ko: "libft" },
          techTags: ["C", "Pointer Arithmetic", "Dynamic Memory Allocation (malloc/free)", "Linked List"],
          body: {
            en: "A custom library reimplementing C standard functions from scratch with no external library. Covers byte-level memory control via pointer arithmetic, string processing, and a singly linked list's insert/delete/traverse plus its own dynamic allocation/free mechanism.",
            ko: "외부 라이브러리 없이 C 표준 함수들을 바닥부터 재구현한 커스텀 라이브러리. 포인터 연산을 통한 메모리 바이트 단위 제어, 스트링 가공, 단일 연결 리스트(Single Linked List) 자료구조의 삽입·삭제·순회 및 메모리 동적 할당/해제 메커니즘을 포함한다.",
          },
          troubleshooting: {
            en: "Comparing a signed loop index against an unsigned length (`(size_t)i < len`) let the cast flip the exit condition and spin into an infinite loop (commit \"INF loof ... solved\") — fixed by declaring the index itself as `size_t` so both sides of the comparison agree. `ft_calloc` also needed an overflow guard: checking `count > SIZE_MAX / size` before multiplying, so a huge `count * size` can't silently wrap into an undersized allocation.",
            ko: "부호 있는 `int` 인덱스를 부호 없는 길이값과 `(size_t)i < len` 형태로 캐스팅해 비교하다 보니 형변환 과정에서 종료 조건이 어긋나 무한 루프에 빠졌다(커밋 \"INF loof ... solved\"). 인덱스 변수 자체를 `size_t`로 통일해 비교 양쪽 타입을 맞춰 해결했다. `ft_calloc`에도 정수 오버플로우 방어가 필요해, 곱셈 전에 `count > SIZE_MAX / size` 조건으로 먼저 검증해 `count * size`가 오버플로우로 실제보다 작은 메모리를 할당하는 걸 막았다.",
          },
          projectUrl: "https://github.com/jeshin119/Libft",
        },
        {
          id: "ft-printf",
          level: 3,
          heading: { en: "ft_printf", ko: "ft_printf" },
          techTags: ["C", "va_list", "va_start", "va_arg", "va_end", "Type Casting"],
          body: {
            en: "A formatted-output engine that handles variadic arguments via the calling convention and stack frame layout. A string-parsing loop identifies the data type per format specifier, then performs precise byte-size calculation and type casting before writing to standard output.",
            ko: "호출 규약(Calling Convention)과 스택 프레임 구조를 이용해 가변 인자를 처리하는 포맷팅 출력 엔진. 문자열 파싱 루프를 통해 서식 지정자별 데이터 타입을 판별하고, 정확한 바이트 크기 계산 및 형변환을 거쳐 표준 출력을 수행한다.",
          },
          troubleshooting: {
            en: "The specifier-dispatch logic didn't handle unknown or non-specifier characters consistently at first — branching each of `c/s/d/i/p/u/x/X/%` explicitly and adding a default case that just prints the leftover character removed the undefined behavior. Getting `printf`'s return value (total bytes written) right also took a pass: each output helper now takes a shared counter pointer so every write accumulates into the same running total instead of estimating it after the fact.",
            ko: "포맷 지정자가 아닌 문자나 알 수 없는 지정자가 섞인 입력을 초기 구현이 일관되게 처리하지 못해, `c/s/d/i/p/u/x/X/%` 각각을 명확히 분기하고 어디에도 해당하지 않으면 그 문자를 그대로 출력하는 기본 케이스를 추가해 정의되지 않은 동작을 없앴다. `printf`의 반환값(실제 출력 바이트 수)도 처음엔 부정확해서, 각 출력 함수가 카운트 변수를 포인터로 공유해 write할 때마다 정확히 누적하도록 통일했다.",
          },
          projectUrl: "https://github.com/jeshin119/Ft_printf",
        },
        {
          id: "get-next-line",
          level: 3,
          heading: { en: "get_next_line", ko: "get_next_line" },
          techTags: ["C", "Static Variables", "File Descriptors (FD)", "Buffer Management", "Memory Leak Debugging"],
          body: {
            en: "A buffering function that reads an input stream from a file descriptor and returns it line by line. Built a static-variable-based per-file cache to handle variable buffer sizes, with a memory lifecycle that leaves no resource leaks.",
            ko: "파일 디스크립터(FD)로부터 입력 스트림을 읽어 줄 바꿈(\\n) 단위로 반환하는 데이터 버퍼링 함수. 유동적인 버퍼 크기 환경에 대응하기 위해 정적 변수(Static Variable) 기반의 파일별 캐시 시스템을 구축하고, 자원 유실이 없는 메모리 수명 주기를 제어한다.",
          },
          troubleshooting: {
            en: "An early version freed the leftover buffer and then still referenced it while computing the next chunk — a use-after-free from not separating \"the pointer being freed\" from \"the pointer used next.\" Also missed the case where a mid-read `malloc` failure left the static buffer pointing at freed memory; a dedicated cleanup helper now always resets it to `NULL` on failure so the next call has a clean, checkable state.",
            ko: "초기 구현은 남은 버퍼를 `free`한 뒤에도 다음 조각을 계산하며 같은 포인터를 다시 참조해 use-after-free가 발생할 여지가 있었다 — free 대상 포인터와 다음에 쓸 포인터를 분리해 해결했다. `malloc` 실패 시 정적 버퍼가 이미 해제된 메모리를 계속 가리키는 문제도 있어, 실패 시 항상 `NULL`로 명시적으로 초기화하는 헬퍼 함수를 따로 둬 다음 호출이 안전하게 판별되도록 했다.",
          },
          projectUrl: "https://github.com/jeshin119/Get_next_line",
        },
        {
          id: "born2beroot",
          level: 3,
          heading: { en: "born2beroot", ko: "born2beroot" },
          techTags: ["VirtualBox", "Debian/Ubuntu OS", "LVM", "UFW", "SSH/Sudoers", "Password Policy (PAM)", "Bash Scripting"],
          body: {
            en: "A hardened Linux system built on a hypervisor. Uses LVM for flexible disk partitioning with LUKS encryption, PAM-based password policy enforcement, and a minimized UFW/Sudoers permission setup. Includes a Bash monitoring script that collects system metrics in real time and broadcasts them on a cron schedule.",
            ko: "가상화 환경(Hypervisor) 기반의 보안 고도화 리눅스 시스템 구축. LVM을 활용한 유동적 디스크 파티셔닝 및 LUKS 암호화 적용, PAM 모듈 기반 비밀번호 정책 강화, UFW 방화벽 및 Sudoers 권한 최소화 설정을 반영했다. 시스템 메트릭을 실시간 수집해 주기적으로 브로드캐스팅하는 Bash 모니터링 스크립트와 런타임 크론탭(Crontab) 스케줄러도 포함한다.",
          },
          troubleshooting: {
            en: "Two setup-order pitfalls that are easy to get backwards: switching SSH to port 4242 before UFW is confirmed to allow that port kills remote access outright, so the firewall rule has to land first. And PAM's `pam_pwquality` directive order in `/etc/pam.d/common-password` matters — placed after a `sufficient` line, the policy silently never runs, so the ordering needed a second pass before password complexity was actually enforced.",
            ko: "SSH 포트를 4242로 바꾸기 전에 UFW가 그 포트를 열어뒀는지 먼저 확인하지 않으면 원격 접속이 그대로 끊기기 때문에, 방화벽 규칙을 먼저 적용하는 순서가 중요했다. 또 `/etc/pam.d/common-password`에서 `pam_pwquality` 지시문을 `sufficient` 라인 뒤에 두면 정책이 조용히 적용되지 않아, 순서를 다시 잡고 나서야 비밀번호 복잡도 정책이 실제로 걸렸다.",
          },
          projectUrl: "https://github.com/jeshin119/born2beroot",
        },
        {
          id: "circle-1",
          level: 2,
          heading: { en: "Circle 1 — IPC, Graphics Pipeline Math, Algorithm Optimization", ko: "1써클 — IPC, 수학적 그래픽스 파이프라인, 알고리즘 최적화" },
        },
        {
          id: "pipex",
          level: 3,
          heading: { en: "pipex", ko: "pipex" },
          techTags: ["C", "pipe()", "fork()", "dup2()", "execve()", "waitpid()", "Environment Variables (envp)"],
          body: {
            en: "An IPC system reproducing the Unix shell pipeline (`|`) mechanism. Spawns multiple child processes with `fork()`, redirects standard I/O streams with `pipe()` and `dup2()`, executes external binaries via `envp` parsing, and synchronizes with `waitpid()`.",
            ko: "Unix 운영체제의 쉘 파이프라인(|) 메커니즘을 재현한 IPC(프로세스 간 통신) 시스템. fork()를 통한 자식 프로세스 다중 생성, pipe()·dup2()를 이용한 표준 입출력 스트림 리다이렉션, envp 환경변수 파싱 기반의 외부 바이너리 실행과 waitpid() 동기화 처리를 포함한다.",
          },
          troubleshooting: {
            en: "Waiting on the first child right after forking it — before the second child even tried to write to the pipe — serialized what should have been parallel processes into a near-deadlock. Forking every child first and only then waiting on all of them let the pipeline actually run concurrently. A related fix: not closing each child's unused pipe ends before `execve` left later processes unable to see EOF, since the kernel still considered the pipe open.",
            ko: "첫 번째 자식을 fork한 직후 바로 `waitpid`로 기다리는 방식이, 두 번째 자식이 파이프에 쓰려는 시점과 겹치면서 병렬로 동작해야 할 프로세스들을 사실상 데드락에 가깝게 지연시켰다. 모든 자식을 먼저 fork하고 마지막에 한꺼번에 기다리도록 바꿔 진짜 파이프라인처럼 동시에 돌게 했다. 자식이 쓰지 않는 파이프 끝을 `execve` 전에 닫지 않아 커널이 파이프를 계속 열린 것으로 취급해, 후속 프로세스가 EOF를 못 받는 문제도 함께 고쳤다.",
          },
          projectUrl: "https://github.com/jeshin119/Pipex",
        },
        {
          id: "fdf",
          level: 3,
          heading: { en: "FdF", ko: "FdF" },
          techTags: ["C", "MiniLibX (X11)", "Isometric Projection", "Bresenham's Line Algorithm", "Coordinate Transformation"],
          body: {
            en: "A graphics engine that converts a 2D grid map into a 3D wireframe model via isometric projection. Pixel data is mapped directly into the screen's frame buffer memory, with Bresenham's integer-based line algorithm handling fast linear interpolation.",
            ko: "2D 격자 맵 데이터를 3D 와이어프레임 모델로 변환하는 등각 투영(Isometric Projection) 그래픽스 엔진. 화면 프레임 버퍼 메모리에 픽셀 데이터를 직접 맵핑하는 렌더링 구조이며, 정수 연산 기반의 브레젠험(Bresenham) 알고리즘으로 고속 선형 보간을 적용한다.",
          },
          troubleshooting: {
            en: "Handling steep and shallow lines with one shared code path made the step count come out wrong for certain directions, so lines stopped just short of their endpoint — splitting into explicit x-dominant/y-dominant branches (proper Bresenham) fixed it. Performance also suffered from calling `mlx_pixel_put` per pixel, which round-trips to the X11 server each time; writing pixels directly into an image buffer and blitting it once per frame with `mlx_put_image_to_window` cut that to a single system call per frame.",
            ko: "기울기가 크고 작은 선을 하나의 로직으로 처리하다 보니 특정 방향에서 반복 횟수 계산이 어긋나 선이 끝점 직전에서 멈추는 문제가 있었다 — x축/y축 우세 케이스를 명시적으로 분기하는 표준 브레젠험 형태로 재작성해 해결했다. `mlx_pixel_put`을 픽셀 단위로 호출하는 방식은 매번 X11 서버와 통신이 발생해 느렸는데, 이미지 버퍼에 픽셀을 직접 쓰고 프레임당 한 번만 `mlx_put_image_to_window`로 그리도록 바꿔 시스템콜 호출을 프레임당 1회로 줄였다.",
          },
          projectUrl: "https://github.com/jeshin119/FDF",
        },
        {
          id: "push-swap",
          level: 3,
          heading: { en: "push_swap", ko: "push_swap" },
          techTags: ["C", "Double Linked List (Circular)", "Greedy Algorithm", "Quick Sort Variation", "Complexity (Big-O)"],
          body: {
            en: "A complexity-optimized sorting program working within a limited instruction set and a stack structure. Specified the stacks as a circular doubly linked list for fast node traversal, and dynamically applies hourglass, greedy, or pivot divide-and-conquer strategies depending on data set size to minimize the operation count.",
            ko: "제한된 명령어 세트와 스택 구조를 기반으로 데이터를 정렬하는 복잡도 최적화 알고리즘 프로그램. 고속 노드 순회를 위해 양방향 원형 연결 리스트로 스택 구조를 명세했고, 데이터 세트 크기에 맞춰 모래시계·그리디·피벗 분할 정복 알고리즘을 동적으로 적용해 최소 연산 횟수를 산출한다.",
          },
          troubleshooting: {
            en: "The hand-coded 3/5-element sort cases produced non-minimal (occasionally wrong) swaps for specific input orderings, caught only by enumerating every permutation and checking each against the code by hand. Rotation cost was the other bottleneck: a plain array shifts every element on each `rotate`, which blew past the operation budget at 500 elements — switching to a circular doubly linked deque made rotation a pointer move, with a two-pivot divide-and-conquer sort keeping the total operation count within budget.",
            ko: "3개·5개 크기의 손코딩 정렬 케이스에서 특정 순서 조합에 최소가 아닌(가끔은 잘못된) 스왑이 나가는 문제가 있어, 모든 순열을 직접 나열해 코드와 하나씩 대조하며 검증해야 했다. 회전 연산 비용도 병목이었다 — 단순 배열은 rotate마다 모든 원소를 옮겨야 해 500개 데이터에서 허용 연산 횟수를 초과했는데, 양방향 원형 덱으로 바꿔 회전을 포인터 이동만으로 처리하고 두 피벗 기반 분할 정복 정렬로 전체 연산 횟수를 기준 이내로 줄였다.",
          },
          projectUrl: "https://github.com/jeshin119/Push_swap",
        },
        {
          id: "circle-2",
          level: 2,
          heading: { en: "Circle 2 — Advanced String Parsing, Interpreter Design, Concurrency", ko: "2써클 — 고급 문자열 파싱, 인터프리터 설계, 동시성 프로그래밍" },
        },
        {
          id: "minishell",
          level: 3,
          heading: { en: "minishell (team project)", ko: "minishell (팀 프로젝트)" },
          techTags: ["C", "Lexical Analysis", "Syntax Analysis", "Signal Handling", "Termios", "Redirection"],
          body: {
            en: "A POSIX-compliant CLI command interpreter (shell). Built its own lexer to tokenize input and a parser to walk the syntax, controls concurrent process execution across multiple pipes, handles heredoc interrupt control, and manages terminal input directly via the `termios` struct.",
            ko: "POSIX 규격을 준수하는 CLI 기반 명령어 인터프리터(Shell) 시스템. 입력 문자열의 렉서(Lexer) 토큰화와 파서(Parser) 구문 분석 엔진을 직접 만들었고, 다중 파이프 루프 내 프로세스 동시 실행 제어, Here-doc 인터럽트 제어, termios 구조체를 이용한 터미널 입력 제어 로직을 포함한다.",
          },
          troubleshooting: {
            en: "A child process receiving Ctrl-C/Ctrl-\\ could leave the parent shell's own prompt state corrupted, and it got worse when minishell ran nested inside itself and the signal propagated across levels (commit \"Fix sigint sigquit signal when one command or multi command ... and nested program\"). Registering separate handlers for the interactive parent versus the running child, then resetting the child's handler to `SIG_DFL` right before exec, kept propagation scoped to one level. A heredoc read interrupted by Ctrl-C needed its own handler too, so it cancels just the pending input instead of killing the shell.",
            ko: "자식 프로세스가 Ctrl-C·Ctrl-\\를 받으면 부모 셸의 프롬프트 상태까지 망가지는 문제가 있었고, minishell 안에서 다시 minishell을 실행하는 중첩 상황에서는 신호가 여러 레벨로 전파돼 더 까다로웠다(커밋 \"Fix sigint sigquit signal when one command or multi command ... and nested program\"). 부모(인터랙티브 셸)와 자식(실행 중인 명령어)에 각각 별도 핸들러를 등록하고, 자식은 실행 직전에 핸들러를 `SIG_DFL`로 되돌려 전파 범위를 한 레벨로 격리했다. heredoc 입력 중 Ctrl-C를 받는 경우도 별도 핸들러가 필요해, 셸 전체가 아니라 현재 입력만 취소하도록 분리했다.",
          },
          projectUrl: "https://github.com/jeshin119/Minishell",
        },
        {
          id: "philosophers",
          level: 3,
          heading: { en: "philosophers", ko: "philosophers" },
          techTags: ["C", "POSIX Threads (pthread)", "pthread_mutex", "Semaphores", "Data Race", "Deadlock Prevention"],
          body: {
            en: "A concurrency-control and shared-resource synchronization system across an async multithreaded/multiprocess architecture. Mutex and semaphore atomic operations block data races at the source, an asymmetric resource-acquisition order prevents deadlock and starvation, and a `gettimeofday()`-based monitor thread watches for each philosopher's death condition.",
            ko: "비동기 멀티스레드/멀티프로세스 아키텍처 환경의 동시성 제어 및 공유 자원 동기화 시스템. 뮤텍스(Mutex)·세마포어(Semaphore)의 원자적 연산으로 데이터 레이스를 원천 차단하고, 자원 할당 순서를 비대칭으로 설계해 교착 상태와 기아 상태를 방지했다. gettimeofday() 기반 모니터링 스레드로 철학자의 사망 조건도 감시한다.",
          },
          troubleshooting: {
            en: "Picking up forks one at a time risks the classic deadlock where every philosopher holds their left fork and waits forever on the right. Checking, under one mutex, that both forks are free before taking either — instead of grabbing one and waiting on the other — closes off that circular-wait condition entirely. The other pitfall was busy-waiting: with condition variables off-limits, an unthrottled polling loop pinned a CPU core near 100% and starved other threads of the mutex, so a short `usleep` per check was needed, tuned well below `time_to_die` to keep death detection from lagging.",
            ko: "포크를 하나씩 집으면 모두가 왼쪽 포크만 쥔 채 오른쪽을 기다리는 전형적인 데드락에 빠질 수 있다. 포크를 집기 전에 뮤텍스로 보호된 상태에서 양쪽이 모두 비어있는지 먼저 확인하고, 둘 다 가능할 때만 집도록 해 순환 대기 조건 자체를 차단했다. 다른 함정은 바쁜 대기였다 — 조건변수를 쓸 수 없어 상태를 반복 폴링해야 했는데, 제어 없이 돌리면 CPU를 거의 100% 점유해 다른 스레드가 뮤텍스를 얻을 기회조차 빼앗겼다. 짧은 usleep을 넣어 완화하되, `time_to_die`보다 충분히 짧게 잡아 사망 감지가 늦어지지 않도록 조정했다.",
          },
          projectUrl: "https://github.com/jeshin119/Philosopher",
        },
        {
          id: "circle-3",
          level: 2,
          heading: { en: "Circle 3 — OOP Architecture, Network Topology, Async Event-loop Graphics", ko: "3써클 — 객체지향 아키텍처, 네트워크 토폴로지, 비동기 이벤트 루프 그래픽스" },
        },
        {
          id: "cpp-module",
          level: 3,
          heading: { en: "CPP Module", ko: "CPP Module" },
          techTags: ["C++98", "Encapsulation", "RAII", "Orthodox Canonical Form", "Polymorphism", "Templates", "STL"],
          body: {
            en: "OOP design patterns within the C++98 standard. Introduces a RAII architecture built on constructor/destructor resource control to prevent leaks, implements vtable-based polymorphism through virtual functions, and works through generic system design by studying STL container internals.",
            ko: "C++98 표준 스펙을 준수하는 객체지향 프로그래밍(OOP) 디자인 패턴. 생성자/소멸자 자원 제어 기반의 RAII 아키텍처로 자원 유실을 차단하고, 가상 함수 기반의 가상 메소드 테이블(Vtable) 다형성을 구현했으며, STL 컨테이너 내부 구조 분석을 통한 제네릭 시스템 설계를 다룬다.",
          },
          troubleshooting: {
            en: "In C++98, a class with pointer members that skips defining its own copy constructor/assignment operator gets a compiler-generated shallow copy — two objects pointing at the same memory, headed for a double free. From Module 02 on, every class defines the full canonical set (default constructor, copy constructor, assignment operator, destructor) to close that off. Module 04's interface classes surfaced a related trap: a base class destructor that isn't `virtual` means deleting a derived object through a base pointer skips the derived destructor entirely, so any class meant to be used polymorphically got a virtual destructor as a rule.",
            ko: "C++98에서는 포인터 멤버를 가진 클래스가 복사 생성자·대입 연산자를 직접 정의하지 않으면 컴파일러가 만든 기본 버전이 얕은 복사를 수행해, 두 객체가 같은 메모리를 가리키다 이중 해제로 이어질 수 있다. Module 02부터는 모든 클래스에 기본 생성자·복사 생성자·대입 연산자·소멸자 4종 세트를 정의하는 것을 원칙으로 삼았다. Module 04의 인터페이스 클래스에서는 관련된 함정이 하나 더 있었는데, 기반 클래스 소멸자가 `virtual`이 아니면 기반 클래스 포인터로 파생 객체를 delete할 때 파생 클래스 소멸자가 호출되지 않아 자원이 새므로, 다형성으로 쓰는 기반 클래스에는 가상 소멸자를 두는 걸 규칙으로 삼았다.",
          },
          projectUrl: "https://github.com/jeshin119/cpp_modules",
        },
        {
          id: "netpractice",
          level: 3,
          heading: { en: "NetPractice", ko: "NetPractice" },
          techTags: ["Computer Networking", "IPv4 Addressing", "Subnetting (VLSM)", "CIDR", "Routing Table", "Gateway"],
          body: {
            en: "IP network topology modeling using variable-length subnet masks (VLSM) and CIDR. Designs a routing table based on the longest-match rule and a gateway pipeline to route packets across heterogeneous subnets in a multi-interface environment.",
            ko: "가변 길이 서브넷 마스크(VLSM) 및 CIDR 알고리즘을 적용한 IP 네트워크 토폴로지 아키텍처 모델링. 다중 인터페이스 환경의 이기종 서브넷 간 패킷 라우팅을 위해 최장 일치(Longest Match) 규칙에 따른 라우팅 테이블과 게이트웨이 파이프라인을 설계한다.",
          },
          projectUrl: "https://github.com/jeshin119/net-practice/tree/main",
        },
        {
          id: "cub3d",
          level: 3,
          heading: { en: "cub3d", ko: "cub3d" },
          techTags: ["C", "Raycasting Engine", "DDA Algorithm", "Trigonometry (Vector/Matrix)", "Texture Mapping", "Event Loop"],
          body: {
            en: "A 3D raycasting engine projecting real-time rays across the field of view over a 2D vector map. Scans wall intersections with the DDA algorithm, corrects distance-proportional distortion, and maps textures pixel by pixel. An async rendering loop hooked into X11 events keeps frames from dropping.",
            ko: "2D 벡터 맵 구조 위에서 시야각(FOV)에 따른 실시간 광선을 투사하는 3D 레이캐스팅 그래픽스 엔진. DDA(Digital Differential Analysis) 알고리즘으로 벽면 교차점을 스캔하고, 거리 비례 왜곡을 보정한 뒤 텍스처를 픽셀 단위로 매핑한다. X11 이벤트를 후킹한 비동기 렌더링 루프로 프레임 드랍 없이 동작한다.",
          },
          troubleshooting: {
            en: "Checking the full movement vector at once instead of the x- and y-axis moves separately let the player cut through wall corners diagonally instead of colliding with them (fixed across several passes, commit \"wall collision all fix\") — testing each axis independently and canceling only the axis that actually collides gives a natural slide along the wall instead. Texture mapping had its own mirroring bug: every wall face used the same coordinate formula regardless of which of the four directions the ray hit, so textures came out flipped on certain walls until the ray direction was compared against the surface normal to decide when to invert the texture's x-coordinate.",
            ko: "이동 벡터 전체를 한 번에 검사하고 x축·y축을 따로 검사하지 않다 보니, 벽 모서리를 대각선으로 이동할 때 실제로는 부딪혀야 할 코너를 그대로 통과해버리는 문제가 있었다(여러 차례 수정, 커밋 \"wall collision all fix\"). x축과 y축 이동을 각각 독립적으로 검사해 충돌한 축만 이동을 취소하도록 바꿔 벽을 타고 자연스럽게 미끄러지도록 고쳤다. 텍스처 매핑에도 뒤집힘 버그가 있었는데, 광선이 부딪힌 네 방향 모두 같은 좌표 계산식을 쓰다 보니 특정 방향에서 텍스처가 거울처럼 보였다 — 광선 방향과 충돌면 법선을 비교해 텍스처 x좌표를 반전할지 판단하도록 고쳤다.",
          },
          projectUrl: "https://github.com/jeshin119/Cub3d",
        },
        {
          id: "circle-4",
          level: 2,
          heading: { en: "Circle 4 — Container Orchestration & High-performance Async Web Server", ko: "4써클 — 컨테이너 가상화 오케스트레이션 및 고성능 이벤트 기반 비동기 웹서버" },
        },
        {
          id: "inception",
          level: 3,
          heading: { en: "Inception", ko: "Inception" },
          techTags: ["Docker", "Dockerfile", "Docker-compose", "Nginx", "WordPress", "MariaDB", "TLS/SSL", "Docker Network"],
          body: {
            en: "A multi-container virtualization setup for a microservices-style architecture. Builds Dockerfiles with lightweight-OS layer caching, automates the infra with Docker Compose, configures an Nginx reverse proxy over HTTPS (443) with an OpenSSL self-signed cert, and sets up data persistence through an isolated internal bridge network and volume binding.",
            ko: "마이크로 서비스 아키텍처 구성을 위한 멀티 컨테이너 가상화 인프라 환경 구축. 경량 OS 기반 가상 레이어 캐싱 Dockerfile 빌드, Docker-compose 구동 인프라 자동화, OpenSSL 자가 서명 기반의 Nginx 리버스 프록시(HTTPS 443 포트) 구성, 격리된 내부 브릿지 네트워크와 볼륨 바인딩을 통한 데이터 영속성 환경을 설계했다.",
          },
          troubleshooting: {
            en: "Without volumes, data lived inside the containers themselves, so `docker compose down` and back up wiped the database and WordPress content every time — bind-mounting host directories for MariaDB's data directory and WordPress's files fixed that. `depends_on` alone only guarantees a container is running, not that the service inside it (like the MariaDB daemon) is ready to accept connections, so WordPress sometimes tried to connect before MariaDB could respond; each entrypoint script now waits for its dependency to actually be reachable, with idempotent init scripts so restarts stay safe.",
            ko: "볼륨 없이 컨테이너 내부 경로에 데이터를 저장하다 보니 `docker compose down` 후 다시 올리면 DB와 WordPress 콘텐츠가 매번 초기화됐다 — 호스트 디렉토리를 MariaDB 데이터 디렉토리와 WordPress 파일 디렉토리에 바인드 마운트해 해결했다. `depends_on`은 컨테이너가 실행 중인지만 보장할 뿐 내부 서비스(MariaDB 데몬 등)가 실제로 요청을 받을 준비가 됐는지는 보장하지 않아, WordPress가 MariaDB보다 먼저 연결을 시도해 실패하는 경우가 있었다. 각 컨테이너의 entrypoint에서 의존 서비스가 응답 가능해질 때까지 대기하고, 초기화 스크립트를 멱등적으로 작성해 재시작에도 안전하게 만들었다.",
          },
          projectUrl: "https://github.com/jeshin119/Inception",
        },
        {
          id: "webserv",
          level: 3,
          heading: { en: "webserv (team project)", ko: "webserv (팀 프로젝트)" },
          techTags: ["C++98", "Network Socket API", "I/O Multiplexing (kqueue/epoll)", "Non-blocking I/O", "State Machine", "CGI"],
          body: {
            en: "A custom, non-blocking event-driven HTTP web server built on a kernel-level I/O multiplexing interface for high traffic. Implements a DFA-based state-machine request parser for HTTP/1.1, handles chunked-transfer load, and hand-builds a CGI extension layer via forked child processes piped over stdio. A 3-person team split the work into Config/Request/Response; I mainly owned Response (response generation) and also merged each part's branch together (roughly 160 commits in my area).",
            ko: "대규모 트래픽 처리를 위해 커널 레벨 I/O 멀티플렉싱 인터페이스를 도입한 논블로킹 이벤트 드리븐 커스텀 HTTP 웹서버. HTTP/1.1 파싱을 위한 결정적 유한 오토마톤(DFA) 기반 상태 머신 Request Parser를 설계하고, 청크드 전송 부하 분산을 처리하며, 자식 프로세스 포크 후 표준 스트림 파이프 연동으로 CGI 동적 확장 레이어를 직접 구현했다. 3인 팀에서 Config·Request·Response로 파트를 나눠 개발했고, 본인은 Response(응답 생성) 파트를 주로 담당하며 각 파트 브랜치 통합(merge)도 맡았다(담당 영역 기준 약 160여 커밋).",
          },
          troubleshooting: {
            en: "C++98 compliance meant swapping `unordered_map` for `map` (commits \"c++98\", \"unordered_map -> map\").\n\nThrowing exceptions on failed read/write didn't fit the non-blocking event loop, since one connection's exception could kill the whole loop, so error handling switched to return codes (commits \"remove throw after read/write\", \"Delete try catch\").\n\nWriting the response header and body as separate calls left a timing gap that could leave clients with an incomplete response; merging both into one buffer before writing fixed it (commit \"Header/Body 분리되서 전송되는거 수정\").",
            ko: "C++98 표준 준수 요구로 unordered_map을 map으로 교체했다(커밋 \"c++98\", \"unordered_map -> map\").\n\nread/write 실패 시 예외를 던지는 방식이 논블로킹 이벤트 루프와 맞지 않아, 한 커넥션의 예외가 이벤트 루프 전체를 끊는 문제가 있어 반환값 기반 에러 처리로 전환했다(커밋 \"remove throw after read/write\", \"Delete try catch\").\n\n응답의 헤더와 바디를 별도로 write하다 타이밍이 어긋나 클라이언트가 응답을 온전히 못 받는 경우가 있어, 하나의 버퍼로 합쳐 전송하도록 고쳤다(커밋 \"Header/Body 분리되서 전송되는거 수정\").",
          },
          projectUrl: "https://github.com/jeshin119/webserv.git",
        },
      ],
    },
    highlights: {
      en: [
        "Custom C standard library and a shell",
        "Multithreaded concurrency and a raycasting engine",
        "Non-blocking web server and Docker-based infrastructure",
        "Requirements → design → implementation → testing loop, mostly via peer review",
      ],
      ko: [
        "C 표준 라이브러리와 쉘 직접 구현",
        "멀티스레드 동시성과 레이캐스팅 엔진",
        "논블로킹 웹서버와 Docker 기반 인프라",
        "요구사항→설계→구현→테스트 반복, 대부분 동료 코드리뷰로 진행",
      ],
    },
  },
];

export interface TechItem {
  name: string;
  icon: string; // react-icons key, TechStack 컴포넌트에서 매핑
  color: string; // brand color
}

/** 역삼각형 배치(7-6-5-3): 위→아래로 한 줄씩 좁아진다. 아래 줄은 버전관리·보안 툴. */
export const techRows: TechItem[][] = [
  // 언어 + Spring (7)
  [
    { name: "Java", icon: "java", color: "#e11e23" },
    { name: "Python", icon: "python", color: "#3776ab" },
    { name: "JavaScript", icon: "javascript", color: "#e6b800" },
    { name: "C / C++", icon: "cpp", color: "#00599c" },
    { name: "SQL", icon: "sql", color: "#00758f" },
    { name: "Shell Script", icon: "shell", color: "#4eaa25" },
    { name: "Spring", icon: "spring", color: "#6db33f" },
  ],
  // 프레임워크 / 데이터 / 컨테이너·클라우드 (6)
  [
    { name: "FastAPI", icon: "fastapi", color: "#009688" },
    { name: "Node.js", icon: "node", color: "#5fa04e" },
    { name: "Next.js", icon: "nextjs", color: "#000000" },
    { name: "MySQL", icon: "mysql", color: "#4479a1" },
    { name: "Docker", icon: "docker", color: "#2496ed" },
    { name: "AWS", icon: "aws", color: "#ff9900" },
  ],
  // CI / 자동화 / OS / 가상화 / 버전관리 (5)
  [
    { name: "Jenkins", icon: "jenkins", color: "#d24939" },
    { name: "Ansible", icon: "ansible", color: "#ee0000" },
    { name: "Linux", icon: "linux", color: "#f0a020" },
    { name: "VMware", icon: "vmware", color: "#607078" },
    { name: "Git", icon: "git", color: "#f05032" },
  ],
  // 버전관리 / 보안 (3)
  [
    { name: "GitHub", icon: "github", color: "#181717" },
    { name: "Wireshark", icon: "wireshark", color: "#1679a7" },
  ],
  // 보안 툴 (1) — 아래 꼭짓점
  [{ name: "Burp Suite", icon: "burpsuite", color: "#ff6633" }],
];
