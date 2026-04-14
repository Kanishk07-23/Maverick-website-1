import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import ResultsSection from '@/components/sections/ResultsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ClientsSection from '@/components/sections/ClientsSection';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Digital Marketing Agency in Mumbai | Maverick Digitals',
  description:
    'Maverick Digitals is a leading digital marketing agency in Mumbai, India. We specialize in performance marketing, SEO, social media, and web development. Get a free consultation.',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Maverick Digitals Homepage',
            description: 'Leading digital marketing agency in Mumbai specializing in performance marketing, SEO, and web development.',
            url: 'https://www.maverickdigitals.co.in/',
            speakable: {
              '@type': 'SpeakableSpecification',
              xpath: [
                "//*[@id='home']//h1",
                "//*[@id='home']//p"
              ]
            }
          })
        }}
      />
    </>
  );
}
