"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Globe, Heart, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showLangs, setShowLangs] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi (हिंदी)" },
    { code: "pb", name: "Punjabi (ਪੰਜਾਬੀ)" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <Heart className="text-white w-6 h-6 fill-current" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Paw & Prints</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">{t.nav.home}</Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">{t.nav.about}</Link>
            <Link href="/our-work" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">{t.nav.services}</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">{t.nav.contact}</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowLangs(!showLangs)}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
              >
                <Globe className="w-4 h-4" />
                {languages.find(l => l.code === language)?.name}
              </button>
              
              <AnimatePresence>
                {showLangs && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as "en" | "hi" | "pb");
                          setShowLangs(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          language === lang.code ? "bg-primary-50 text-primary-600 font-semibold" : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/donate">
              <button className="bg-primary-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-700 transition-all hover:shadow-lg active:scale-95">
                {t.nav.support}
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <Globe className="w-5 h-5" />
              </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link href="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">{t.nav.home}</Link>
              <Link href="/about" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">{t.nav.about}</Link>
              <Link href="/our-work" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">{t.nav.services}</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">{t.nav.contact}</Link>
              
              {/* Mobile Language Section */}
              <div className="pt-4 pb-2 border-t border-gray-100">
                <div className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Globe className="w-3 h-3" />
                    Select Language
                </div>
                <div className="flex flex-col gap-1">
                    {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as "en" | "hi" | "pb");
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-colors ${
                        language === lang.code ? "bg-primary-50 text-primary-600 font-bold" : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                        {lang.name}
                    </button>
                    ))}
                </div>
              </div>

              <div className="pt-4 px-4">
                <Link href="/donate" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-primary-600 text-white px-6 py-3 rounded-xl text-base font-semibold">
                    {t.nav.support}
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
