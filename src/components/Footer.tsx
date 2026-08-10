"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { FileText, MapIcon, Scale, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function Transparency() {
  const { t } = useLanguage();

  const usages = [
    { label: t.transparency.medical, value: 45 },
    { label: t.transparency.food, value: 30 },
    { label: t.transparency.shelter, value: 15 },
    { label: t.transparency.admin, value: 10 },
  ];

  const cards = [
    {
      title: t.transparency.registered,
      desc: t.transparency.registered_desc,
      icon: ShieldCheck,
    },
    {
      title: t.transparency.reports,
      desc: t.transparency.reports_desc,
      icon: FileText,
    },
    {
      title: t.transparency.zero_kill,
      desc: t.transparency.zero_kill_desc,
      icon: Scale,
    },
    {
      title: t.transparency.visit,
      desc: t.transparency.visit_desc,
      icon: MapIcon,
    },
  ];

  return (
    <section className="py-24 bg-gray-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-primary-400 font-bold tracking-widest text-sm mb-4 uppercase"
          >
            {t.transparency.tag}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {t.transparency.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-400"
          >
            {t.transparency.desc}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Progress Bars */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 p-8 md:p-12 rounded-[40px] border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-10 text-primary-400 uppercase tracking-tight">
              {t.transparency.fund_usage}
            </h3>
            <div className="space-y-8">
              {usages.map((usage, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between text-sm font-bold uppercase tracking-wider">
                    <span>{usage.label}</span>
                    <span className="text-primary-400">{usage.value}%</span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${usage.value}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.5,
                        ease: "easeOut",
                        delay: i * 0.1,
                      }}
                      className="h-full bg-primary-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-12 text-sm text-gray-500 italic">
              "Note: These percentages are calculated based on our annual
              audited financial statements."
            </p>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-[30px] bg-white/5 border border-white/5 hover:border-primary-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/20 text-primary-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all">
                  <card.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold mb-3">{card.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#1a2b4b] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Paw & Prints
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Helping stray and injured animals live better lives in Fatehabad,
              Haryana since 2021.
            </p>
            <div className="flex gap-4">
              {["FB", "TW", "IG", "YT"].map((social) => (
                <button
                  key={social}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold hover:bg-white hover:text-[#1a2b4b] transition-all"
                >
                  {social}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 uppercase tracking-widest text-primary-400">
              {t.footer.quick_links}
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary-400 transition-colors"
                >
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary-400 transition-colors"
                >
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href="/our-work"
                  className="hover:text-primary-400 transition-colors"
                >
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-400 transition-colors"
                >
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 uppercase tracking-widest text-primary-400">
              {t.footer.contact}
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li className="text-sm font-medium">{t.footer.address}</li>
              <li className="text-sm font-medium">{t.footer.phone}</li>
              <li className="text-sm font-medium">{t.footer.email}</li>
            </ul>
          </div>

          {/* <div>
            <h4 className="text-lg font-bold mb-8 uppercase tracking-widest text-primary-400">Stay Updated</h4>
            <div className="space-y-4">
              <p className="text-sm text-gray-400">Get rescue stories and updates from Fatehabad.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500 transition-colors pr-32"
                />
                <button className="absolute right-1 top-1 bottom-1 bg-primary-600 text-white rounded-lg px-4 text-xs font-bold hover:bg-primary-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div> */}
        </div>

        <div className="border-t border-white/5 pt-12 text-center text-gray-600 text-[10px] uppercase tracking-[0.2em]">
          <p>
            © 2026 Voiceless Animal Rescue Foundation. All Rights Reserved.
            Built with ❤️ for animals.
          </p>
        </div>
      </div>
    </footer>
  );
}
