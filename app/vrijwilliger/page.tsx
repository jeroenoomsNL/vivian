"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function VolunteerPage() {
  const { t } = useLanguage();

  const roles = [
    { title: t.volunteer.role1, desc: t.volunteer.role1Desc, icon: "💬" },
    { title: t.volunteer.role2, desc: t.volunteer.role2Desc, icon: "🤝" },
    { title: t.volunteer.role3, desc: t.volunteer.role3Desc, icon: "⚖️" },
    { title: t.volunteer.role4, desc: t.volunteer.role4Desc, icon: "🎯" },
  ];

  const whyCards = [
    {
      title: t.volunteer.why1Title,
      text: t.volunteer.why1Text,
      icon: "🌱",
    },
    {
      title: t.volunteer.why2Title,
      text: t.volunteer.why2Text,
      icon: "🌍",
    },
    {
      title: t.volunteer.why3Title,
      text: t.volunteer.why3Text,
      icon: "💥",
    },
  ];

  const requirements = [
    t.volunteer.req1,
    t.volunteer.req2,
    t.volunteer.req3,
    t.volunteer.req4,
  ];

  return (
    <>
      {/* Hero */}
      <section
        className="py-24 text-white text-center"
        style={{
          background:
            "linear-gradient(135deg, #000000 0%, #1a1a1a 60%, #2d0c06 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            {t.volunteer.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            {t.volunteer.heroText}
          </p>
        </div>
      </section>

      {/* Why */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
            {t.volunteer.whyTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyCards.map((card) => (
              <div
                key={card.title}
                className="p-8 rounded-2xl border-2 border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-200 text-center"
              >
                <span className="text-6xl mb-4 block" aria-hidden="true">
                  {card.icon}
                </span>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {card.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
            {t.volunteer.rolesTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role) => (
              <div
                key={role.title}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-200 text-center"
              >
                <span className="text-5xl mb-4 block" aria-hidden="true">
                  {role.icon}
                </span>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {role.title}
                </h3>
                <p className="text-base text-gray-600">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-10">
            {t.volunteer.requirementsTitle}
          </h2>
          <ul className="space-y-4 text-left max-w-lg mx-auto">
            {requirements.map((req) => (
              <li key={req} className="flex items-center gap-4 text-xl">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold"
                  style={{ backgroundColor: "rgb(248 79 55 / 90%)" }}
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="text-gray-200">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 text-center"
        style={{ backgroundColor: "rgb(248 79 55 / 90%)" }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            {t.volunteer.subtitle}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Chat met Vivian om te ontdekken welke rol het beste bij jou past.
          </p>
          <button
            onClick={() => {
              // Trigger chatbot open via custom event
              window.dispatchEvent(new CustomEvent("open-vivian"));
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-xl rounded-xl hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
          >
            💬 {t.volunteer.ctaButton}
          </button>
        </div>
      </section>
    </>
  );
}
