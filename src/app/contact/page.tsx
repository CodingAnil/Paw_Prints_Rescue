"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  MapPin,
  AlertCircle,
  Heart,
  Map as MapIcon,
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const { t } = useLanguage();
  const phoneNumber = "+919876543210";
  const whatsappUrl = "https://wa.me/919876543210";

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-blue-50/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary-600 font-bold tracking-widest text-sm mb-6 uppercase"
          >
            {t.contact_page.hero_tag}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight"
          >
            {t.contact_page.hero_title
              .split(". ")
              .map((part: string, i: number) => (
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
            {t.contact_page.hero_desc}
          </motion.p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContactCard
              icon={<Phone className="w-8 h-8" />}
              title={t.contact_page.card_call}
              sub={t.contact_page.card_call_sub}
              value="+91 98765 43210"
              color="bg-blue-600"
            />
            <ContactCard
              icon={<MessageCircle className="w-8 h-8" />}
              title={t.contact_page.card_wa}
              sub={t.contact_page.card_wa_sub}
              value="+91 98765 43210"
              color="bg-green-500"
            />
            <ContactCard
              icon={<MapPin className="w-8 h-8" />}
              title={t.contact_page.card_loc}
              sub={t.contact_page.card_loc_sub}
              value={t.contact_page.map_tag}
              color="bg-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#1a2b4b] rounded-[40px] p-10 md:p-16 text-center text-white relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary-500 rounded-full blur-3xl" />
            </div>

            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/20">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t.contact_page.emergency_title}
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              {t.contact_page.emergency_desc}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`tel:${phoneNumber}`}
                className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all flex items-center gap-2"
              >
                {t.contact_page.emergency_call}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-4 rounded-full font-bold hover:bg-green-600 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                {t.contact_page.emergency_wa}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simple Map Placeholder */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gray-50 rounded-[40px] h-64 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-8">
            <MapIcon className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900">
              {t.contact_page.map_tag}
            </h3>
            <p className="text-gray-500">{t.contact_page.map_sub}</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 text-center">
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          {t.contact_page.support_tag}
        </p>

        <Link href="/donate">
          <button className="bg-primary-600 text-white px-12 py-5 rounded-full font-bold flex items-center gap-2 mx-auto hover:bg-primary-700 transition-all shadow-xl shadow-primary-200 cursor-pointer">
            <Heart className="w-6 h-6 fill-current" />
            {t.donation.cta_support}
          </button>
        </Link>
      </section>

      <Footer />
    </main>
  );
}

function ContactCard({
  icon,
  title,
  sub,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  value: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-12 rounded-[40px] shadow-xl shadow-gray-200/50 border border-gray-100 text-center"
    >
      <div
        className={`w-16 h-16 ${color} text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-gray-200`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-6">{sub}</p>
      <div className="text-primary-600 font-extrabold text-xl tracking-tight">
        {value}
      </div>
    </motion.div>
  );
}
