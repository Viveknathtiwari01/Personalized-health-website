"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export function HeroFitness() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  // Function to trigger the navbar's 'Get Start' button
  const handleGetStarted = useCallback(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    // Dispatch a custom event that the Header listens for
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-get-started-menu'));
    }
  }, [isSignedIn, router]);

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
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 max-w-2xl px-8 py-16 md:py-24 flex flex-col gap-6"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="uppercase tracking-widest text-white/70 text-sm font-semibold mb-2"
        >
          Fitness Club
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-2"
        >
          <span className="block">THE HEALTH</span>
          <span className="block text-[#a259e6]">BENEFITS</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/80 text-base md:text-lg max-w-lg mb-4"
        >
          Your AI-powered health & fitness companion. Personalized plans, smart tracking, and expert advice — all in one place.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.08, boxShadow: "0 0 0 4px #a259e6aa" }}
          whileTap={{ scale: 0.97 }}
          className="bg-[#a259e6] hover:bg-[#8e3ee6] text-white font-bold px-6 py-3 rounded-full shadow-lg w-max transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-[#a259e6]/30"
          onClick={handleGetStarted}
        >
          Get Started
        </motion.button>
      </motion.div>
    </section>
  );
} 