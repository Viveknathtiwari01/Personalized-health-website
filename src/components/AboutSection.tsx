"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-10 rounded-2xl">
      {/* Left: Animated Card with Image */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="flex-shrink-0 w-full md:w-1/2"
      >
        <div className="bg-[linear-gradient(270deg,#a259e6,#c084fc,#a259e6)] animate-gradient-move rounded-2xl shadow-lg overflow-hidden">
          <Image
            src="/about.avif"
            alt="Healthy group"
            width={800}
            height={600}
            className="object-cover w-full h-64 md:h-96"
            priority
          />
        </div>
      </motion.div>
      {/* Right: Content and Animated Points */}
      <div className="flex-1 flex flex-col gap-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-indigo-700 mb-2"
        >
          About Health
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-lg text-slate-700 max-w-2xl mb-2"
        >
          Good health is a state of complete physical, mental, and social well-being. According to the World Health Organization, health is not merely the absence of disease, but a resource for everyday life. It emphasizes social and personal resources, as well as physical capacities. <a href="https://www.who.int/health-topics/health" target="_blank" className="underline text-emerald-600">Learn more at WHO</a>.
        </motion.p>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              title: 'Physical Health',
              desc: 'Regular exercise, balanced nutrition, adequate sleep',
              icon: '💪',
            },
            {
              title: 'Mental Health',
              desc: 'Stress management, mindfulness, social connections',
              icon: '🧠',
            },
            {
              title: 'Preventive Care',
              desc: 'Regular check-ups, vaccinations, screenings',
              icon: '🩺',
            },
            {
              title: 'Well-being',
              desc: 'Balance in all aspects of life',
              icon: '🌱',
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
      </div>
    </section>
  );
} 