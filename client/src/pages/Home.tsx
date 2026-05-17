import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CapabilitiesSection from '@/components/CapabilitiesSection';
import FAQSection from '@/components/FAQSection';
import ResourcesSection from '@/components/ResourcesSection';
import Footer from '@/components/Footer';
import { useLocation } from 'wouter';

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <HeroSection onPrimaryCTA={() => setLocation('/register')} />
        <FeaturesSection />
        <CapabilitiesSection />
        <FAQSection />
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  );
}