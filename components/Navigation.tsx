"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { TextScramble } from "@/components/ui/text-scramble";
import { GlassEffect } from "@/components/ui/liquid-glass";

const links = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-4 right-4 z-50 flex justify-center"
      >
        <GlassEffect
          className={`w-full max-w-6xl rounded-2xl transition-all duration-300 ${
            scrolled ? "shadow-lg shadow-black/5" : "shadow-sm"
          }`}
        >
          <div className="flex w-full items-center justify-between px-6 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <span className="font-bold text-gray-900 text-xl tracking-tight font-['Poppins']">
                Maverick<span className="brand-gradient-text">.</span>
              </span>
            </Link>

            <div className="flex items-center gap-6">
              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center bg-gray-50/80 rounded-xl p-1 gap-0.5">
                {links.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${
                        isActive
                          ? "text-gray-900"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-active"
                          className="absolute inset-0 bg-white rounded-lg shadow-sm border border-gray-100"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        />
                      )}
                      <span className="relative z-10">
                        <TextScramble text={link.name} />
                      </span>
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile trigger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </GlassEffect>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 flex flex-col gap-1"
          >
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  pathname === link.path
                    ? "bg-gray-50 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <TextScramble text={link.name} />
              </Link>
            ))}
            <div className="border-t border-gray-100 my-1" />
            <Link
              href="/contact"
              className="px-4 py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold text-center hover:bg-blue-600 transition-colors cursor-pointer"
            >
              Get a Quote
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
