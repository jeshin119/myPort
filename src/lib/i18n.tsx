"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import en from "@/locales/en.json";
import ko from "@/locales/ko.json";

export type Locale = "en" | "ko";

const dictionaries = { en, ko } as const;
const STORAGE_KEY = "portfolio-locale";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Translate a dot-separated key, e.g. t("career.items.now.heading") */
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function resolve(dict: unknown, key: string): string {
  const value = key
    .split(".")
    .reduce<unknown>(
      (acc, part) =>
        acc && typeof acc === "object"
          ? (acc as Record<string, unknown>)[part]
          : undefined,
      dict,
    );
  return typeof value === "string" ? value : key;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Restore persisted locale on mount (localStorage is client-only)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ko") setLocaleState(saved);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const t = useCallback(
    (key: string) => resolve(dictionaries[locale], key),
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
