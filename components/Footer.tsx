"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xl"
                style={{ backgroundColor: "rgb(248 79 55 / 90%)" }}
                aria-hidden="true"
              >
                V
              </div>
              <span className="text-xl font-bold">
                <span style={{ color: "rgb(248 79 55 / 90%)" }}>
                  Vluchtelingen
                </span>
                werk
              </span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white text-base transition-colors"
                >
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/vrijwilliger"
                  className="text-gray-300 hover:text-white text-base transition-colors"
                >
                  {t.nav.volunteer}
                </Link>
              </li>
              <li>
                <Link
                  href="/evenementen"
                  className="text-gray-300 hover:text-white text-base transition-colors"
                >
                  {t.nav.events}
                </Link>
              </li>
              <li>
                <Link
                  href="/vacatures"
                  className="text-gray-300 hover:text-white text-base transition-colors"
                >
                  {t.nav.jobs}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t.footer.contact}</h3>
            <address className="not-italic space-y-2">
              <p className="text-gray-300 text-base">{t.footer.address}</p>
              <p>
                <a
                  href={`tel:${t.footer.phone.replace(/\s/g, "")}`}
                  className="text-gray-300 hover:text-white text-base transition-colors"
                >
                  {t.footer.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${t.footer.email}`}
                  className="text-gray-300 hover:text-white text-base transition-colors"
                >
                  {t.footer.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {year} Vluchtelingenwerk Nederland. {t.footer.rights}.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              {t.footer.terms}
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              {t.footer.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
