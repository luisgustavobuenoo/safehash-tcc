import { motion } from 'framer-motion';
import { Shield, FileText, CheckCircle } from 'lucide-react';


const featuresData = [
  {
    id: 1,
    icon: 'Shield',
    title: 'Lacre Digital SHA-256',
    description: 'Gere uma impressão digital única e imutável para qualquer arquivo. O algoritmo SHA-256 garante que qualquer alteração mínima seja detectada, assegurando a integridade da prova desde a fixação até o tribunal.'
  },
  {
    id: 2,
    icon: 'FileText',
    title: 'Laudos com Validade Jurídica',
    description: 'Exporte certificados em PDF com metadados detalhados e Carimbo do Tempo ICP-Brasil. Documentos prontos para instrução processual, auditorias e perícias, com total segurança jurídica.'
  },
  {
    id: 3,
    icon: 'CheckCircle',
    title: 'Privacidade Forense Local',
    description: 'Valide a integridade de arquivos sem realizar upload. O processamento ocorre 100% no seu navegador, garantindo que dados sensíveis e sigilosos nunca saiam da sua máquina.'
  }
];

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield size={32} />,
  FileText: <FileText size={32} />,
  CheckCircle: <CheckCircle size={32} />,
};

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            A Autoridade em Preservação de Provas Digitais
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            A solução definitiva para Peritos, Advogados e Empresas que exigem conformidade com o Art. 158-B do CPP e validade jurídica ICP-Brasil.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuresData.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-lg p-8 hover:shadow-lg transition-all duration-300 hover:border-blue-400"
            >
              <div className="text-blue-600 mb-4">
                {iconMap[feature.icon as keyof typeof iconMap]}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Overview Section */}
        <motion.div
          className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Tecnologia e Direito
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-4">
              Segurança Jurídica e Tecnologia de Ponta para sua Cadeia de Custódia
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              O SafeHash preenche o gap tecnológico na perícia digital brasileira. Nossa plataforma automatiza a preservação da cadeia de custódia, unindo o rigor do algoritmo SHA-256 à fé pública do Carimbo do Tempo ICP-Brasil. Ideal para profissionais que buscam agilidade sem abrir mão da robustez técnica necessária para a validade da prova em juízo.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}