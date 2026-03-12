"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { t } = useLanguage();
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.city) setLocation(data.city);
      })
      .catch(() => {});
  }, []);

  const stats = [
    { value: "4.000+", label: t.home.statsVolunteers },
    { value: "70.000+", label: t.home.statsRefugees },
    { value: "30", label: t.home.statsRegions },
    { value: "45", label: t.home.statsYears },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-[64vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        aria-label="Hero sectie"
      >
        {/* Background image */}
        <Image
          src="/photos/poster.webp"
          alt=""
          fill
          priority
          className="object-cover object-center"
          aria-hidden="true"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

        {location && (
          <div
            className="relative mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-base border border-white/20 backdrop-blur-sm"
            aria-live="polite"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              style={{ color: "rgb(248 79 55 / 90%)" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>
              {t.home.nearYou}: <strong>{location}</strong>
            </span>
          </div>
        )}

        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            {t.home.heroTitle}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.home.heroSubtitle}
          </p>

          <button
            onClick={() =>
              globalThis.dispatchEvent(new CustomEvent("open-vivian"))
            }
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-extrabold text-2xl shadow-2xl transition-all duration-200 hover:scale-105 focus:outline-none cursor-pointer"
            style={{ backgroundColor: "rgb(248 79 55 / 90%)" }}
            aria-label={t.home.heroCta}
          >
            💬 {t.home.heroCta}
          </button>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-white/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section
        className="py-16 bg-white"
        style={{ borderBottom: "4px solid rgb(248 79 55 / 90%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-5xl font-extrabold mb-2"
                  style={{ color: "rgb(248 79 55 / 90%)" }}
                >
                  {stat.value}
                </div>
                <div className="text-gray-600 text-lg font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SectionCard
              icon="🤝"
              title={t.home.section1Title}
              text={t.home.section1Text}
              link="/vrijwilliger"
              linkText={t.home.section1Link}
              accent
            />
            <SectionCard
              icon="📅"
              title={t.home.section2Title}
              text={t.home.section2Text}
              link="/evenementen"
              linkText={t.home.section2Link}
            />
            <SectionCard
              icon="💼"
              title={t.home.section3Title}
              text={t.home.section3Text}
              link="/vacatures"
              linkText={t.home.section3Link}
            />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-20 text-white text-center"
        style={{ backgroundColor: "rgb(248 79 55 / 90%)" }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Klaar om te beginnen?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-white/90">
            Chat met Vivian en ontdek welke vrijwilligersrol bij jou past.
          </p>
          <Link
            href="/vrijwilliger"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-xl rounded-xl hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
          >
            {t.home.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}

function SectionCard({
  icon,
  title,
  text,
  link,
  linkText,
  accent,
}: {
  icon: string;
  title: string;
  text: string;
  link: string;
  linkText: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-8 flex flex-col gap-4 shadow-md hover:shadow-xl transition-shadow duration-200 ${
        accent ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      <span className="text-5xl" aria-hidden="true">
        {icon}
      </span>
      <h3
        className={`text-2xl font-bold ${accent ? "text-white" : "text-gray-900"}`}
      >
        {title}
      </h3>
      <p
        className={`text-lg leading-relaxed flex-1 ${accent ? "text-gray-300" : "text-gray-600"}`}
      >
        {text}
      </p>
      <Link
        href={link}
        className="inline-flex items-center gap-2 font-bold text-base mt-2"
        style={{ color: "rgb(248 79 55 / 90%)" }}
      >
        {linkText}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </div>
  );
}
