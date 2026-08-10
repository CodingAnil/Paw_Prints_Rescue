"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

export function SuccessStories() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("Rescue");

  const tabs = ["Rescue", "Care", "Adopt"];

  const stories: Record<string, any> = {
    Rescue: {
      name: "Bruno's Journey",
      story:
        "Found shivering and malnourished in a rainy alleyway, Bruno's eyes told a story of hardship. After months of care, he is now a healthy, happy pup ready for a home.",
      img: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80",
      stats: { age: "2 Years", health: "Recovered" },
    },
    Care: {
      name: "Maya's Recovery",
      story:
        "Maya arrived with a severe leg injury. Our medical team worked tirelessly for 3 months to help her walk again. Today, she runs faster than anyone at the shelter.",
      img: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80",
      stats: { age: "4 Years", health: "Active" },
    },
    Adopt: {
      name: "Luna's New Family",
      story:
        "Luna spent 500 days at our shelter before finding her perfect match. She now lives in a cozy home with two kids who absolutely adore her.",
      img: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80",
      stats: { age: "1 Year", health: "Adopted" },
    },
  };

  const activeStory = stories[activeTab];

  return (
    <section className="py-24 bg-primary-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-primary-600 font-bold tracking-widest text-sm mb-4 uppercase">
            SUCCESS STORIES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Stories that <span className="text-primary-600">remind us</span> why
            we do this
          </h2>
        </div>

        {/* Custom Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                activeTab === tab
                  ? "bg-primary-600 text-white shadow-lg"
                  : "bg-white text-gray-400 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-[50px] overflow-hidden shadow-2xl shadow-primary-900/5"
          >
            <div className="relative h-[400px] md:h-[600px]">
              <Image
                src={activeStory.img}
                alt={activeStory.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </div>

            <div className="p-8 md:p-16 space-y-8">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-8">
                <Quote className="w-8 h-8 fill-current" />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {activeStory.name}
                </h3>
                <p className="text-xl text-gray-600 leading-relaxed italic">
                  "{activeStory.story}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 py-8 border-y border-gray-100">
                <div>
                  <div className="text-sm text-gray-400 uppercase font-bold tracking-widest mb-1">
                    Age
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {activeStory.stats.age}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 uppercase font-bold tracking-widest mb-1">
                    Condition
                  </div>
                  <div className="text-xl font-bold text-primary-600">
                    {activeStory.stats.health}
                  </div>
                </div>
              </div>

              {/* <button className="bg-primary-600 text-white px-8 py-3 rounded-full font-bold inline-flex items-center gap-2 hover:bg-primary-700 transition-all shadow-lg shadow-primary-100 active:scale-95">
                Read Full Story
                <span className="text-xl">→</span>
              </button> */}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
