"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

/**
 * 메일 작성 팝업의 열림 상태를 공유하는 컨텍스트.
 * Contact의 "Say Hello" 버튼, 좌측 사이드바 메일 아이콘 등 여러 곳에서
 * 우하단 팝업을 열 수 있도록 한다.
 */
interface MailPopupContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const MailPopupContext = createContext<MailPopupContextValue | null>(null);

export function MailPopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return (
    <MailPopupContext.Provider value={{ isOpen, open, close }}>
      {children}
    </MailPopupContext.Provider>
  );
}

export function useMailPopup() {
  const ctx = useContext(MailPopupContext);
  if (!ctx) throw new Error("useMailPopup must be used within MailPopupProvider");
  return ctx;
}
