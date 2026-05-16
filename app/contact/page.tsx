"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Mail, MapPin, Clock } from "lucide-react";

const SERVICES = [
  "Website & App Development",
  "Performance Marketing",
  "SEO & SEM",
  "Branding & Strategy",
  "Personal Branding",
  "Social Media Management",
];

const BUDGETS = [
  "Under ₹50,000",
  "₹50,000 – ₹1,50,000",
  "₹1,50,000 – ₹5,00,000",
  "₹5,00,000+",
];

const INFO = [
  { icon: Mail,    text: "maverickdigitals18@gmail.com" },
  { icon: MapPin,  text: "Mumbai, Maharashtra" },
  { icon: Clock,   text: "Mon – Sat · 9AM–7PM IST" },
];

function Field({
  label, id, required = false, children,
}: {
  label: string; id: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-bold text-gray-400 uppercase tracking-widest">
        {label}{required && <span className="text-purple-600 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm font-medium placeholder-gray-300 outline-none transition-all duration-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/10 appearance-none";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden">

      {/* Ambient orbs — same as homepage / about */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[15%] left-[5%]  w-[500px] h-[500px] rounded-full bg-purple-400/6 blur-[130px]" />
        <div className="absolute top-[55%] right-[5%] w-[400px] h-[400px] rounded-full bg-blue-400/7  blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-36 pb-24">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-10 bg-gradient-to-r from-purple-500 to-blue-600" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Get in Touch</span>
            <span className="h-px w-10 bg-gradient-to-l from-purple-500 to-blue-600" />
          </div>

          <h1
            className="text-5xl md:text-6xl font-black tracking-tighter leading-[1.05] mb-5"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Let's build something<br />
            <span className="brand-gradient-text">remarkable.</span>
          </h1>

          <p className="text-gray-500 text-lg leading-relaxed max-w-md mx-auto">
            Tell us about your project. We'll get back within 24 hours with a tailored strategy.
          </p>

          {/* Contact info pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {INFO.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 bg-white text-sm text-gray-600 font-medium shadow-sm"
              >
                <Icon className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </motion.div>

        {/* FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center text-center py-20 gap-6 rounded-3xl border border-gray-100 bg-white shadow-sm"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.15 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #9333ea20, #2563eb20)" }}
                >
                  <CheckCircle2 className="w-8 h-8 text-purple-600" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Message Sent!</h2>
                  <p className="text-gray-500 max-w-xs leading-relaxed text-sm">
                    We've received your message and will get back to you within 24 business hours.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, #9333ea, #2563eb)" }}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="rounded-3xl border border-gray-100 bg-white shadow-sm p-8 md:p-10 space-y-6"
              >
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full Name" id="name" required>
                    <input id="name" type="text" required placeholder="Arjun Mehta" className={inputCls} />
                  </Field>
                  <Field label="Email" id="email" required>
                    <input id="email" type="email" required placeholder="arjun@company.com" className={inputCls} />
                  </Field>
                </div>

                {/* Company */}
                <Field label="Company / Brand" id="company">
                  <input id="company" type="text" placeholder="Your company (optional)" className={inputCls} />
                </Field>

                {/* Service + Budget */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Service Interest" id="service">
                    <select id="service" className={inputCls}>
                      <option value="">Select a service...</option>
                      {SERVICES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Budget Range" id="budget">
                    <select id="budget" className={inputCls}>
                      <option value="">Select a range...</option>
                      {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </Field>
                </div>

                {/* Message */}
                <Field label="Tell us about your project" id="message" required>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="What are you building? What's the goal? What's the timeline?"
                    className={`${inputCls} resize-none`}
                  />
                </Field>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01, boxShadow: "0 8px 30px rgba(147,51,234,0.25)" }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-white font-bold text-base cursor-pointer transition-shadow duration-300"
                  style={{ background: "linear-gradient(135deg, #9333ea, #2563eb)" }}
                >
                  Send Message
                  <Send className="w-4 h-4" />
                </motion.button>

                <p className="text-center text-gray-400 text-xs">
                  We typically respond within 24 business hours.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
