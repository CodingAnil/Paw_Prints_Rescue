"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { CreditCard, Heart, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Donation() {
  const { t } = useLanguage();
  const [selectedAmount, setSelectedAmount] = useState("500");

  return (
    <section className="py-24 bg-primary-950 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80"
          alt="Pattern"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <div className="text-primary-500 font-bold tracking-widest text-sm mb-4 uppercase">
                {t.donation.tag}
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                {t.donation.title}
              </h2>
              <p className="text-xl text-primary-100/70 leading-relaxed">
                {t.donation.desc}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex items-center gap-4 text-white/80">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-primary-400" />
                </div>
                <span className="text-sm font-medium">{t.donation.trust}</span>
              </div>
              <div className="flex items-center gap-4 text-white/80">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-400" />
                </div>
                <span className="text-sm font-medium">Join 1k+ Supporters</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[50px] p-8 md:p-12 shadow-2xl relative"
          >
            {/* Float badge */}
            <div className="absolute -top-6 -right-6 bg-orange-500 text-white w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-xl rotate-12">
              <span className="text-xs uppercase font-bold text-white/80">
                Impact
              </span>
              <span className="text-lg font-bold">100%</span>
            </div>

            <div className="space-y-8">
              {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {t.donation.options.map((opt: any) => (
                  <button
                    key={opt.amount}
                    onClick={() => setSelectedAmount(opt.amount)}
                    className={`py-4 rounded-2xl font-bold text-lg transition-all border-2 ${
                      selectedAmount === opt.amount 
                      ? "bg-primary-600 border-primary-600 text-white shadow-xl shadow-primary-200 scale-105" 
                      : "bg-gray-50 border-gray-100 text-gray-900 hover:border-primary-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div> */}

              <Link href="/donate">
                <button className="w-full bg-primary-600 text-white py-5 rounded-2xl text-xl font-bold hover:bg-primary-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary-100 cursor-pointer">
                  <CreditCard className="w-6 h-6" />
                  {t.donation.cta_support}
                </button>
              </Link>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-400 uppercase font-bold tracking-widest text-xs">
                    Or
                  </span>
                </div>
              </div>

              <Link href="/contact">
                <button className="w-full bg-white text-primary-600 border-2 border-primary-100 py-5 rounded-2xl text-xl font-bold hover:bg-primary-50 transition-all flex items-center justify-center gap-3 cursor-pointer">
                  <Heart className="w-6 h-6" />
                  {t.donation.cta_volunteer}
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
