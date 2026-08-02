"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface ModalPerformanceContextValue {
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
}

const ModalPerformanceContext = createContext<ModalPerformanceContextValue | null>(null);

/**
 * 모달이 화면을 덮는 동안에는 보이지 않는 배경 효과를 멈춰, 모달 스크롤에
 * GPU 시간을 우선 배정한다.
 */
export function ModalPerformanceProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const value = useMemo(
    () => ({ isModalOpen, setModalOpen }),
    [isModalOpen],
  );

  return (
    <ModalPerformanceContext.Provider value={value}>
      {children}
    </ModalPerformanceContext.Provider>
  );
}

export function useModalPerformance() {
  const context = useContext(ModalPerformanceContext);
  if (!context) {
    throw new Error("useModalPerformance must be used within ModalPerformanceProvider");
  }
  return context;
}
