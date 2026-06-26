import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductOverview from '@/components/ProductOverview';
import CapabilitiesSection from '@/components/CapabilitiesSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { useLocation } from 'wouter';

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero: Impacto Imediato e CTAs Principais */}
        <HeroSection onPrimaryCTA={() => setLocation('/register')} />
        
        {/* Product Overview: Visão Geral do Produto e Seus Benefícios */}
        <ProductOverview />
        
        {/* Capabilities: O "Como Funciona" Técnico e Visual (Substitui Features) */}
        <CapabilitiesSection />
        
        {/* FAQ: Quebra de Objeções e Detalhes de Conformidade */}
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}