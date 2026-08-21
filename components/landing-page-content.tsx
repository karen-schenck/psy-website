import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { WhyConsultSection } from '@/components/landing/why-consult-section';
import { ApproachTeaser } from '@/components/landing/approach-teaser';
import { QuoteBlock } from '@/components/landing/quote-block';
import { PracticalInfoSection } from '@/components/landing/practical-info-section';
import { Footer } from '@/components/landing/footer';

export function LandingPageContent({
  structuredData: _structuredData,
}: {
  structuredData?: unknown[];
}) {
  return (
    <main className="relative min-h-screen bg-background">
      <Header />
      <Hero />
      <WhyConsultSection />
      <ApproachTeaser />
      <QuoteBlock />
      <PracticalInfoSection />
      <Footer />
    </main>
  );
}
