"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowRight, Play, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-50/50 rounded-l-[100px] -z-10" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              {t.hero.badge}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1]">
              Giving Voiceless Animals <br />
              <span className="text-primary-600">a Second Chance</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/our-work">
                <button className="px-8 py-4 bg-primary-600 text-white rounded-full font-bold inline-flex items-center gap-2 hover:bg-primary-700 transition-all hover:shadow-xl hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-primary-200">
                  {t.hero.cta_work}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/about">
                <button className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-100 rounded-full font-bold inline-flex items-center gap-2 hover:bg-gray-50 transition-all hover:border-primary-100">
                  <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                  {t.hero.cta_learn}
                </button>
              </Link>
            </div>

            {/* Simple Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-100">
              <div>
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-500 font-medium">{t.hero.stat_rescued}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">1,200+</div>
                <div className="text-sm text-gray-500 font-medium">{t.hero.stat_treated}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">80+</div>
                <div className="text-sm text-gray-500 font-medium">{t.hero.stat_adopted}</div>
              </div>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* The circular dog image frame */}
            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
              {/* Animated rings */}
              <div className="absolute inset-0 border-2 border-primary-200 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 border border-dashed border-primary-300 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
              
              {/* Image Container */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <Image 
                  src="/hero-dog.png" 
                  alt="Happy Dog" 
                  width={500} 
                  height={500} 
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* Float Cards */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 max-w-[180px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Health First</div>
                    <div className="text-[10px] text-gray-500">Vet checked weekly</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-12 -left-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 max-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                        <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" width={30} height={30} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">150+ Happy</div>
                    <div className="text-[10px] text-gray-500">Active Volunteers</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
