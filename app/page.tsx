import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import ResultsSection from '@/components/sections/ResultsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ClientsSection from '@/components/sections/ClientsSection';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Maverick Digitals | Turn Attention Into Revenue',
  description:
    'Mumbai-based full-stack digital marketing agency. 15M+ organic views, 200%+ average ROI, 40+ brands scaled across India, UAE, USA, UK & Australia.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ResultsSection />
      <ServicesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <ClientsSection />
      <CTABanner />
    </>
  );
}
