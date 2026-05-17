import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  onPrimaryCTA?: () => void;
  onSecondaryCTA?: () => void;
}

export default function HeroSection({
  title = "SafeHash: A Cadeia de Custódia Digital com Validade Jurídica e Privacidade Forense",
  subtitle = "Garanta a integridade inquestionável de suas provas digitais. O SafeHash é a plataforma essencial para peritos e advogados que buscam conformidade com o Art. 158-B do CPP e Carimbo do Tempo ICP-Brasil.",
  primaryCTA = "Começar Registro Agora",
  secondaryCTA = "Ver Planos Profissionais",
  onPrimaryCTA,
  onSecondaryCTA,
}: HeroSectionProps) {
  const [, setLocation] = useLocation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  // Função para lidar com o clique no botão secundário (Planos)
  const handleSecondaryClick = () => {
    if (onSecondaryCTA) {
      onSecondaryCTA();
    } else {
      setLocation('/planos');
    }
  };

  // Função para lidar com o clique no botão primário (Registro/Login)
  const handlePrimaryClick = () => {
    if (onPrimaryCTA) {
      onPrimaryCTA();
    } else {
      setLocation('/register');
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_25%,rgba(68,68,68,.2)_50%,transparent_50%,transparent_75%,rgba(68,68,68,.2)_75%,rgba(68,68,68,.2))] bg-[length:40px_40px]"></div>
      </div>

      <motion.div
        className="container mx-auto px-4 relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <span className="text-sm text-gray-200">Privacidade Forense</span>
            <span className="text-gray-400">/</span>
            <span className="text-sm font-semibold text-white">Conformidade CPP</span>
          </div>
        </motion.div>

       
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-5xl mx-auto"
        >
          {title}
        </motion.h1>

        
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>

       
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/50 w-full sm:w-auto"
            onClick={handlePrimaryClick}
          >
            {primaryCTA}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent border-white/30 hover:bg-white/10 text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 w-full sm:w-auto"
            onClick={handleSecondaryClick}
          >
            {secondaryCTA}
          </Button>
        </motion.div>
      </motion.div>

     
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-300">Explore a Tecnologia</span>
          <svg
            className="w-6 h-6 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}