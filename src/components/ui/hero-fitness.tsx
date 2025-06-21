"use client";

import Image from "next/image";
import React from "react";

export function HeroFitness() {
  return (
    <section className="relative min-h-[70vh] w-full flex items-center justify-start bg-black overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero_img.avif"
        alt="Fitness woman doing crunches"
        fill
        priority
        className="object-cover object-center w-full h-full opacity-80"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
      {/* Content */}
      <div className="relative z-10 max-w-2xl px-8 py-16 md:py-24 flex flex-col gap-6">
        <span className="uppercase tracking-widest text-white/70 text-sm font-semibold mb-2">Fitness Club</span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-2">
          <span className="block">THE HEALTH</span>
          <span className="block text-[#a259e6]">BENEFITS</span>
        </h1>
        <p className="text-white/80 text-base md:text-lg max-w-lg mb-4">
        Your AI-powered health & fitness companion. Personalized plans, smart tracking, and expert advice — all in one place.
        </p>
        <button className="bg-[#a259e6] hover:bg-[#8e3ee6] text-white font-bold px-6 py-3 rounded-full shadow-lg w-max transition-colors duration-200">
          Get Started
        </button>
      </div>
    </section>
  );
} 