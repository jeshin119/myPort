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
    tools: ["Node.js", "Express", "MySQL", "Docker", "Jenkins", "Burp Suite"],
    github: "https://github.com/jeshin119/secure-marketplace-platform",
    description: {
      en: "A deliberately vulnerable legacy e-commerce platform with IaC CI/CD pipelines, used for black-box penetration testing from an attacker's perspective (MITRE ATT&CK, STRIDE).",
      ko: "의도적으로 취약하게 구성한 레거시 이커머스 플랫폼. IaC CI/CD 파이프라인을 갖추고, 공격자 관점의 블랙박스 모의해킹(MITRE ATT&CK, STRIDE)을 수행했습니다.",
    },
  },
  {
    number: "02",
    title: "Secure Workspace",
    category: "Cloud / Security",
    tools: ["FastAPI", "RBAC / JWT", "AWS EKS", "Terraform", "GitHub Actions"],
    github: "https://github.com/jeshin119/secure-workspace-platform",
    description: {
      en: "A cloud-native collaboration platform with fine-grained RBAC and supply-chain security — real-time chat and file sharing on AWS EKS, provisioned with Terraform.",
      ko: "세분화된 RBAC와 공급망 보안을 갖춘 클라우드 네이티브 협업 플랫폼. AWS EKS 위에서 실시간 채팅·파일 공유를 제공하고 Terraform으로 인프라를 프로비저닝했습니다.",
    },
  },
  {
    number: "03",
    title: "IaC Security Automation",
    category: "Security / Infra",
    tools: ["Ansible", "Python", "Trivy", "Semgrep", "LangChain", "GPT-4"],
    github: "https://github.com/jeshin119/iac-security-automation",
    description: {
      en: "Automates infrastructure vulnerability scanning with Ansible, then uses LLMs (LangChain, GPT-4) to generate remediation guides mapped to MITRE ATT&CK.",
      ko: "Ansible로 인프라 취약점 점검을 자동화하고, LLM(LangChain, GPT-4)으로 MITRE ATT&CK에 매핑된 맞춤형 조치 가이드를 생성합니다.",
    },
  },
  {
    number: "04",
    title: "42Seoul Projects",
    category: "Systems",
    tools: ["C", "C++", "Bash", "Docker", "Nginx"],
    github: "https://github.com/jeshin119/42Seoul_Projects",
    description: {
      en: "A collection of 42Seoul curriculum projects spanning C fundamentals to systems, networking and web — including webserv, minishell, cub3d and Inception.",
      ko: "C 기초부터 시스템·네트워킹·웹까지 아우르는 42서울 커리큘럼 프로젝트 모음. webserv, minishell, cub3d, Inception 등을 포함합니다.",
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
