'use client'

import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

export default function FitnessAnimatedCards() {
  return (
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
            (i === 0 ? 'border-indigo-100 hover:border-indigo-400' : 'border-emerald-100 hover:border-emerald-400') +
            (i % 2 === 1 ? ' md:mt-12' : '')
          }
        >
          <div className={
            `absolute -top-6 ${i === 0 ? '-left-6 bg-gradient-to-br from-indigo-400 via-purple-300 to-emerald-200' : '-right-6 bg-gradient-to-br from-emerald-400 via-purple-200 to-indigo-200'} w-24 h-24 rounded-full opacity-20 blur-2xl z-0`
          } />
          <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:animate-gradient-border" style={{ border: '2px solid transparent', background: 'linear-gradient(90deg, #a259e6, #5eead4, #818cf8, #a259e6)', backgroundClip: 'padding-box', zIndex: 1, opacity: 0.2 }} />
          <div className="relative z-10 flex items-center gap-3 mb-2">
            <span className={
              `text-4xl bg-gradient-to-r ` +
              (i === 0 ? 'from-indigo-500 to-purple-500' : 'from-emerald-500 to-purple-500') +
              ' bg-clip-text text-transparent'
            }>
              {i === 0 ? '🏋️‍♂️' : '🤸‍♂️'}
            </span>
            <h2 className={
              `text-2xl md:text-3xl font-extrabold tracking-tight ` +
              (i === 0 ? 'text-indigo-700' : 'text-emerald-700')
            }>{i === 0 ? 'Personalized Workouts' : 'Holistic Fitness'}</h2>
          </div>
          <ul className="relative z-10 list-none pl-0 text-slate-700 space-y-3">
            {i === 0 ? (
              <>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-indigo-400 rounded-full"></span>Workouts tailored to your goals and fitness level</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-purple-400 rounded-full"></span>Progressive plans for strength, endurance, and flexibility</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-emerald-400 rounded-full"></span>Track your improvements over time</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-pink-400 rounded-full"></span>Expert tips and video guidance</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-yellow-400 rounded-full"></span>Stay motivated with achievements and rewards</li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-emerald-400 rounded-full"></span>Integrates nutrition, exercise, and recovery</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-purple-400 rounded-full"></span>Mindfulness and stress management tools</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-indigo-400 rounded-full"></span>Community support and challenges</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-pink-400 rounded-full"></span>Flexible routines for busy lifestyles</li>
                <li className="flex items-center gap-2"><span className="w-2 h-2 bg-yellow-400 rounded-full"></span>All ages and abilities welcome</li>
              </>
            )}
          </ul>
          <p className="relative z-10 text-slate-600 mt-2 text-base md:text-lg">
            {i === 0
              ? <>Your journey, your pace. <span className="font-semibold text-indigo-600">FitFusion AI</span> adapts to you.</>
              : <>Fitness is more than workouts. <span className="font-semibold text-emerald-600">FitFusion AI</span> supports your whole well-being.</>}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
} 