// src/components/Header.tsx
'use client'

import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import { FaDumbbell } from 'react-icons/fa'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About Health' },
  { href: '/#benefits', label: 'Benefits of Nutrition' },
  { href: '/#fitness', label: 'Fitness' },
  { href: '/#contact', label: 'Contact' },
]

export default function Header() {
  const [submenuOpen, setSubmenuOpen] = useState(false)
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

  const handleNavigation = (href: string) => {
    // Close submenu if open
    setSubmenuOpen(false);
    
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
      <nav className="space-x-2 md:space-x-4 flex items-center relative">
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
              Get Start
            </button>
            {submenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white/80 backdrop-blur-md border border-purple-200 rounded-2xl shadow-2xl z-50 animate-fade-in-submenu">
                <div className="py-2">
                  <Link href="/dashboard" className="block px-5 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 hover:text-emerald-700 transition-all duration-200" onClick={() => setSubmenuOpen(false)}>Dashboard</Link>
                  <Link href="/meals" className="block px-5 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 hover:text-emerald-700 transition-all duration-200" onClick={() => setSubmenuOpen(false)}>Meals</Link>
                  <Link href="/profile" className="block px-5 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 hover:text-emerald-700 transition-all duration-200" onClick={() => setSubmenuOpen(false)}>Profile</Link>
                  <Link href="/progress" className="block px-5 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 hover:text-emerald-700 transition-all duration-200" onClick={() => setSubmenuOpen(false)}>Progress</Link>
                  <Link href="/workouts" className="block px-5 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 hover:text-emerald-700 transition-all duration-200" onClick={() => setSubmenuOpen(false)}>Workout</Link>
                  <Link href="/test" className="block px-5 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-purple-100 hover:to-emerald-100 hover:text-emerald-700 transition-all duration-200" onClick={() => setSubmenuOpen(false)}>Test</Link>
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
    </header>
  )
}
