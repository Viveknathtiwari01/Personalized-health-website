"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function FitnessSection() {
  return (
    <section id="fitness" className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center bg-gradient-to-r from-purple-100 via-violet-200 to-emerald-100 gap-10 rounded-2xl">
      {/* Left: Animated Points */}
      <div className="flex-1 flex flex-col gap-6 order-2 md:order-1">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-indigo-700 mb-2"
        >
          Fitness & Activity
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-lg text-slate-700 max-w-2xl mb-2"
        >
          Staying active is key to a healthy lifestyle. Regular physical activity improves cardiovascular health, builds strength, and boosts mood. Find a routine you enjoy and make it a habit!
        </motion.p>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              title: 'Cardio',
              desc: 'Running, cycling, swimming',
              icon: '🏃',
            },
            {
              title: 'Strength',
              desc: 'Weightlifting, resistance training',
              icon: '🏋️',
            },
            {
              title: 'Flexibility',
              desc: 'Yoga, stretching',
              icon: '🤸',
            },
            {
              title: 'Consistency',
              desc: 'Make it a routine!',
              icon: '📅',
            },
          ].map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              viewport={{ once: true }}
              className="bg-[linear-gradient(270deg,#a259e6,#c084fc,#a259e6)] animate-gradient-move rounded-xl shadow p-4 flex items-center gap-3 text-white"
            >
              <span className="text-2xl">{point.icon}</span>
              <div>
                <div className="font-bold">{point.title}</div>
                <div className="text-sm opacity-80">{point.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-4"
        >
          <Link href="/#contact" className="inline-block bg-emerald-400 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-full shadow-lg transition-colors duration-200 text-lg">Start Your Fitness Journey</Link>
        </motion.div>
      </div>
      {/* Right: Animated Card with Fitness Image */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="flex-shrink-0 w-full md:w-1/2 order-1 md:order-2"
      >
        <div className="bg-[linear-gradient(270deg,#a259e6,#c084fc,#a259e6)] animate-gradient-move rounded-2xl shadow-lg overflow-hidden">
          <Image
            src="/fitness.avif"
            alt="Fitness"
            width={800}
            height={600}
            className="object-cover w-full h-64 md:h-96"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
} 