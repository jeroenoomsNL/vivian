"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/translations";

const LANGUAGES: { code: Language; flag: string; label: string }[] = [
  { code: "nl", flag: "🇳🇱", label: "Nederlands" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "ar", flag: "🇦🇪", label: "العربية" },
  { code: "tr", flag: "🇹🇷", label: "Türkçe" },
  { code: "fa", flag: "🇮🇷", label: "فارسی" },
];

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRefDesktop = useRef<HTMLDivElement>(null);
  const langRefMobile = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        langRefDesktop.current &&
        !langRefDesktop.current.contains(target) &&
        langRefMobile.current &&
        !langRefMobile.current.contains(target)
      ) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === language)!;

  return (
    <nav
      className="bg-white text-gray-800 sticky top-0 z-50 shadow-md"
      role="navigation"
      aria-label="Hoofdnavigatie"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group shrink-0"
            aria-label="Vluchtelingenwerk Nederland - Ga naar homepage"
          >
            <Image
              src="/logo.svg"
              alt="Vluchtelingenwerk Nederland"
              width={160}
              height={40}
              priority
              className="h-10 md:h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink href="/">{t.nav.home}</NavLink>
            <NavLink href="/vrijwilliger">{t.nav.volunteer}</NavLink>
            <NavLink href="/evenementen">{t.nav.events}</NavLink>
            <NavLink href="/vacatures">{t.nav.jobs}</NavLink>

            {/* Language Popover */}
            <div className="relative ml-4" ref={langRefDesktop}>
              <button
                onClick={() => setLangOpen((o) => !o)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-800 text-gray-800 font-bold text-base hover:bg-gray-800 hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer"
                aria-label={t.nav.languageLabel}
                aria-expanded={langOpen}
              >
                <span>{currentLang.flag}</span>
                <span>{currentLang.code.toUpperCase()}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${langOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                        lang.code === language
                          ? "text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      style={
                        lang.code === language
                          ? { backgroundColor: "rgb(248 79 55 / 90%)" }
                          : {}
                      }
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile: Language + Hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <div className="relative" ref={langRefMobile}>
              <button
                onClick={() => setLangOpen((o) => !o)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-gray-800 text-gray-800 font-bold text-sm hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
                aria-label={t.nav.languageLabel}
                aria-expanded={langOpen}
              >
                <span>{currentLang.flag}</span>
                <span>{currentLang.code.toUpperCase()}</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                        lang.code === language
                          ? "text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      style={
                        lang.code === language
                          ? { backgroundColor: "rgb(248 79 55 / 90%)" }
                          : {}
                      }
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Menu openen"
            >
              <span className="block w-6 h-0.5 bg-gray-800 mb-1.5" />
              <span className="block w-6 h-0.5 bg-gray-800 mb-1.5" />
              <span className="block w-6 h-0.5 bg-gray-800" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden pb-4 border-t border-gray-200 mt-2"
          >
            <div className="flex flex-col gap-1 pt-4">
              <MobileNavLink href="/" onClick={() => setMenuOpen(false)}>
                {t.nav.home}
              </MobileNavLink>
              <MobileNavLink
                href="/vrijwilliger"
                onClick={() => setMenuOpen(false)}
              >
                {t.nav.volunteer}
              </MobileNavLink>
              <MobileNavLink
                href="/evenementen"
                onClick={() => setMenuOpen(false)}
              >
                {t.nav.events}
              </MobileNavLink>
              <MobileNavLink
                href="/vacatures"
                onClick={() => setMenuOpen(false)}
              >
                {t.nav.jobs}
              </MobileNavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded-lg text-base font-semibold text-gray-800 hover:text-white transition-colors duration-200 focus:outline-none"
      style={
        {
          "--hover-bg": "rgb(248 79 55 / 90%)",
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
          "rgb(248 79 55 / 90%)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "";
        (e.currentTarget as HTMLAnchorElement).style.color = "";
      }}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
    >
      {children}
    </Link>
  );
}
