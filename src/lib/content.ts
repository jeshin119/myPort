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
  /**
   * 이미지 맞춤 방식. 기본 "cover"(카드를 꽉 채우고 넘치는 부분은 잘림).
   * 로고처럼 잘리면 안 되는 이미지는 "contain"(전체를 보이고 여백은 그라데이션).
   */
  imageFit?: "cover" | "contain";
  github?: string;
  demo?: string;
  description: { en: string; ko: string };
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
    description: {
      en: "A legacy second-hand marketplace I built and then attacked under a simulated red-team engagement (team of 4). I implemented the service in React and Node.js and stood up a segmented network (external / internal / dev) with a Gitea + Jenkins CI/CD pipeline. Threats were modeled with DFD/STRIDE and MITRE ATT&CK; I demonstrated a SQL injection that bypassed login auth and leaked member data, then recommended parameter binding and input validation.",
      ko: "가상 고객사의 의뢰를 가정해 레거시 중고거래 플랫폼을 구현하고 공격자 관점에서 진단한 프로젝트(4인). React·Node.js로 서비스를 구현하고 외부·내부·개발망을 분리한 Gitea·Jenkins CI/CD 환경을 구축했습니다. DFD/STRIDE·MITRE ATT&CK로 침투 시나리오를 실증했고, 로그인·채팅 입력의 SQL Injection으로 인증 우회와 회원 정보 유출을 확인해 파라미터 바인딩·입력 검증을 권고했습니다.",
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
    description: {
      en: "A collaboration service focused on access control and supply-chain security for organizations handling sensitive data (team of 5). I owned the API and database design and the FastAPI backend, modeling multi-dimensional RBAC — per-role and per-file permissions, contractor expiry dates — across 10 tables. Chat runs on DynamoDB, files on S3 pre-signed URLs, and relational data on RDS; I codified the EKS infrastructure with Terraform and integrated pre-deploy vulnerability scanning into GitHub Actions.",
      ko: "민감 정보를 다루는 조직을 위한 접근 통제·공급망 보안 중심의 협업 서비스(5인). API·데이터베이스 설계와 FastAPI 백엔드를 맡아 직급별·파일별 권한과 파견직 만료일까지 다루는 다차원 RBAC를 10개 테이블로 모델링했습니다. 채팅은 DynamoDB, 파일은 S3 Pre-signed URL, 관계형 데이터는 RDS로 분리하고, Terraform으로 EKS 인프라를 코드화한 뒤 GitHub Actions에 배포 전 취약점 스캔을 통합했습니다.",
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
    description: {
      en: "A pipeline that automates multiple security assessments with Ansible and generates tailored remediation guides with an LLM (team of 5, as PM). Findings from KISA checks, static/dynamic analysis, and CVE scans are normalized into standardized JSON and mapped to MITRE ATT&CK, then a ChromaDB + GPT-4 RAG grounds the remediation guides in real references. Targets stay untouched by using SSH only; I cut GPT-4 token cost by feeding just distilled findings, and surfaced results in a Streamlit dashboard.",
      ko: "여러 보안 점검을 Ansible로 자동화하고 LLM으로 맞춤형 조치 가이드를 생성하는 파이프라인(5인, PM). KISA 가이드·정적/동적 분석·CVE 스캔 결과를 표준 JSON으로 정규화해 MITRE ATT&CK에 매핑하고, ChromaDB·GPT-4 기반 RAG로 근거 있는 조치 가이드를 자동 생성했습니다. 대상 서버엔 SSH만 사용해 부담을 줄이고, 핵심 데이터만 정제해 전달함으로써 GPT-4 토큰 비용을 최적화했으며 결과는 Streamlit 대시보드로 시각화했습니다.",
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
    description: {
      en: "A collection of 42Seoul curriculum projects spanning language fundamentals and memory management to systems programming, data structures, concurrency, graphics, networking, and containers. Following a requirements → design → implementation → testing loop on each, I built in C and C++ a custom standard library, a shell, multithreaded concurrency, a raycasting engine, a non-blocking web server, and Docker-based infrastructure — most of them through peer collaboration and code review.",
      ko: "언어 펀더멘탈과 메모리 관리부터 시스템 프로그래밍·자료구조·동시성·그래픽스·네트워크·컨테이너까지 아우르는 42서울 커리큘럼 프로젝트 모음. 요구사항 정의→설계→구현→테스트 흐름을 프로젝트마다 반복하며, C·C++로 표준 라이브러리부터 쉘, 멀티스레드 동시성, 레이캐스팅 엔진, 논블로킹 웹서버, Docker 기반 인프라까지 직접 구현했습니다. 대부분 동료와의 협업과 코드 리뷰로 진행했습니다.",
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
    { name: "Burp Suite", icon: "burpsuite", color: "#ff6633" },
  ],
];
