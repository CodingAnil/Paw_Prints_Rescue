"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { OurStory } from "@/components/OurStory";
import { Impact } from "@/components/Impact";
import { SuccessStories } from "@/components/SuccessStories";
import { Process } from "@/components/Process";
import { Donation } from "@/components/Donation";
import { Transparency, Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <OurStory />
      <Impact />
      <SuccessStories />
      <Process />
      <Donation />
      <Transparency />
      <Footer />
    </main>
  );
}
