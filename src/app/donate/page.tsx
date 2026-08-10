"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MessageCircle,
  CreditCard,
  QrCode,
  Heart,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

export default function DonatePage() {
  const { t } = useLanguage();
  const phoneNumber = "+919876543210";
  const whatsappUrl = "https://wa.me/919876543210";

  const scriptFirst = process.env.NEXT_PUBLIC_DONATION_SCRIPT_URL_FIRST ?? "";
  const scriptSecond = process.env.NEXT_PUBLIC_DONATION_SCRIPT_URL_SECOND ?? "";

  const activeScriptKey = process.env.NEXT_PUBLIC_DONATION_FILE_USED;
  const scriptURL =
    activeScriptKey === "paw&prints" ? scriptFirst : scriptSecond;

  const methodSectionRef = useRef<HTMLElement | null>(null);

  // Cashfree checkout states
  const [cashfree, setCashfree] = useState<any>(null);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [verifiedOrderDetails, setVerifiedOrderDetails] = useState<{
    order_id: string;
    amount: number;
    name: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Load Cashfree Client SDK dynamically on mount
  useEffect(() => {
    const initCashfree = async () => {
      try {
        const { load } = await import("@cashfreepayments/cashfree-js");
        const mode = process.env.NEXT_PUBLIC_CASHFREE_ENV === "PRODUCTION" ? "production" : "sandbox";
        console.log("Initializing Cashfree SDK in mode:", mode);
        const cfInstance = await load({ mode });
        setCashfree(cfInstance);
      } catch (err) {
        console.error("Failed to load Cashfree SDK:", err);
      }
    };
    initCashfree();
  }, []);

  // Poll verification status if redirected back with an order_id
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const orderId = queryParams.get("order_id");
    const source = queryParams.get("source");

    if (orderId) {
      setVerificationStatus("verifying");
      
      // Scroll to method section for status display
      setTimeout(() => {
        methodSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);

      fetch(`/api/donate/verify?order_id=${orderId}${source ? `&source=${source}` : ""}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.payment_success) {
            setVerificationStatus("success");
            setVerifiedOrderDetails({
              order_id: data.order_id,
              amount: data.order_amount,
              name: data.customer_details?.customer_name || "Generous Donor",
            });
          } else {
            setVerificationStatus("error");
            setSubmitMessage({
              type: "error",
              text: `Payment is not marked as paid. Status: ${data.order_status || "UNKNOWN"}`,
            });
          }
        })
        .catch((err) => {
          console.error("Payment status verification error:", err);
          setVerificationStatus("error");
          setSubmitMessage({
            type: "error",
            text: "Could not verify payment status due to a connection error. Please contact us with your Order ID.",
          });
        });
    }
  }, []);

  useEffect(() => {
    // Only scroll to methods section if we are not verifying an order
    const queryParams = new URLSearchParams(window.location.search);
    if (!queryParams.get("order_id")) {
      const timer = window.setTimeout(() => {
        methodSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const impactItems = [
    { label: "₹100", desc: t.donate_page.impact_100, icon: "🦴" },
    { label: "₹300", desc: t.donate_page.impact_300, icon: "🩹" },
    { label: "₹500", desc: t.donate_page.impact_500, icon: "💊" },
    { label: "₹1000", desc: t.donate_page.impact_1000, icon: "💉" },
    { label: "₹2500", desc: t.donate_page.impact_2500, icon: "🏥" },
    { label: "₹5000", desc: t.donate_page.impact_5000, icon: "🐕" },
  ];

  const handleInputChange = (field: "name" | "email" | "phone" | "amount", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDonationInfoSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setSubmitMessage(null);

    const { amount, name, email, phone } = formData;

    if (!cashfree) {
      setSubmitMessage({
        type: "error",
        text: "Payment gateway is initializing. Please wait a moment and try again.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/donate/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          name,
          email,
          phone,
          source: activeScriptKey,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate transaction.");
      }

      console.log("Cashfree session created successfully, launching checkout:", data.payment_session_id);

      // Trigger Cashfree web checkout
      await cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_self",
      });

    } catch (err: any) {
      console.error("Donation checkout creation failed:", err);
      setSubmitMessage({
        type: "error",
        text: err.message || "Something went wrong while setting up payment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/80 to-gray-900" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-primary-400 font-bold tracking-widest text-sm mb-6 uppercase"
          >
            {t.donate_page.hero_tag}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-8 leading-tight"
          >
            {t.donate_page.hero_title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            {t.donate_page.hero_desc}
          </motion.p>
          <button className="bg-primary-600 text-white px-10 py-4 rounded-full font-bold flex items-center gap-2 mx-auto hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20">
            <Heart className="w-5 h-5 fill-current" />
            {t.donation.cta_support}
          </button>
        </div>
      </section>

      {/* Methods Section */}
      <section ref={methodSectionRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.donate_page.method_title}
            </h2>
            <p className="text-gray-500">{t.donate_page.method_sub}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Method Card: UPI */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-blue-50/50 p-10 rounded-[40px] border border-blue-100 flex flex-col md:flex-row gap-8"
            >
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shrink-0">
                <CreditCard className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t.donate_page.upi_title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t.donate_page.upi_desc}
                </p>
                <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm inline-block">
                  <div className="text-xs font-bold text-blue-600 uppercase mb-1 tracking-widest">
                    UPI ID
                  </div>
                  <div className="text-2xl font-black text-gray-900 tracking-tight">
                    {t.donate_page.upi_id}
                  </div>
                  <p className="text-xs text-gray-400 mt-2 italic">
                    Copy and paste in your UPI app
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Method Card: QR */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-green-50/50 p-10 rounded-[40px] border border-green-100 flex flex-col md:flex-row gap-8"
            >
              <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center shrink-0">
                <QrCode className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t.donate_page.qr_title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t.donate_page.qr_desc}
                </p>
                <div className="bg-white p-4 rounded-2xl border border-green-100 shadow-sm inline-block">
                  <div className="w-32 h-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <QrCode className="w-16 h-16 text-gray-200" />
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 text-[10px] font-bold text-gray-400 uppercase text-center p-2">
                      Official QR Code Placeholder
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2 text-center font-bold uppercase tracking-widest">
                    Scan with GPay or PhonePe
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {verificationStatus === "verifying" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-primary-50/50 p-12 rounded-[40px] border border-primary-100 mb-8 text-center"
            >
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
                <h3 className="text-2xl font-bold text-gray-900">Verifying Payment Status</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Please wait while we verify your transaction with Cashfree. This should only take a few moments. Do not refresh or close this page.
                </p>
              </div>
            </motion.div>
          )}

          {verificationStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary-50/50 p-12 rounded-[40px] border border-primary-100 mb-8 text-center"
            >
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black text-gray-900">Donation Successful!</h3>
                <p className="text-xl text-primary-800 font-semibold">
                  Thank you, {verifiedOrderDetails?.name}!
                </p>
                <div className="bg-white p-6 rounded-2xl border border-primary-100 shadow-sm inline-block text-left w-full max-w-md space-y-3">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500 font-medium">Order ID</span>
                    <span className="text-gray-900 font-bold font-mono text-sm">{verifiedOrderDetails?.order_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Amount Contributed</span>
                    <span className="text-primary-600 font-black text-lg">₹{verifiedOrderDetails?.amount}</span>
                  </div>
                </div>
                <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                  Your donation is already in action! 100% of this contribution goes directly toward rescuing and feeding animals in Fatehabad.
                </p>
                <button
                  onClick={() => {
                    setVerificationStatus("idle");
                    setVerifiedOrderDetails(null);
                    window.history.pushState({}, document.title, window.location.pathname);
                  }}
                  className="bg-primary-600 text-white px-8 py-4 rounded-full font-bold hover:bg-primary-700 transition-all shadow-md shadow-primary-600/10 cursor-pointer"
                >
                  Make Another Donation
                </button>
              </div>
            </motion.div>
          )}

          {verificationStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 p-12 rounded-[40px] border border-red-100 mb-8 text-center"
            >
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="w-20 h-20 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-10 h-10 rotate-180" />
                </div>
                <h3 className="text-3xl font-black text-gray-900">Payment Failed</h3>
                <p className="text-gray-700 max-w-md mx-auto">
                  {submitMessage?.text || "We couldn't verify or process your payment with Cashfree. Please try again or contact us if you need help."}
                </p>
                <button
                  onClick={() => {
                    setVerificationStatus("idle");
                    setSubmitMessage(null);
                    window.history.pushState({}, document.title, window.location.pathname);
                  }}
                  className="bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 transition-all shadow-md shadow-red-600/10 cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          )}

          {verificationStatus === "idle" && (
            <motion.form
              whileHover={{ y: -5 }}
              className="bg-primary-50/30 p-10 rounded-[40px] border border-primary-100 mb-8"
              onSubmit={handleDonationInfoSubmit}
            >
              <div className="flex flex-col lg:flex-row lg:items-end gap-6 mb-6">
                <div className="lg:flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Donate Online with Cashfree
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Provide your contact details and donation amount below. You can pay securely using UPI, Credit/Debit cards, Net Banking, or Wallets.
                  </p>
                </div>
              </div>

              {/* Preset buttons */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
                {[100, 300, 500, 1000, 2500, 5000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleInputChange("amount", amt.toString())}
                    className={`py-3 rounded-2xl font-bold transition-all border cursor-pointer ${
                      formData.amount === amt.toString()
                        ? "bg-primary-600 border-primary-600 text-white shadow-md shadow-primary-600/20"
                        : "bg-white border-primary-100 text-gray-700 hover:border-primary-300"
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(event) => handleInputChange("name", event.target.value)}
                    placeholder="E.g., Rahul Sharma"
                    className="w-full bg-white border border-primary-100 rounded-2xl px-5 py-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(event) => handleInputChange("email", event.target.value)}
                    placeholder="E.g., rahul@example.com"
                    className="w-full bg-white border border-primary-100 rounded-2xl px-5 py-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(event) => handleInputChange("phone", event.target.value)}
                    placeholder="10-digit Mobile Number"
                    className="w-full bg-white border border-primary-100 rounded-2xl px-5 py-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Donation Amount (INR)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.amount}
                    onChange={(event) => handleInputChange("amount", event.target.value)}
                    placeholder="Amount (Rs)"
                    className="w-full bg-white border border-primary-100 rounded-2xl px-5 py-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Secured by Cashfree Payments Gateway
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary-600 text-white px-10 py-4 rounded-full font-bold hover:bg-primary-700 transition-all w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary-600/10 cursor-pointer"
                >
                  <Heart className="w-5 h-5 fill-current" />
                  {isSubmitting ? "Processing..." : "Proceed to Payment"}
                </button>
              </div>

              <div className="mt-4">
                {submitMessage && (
                  <p
                    className={`text-sm font-semibold ${submitMessage.type === "success" ? "text-emerald-700" : "text-red-600"}`}
                    role="status"
                  >
                    {submitMessage.text}
                  </p>
                )}
              </div>
            </motion.form>
          )}

          {/* Method Card: Help */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-emerald-50/30 p-10 rounded-[40px] border border-emerald-100 flex flex-col md:flex-row items-center gap-8 text-center md:text-left"
          >
            <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shrink-0">
              <Phone className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t.donate_page.wa_title}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-xl">
                {t.donate_page.wa_desc}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${phoneNumber}`}
                className="bg-emerald-50 text-emerald-600 px-8 py-4 rounded-full font-bold border border-emerald-100"
              >
                +91 98765 43210
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                {t.contact_page.emergency_wa}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.donate_page.impact_title}
            </h2>
            <p className="text-gray-500">{t.donate_page.impact_sub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactItems.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[30px] border border-gray-100 shadow-sm flex flex-col items-center text-center group"
              >
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">
                  {item.icon}
                </div>
                <div className="text-2xl font-black text-primary-600 mb-2">
                  {item.label}
                </div>
                <p className="text-gray-600 font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-primary-600 font-bold tracking-widest text-sm mb-4 uppercase">
              FAQs
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.donate_page.faq_title}
            </h2>
            <p className="text-gray-500">{t.donate_page.faq_sub}</p>
          </div>

          <div className="space-y-4">
            {t.donate_page.faqs.map((faq: any, i: number) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-6">
              Still have questions? We're happy to help.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 mx-auto hover:grayscale-[0.2] transition-all w-fit"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              {t.donate_page.wa_help}
            </a>
          </div>
        </div>
      </section>

      {/* Trust Note */}
      <section className="py-12 bg-emerald-50 text-emerald-700">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-center gap-3 font-bold text-sm text-center italic">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          {t.donate_page.trust_note}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-gray-900 hover:bg-gray-100/50 transition-colors"
      >
        <span>{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-5 text-gray-600 leading-relaxed"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
