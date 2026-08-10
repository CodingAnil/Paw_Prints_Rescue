"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function OurStory() {
  const { t } = useLanguage();

  const features = [
    { title: t.story.feature1, desc: t.story.feature1_desc },
    { title: t.story.feature2, desc: t.story.feature2_desc },
    { title: t.story.feature3, desc: t.story.feature3_desc },
  ];

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 relative"
          >
             {/* Float year badge */}
             <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-8 py-4 rounded-2xl shadow-2xl z-20 font-bold flex items-center gap-3">
               <span className="text-3xl">3+</span>
               <span className="text-sm border-l border-white/30 pl-3 leading-tight uppercase tracking-widest">Years of <br /> Service</span>
             </div>

            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-500">
                <Image src="https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?auto=format&fit=crop&q=80" alt="Dog 1" width={400} height={500} className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/4] rounded-[40px] overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-500">
                <Image src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80" alt="Dog 2" width={400} height={400} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="aspect-[4/4] rounded-[40px] overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-500">
                <Image src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80" alt="Dog 3" width={400} height={400} className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-500">
                <Image src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80" alt="Dog 4" width={400} height={500} className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <div className="text-primary-600 font-bold tracking-widest text-sm mb-4 uppercase">{t.story.tag}</div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {t.story.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed italic border-l-4 border-primary-500 pl-6">
                {t.story.description}
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, i) => (
                <div key={i} className="flex gap-4 group p-4 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-gray-900">{feature.title}</h4>
                    <p className="text-gray-500 group-hover:text-gray-600 transition-colors">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
