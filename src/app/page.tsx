// src/app/page.tsx
import { HeroFitness } from "@/components/ui/hero-fitness"
import { AboutSection } from '@/components/AboutSection'
import { FitnessSection } from '@/components/FitnessSection'
import { ContactSection } from '@/components/ContactSection'

export default function HomePage() {
  return (
    <main>
      <HeroFitness />
      <div className="space-y-20">
        {/* About Section */}
        <div className="bg-slate-50 rounded-2xl shadow" id="about">
          <AboutSection />
          {/* New About Health Card Content */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {[0, 1].map(i => (
              <div
                key={i}
                className="bg-white rounded-xl shadow p-6 flex flex-col gap-3"
              >
                {i === 0 ? (
                  <>
                    <h2 className="text-2xl font-bold text-indigo-700 mb-2 flex items-center gap-2">🧠 What Does \"Health\" Really Mean?</h2>
                    <ul className="list-disc pl-6 text-slate-700 space-y-1">
                      <li>Waking up with energy</li>
                      <li>Moving your body with ease</li>
                      <li>Feeling confident in your skin</li>
                      <li>Thinking clearly and coping with stress</li>
                      <li>Living longer and avoiding lifestyle diseases</li>
                    </ul>
                    <p className="text-slate-600 mt-2">Health is a complete state of physical, mental, and emotional well-being. FitFusion AI makes expert support as easy as chatting with a friend.</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-indigo-700 mb-2 flex items-center gap-2">💡 Why We Built FitFusion AI</h2>
                    <ul className="list-disc pl-6 text-slate-700 space-y-1">
                      <li>Set and achieve your health goals</li>
                      <li>Build better habits</li>
                      <li>Get meal and workout suggestions tailored to you</li>
                      <li>Track your daily progress</li>
                      <li>Stay motivated, every step of the way</li>
                    </ul>
                    <p className="text-slate-600 mt-2">FitFusion AI adapts to your needs, combining science, AI, and simplicity for everyone.</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Benefits Section */}
        <section id="benefits" className="container mx-auto px-4 py-12 bg-violet-50 rounded-2xl shadow">
          <h1 className="text-4xl font-bold text-emerald-700 mb-6">Benefits of Nutrition</h1>
          <div className="grid md:grid-cols-3 gap-6">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="bg-white rounded-xl shadow p-6"
              >
                {i === 0 ? (
                  <>
                    <h3 className="font-semibold text-lg mb-2">Boosts Immunity</h3>
                    <p className="text-slate-600">A diet rich in fruits, vegetables, and whole grains strengthens the immune system. <a href='https://www.hsph.harvard.edu/nutritionsource/what-should-you-eat/' target='_blank' className='underline text-indigo-600'>Harvard Nutrition Source</a></p>
                  </>
                ) : i === 1 ? (
                  <>
                    <h3 className="font-semibold text-lg mb-2">Supports Growth</h3>
                    <p className="text-slate-600">Proper nutrition is essential for growth, development, and maintaining healthy body functions.</p>
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold text-lg mb-2">Improves Mood</h3>
                    <p className="text-slate-600">Balanced meals can improve mood and mental health. <a href='https://www.cdc.gov/nutrition/resources-publications/benefits-of-healthy-eating.html' target='_blank' className='underline text-indigo-600'>CDC: Benefits of Healthy Eating</a></p>
                  </>
                )}
              </div>
            ))}
          </div>
          {/* New Benefits Card Content */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {[0, 1].map(i => (
              <div
                key={i}
                className="bg-white rounded-xl shadow p-6 flex flex-col gap-3"
              >
                {i === 0 ? (
                  <>
                    <h2 className="text-2xl font-bold text-emerald-700 mb-2 flex items-center gap-2">💥 Why You Should Care About Fitness & Nutrition</h2>
                    <ul className="list-disc pl-6 text-slate-700 space-y-1">
                      <li>Increased Energy & Focus: Nutritious foods and regular activity boost your brain, energy, and productivity.</li>
                      <li>Stronger Immunity & Disease Prevention: Vitamins, minerals, and movement protect you from illness and chronic disease.</li>
                      <li>Better Mood & Mental Health: Exercise and nutrients support happiness, confidence, and resilience.</li>
                      <li>Improved Strength & Bone Health: Resistance training and key nutrients keep your body strong and balanced.</li>
                      <li>Better Sleep & Longevity: Healthy habits help you sleep deeper and live longer.</li>
                    </ul>
                    <p className="text-slate-600 mt-2">Small, consistent steps add up to big results. FitFusion AI gives you the plan, motivation, and support to thrive.</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-indigo-700 mb-2 flex items-center gap-2">🌿 The Compounding Effect</h2>
                    <ul className="list-disc pl-6 text-slate-700 space-y-1">
                      <li>Even light home workouts can improve your body mechanics and balance.</li>
                      <li>Just 20 minutes of movement a day can lift your mood significantly.</li>
                      <li>Just 150 minutes of weekly exercise reduces heart disease risk by 30%.</li>
                      <li>People with active lifestyles and nutritious diets fall asleep faster and enjoy deeper sleep.</li>
                    </ul>
                    <p className="text-slate-600 mt-2">Start today. Stay consistent. Thrive tomorrow.</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
        {/* Fitness Section */}
        <div className="bg-white/80 rounded-2xl shadow" id="fitness">
          <FitnessSection />
          {/* New Fitness Card Content */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {[0, 1].map(i => (
              <div
                key={i}
                className="bg-white rounded-xl shadow p-6 flex flex-col gap-3"
              >
                {i === 0 ? (
                  <>
                    <h2 className="text-2xl font-bold text-indigo-700 mb-2 flex items-center gap-2">💪 Why Fitness Matters</h2>
                    <ul className="list-disc pl-6 text-slate-700 space-y-1">
                      <li>Improves heart and lung function</li>
                      <li>Builds and maintains muscles and bones</li>
                      <li>Enhances flexibility, posture, and balance</li>
                      <li>Supports weight management and boosts energy</li>
                      <li>Reduces stress, anxiety, and depression</li>
                    </ul>
                    <p className="text-slate-600 mt-2">Just 30 minutes of movement a day can improve your sleep, sharpen your mind, and strengthen your immune system.</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-emerald-700 mb-2 flex items-center gap-2">✨ FitFusion AI Makes Fitness Easy</h2>
                    <ul className="list-disc pl-6 text-slate-700 space-y-1">
                      <li>Personalized workout suggestions</li>
                      <li>Smart fitness routines</li>
                      <li>Progress tracking</li>
                      <li>Motivation and support every step of the way</li>
                    </ul>
                    <p className="text-slate-600 mt-2">Fitness is for everyone — and FitFusion AI helps you find your pace and stay on track.</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Contact Section */}
        <div className="bg-gradient-to-br from-primary/10 to-white rounded-2xl shadow">
          <ContactSection />
        </div>
      </div>
    </main>
  )
}
