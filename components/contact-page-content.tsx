'use client';

import { Header } from '@/components/landing/header';
import { ContactContent } from '@/components/landing/contact-content';
import { Footer } from '@/components/landing/footer';

export function ContactPageContent() {
  return (
    <main className="relative min-h-screen bg-background">
      <Header />
      <ContactContent />
      <Footer />
    </main>
  );
}
