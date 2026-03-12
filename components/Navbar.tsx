"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { t, toggleLanguage, language } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="bg-black text-white sticky top-0 z-50 shadow-md"
      role="navigation"
      aria-label="Hoofdnavigatie"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Vluchtelingenwerk Nederland - Ga naar homepage"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xl"
              style={{ backgroundColor: "rgb(248 79 55 / 90%)" }}
              aria-hidden="true"
            >
              V
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight">
              <span style={{ color: "rgb(248 79 55 / 90%)" }}>Vluchtelingen</span>
              <span className="text-white">werk</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink href="/">{t.nav.home}</NavLink>
            <NavLink href="/vrijwilliger">{t.nav.volunteer}</NavLink>
            <NavLink href="/evenementen">{t.nav.events}</NavLink>
            <NavLink href="/vacatures">{t.nav.jobs}</NavLink>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="ml-4 px-4 py-2 rounded-full border-2 border-white text-white font-bold text-base hover:bg-white hover:text-black transition-colors duration-200 focus:outline-none"
              aria-label={t.nav.languageLabel}
            >
              {t.nav.language}
            </button>
          </div>

          {/* Mobile: Language + Hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-full border-2 border-white text-white font-bold text-sm hover:bg-white hover:text-black transition-colors"
              aria-label={t.nav.languageLabel}
            >
              {t.nav.language}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Menu openen"
            >
              <span className="block w-6 h-0.5 bg-white mb-1.5" />
              <span className="block w-6 h-0.5 bg-white mb-1.5" />
              <span className="block w-6 h-0.5 bg-white" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden pb-4 border-t border-white/20 mt-2"
          >
            <div className="flex flex-col gap-1 pt-4">
              <MobileNavLink
                href="/"
                onClick={() => setMenuOpen(false)}
              >
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
      className="px-4 py-2 rounded-lg text-base font-semibold text-white hover:text-black transition-colors duration-200 focus:outline-none"
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
      className="block px-4 py-3 text-lg font-semibold text-white hover:bg-white/10 rounded-lg transition-colors"
    >
      {children}
    </Link>
  );
}
