"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaUser, FaEnvelope, FaComments, FaPaperPlane, FaCheckCircle, FaExclamationTriangle, FaSpinner } from "react-icons/fa";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        // Reset success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Get In Touch
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Have questions about your fitness journey? We're here to help you achieve your goals!
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-3">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-xl">
                <FaComments className="text-white text-xl" />
              </div>
              Let's Connect
            </h2>
            
            <div className="space-y-6">
              <p className="text-slate-700 text-lg leading-relaxed">
                Ready to transform your fitness journey? Whether you have questions about our AI-powered meal plans, 
                workout routines, or just want to share your progress, we'd love to hear from you!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl border border-indigo-100">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-lg">
                    <FaEnvelope className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Email</p>
                    <a href="mailto:viveknath62094@gmail.com" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                      viveknath62094@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl border border-indigo-100">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg">
                    <FaUser className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Developer</p>
                    <p className="text-slate-600">Vivek Nath Tiwari</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-2xl border border-indigo-100 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-xl">
                <FaPaperPlane className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Send Message</h2>
            </div>

            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-emerald-500 text-xl" />
                    <div>
                      <p className="font-semibold text-emerald-800">Message Sent Successfully!</p>
                      <p className="text-emerald-700 text-sm">Thank you for reaching out. We'll get back to you soon!</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <FaExclamationTriangle className="text-red-500 text-xl" />
                    <div>
                      <p className="font-semibold text-red-800">Error</p>
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label className="block font-semibold mb-2 text-slate-700">Name</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-200 rounded-xl px-10 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block font-semibold mb-2 text-slate-700">Email</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-200 rounded-xl px-10 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block font-semibold mb-2 text-slate-700">Message</label>
                <div className="relative">
                  <FaComments className="absolute left-3 top-3 text-slate-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full border border-slate-200 rounded-xl px-10 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
                    placeholder="Tell us about your fitness goals, questions, or feedback..."
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 