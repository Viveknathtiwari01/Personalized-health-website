// src/components/Header.tsx
'use client'

import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import { FaDumbbell, FaBars, FaTimes, FaRobot, FaUserCircle, FaChartBar, FaUtensils, FaCheckCircle, FaRunning } from 'react-icons/fa'
import ChatBox from './ChatBox'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About Health' },
  { href: '/#benefits', label: 'Benefits of Nutrition' },
  { href: '/#fitness', label: 'Fitness' },
  { href: '/#contact', label: 'Contact' },
]

export default function Header() {
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const chatButtonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Handle hash navigation when page loads
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash
      if (hash) {
        const sectionId = hash.substring(1) // Remove '#'
        const element = document.getElementById(sectionId)
        if (element) {
          // Small delay to ensure page is fully loaded
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' })
          }, 100)
        }
      }
    }
  }, [pathname])

  // Listen for custom event from Hero 'Get Started' button
  useEffect(() => {
    function handleOpenGetStartedMenu() {
      // If mobile, open mobile menu and submenu; if desktop, just open submenu
      if (window.innerWidth < 768) {
        setMobileMenuOpen(true);
        setTimeout(() => setSubmenuOpen(true), 200); // slight delay for drawer animation
      } else {
        setSubmenuOpen(true);
      }
    }
    window.addEventListener('open-get-started-menu', handleOpenGetStartedMenu);
    return () => window.removeEventListener('open-get-started-menu', handleOpenGetStartedMenu);
  }, []);

  // Click-away-to-close for desktop submenu
  useEffect(() => {
    if (!submenuOpen) return;
    function handleClick(e: MouseEvent) {
      const submenu = document.getElementById('explore-submenu');
      if (submenu && !submenu.contains(e.target as Node)) {
        setSubmenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [submenuOpen]);

  const handleNavigation = (href: string) => {
    setSubmenuOpen(false);
    setMobileMenuOpen(false);
    
    if (href.startsWith('/#')) {
      // If we're not on the home page, navigate to home first, then scroll
      if (pathname !== '/') {
        router.push(href)
      } else {
        // If we're already on home page, just scroll to section
        const sectionId = href.substring(2) // Remove '/#'
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } else {
      // Regular navigation
      router.push(href)
    }
  }

  return (
    <header className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-400 shadow px-4 py-3 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3 text-2xl font-extrabold text-white tracking-tight hover:scale-105 transition-transform duration-300">
        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl border border-white/30">
          <FaDumbbell className="text-white text-2xl" />
        </div>
        <span>FitFusion AI</span>
      </Link>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden text-white text-2xl p-2 focus:outline-none"
        onClick={() => setMobileMenuOpen(open => !open)}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-2 md:space-x-4 items-center relative">
        {navLinks.map(link => (
          <motion.div key={link.href} whileHover={{ scale: 1.1 }} className="inline-block">
            <button 
              onClick={() => handleNavigation(link.href)}
              className="text-white/90 hover:text-white font-medium px-2 py-1 rounded transition"
            >
              {link.label}
            </button>
          </motion.div>
        ))}
        <SignedIn>
          <div className="relative inline-block">
            <button
              onClick={() => setSubmenuOpen((open) => !open)}
              className="bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold px-6 py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-200 border border-emerald-400"
            >
              Explore
            </button>
            {submenuOpen && (
              <>
                {/* Overlay for click-away */}
                <div className="fixed inset-0 z-40" style={{ background: 'transparent' }} />
                <motion.div
                  id="explore-submenu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-72 glass-effect border border-purple-200 rounded-3xl shadow-2xl z-50 animate-fade-in-submenu backdrop-blur-lg"
                  style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
                >
                  <div className="flex flex-col gap-2 py-4 px-4">
                    <button onClick={() => { handleNavigation('/dashboard') }} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 transition-all duration-200 text-gray-800 font-semibold text-base">
                      <FaChartBar className="text-xl text-purple-400" /> Dashboard
                    </button>
                    <button
                      ref={chatButtonRef}
                      onClick={() => { setChatOpen(true); setSubmenuOpen(false); }}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 transition-all duration-200 text-gray-800 font-semibold text-base"
                    >
                      <FaRobot className="text-xl text-purple-500" /> Chat With AI
                    </button>
                    <button onClick={() => { handleNavigation('/profile') }} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 transition-all duration-200 text-gray-800 font-semibold text-base">
                      <FaUserCircle className="text-xl text-indigo-400" /> Profile
                    </button>
                    <button onClick={() => { handleNavigation('/progress') }} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 transition-all duration-200 text-gray-800 font-semibold text-base">
                      <FaCheckCircle className="text-xl text-green-400" /> Progress
                    </button>
                    <button onClick={() => { handleNavigation('/meals') }} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 transition-all duration-200 text-gray-800 font-semibold text-base">
                      <FaUtensils className="text-xl text-emerald-400" /> Meals
                    </button>
                    <button onClick={() => { handleNavigation('/workouts') }} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 transition-all duration-200 text-gray-800 font-semibold text-base">
                      <FaDumbbell className="text-xl text-pink-400" /> Workout
                    </button>
                    <button onClick={() => { handleNavigation('/test') }} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 transition-all duration-200 text-gray-800 font-semibold text-base">
                      <FaRunning className="text-xl text-indigo-400" /> Test
                    </button>
                  </div>
                </motion.div>
              </>
            )}
            {/* Chat Modal */}
            {chatOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-0 relative animate-fade-in-submenu border-2 border-purple-200">
                  <button
                    onClick={() => setChatOpen(false)}
                    className="absolute top-3 right-3 text-xl text-slate-500 hover:text-purple-600 focus:outline-none"
                    aria-label="Close chat"
                  >
                    ×
                  </button>
                  <div className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-emerald-50 rounded-t-2xl">
                    <h2 className="text-2xl font-bold text-emerald-700 mb-2">Chat With AI</h2>
                    <p className="text-slate-600 mb-4">Ask anything about health, fitness, or nutrition!</p>
                  </div>
                  <div className="p-4">
                    <ChatBox />
                  </div>
                </div>
              </div>
            )}
          </div>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-6 py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 border border-indigo-400">
            Sign In
          </Link>
        </SignedOut>
      </nav>
      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{willChange:'transform'}}>
        <div className="flex flex-col h-full p-6 gap-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-extrabold text-purple-700">Menu</span>
            <button className="text-2xl text-slate-700" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu"><FaTimes /></button>
          </div>
          <div className="flex flex-col gap-2">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNavigation(link.href)}
                className="text-slate-800 text-lg font-medium px-3 py-2 rounded hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 hover:text-emerald-700 transition-all duration-200 text-left"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <SignedIn>
              <button
                onClick={() => setSubmenuOpen(open => !open)}
                className="bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 border border-emerald-400 text-left"
              >
                Explore
              </button>
              {submenuOpen && (
                <div className="mt-2 bg-white/90 backdrop-blur-md border border-purple-200 rounded-2xl shadow-2xl z-50">
                  <div className="py-2 flex flex-col gap-1">
                    <Link href="/dashboard" className="block px-5 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 hover:text-emerald-700 transition-all duration-200" onClick={() => { setSubmenuOpen(false); setMobileMenuOpen(false); }}>Dashboard</Link>
                    <Link href="/profile" className="block px-5 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 hover:text-emerald-700 transition-all duration-200" onClick={() => { setSubmenuOpen(false); setMobileMenuOpen(false); }}>Profile</Link>
                    <Link href="/progress" className="block px-5 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 hover:text-emerald-700 transition-all duration-200" onClick={() => { setSubmenuOpen(false); setMobileMenuOpen(false); }}>Progress</Link>
                    <Link href="/meals" className="block px-5 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 hover:text-emerald-700 transition-all duration-200" onClick={() => { setSubmenuOpen(false); setMobileMenuOpen(false); }}>Meals</Link>
                    <Link href="/workouts" className="block px-5 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 hover:text-emerald-700 transition-all duration-200" onClick={() => { setSubmenuOpen(false); setMobileMenuOpen(false); }}>Workout</Link>
                    <Link href="/test" className="block px-5 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 hover:text-emerald-700 transition-all duration-200" onClick={() => { setSubmenuOpen(false); setMobileMenuOpen(false); }}>Test</Link>
                    <button
                      onClick={() => { setChatOpen(true); setSubmenuOpen(false); setMobileMenuOpen(false); }}
                      className="block w-full text-left px-5 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 hover:text-emerald-700 transition-all duration-200"
                    >
                      Chat With AI
                    </button>
                  </div>
                </div>
              )}
              {/* Chat Modal for mobile */}
              {chatOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-0 relative animate-fade-in-submenu border-2 border-purple-200">
                    <button
                      onClick={() => setChatOpen(false)}
                      className="absolute top-3 right-3 text-xl text-slate-500 hover:text-purple-600 focus:outline-none"
                      aria-label="Close chat"
                    >
                      ×
                    </button>
                    <div className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-emerald-50 rounded-t-2xl">
                      <h2 className="text-2xl font-bold text-emerald-700 mb-2">Chat With AI</h2>
                      <p className="text-slate-600 mb-4">Ask anything about health, fitness, or nutrition!</p>
                    </div>
                    <div className="p-4">
                      <ChatBox />
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-4"><UserButton /></div>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 border border-indigo-400 text-center">
                Sign In
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  )
}
