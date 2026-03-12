"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function JobsPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const filters = [
    { key: "all", label: t.jobs.filterAll },
    { key: "Fulltime", label: t.jobs.filterFullTime },
    { key: "Parttime", label: t.jobs.filterPartTime },
    { key: "Stage", label: t.jobs.filterInternship },
  ];

  const filteredJobs = t.jobs.jobList.filter((job) => {
    if (activeFilter === "all") return true;
    return job.type === activeFilter;
  });

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
            {t.jobs.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">{t.jobs.subtitle}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10 bg-white border-b border-gray-200 sticky top-16 md:top-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex gap-3 flex-wrap"
            role="group"
            aria-label="Filter vacatures"
          >
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-5 py-2.5 rounded-full font-semibold text-base transition-all duration-200 focus:outline-none cursor-pointer ${
                  activeFilter === f.key
                    ? "text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                style={
                  activeFilter === f.key
                    ? { backgroundColor: "rgb(248 79 55 / 90%)" }
                    : undefined
                }
                aria-pressed={activeFilter === f.key}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredJobs.length === 0 ? (
            <p className="text-center text-xl text-gray-500 py-20">
              {t.jobs.noJobs}
            </p>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <article
                  key={job.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden"
                >
                  <button
                    className="w-full text-left p-6 focus:outline-none cursor-pointer"
                    onClick={() =>
                      setExpandedJob(expandedJob === job.id ? null : job.id)
                    }
                    aria-expanded={expandedJob === job.id}
                    aria-controls={`job-details-${job.id}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                            style={{
                              backgroundColor: "rgb(248 79 55 / 90%)",
                            }}
                          >
                            {job.type}
                          </span>
                          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700">
                            {job.department}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {job.title}
                        </h3>
                      </div>
                      <div className="flex flex-col sm:items-end gap-1 text-gray-600">
                        <span className="flex items-center gap-1 text-base">
                          📍 {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-base font-semibold">
                          🕐 {job.hours} {t.jobs.hoursPerWeek}
                        </span>
                      </div>
                    </div>
                  </button>

                  {expandedJob === job.id && (
                    <div
                      id={`job-details-${job.id}`}
                      className="px-6 pb-6 border-t border-gray-100 pt-4"
                    >
                      <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        {job.description}
                      </p>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">
                        Vereisten:
                      </h4>
                      <ul className="space-y-2 mb-6">
                        {job.requirements.map((req) => (
                          <li
                            key={req}
                            className="flex items-center gap-3 text-base text-gray-700"
                          >
                            <span
                              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
                              style={{
                                backgroundColor: "rgb(248 79 55 / 90%)",
                              }}
                              aria-hidden="true"
                            >
                              ✓
                            </span>
                            {req}
                          </li>
                        ))}
                      </ul>
                      <button
                        className="px-8 py-3 rounded-xl text-white font-bold text-base transition-all duration-200 hover:opacity-90 focus:outline-none cursor-pointer"
                        style={{
                          backgroundColor: "rgb(248 79 55 / 90%)",
                        }}
                      >
                        {t.jobs.apply} →
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
