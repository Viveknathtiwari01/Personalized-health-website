'use client'

import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

export default function BenefitsAnimatedCards() {
  return (
    <>
      <motion.div className="grid md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{}}
      >
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            variants={cardVariants}
            className={
              `relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border-2 transition-all duration-300 p-8 flex flex-col gap-4 overflow-hidden mx-4 md:mx-8 mb-8 group ` +
              (i === 0 ? 'border-indigo-100 hover:border-indigo-400' :
               i === 1 ? 'border-purple-100 hover:border-purple-400' :
               'border-emerald-100 hover:border-emerald-400') +
              (i % 2 === 1 ? ' md:mt-12' : '')
            }
          >
            <div className={
              `absolute -top-6 ${i === 0 ? '-left-6 bg-gradient-to-br from-indigo-400 via-purple-300 to-emerald-200' :
                i === 1 ? '-right-6 bg-gradient-to-br from-purple-400 via-indigo-200 to-emerald-200' :
                '-left-6 bg-gradient-to-br from-emerald-400 via-purple-200 to-indigo-200'} w-20 h-20 rounded-full opacity-20 blur-2xl z-0`
            } />
            <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:animate-gradient-border" style={{ border: '2px solid transparent', background: 'linear-gradient(90deg, #a259e6, #5eead4, #818cf8, #a259e6)', backgroundClip: 'padding-box', zIndex: 1, opacity: 0.2 }} />
            <div className="relative z-10 flex items-center gap-3 mb-2">
              <span className={
                `text-3xl bg-gradient-to-r ` +
                (i === 0 ? 'from-indigo-500 to-purple-500' :
                 i === 1 ? 'from-purple-500 to-indigo-500' :
                 'from-emerald-500 to-purple-500') +
                ' bg-clip-text text-transparent'
              }>
                {i === 0 ? '🛡️' : i === 1 ? '🌱' : '😊'}
              </span>
              <h3 className={
                `text-xl md:text-2xl font-extrabold tracking-tight ` +
                (i === 0 ? 'text-indigo-700' : i === 1 ? 'text-purple-700' : 'text-emerald-700')
              }>
                {i === 0 ? 'Boosts Immunity' : i === 1 ? 'Supports Growth' : 'Improves Mood'}
              </h3>
            </div>
            <p className="relative z-10 text-slate-600 text-base md:text-lg">
              {i === 0 ? (
                <>A diet rich in fruits, vegetables, and whole grains strengthens the immune system. <a href='https://www.hsph.harvard.edu/nutritionsource/what-should-you-eat/' target='_blank' className='underline text-indigo-600'>Harvard Nutrition Source</a></>
              ) : i === 1 ? (
                <>Proper nutrition is essential for growth, development, and maintaining healthy body functions.</>
              ) : (
                <>Balanced meals can improve mood and mental health. <a href='https://www.cdc.gov/nutrition/resources-publications/benefits-of-healthy-eating.html' target='_blank' className='underline text-indigo-600'>CDC: Benefits of Healthy Eating</a></>
              )}
            </p>
          </motion.div>
        ))}
      </motion.div>
      {/* New Benefits Card Content */}
      <motion.div className="mt-8 grid md:grid-cols-2 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{}}
      >
        {[0, 1].map(i => (
          <motion.div
            key={i}
            variants={cardVariants}
            className={
              `relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border-2 transition-all duration-300 p-8 flex flex-col gap-5 overflow-hidden mx-4 md:mx-8 mb-8 group ` +
              (i === 0 ? 'border-emerald-100 hover:border-emerald-400' : 'border-indigo-100 hover:border-indigo-400') +
              (i % 2 === 1 ? ' md:mt-12' : '')
            }
          >
            <div className={
              `absolute -top-6 ${i === 0 ? '-left-6 bg-gradient-to-br from-emerald-400 via-purple-200 to-indigo-200' : '-right-6 bg-gradient-to-br from-indigo-400 via-purple-300 to-emerald-200'} w-24 h-24 rounded-full opacity-20 blur-2xl z-0`
            } />
            <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:animate-gradient-border" style={{ border: '2px solid transparent', background: 'linear-gradient(90deg, #a259e6, #5eead4, #818cf8, #a259e6)', backgroundClip: 'padding-box', zIndex: 1, opacity: 0.2 }} />
            <div className="relative z-10 flex items-center gap-3 mb-2">
              <span className={
                `text-4xl bg-gradient-to-r ` +
                (i === 0 ? 'from-emerald-500 to-purple-500' : 'from-indigo-500 to-purple-500') +
                ' bg-clip-text text-transparent'
              }>
                {i === 0 ? '💥' : '🌿'}
              </span>
              <h2 className={
                `text-2xl md:text-3xl font-extrabold tracking-tight ` +
                (i === 0 ? 'text-emerald-700' : 'text-indigo-700')
              }>
                {i === 0 ? 'Why You Should Care About Fitness & Nutrition' : 'The Compounding Effect'}
              </h2>
            </div>
            <ul className="relative z-10 list-none pl-0 text-slate-700 space-y-3">
              {i === 0 ? (
                <>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-emerald-400 rounded-full"></span>Increased Energy & Focus: Nutritious foods and regular activity boost your brain, energy, and productivity.</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-purple-400 rounded-full"></span>Stronger Immunity & Disease Prevention: Vitamins, minerals, and movement protect you from illness and chronic disease.</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-indigo-400 rounded-full"></span>Better Mood & Mental Health: Exercise and nutrients support happiness, confidence, and resilience.</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-pink-400 rounded-full"></span>Improved Strength & Bone Health: Resistance training and key nutrients keep your body strong and balanced.</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-yellow-400 rounded-full"></span>Better Sleep & Longevity: Healthy habits help you sleep deeper and live longer.</li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-indigo-400 rounded-full"></span>Even light home workouts can improve your body mechanics and balance.</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-purple-400 rounded-full"></span>Just 20 minutes of movement a day can lift your mood significantly.</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-emerald-400 rounded-full"></span>Just 150 minutes of weekly exercise reduces heart disease risk by 30%.</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 bg-pink-400 rounded-full"></span>People with active lifestyles and nutritious diets fall asleep faster and enjoy deeper sleep.</li>
                </>
              )}
            </ul>
            <p className="relative z-10 text-slate-600 mt-2 text-base md:text-lg">
              {i === 0 ? 'Small, consistent steps add up to big results. FitFusion AI gives you the plan, motivation, and support to thrive.' : 'Start today. Stay consistent. Thrive tomorrow.'}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </>
  )
} 