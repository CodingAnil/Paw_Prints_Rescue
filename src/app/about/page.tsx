"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Users, Shield, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* About Hero */}
      <section className="pt-32 pb-20 bg-emerald-50/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary-600 font-bold tracking-widest text-sm mb-6 uppercase"
          >
            {t.about.hero_tag}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight"
          >
            {t.about.hero_title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
          >
            {t.about.hero_desc}
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80"
                alt="Animal Rescue"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <div className="text-primary-600 font-bold text-sm mb-4 uppercase">
                  {t.about.story_tag}
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {t.about.story_title}
                </h2>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>{t.about.story_desc}</p>
                  <p>{t.about.story_extra}</p>
                </div>
              </div>

              <Link href="/donate">
                <button className="bg-primary-600 text-white px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 cursor-pointer">
                  <Heart className="w-5 h-5 fill-current" />
                  {t.about.cta_donate}
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-primary-600 font-bold text-sm mb-2 uppercase">
              {t.about.drive_tag}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.about.drive_title}
            </h2>
            <p className="text-gray-500">{t.about.drive_subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Heart className="w-8 h-8 text-blue-500" />}
              title={t.about.value1_title}
              desc={t.about.value1_desc}
            />
            <ValueCard
              icon={
                <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🐾</span>
                </div>
              }
              title={t.about.value2_title}
              desc={t.about.value2_desc}
            />
            <ValueCard
              icon={<Shield className="w-8 h-8 text-primary-500" />}
              title={t.about.value3_title}
              desc={t.about.value3_desc}
            />
          </div>
        </div>
      </section>

      {/* Join Mission */}
      <section className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t.about.mission_title}
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            {t.about.mission_desc}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/donate">
              <button className="bg-primary-600 text-white px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 cursor-pointer">
                <Heart className="w-5 h-5 fill-current" />
                {t.about.cta_donate}
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-white text-gray-700 border-2 border-gray-200 px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-gray-50 transition-all cursor-pointer">
                <MessageCircle className="w-5 h-5" />
                {t.about.cta_contact}
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ValueCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-10 rounded-[30px] shadow-xl shadow-gray-200/50 border border-gray-100/50"
    >
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </motion.div>
  );
}
