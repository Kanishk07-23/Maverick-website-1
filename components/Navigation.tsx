"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import { LiquidMetalLinkButton } from "@/components/ui/liquid-metal-link-button";

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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      {/* ── Full-width top nav bar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ willChange: "transform" }}
      >
        {/* Metallic bottom border line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1.5px]"
          style={{
            background: `conic-gradient(from var(--lm-angle, 0deg), #484848, #c8c8c8, #ffffff, #909090, #383838, #c0c0c0, #ffffff, #909090, #484848)`,
            animation: "lm-spin 8s linear infinite",
          }}
        />

        <div
          className="flex items-center justify-between px-6 md:px-10 lg:px-16 h-16"
          style={{
            background: scrolled
              ? "rgba(240,240,240,0.88)"
              : "rgba(235,235,235,0.75)",
            backdropFilter: "blur(32px) saturate(180%)",
            WebkitBackdropFilter: "blur(32px) saturate(180%)",
            transition: "background 0.3s ease",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer flex-shrink-0">
            <motion.img
              src="/logo.png"
              alt="Maverick Digitals"
              className="h-8 w-8 object-contain"
              whileHover={{ rotate: -12, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
            />
            <span className="hidden sm:block text-sm font-bold tracking-widest uppercase text-gray-100" style={{ letterSpacing: '0.15em' }}>Maverick</span>
          </Link>

          {/* Desktop nav links — centered */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className="relative flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-xl cursor-pointer select-none transition-colors duration-200"
                  style={{ color: isActive ? "#0f0f11" : "#6b7280" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.90)",
                        border: "1px solid rgba(0,0,0,0.07)",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <span className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-150" style={{ background: "rgba(0,0,0,0.04)" }} />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* CTA — desktop */}
            <div className="hidden md:block">
              <LiquidMetalLinkButton label="Get a Quote" href="/contact" />
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl cursor-pointer transition-colors duration-150"
              style={{ background: "rgba(0,0,0,0.06)" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0, scale: 0.7 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.7 }} transition={{ duration: 0.15 }}>
                    <X className="w-5 h-5 text-gray-200" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0, scale: 0.7 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.7 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-5 h-5 text-gray-200" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile dropdown (tethered below the pill) ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Invisible backdrop to close */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40"
              onClick={() => setMobileOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              key="dropdown"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="liquid-metal-card fixed top-[64px] left-0 right-0 z-50 overflow-hidden"
              style={{
                backdropFilter: "blur(32px) saturate(180%)",
                WebkitBackdropFilter: "blur(32px) saturate(180%)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.07)",
              }}
            >
              <div className="p-2.5 flex flex-col gap-1">
                {links.map((link, i) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                    >
                      <Link
                        href={link.path}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-150"
                        style={{
                          color: isActive ? "#111827" : "#6b7280",
                          background: isActive ? "rgba(255,255,255,0.9)" : "transparent",
                          border: isActive
                            ? "1px solid rgba(0,0,0,0.06)"
                            : "1px solid transparent",
                          boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
                        }}
                      >
                        <span>{link.name}</span>
                        {isActive && (
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{
                              background: "linear-gradient(135deg, #9333ea, #2563eb)",
                            }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Separator */}
                <div
                  className="h-px mx-1 my-1"
                  style={{ background: "rgba(0,0,0,0.07)" }}
                />

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: links.length * 0.05 + 0.04 }}
                >
                  <div className="flex justify-center">
                    <LiquidMetalLinkButton label="Get a Quote" href="/contact" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
