"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";

export function Process() {
  const { t } = useLanguage();

  const steps = [
    { title: t.process.step1, desc: t.process.step1_desc, img: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80" },
    { title: t.process.step2, desc: t.process.step2_desc, img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80" },
    { title: t.process.step3, desc: t.process.step3_desc, img: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80" },
    { title: t.process.step4, desc: t.process.step4_desc, img: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80" },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-600 font-bold tracking-widest text-sm mb-4 uppercase"
          >
            {t.process.tag}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            {t.process.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            {t.process.desc}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group"
            >
              <div className="relative mb-10">
                 {/* Step number badge */}
                 <div className="absolute -top-4 left-6 w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-xl z-20 group-hover:scale-110 transition-transform group-hover:rotate-6">
                   {i + 1}
                 </div>
                 
                 <div className="aspect-square rounded-[40px] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 relative">
                   <div className="absolute inset-0 bg-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                   <Image 
                     src={step.img} 
                     alt={step.title} 
                     width={400} 
                     height={400} 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                   />
                 </div>
              </div>

              <div className="px-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
