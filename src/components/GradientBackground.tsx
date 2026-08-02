"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useModalPerformance } from "@/lib/modal-performance";

/**
 * 파스텔 그라데이션 blob 배경 (레퍼런스 B 톤).
 * 유동적인 blob이 아주 천천히 떠다니며 섞인다. reduced-motion 시 정적 렌더.
 */
interface Blob {
  color: string;
  size: string;
  initial: React.CSSProperties;
  animate: { x: number[]; y: number[] };
  duration: number;
}

const blobs: Blob[] = [
  {
    color: "var(--blob-violet)",
    size: "55vmax",
    initial: { top: "-15%", left: "-10%" },
    animate: { x: [0, 80, -40, 0], y: [0, 60, 20, 0] },
    duration: 38,
  },
  {
    color: "var(--blob-blue)",
    size: "50vmax",
    initial: { top: "20%", right: "-15%" },
    animate: { x: [0, -70, 30, 0], y: [0, 50, -30, 0] },
    duration: 46,
  },
  {
    color: "var(--blob-mint)",
    size: "45vmax",
    initial: { bottom: "-10%", left: "15%" },
    animate: { x: [0, 60, -50, 0], y: [0, -40, 30, 0] },
    duration: 42,
  },
  {
    color: "var(--blob-pink)",
    size: "40vmax",
    initial: { bottom: "25%", right: "20%" },
    animate: { x: [0, -50, 40, 0], y: [0, 30, -50, 0] },
    duration: 50,
  },
];

export default function GradientBackground() {
  const reduceMotion = useReducedMotion();
  const { isModalOpen } = useModalPerformance();

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            ...blob.initial,
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle at center, ${blob.color} 0%, transparent 65%)`,
            opacity: 0.55,
            filter: "blur(60px)",
          }}
          animate={reduceMotion || isModalOpen ? undefined : blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* 미세한 화이트 오버레이로 전체 톤 정리 */}
      <div className="absolute inset-0 bg-white/30" />
    </div>
  );
}
