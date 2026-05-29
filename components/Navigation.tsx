"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";

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
    const handleScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      {/* ── Desktop / top-bar nav ── */}
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-[68px]"
        style={{
          background: scrolled
            ? "rgba(255,255,255,0.82)"
            : "rgba(255,255,255,0.0)",
          backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
          transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group z-10">
          <motion.img
            src="/logo.png"
            alt="Maverick Digitals"
            className="h-9 w-9 object-contain"
            whileHover={{ rotate: -8, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 16 }}
          />
          <span className="hidden sm:block text-sm font-bold text-gray-800 tracking-tight group-hover:text-purple-700 transition-colors duration-200">
            Maverick Digitals
          </span>
        </Link>

        {/* Desktop nav pill */}
        <nav className="hidden md:flex items-center">
          <div
            className="flex items-center gap-1 rounded-2xl px-2 py-1.5"
            style={{
              background: "rgba(255,255,255,0.70)",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
              backdropFilter: "blur(12px)",
            }}
          >
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className="relative px-5 py-2 text-sm font-semibold rounded-xl transition-colors duration-200 cursor-pointer select-none"
                  style={{ color: isActive ? "#111827" : "#6B7280" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: "linear-gradient(135deg, rgba(147,51,234,0.10), rgba(37,99,235,0.10))",
                        border: "1px solid rgba(147,51,234,0.18)",
                        boxShadow: "0 1px 8px rgba(147,51,234,0.12)",
                      }}
                      transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 hover:text-gray-900 transition-colors duration-150">
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3 z-10">
          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-purple-500/20"
            style={{ background: "linear-gradient(135deg, #9333ea, #2563eb)" }}
          >
            Get a Quote
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-gray-700 cursor-pointer transition-colors duration-200"
            style={{
              background: "rgba(255,255,255,0.80)",
              border: "1px solid rgba(0,0,0,0.08)",
              backdropFilter: "blur(10px)",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[78px] left-4 right-4 z-50 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.95)",
                border: "1px solid rgba(0,0,0,0.07)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="p-3 flex flex-col gap-1">
                {links.map((link, i) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.25 }}
                    >
                      <Link
                        href={link.path}
                        className="flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200"
                        style={{
                          background: isActive
                            ? "linear-gradient(135deg, rgba(147,51,234,0.08), rgba(37,99,235,0.08))"
                            : "transparent",
                          color: isActive ? "#7e22ce" : "#374151",
                          border: isActive ? "1px solid rgba(147,51,234,0.15)" : "1px solid transparent",
                        }}
                      >
                        <span>{link.name}</span>
                        {isActive && (
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: "linear-gradient(135deg, #9333ea, #2563eb)" }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="h-px bg-gray-100 mx-1 my-1" />

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: links.length * 0.06 + 0.05 }}
                >
                  <Link
                    href="/contact"
                    className="flex items-center justify-center py-3.5 rounded-xl text-sm font-bold text-white cursor-pointer transition-opacity duration-200 hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #9333ea, #2563eb)" }}
                  >
                    Get a Quote →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
