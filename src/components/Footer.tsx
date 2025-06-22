// src/components/Footer.tsx
import Link from 'next/link'
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaHeart, FaCode, FaRocket } from 'react-icons/fa'

const socialLinks = [
  { 
    href: 'https://x.com/TiwariViveknath', 
    label: 'Twitter', 
    icon: <FaTwitter className="w-5 h-5" />,
    color: 'hover:text-blue-400'
  },
  { 
    href: 'https://www.facebook.com/viveknath.tiwari.9/', 
    label: 'Facebook', 
    icon: <FaFacebook className="w-5 h-5" />,
    color: 'hover:text-blue-600'
  },
  { 
    href: 'https://www.instagram.com/vivek_nath_tiwari/', 
    label: 'Instagram', 
    icon: <FaInstagram className="w-5 h-5" />,
    color: 'hover:text-pink-500'
  },
  { 
    href: 'https://www.linkedin.com/in/vivek-nath-tiwari-a27156262/', 
    label: 'LinkedIn', 
    icon: <FaLinkedin className="w-5 h-5" />,
    color: 'hover:text-blue-700'
  },
  { 
    href: 'https://github.com/viveknath-tiwari', 
    label: 'GitHub', 
    icon: <FaGithub className="w-5 h-5" />,
    color: 'hover:text-gray-400'
  },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-emerald-400 to-purple-500 p-3 rounded-xl">
                  <FaRocket className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-purple-500 bg-clip-text text-transparent">
                    FitFusion AI
                  </h3>
                  <p className="text-slate-300 text-sm">Your AI Fitness Companion</p>
                </div>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Transform your fitness journey with personalized AI-powered meal plans, workout routines, and progress tracking.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map(link => (
                  <a 
                    key={link.label} 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={link.label} 
                    className={`bg-slate-800/50 backdrop-blur-sm p-3 rounded-xl border border-slate-700/50 transition-all duration-300 ${link.color} hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20`}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-purple-500 bg-clip-text text-transparent">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                    About Health
                  </Link>
                </li>
                <li>
                  <Link href="/#benefits" className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                    Benefits of Nutrition
                  </Link>
                </li>
                <li>
                  <Link href="/#fitness" className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                    Fitness
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* App Features */}
            <div>
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-purple-500 bg-clip-text text-transparent">
                App Features
              </h3>
              <ul className="space-y-3">
                <li className="text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  AI Meal Planning
                </li>
                <li className="text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Workout Routines
                </li>
                <li className="text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                  Progress Tracking
                </li>
                <li className="text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                  Personalized Goals
                </li>
                <li className="text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  Health Analytics
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-purple-500 bg-clip-text text-transparent">
                Get In Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-emerald-500 to-purple-600 p-2 rounded-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a href="mailto:viveknath62094@gmail.com" className="text-slate-300 hover:text-emerald-400 transition-colors duration-300">
                    viveknath62094@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-emerald-500 to-purple-600 p-2 rounded-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <a href="tel:+916209464451" className="text-slate-300 hover:text-emerald-400 transition-colors duration-300">
                    +91-6209464451
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-emerald-500 to-purple-600 p-2 rounded-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-slate-300">India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credits & Copyright Section */}
        <div className="border-t border-slate-700/50">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              
              {/* Copyright */}
              <div className="text-slate-400 text-sm">
                © 2025 FitFusion AI. All rights reserved.
              </div>

              {/* Legal Links */}
              <div className="flex items-center gap-6 text-sm">
                <Link href="/terms" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300">
                  Privacy Policy
                </Link>
              </div>

              {/* Made with Love */}
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <span>Developed with</span>
                <span className="font-semibold bg-gradient-to-r from-emerald-400 to-purple-500 bg-clip-text text-transparent">
                Next.js, TypeScript & Tailwind CSS
                </span>
              </div>
            </div>

            {/* Developer Credit */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50">
                <FaCode className="text-emerald-400" />
                <span>Made with</span>
                <FaHeart className="text-red-500 animate-pulse" />
                <span>by</span>
                <span className="text-slate-300 text-sm">
                Vivek Nath Tiwari
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
