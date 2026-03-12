"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { Language, translations } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (typeof translations)[Language];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("nl");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "nl" ? "en" : "nl"));
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
