import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: string;
  onPrimaryCTA?: () => void;
}

export default function HeroSection({
  title = "SafeHash: Preservação de Evidências Digitais com Rigor Forense",
  subtitle = "Automatize a Cadeia de Custódia conforme o Art. 158-B do CPP. Garanta a integridade através de Lacre Digital SHA-256 e Registro Temporal em uma plataforma de privacidade forense.",
  primaryCTA = "Iniciar Registro de Custódia",
  onPrimaryCTA,
}: HeroSectionProps) {
  const [, setLocation] = useLocation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const handlePrimaryClick = () => {
    if (onPrimaryCTA) {
      onPrimaryCTA();
    } else {
      setLocation('/register');
    }
  };

  return (
    <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 py-16">
     
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_25%,rgba(68,68,68,.2)_50%,transparent_50%,transparent_75%,rgba(68,68,68,.2)_75%,rgba(68,68,68,.2))] bg-[length:30px_30px]"></div>
      </div>

      <motion.div
        className="container mx-auto px-4 relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <span className="text-[10px] md:text-xs font-bold text-gray-200 uppercase tracking-widest">ISO/IEC 27037</span>
            <span className="text-gray-500">|</span>
            <span className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-widest">Art. 158-B CPP</span>
          </div>
        </motion.div>

        <motion.h1 
          variants={itemVariants} 
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight max-w-4xl mx-auto tracking-tight"
        >
          {title}
        </motion.h1>
        
        <motion.p 
          variants={itemVariants} 
          className="text-sm md:text-base text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed opacity-90"
        >
          {subtitle}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 text-base font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/30 w-full sm:w-auto" 
            onClick={handlePrimaryClick}
          >
            {primaryCTA}
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-transparent border-white/20 hover:bg-white/5 text-white px-6 py-5 text-base font-bold rounded-xl transition-all duration-300 w-full sm:w-auto" 
            onClick={() => setLocation('/verify')}
          >
            Verificar Integridade
          </Button>
        </motion.div>
      </motion.div>

     
      <motion.div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-50" 
        animate={{ y: [0, 5, 0] }} 
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Protocolo Forense</span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
