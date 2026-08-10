"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { Shield, Activity, Users, Home } from "lucide-react";

export function Impact() {
  const { t } = useLanguage();

  const stats = [
    { label: t.impact.stat1_label, value: t.impact.stat1, desc: t.impact.stat1_desc, icon: Home, bg: "bg-blue-50", color: "text-blue-600" },
    { label: t.impact.stat2_label, value: t.impact.stat2, desc: t.impact.stat2_desc, icon: Activity, bg: "bg-green-50", color: "text-green-600" },
    { label: t.impact.stat3_label, value: t.impact.stat3, desc: t.impact.stat3_desc, icon: Shield, bg: "bg-purple-50", color: "text-purple-600" },
    { label: t.impact.stat4_label, value: t.impact.stat4, desc: t.impact.stat4_desc, icon: Users, bg: "bg-orange-50", color: "text-orange-600" },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-600 font-bold tracking-widest text-sm mb-4"
          >
            {t.impact.tag}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            {t.impact.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            {t.impact.desc}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`${stat.bg} p-8 rounded-[40px] transition-all border border-transparent hover:border-white/20 relative group`}
            >
              <div className={`w-14 h-14 ${stat.color} bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-lg font-bold text-gray-800 mb-2">{stat.label}</div>
              <p className="text-gray-500 text-sm leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Highight Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gray-900 rounded-[50px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden"
        >
          {/* Subtle patterns */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl" />

          <div className="text-left space-y-2 relative z-10">
            <h3 className="text-white text-3xl font-bold">Trusted by Thousands.</h3>
            <p className="text-gray-400 max-w-md">Our commitment to 100% transparency ensures every penny counts towards a better life for animals.</p>
          </div>

          <div className="grid grid-cols-3 gap-8 md:gap-16 relative z-10">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{t.impact.banner_years}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">{t.impact.banner_years_label}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{t.impact.banner_volunteers}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">{t.impact.banner_volunteers_label}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{t.impact.banner_days}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">{t.impact.banner_days_label}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
