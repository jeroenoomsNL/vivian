"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function EventsPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");

  const uniqueFilters = [
    { key: "all", label: t.events.filterAll },
    { key: "Training", label: t.events.filterTraining },
    {
      key: "Informatie_Information",
      label: t.events.filterInfo,
      types: ["Informatie", "Information"],
    },
    {
      key: "Activiteit_Activity",
      label: t.events.filterActivity,
      types: ["Activiteit", "Activity"],
    },
  ];

  const filteredEvents = t.events.eventList.filter((event) => {
    if (activeFilter === "all") return true;
    const filterObj = uniqueFilters.find((f) => f.key === activeFilter);
    if (!filterObj) return true;
    if (filterObj.types) return filterObj.types.includes(event.type);
    return event.type === activeFilter;
  });

  return (
    <>
      {/* Hero */}
      <section className="relative py-52 text-white text-center overflow-hidden">
        <Image
          src="/photos/azc_2025_vrouwen.jpg.webp"
          alt=""
          fill
          priority
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            {t.events.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            {t.events.subtitle}
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-10 bg-white border-b border-gray-200 sticky top-16 md:top-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex gap-3 flex-wrap"
            role="group"
            aria-label="Filter evenementen"
          >
            {uniqueFilters.map((f) => (
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

      {/* Events grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length === 0 ? (
            <p className="text-center text-xl text-gray-500 py-20">
              {t.events.noEvents}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <article
                  key={event.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden flex flex-col"
                >
                  {/* Card header */}
                  <div
                    className="p-5"
                    style={{ backgroundColor: "rgb(248 79 55 / 90%)" }}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-sm font-semibold">
                        {event.type}
                      </span>
                      <div className="flex gap-2">
                        {event.free && (
                          <span className="inline-block px-3 py-1 bg-white text-black rounded-full text-sm font-semibold">
                            {t.events.free}
                          </span>
                        )}
                        {event.online && (
                          <span className="inline-block px-3 py-1 bg-black/30 text-white rounded-full text-sm font-semibold">
                            {t.events.online}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 gap-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {event.title}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-base text-gray-700 flex items-center gap-2">
                        <span aria-hidden="true">📅</span> {event.date}
                      </p>
                      <p className="text-base text-gray-700 flex items-center gap-2">
                        <span aria-hidden="true">🕐</span> {event.time}
                      </p>
                      <p className="text-base text-gray-700 flex items-center gap-2">
                        <span aria-hidden="true">📍</span> {event.location}
                      </p>
                    </div>
                    <p className="text-base text-gray-600 leading-relaxed flex-1">
                      {event.description}
                    </p>
                    <button
                      className="mt-auto w-full py-3 rounded-xl text-white font-bold text-base transition-all duration-200 hover:opacity-90 focus:outline-none cursor-pointer"
                      style={{ backgroundColor: "rgb(248 79 55 / 90%)" }}
                    >
                      {t.events.register}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
