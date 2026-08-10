"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Activity, Soup, Ambulance } from "lucide-react";
import Link from "next/link";

export default function OurWorkPage() {
  const { t } = useLanguage();

  const sections = [
    {
      tag: t.work.rescue_tag,
      title: t.work.rescue_title,
      desc: t.work.rescue_desc,
      stat: t.work.rescue_stat,
      img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80",
      icon: <Ambulance className="w-6 h-6" />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      tag: t.work.feeding_tag,
      title: t.work.feeding_title,
      desc: t.work.feeding_desc,
      stat: t.work.feeding_stat,
      img: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80",
      icon: <Soup className="w-6 h-6" />,
      color: "bg-green-50 text-green-600",
      reverse: true,
    },
    {
      tag: t.work.medical_tag,
      title: t.work.medical_title,
      desc: t.work.medical_desc,
      stat: t.work.medical_stat,
      img: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80",
      icon: <Activity className="w-6 h-6" />,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-emerald-50/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary-600 font-bold tracking-widest text-sm mb-6 uppercase"
          >
            {t.work.hero_tag}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight"
          >
            {t.work.hero_title.split(". ").map((part: string, i: number) => (
              <span key={i} className="block">
                {part}
              </span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
          >
            {t.work.hero_desc}
          </motion.p>
        </div>
      </section>

      {/* Work Sections */}
      <div className="py-20 space-y-32">
        {sections.map((section, index) => (
          <section
            key={index}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${section.reverse ? "lg:flex-row-reverse" : ""}`}
            >
              <motion.div
                initial={{ opacity: 0, x: section.reverse ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`${section.reverse ? "lg:order-2" : ""} relative h-[450px] rounded-[50px] overflow-hidden shadow-2xl group`}
              >
                <Image
                  src={section.img}
                  alt={section.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: section.reverse ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={section.reverse ? "lg:order-1" : ""}
              >
                <div className="space-y-6">
                  <div className="text-primary-600 font-bold text-sm tracking-widest uppercase">
                    {section.tag}
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {section.desc}
                  </p>

                  <div className="inline-flex items-center gap-4 bg-primary-50 px-6 py-3 rounded-2xl border border-primary-100">
                    <div
                      className={`w-10 h-10 rounded-xl ${section.color} flex items-center justify-center`}
                    >
                      {section.icon}
                    </div>
                    <div className="font-bold text-gray-900">
                      {section.stat}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        ))}
      </div>

      {/* Bottom CTA */}
      <section className="py-24 bg-primary-50/30">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-10">
          <h2 className="text-4xl font-bold text-gray-900">
            {t.work.cta_banner}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t.work.cta_banner_desc}
          </p>
          <Link href="/donate">
            <button className="bg-primary-600 text-white px-12 py-5 rounded-full font-extrabold text-lg flex items-center gap-3 mx-auto hover:bg-primary-700 transition-all shadow-xl shadow-primary-200 active:scale-95 cursor-pointer">
              <Heart className="w-6 h-6 fill-current" />
              {t.donation.cta_support}
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
