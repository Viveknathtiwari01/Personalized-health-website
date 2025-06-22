// src/app/page.tsx
import { HeroFitness } from "@/components/ui/hero-fitness"
import { AboutSection } from '@/components/AboutSection'
import { FitnessSection } from '@/components/FitnessSection'
import { ContactSection } from '@/components/ContactSection'
import AboutAnimatedCards from '@/components/AboutAnimatedCards'
import BenefitsAnimatedCards from '@/components/BenefitsAnimatedCards'
import FitnessAnimatedCards from '@/components/FitnessAnimatedCards'

export default function HomePage() {
  return (
    <main>
      <HeroFitness />
      <div className="space-y-20">
        {/* About Section */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-emerald-50 rounded-2xl shadow" id="about">
          <AboutSection />
          {/* New About Health Card Content */}
          <AboutAnimatedCards />
        </div>
        {/* Benefits Section */}
        <section id="benefits" className="container mx-auto px-4 py-12 bg-gradient-to-br from-violet-50 via-indigo-50 to-emerald-50 rounded-2xl shadow">
          <h1 className="text-4xl font-bold text-emerald-700 mb-6">Benefits of Nutrition</h1>
          <BenefitsAnimatedCards />
        </section>
        {/* Fitness Section */}
        <div className="bg-gradient-to-br from-white via-emerald-50 to-indigo-50 rounded-2xl shadow" id="fitness">
          <FitnessSection />
          {/* New Fitness Card Content */}
          <FitnessAnimatedCards />
        </div>
        {/* Contact Section */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-emerald-50 rounded-2xl shadow" id="contact">
          <ContactSection />
        </div>
      </div>
    </main>
  )
}