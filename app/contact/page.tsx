import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Maverick Digitals | Book a Free Digital Marketing Strategy Call',
  description:
    'Get in touch with Maverick Digitals, Mumbai\'s results-driven digital marketing agency. Book a free 30-minute strategy consultation for SEO, social media, performance marketing, and web development.',
  keywords: [
    'contact digital marketing agency Mumbai',
    'free marketing consultation India',
    'book strategy call Maverick Digitals',
    'digital marketing enquiry',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Maverick Digitals | Free Strategy Consultation',
    description:
      'Ready to scale your business? Contact our Mumbai-based digital marketing team for a free consultation.',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
