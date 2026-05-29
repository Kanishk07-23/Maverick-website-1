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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      {/* ── Floating island nav ── */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 left-1/2 z-50 -translate-x-1/2"
        style={{ willChange: "transform" }}
      >
        <div
          className="flex items-center gap-2 rounded-2xl px-3 py-2"
          style={{
            background: scrolled
              ? "rgba(255,255,255,0.75)"
              : "rgba(255,255,255,0.60)",
            backdropFilter: "blur(28px) saturate(160%)",
            WebkitBackdropFilter: "blur(28px) saturate(160%)",
            border: "1px solid rgba(255,255,255,0.55)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.85)"
              : "0 4px 20px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.80)",
            transition: "background 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          {/* Logo mark */}
          <Link href="/" className="flex items-center cursor-pointer mr-1">
            <motion.img
              src="/logo.png"
              alt="Maverick Digitals"
              className="h-8 w-8 object-contain"
              whileHover={{ rotate: -12, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
            />
          </Link>

          {/* Divider */}
          <div
            className="hidden md:block h-5 w-px mx-1"
            style={{ background: "rgba(0,0,0,0.12)" }}
          />

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-0.5">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className="relative flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-xl cursor-pointer select-none transition-colors duration-200"
                  style={{
                    color: isActive ? "#0f0f11" : "#6b7280",
                  }}
                >
                  {/* Active pill */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.95)",
                        border: "1px solid rgba(0,0,0,0.07)",
                        boxShadow:
                          "0 1px 6px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.6) inset",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Hover state */}
                  {!isActive && (
                    <span
                      className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-150"
                      style={{ background: "rgba(0,0,0,0.04)" }}
                    />
                  )}

                  <span
                    className="relative z-10 transition-colors duration-200"
                    style={{ color: isActive ? "#111827" : undefined }}
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Divider */}
          <div
            className="hidden md:block h-5 w-px mx-1"
            style={{ background: "rgba(0,0,0,0.12)" }}
          />

          {/* CTA — desktop */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold text-white cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #9333ea 0%, #2563eb 100%)",
              boxShadow: "0 2px 10px rgba(147,51,234,0.30), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            Get a Quote
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl cursor-pointer transition-colors duration-150"
            style={{ background: "rgba(0,0,0,0.05)" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5 text-gray-700" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5 text-gray-700" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

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
              className="fixed top-[82px] left-1/2 z-50 w-[calc(100vw-32px)] max-w-sm -translate-x-1/2 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.82)",
                backdropFilter: "blur(32px) saturate(180%)",
                WebkitBackdropFilter: "blur(32px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.60)",
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
                  <Link
                    href="/contact"
                    className="flex items-center justify-center py-3 rounded-xl text-sm font-bold text-white cursor-pointer transition-opacity duration-150 hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg, #9333ea 0%, #2563eb 100%)",
                      boxShadow: "0 2px 12px rgba(147,51,234,0.30)",
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
