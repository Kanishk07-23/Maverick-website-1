# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Maverick Digitals
**Generated:** 2026-05-15
**Category:** Digital Marketing Agency
**Theme:** Light-mode dominant, premium, immersive

---

## Global Rules

### Color Palette (Light Mode)

| Role | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Primary | `#1A1A2E` | `--color-primary` | Headings, navbar, hero text — deep midnight navy |
| Secondary | `#4361EE` | `--color-secondary` | Links, hover accents, secondary elements — electric blue |
| Accent/CTA | `#F97316` | `--color-accent` | CTA buttons, highlights, interactive emphasis — vibrant orange |
| Background | `#FAFAFA` | `--color-background` | Page background — warm off-white |
| Surface | `#FFFFFF` | `--color-surface` | Cards, elevated panels — pure white |
| Muted BG | `#F1F5F9` | `--color-muted-bg` | Section alternates, code blocks, subtle containers |
| Text Primary | `#0F172A` | `--color-text` | Body text — slate 900, maximum readability |
| Text Muted | `#64748B` | `--color-text-muted` | Subtitles, captions, secondary text — slate 500 |
| Border | `#E2E8F0` | `--color-border` | Card borders, dividers, input outlines |
| Success | `#10B981` | `--color-success` | Positive indicators |
| Gradient Start | `#4361EE` | `--gradient-start` | Hero gradients, accent decoration |
| Gradient End | `#7C3AED` | `--gradient-end` | Hero gradients — electric blue → violet |

**Color Logic:**
- Deep navy + electric blue conveys trust and technology
- Vibrant orange CTA creates urgency and warmth against cool palette
- Off-white background prevents eye strain while maintaining premium feel
- Blue → Violet gradient for hero elements creates energy and modernity

### Typography

- **Heading Font:** Outfit (geometric, bold, modern)
- **Body Font:** Inter (highly legible, neutral, professional)
- **Mood:** confident, modern, clean, professional, tech-forward

**Next.js Font Loading (NOT @import):**
```tsx
import { Outfit, Inter } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});
```

**Type Scale:**

| Element | Size | Weight | Font | Letter Spacing |
|---------|------|--------|------|----------------|
| H1 (Hero) | `clamp(2.5rem, 6vw, 4.5rem)` | 800 | Outfit | `-0.03em` |
| H2 (Section) | `clamp(2rem, 4vw, 3rem)` | 700 | Outfit | `-0.02em` |
| H3 (Subsection) | `clamp(1.25rem, 2.5vw, 1.75rem)` | 600 | Outfit | `-0.01em` |
| Body | `1rem` (16px) | 400 | Inter | `0` |
| Body Large | `1.125rem` (18px) | 400 | Inter | `0` |
| Caption | `0.875rem` (14px) | 500 | Inter | `0.01em` |
| Overline/Tag | `0.75rem` (12px) | 600 | Outfit | `0.1em` (uppercase) |

### Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Component padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section padding |
| `--space-3xl` | `64px` / `4rem` | Hero padding |
| `--space-4xl` | `96px` / `6rem` | Section margins (vertical) |
| `--space-5xl` | `128px` / `8rem` | Major section separation |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `6px` | Tags, badges |
| `--radius-md` | `10px` | Buttons, inputs |
| `--radius-lg` | `16px` | Cards |
| `--radius-xl` | `24px` | Feature cards, modals |
| `--radius-full` | `9999px` | Pills, avatars |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(15,23,42,0.04)` | Subtle lift |
| `--shadow-md` | `0 4px 12px rgba(15,23,42,0.08)` | Cards default |
| `--shadow-lg` | `0 12px 24px rgba(15,23,42,0.10)` | Cards hover, dropdowns |
| `--shadow-xl` | `0 20px 40px rgba(15,23,42,0.12)` | Modals, featured content |
| `--shadow-glow` | `0 0 30px rgba(67,97,238,0.15)` | Accent glow effect |

---

## Component Specs

### Buttons

```css
/* Primary CTA Button */
.btn-primary {
  background: var(--color-accent);
  color: white;
  padding: 14px 32px;
  border-radius: var(--radius-md);
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.9375rem;
  letter-spacing: 0.01em;
  transition: all 250ms cubic-bezier(0.22, 1, 0.36, 1);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(249,115,22,0.25);
}

.btn-primary:hover {
  background: #EA580C;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(249,115,22,0.35);
}

/* Secondary/Ghost Button */
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 1.5px solid var(--color-border);
  padding: 14px 32px;
  border-radius: var(--radius-md);
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.9375rem;
  transition: all 250ms cubic-bezier(0.22, 1, 0.36, 1);
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: var(--color-secondary);
  color: var(--color-secondary);
  background: rgba(67,97,238,0.04);
}
```

### Cards

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-sm);
  transition: all 300ms cubic-bezier(0.22, 1, 0.36, 1);
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
  border-color: rgba(67,97,238,0.2);
}
```

### Inputs

```css
.input {
  padding: 14px 16px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 16px;
  font-family: var(--font-body);
  background: var(--color-surface);
  transition: border-color 200ms ease, box-shadow 200ms ease;
}

.input:focus {
  border-color: var(--color-secondary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(67,97,238,0.1);
}
```

---

## Style Guidelines

**Style:** Parallax Storytelling + Immersive Interactive
**Keywords:** Scroll-driven, narrative, layered, immersive, progressive disclosure, cinematic, interactive grid background

**Key Effects:**
- Animated grid background (infinite scroll pattern with mouse-reactive reveal)
- Scroll-triggered section reveals via GSAP ScrollTrigger
- Framer Motion layout animations for cards and tabs
- Parallax depth layers on hero section
- Magnetic hover effects on buttons/links
- Staggered text reveal animations

### Page Pattern

**Pattern Name:** Immersive/Interactive Experience

- **Conversion Strategy:** 40% higher engagement. Provide skip option. Mobile fallback essential.
- **CTA Placement:** After each value section + floating sticky CTA
- **Section Order:**
  1. Full-screen hero with interactive grid bg + bold headline
  2. Social proof/client logos
  3. Services showcase (staggered cards)
  4. Case studies / results
  5. Process/workflow visualization
  6. Testimonials
  7. CTA section
  8. Footer

---

## Background Pattern

The site uses an animated infinite-scroll grid background with a mouse-reactive radial reveal layer. The grid pattern is implemented as an SVG `<pattern>` with Framer Motion, creating a subtle living texture across the page.

---

## Anti-Patterns (Do NOT Use)

- ❌ **Emojis as icons** — Use SVG icons (Lucide React)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift surrounding content
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio on light bg
- ❌ **Instant state changes** — Always use transitions (150-300ms minimum)
- ❌ **Invisible focus states** — Focus states must be visible for a11y
- ❌ **Pink/beauty colors** — This is a tech/marketing agency, not a spa
- ❌ **Generic stock photo feel** — Use custom graphics, 3D elements, patterns
- ❌ **TailwindCSS** — Use vanilla CSS unless client explicitly requests Tailwind

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use Lucide React SVG instead)
- [ ] All icons from consistent icon set (Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
- [ ] Fonts loaded via next/font, NOT @import
- [ ] Heavy libraries (Three.js, GSAP) dynamically imported
- [ ] All images use next/image with priority on LCP
