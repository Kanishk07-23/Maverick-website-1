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
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      {/* ── Main navbar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled
            ? "rgba(10, 10, 14, 0.88)"
            : "rgba(10, 10, 14, 0.72)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          transition: "background 0.35s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-[64px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group z-10 cursor-pointer">
            <motion.img
              src="/logo.png"
              alt="Maverick Digitals"
              className="h-8 w-8 object-contain"
              whileHover={{ rotate: -10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 340, damping: 18 }}
            />
            <span className="text-sm font-bold tracking-tight text-white/80 group-hover:text-white transition-colors duration-200 hidden sm:block">
              Maverick Digitals
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className="relative px-4 py-2 text-sm font-medium rounded-lg cursor-pointer select-none transition-colors duration-200"
                  style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.50)" }}
                >
                  {/* Hover glow background */}
                  <span
                    className="absolute inset-0 rounded-lg transition-opacity duration-200 opacity-0 hover:opacity-100"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />

                  {/* Active indicator — sliding underline bar */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-1 left-3 right-3 h-[2px] rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #9333ea, #2563eb)",
                      }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                    />
                  )}

                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold text-white cursor-pointer transition-all duration-250 hover:opacity-85"
              style={{
                background: "linear-gradient(135deg, #9333ea, #2563eb)",
                boxShadow: "0 0 16px rgba(147,51,234,0.35)",
              }}
            >
              Get a Quote
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg cursor-pointer transition-colors duration-200"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.16 }}
                  >
                    <X className="w-4.5 h-4.5 text-white" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.16 }}
                  >
                    <Menu className="w-4.5 h-4.5 text-white" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Dim backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.55)" }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[72px] left-4 right-4 z-50 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(12, 12, 18, 0.96)",
                border: "1px solid rgba(255,255,255,0.09)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
                backdropFilter: "blur(24px)",
              }}
            >
              <div className="p-3 flex flex-col gap-1">
                {links.map((link, i) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.055, duration: 0.22 }}
                    >
                      <Link
                        href={link.path}
                        className="flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200"
                        style={{
                          color: isActive ? "#ffffff" : "rgba(255,255,255,0.45)",
                          background: isActive
                            ? "rgba(255,255,255,0.07)"
                            : "transparent",
                          border: isActive
                            ? "1px solid rgba(255,255,255,0.10)"
                            : "1px solid transparent",
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

                <div
                  className="my-1 mx-1 h-px"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                />

                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: links.length * 0.055 + 0.04 }}
                >
                  <Link
                    href="/contact"
                    className="flex items-center justify-center py-3.5 rounded-xl text-sm font-bold text-white cursor-pointer transition-opacity duration-200 hover:opacity-85"
                    style={{
                      background: "linear-gradient(135deg, #9333ea, #2563eb)",
                      boxShadow: "0 0 20px rgba(147,51,234,0.30)",
                    }}
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
