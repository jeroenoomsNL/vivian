"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer
      className="text-gray-800"
      style={{ backgroundColor: "#f4f4f4" }}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo.svg"
                alt="Vluchtelingenwerk Nederland"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-600 text-base leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 text-base transition-colors"
                >
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/vrijwilliger"
                  className="text-gray-600 hover:text-gray-900 text-base transition-colors"
                >
                  {t.nav.volunteer}
                </Link>
              </li>
              <li>
                <Link
                  href="/evenementen"
                  className="text-gray-600 hover:text-gray-900 text-base transition-colors"
                >
                  {t.nav.events}
                </Link>
              </li>
              <li>
                <Link
                  href="/vacatures"
                  className="text-gray-600 hover:text-gray-900 text-base transition-colors"
                >
                  {t.nav.jobs}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {t.footer.contact}
            </h3>
            <address className="not-italic space-y-2">
              <p className="text-gray-600 text-base">{t.footer.address}</p>
              <p>
                <a
                  href={`tel:${t.footer.phone.replace(/\s/g, "")}`}
                  className="text-gray-600 hover:text-gray-900 text-base transition-colors"
                >
                  {t.footer.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${t.footer.email}`}
                  className="text-gray-600 hover:text-gray-900 text-base transition-colors"
                >
                  {t.footer.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-300 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {year} Vluchtelingenwerk Nederland. {t.footer.rights}.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
            >
              {t.footer.terms}
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
            >
              {t.footer.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
