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

export interface Project {
  number: string;
  title: string;
  category: string;
  tools: string[];
  /** public/ 아래 스크린샷 경로. 없으면 그라데이션 플레이스홀더 렌더링 */
  image?: string;
  github?: string;
  demo?: string;
  description: { en: string; ko: string };
}

export const projects: Project[] = [
  {
    number: "01",
    title: "Vintage Market",
    category: "Security / Pentest",
    tools: ["React", "Node.js / Express", "Socket.IO", "MySQL", "Docker", "Jenkins", "Burp Suite"],
    github: "https://github.com/jeshin119/secure-marketplace-platform",
    description: {
      en: "A legacy e-commerce service built and then attacked under a red-team engagement scenario (4 people, 2 weeks). I stood up a Gitea + Jenkins CI/CD environment with Docker Compose, implemented community, chat, and product features in React, Express, and Socket.IO, then modeled threats with STRIDE and MITRE ATT&CK. Starting from an input-validation bypass in chat, I escalated an UPDATE-based blind SQL injection to full database access (rated Critical) and recommended parameter binding and an ORM migration.",
      ko: "레드팀 의뢰를 가정해 레거시 이커머스 서비스를 직접 구축하고 공격자 관점으로 진단한 프로젝트(4명, 2주). Docker Compose로 Gitea·Jenkins CI/CD 환경을 세우고 React·Express·Socket.IO로 커뮤니티·채팅·상품 기능을 구현한 뒤, STRIDE·MITRE ATT&CK로 위협을 도출했습니다. 채팅 입력값 검증 우회에서 출발해 UPDATE 기반 Blind SQL Injection으로 전체 DB 접근이 가능함을 확인(Critical)하고, 파라미터 바인딩과 ORM 전환을 권고했습니다.",
    },
  },
  {
    number: "02",
    title: "Secure Workspace",
    category: "Cloud / Security",
    tools: ["FastAPI", "RBAC / JWT", "MySQL / RDS", "DynamoDB", "S3", "Terraform", "GitHub Actions"],
    github: "https://github.com/jeshin119/secure-workspace-platform",
    description: {
      en: "A security-hardened collaboration platform for organizations that handle sensitive data. On a team of five I owned the database design and 27 FastAPI REST endpoints. I modeled a seven-level role hierarchy as RBAC across ten tables wired to JWT auth, and added time-bound access control in middleware for fixed-term users. Storage was split by access pattern — RDS for relational integrity, S3 with private ACLs for files, DynamoDB for chat — with infrastructure and deploys automated via Terraform and GitHub Actions.",
      ko: "민감 정보를 다루는 조직을 위한 보안 강화 협업 플랫폼. 5명 팀에서 DB 설계와 FastAPI REST API 27개를 전담했습니다. 직책 7단계 권한을 10개 테이블의 RBAC로 설계해 JWT 인증과 연결하고, 파견 인력을 위한 시간 기반 접근제어를 미들웨어로 구현했습니다. 데이터 특성에 따라 RDS·S3(private ACL)·DynamoDB로 스토리지를 분리하고, Terraform과 GitHub Actions로 인프라·배포를 자동화했습니다.",
    },
  },
  {
    number: "03",
    title: "IaC Security Automation",
    category: "Security / Infra",
    tools: ["Ansible", "Trivy / SBOM", "Web Fuzzing", "LangChain", "RAG / ChromaDB", "Streamlit"],
    github: "https://github.com/jeshin119/iac-security-automation",
    description: {
      en: "Bundles multiple security assessments into one automated, code-driven pipeline. On a team of five I owned the Ansible setup, SBOM-based CVE scanning, dynamic web fuzzing, and a LangChain/RAG pipeline. Checks were codified in Ansible for idempotency, with Trivy generating SBOMs matched against CVEs. When mapping findings to MITRE ATT&CK for remediation, I grounded the LLM in a RAG store built only from official MITRE docs in ChromaDB to prevent hallucination, and surfaced everything in a Streamlit dashboard — cutting a full-day assessment down to 30 minutes.",
      ko: "여러 보안 진단을 코드로 묶어 자동화한 파이프라인. 5명 팀에서 Ansible 환경 구성, SBOM 기반 CVE 진단, 웹 퍼징 동적 진단, LangChain·RAG 파이프라인을 맡았습니다. 멱등성을 위해 점검 절차를 Ansible로 코드화하고 Trivy로 SBOM·CVE를 매칭했습니다. 진단 결과를 MITRE ATT&CK에 매핑해 조치를 제안할 때는 공식 문서만 ChromaDB에 적재한 RAG로 LLM 환각을 차단하고, Streamlit 대시보드로 시각화해 하루 걸리던 진단을 30분으로 줄였습니다.",
    },
  },
  {
    number: "04",
    title: "42Seoul Projects",
    category: "Systems",
    tools: ["C++", "HTTP/1.1", "CGI", "kqueue", "Nginx", "Docker"],
    github: "https://github.com/jeshin119/42Seoul_Projects",
    description: {
      en: "The flagship of my 42Seoul work: a from-scratch web server in C++ that behaves like Nginx (3 people, 4 weeks), where I owned HTTP response generation. I split responses into status line, headers, and body behind dedicated managers, and inverted the build order to construct the error body first so any mid-way failure could still be reported. Concurrency ran on non-blocking I/O with kqueue, reaching 99.5%+ availability under siege load tests with zero memory leaks confirmed by the leaks tool.",
      ko: "프레임워크 없이 Nginx처럼 동작하는 웹 서버를 C++로 직접 구현한 42서울 대표 프로젝트(3명, 4주). 저는 HTTP 응답 생성을 전담했습니다. 응답을 상태줄·헤더·바디로 나눠 매니저로 구조화하고, 에러 바디를 먼저 확정하도록 순서를 뒤집어 어느 단계에서 문제가 생겨도 원인을 응답에 담게 했습니다. 동시 접속은 kqueue 논블로킹 I/O로 처리해 siege 부하 테스트에서 가용성 99.5% 이상, leaks 도구로 메모리 누수 0을 확인했습니다.",
    },
  },
];

export interface TechItem {
  name: string;
  icon: string; // react-icons key, TechStack 컴포넌트에서 매핑
  color: string; // brand color
}

/** 역정삼각형 배치(6-5-4-3-2): 위→아래로 한 줄씩 좁아진다. 아래 꼭짓점은 보안 툴. */
export const techRows: TechItem[][] = [
  // 언어 (6)
  [
    { name: "Java", icon: "java", color: "#e11e23" },
    { name: "Python", icon: "python", color: "#3776ab" },
    { name: "JavaScript", icon: "javascript", color: "#e6b800" },
    { name: "C / C++", icon: "cpp", color: "#00599c" },
    { name: "SQL", icon: "sql", color: "#00758f" },
    { name: "Shell Script", icon: "shell", color: "#4eaa25" },
  ],
  // 백엔드 / 데이터 / OS (5)
  [
    { name: "Spring", icon: "spring", color: "#6db33f" },
    { name: "FastAPI", icon: "fastapi", color: "#009688" },
    { name: "Node.js", icon: "node", color: "#5fa04e" },
    { name: "MySQL", icon: "mysql", color: "#4479a1" },
    { name: "Linux", icon: "linux", color: "#f0a020" },
  ],
  // 컨테이너 / 클라우드 / CI (4)
  [
    { name: "Docker", icon: "docker", color: "#2496ed" },
    { name: "AWS", icon: "aws", color: "#ff9900" },
    { name: "Jenkins", icon: "jenkins", color: "#d24939" },
    { name: "Ansible", icon: "ansible", color: "#ee0000" },
  ],
  // 가상화 / 버전관리 (3)
  [
    { name: "VMware", icon: "vmware", color: "#607078" },
    { name: "Git", icon: "git", color: "#f05032" },
    { name: "GitHub", icon: "github", color: "#181717" },
  ],
  // 보안 툴 (2)
  [
    { name: "Wireshark", icon: "wireshark", color: "#1679a7" },
    { name: "Burp Suite", icon: "burpsuite", color: "#ff6633" },
  ],
];
