"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useMailPopup } from "@/lib/mail-popup";
import { useI18n } from "@/lib/i18n";
import ContactForm from "./ContactForm";

/**
 * 우하단 메일 작성 팝업.
 * Say Hello 버튼 / 사이드바 메일 아이콘에서 열리며, 내부에 Resend 기반 폼을 담는다.
 */
export default function MailPopup() {
  const { isOpen, close } = useMailPopup();
  const { t } = useI18n();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mail-popup"
          role="dialog"
          aria-label={t("contact.title")}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="glass-card fixed bottom-6 right-6 z-[60] max-h-[85vh] w-[min(92vw,380px)] overflow-y-auto rounded-3xl p-5 shadow-2xl shadow-accent/20 sm:p-6"
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold">{t("contact.title")}</h3>
              <p className="mt-0.5 text-xs text-muted">{t("contact.popupHint")}</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={t("contact.close")}
              className="-mr-1 -mt-1 rounded-full p-1.5 text-muted transition-colors hover:bg-accent/10 hover:text-accent"
            >
              <FiX size={20} />
            </button>
          </div>

          <ContactForm embedded />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
