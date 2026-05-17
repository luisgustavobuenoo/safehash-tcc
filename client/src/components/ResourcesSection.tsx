import { motion } from 'framer-motion';
import { FileText, BarChart3, BookOpen, ArrowRight } from 'lucide-react';
import { useLocation } from 'wouter';


const resourcesData = [
  {
    id: 1,
    type: 'GUIAS PRÁTICOS',
    title: 'Preservando Prints de WhatsApp com Validade Jurídica',
    description: 'Aprenda o passo a passo para registrar prints de conversas como provas irrefutáveis, garantindo a conformidade com o Art. 158-B do CPP.',
    link: '/recursos/guias',
    icon: 'FileText'
  },
  {
    id: 2,
    type: 'WEBINARS',
    title: 'Integridade Digital para Advogados e Peritos',
    description: 'Descubra como profissionais do direito utilizam o SafeHash para garantir a autenticidade de evidências online e evitar a nulidade de provas.',
    link: '/recursos/guias',
    icon: 'BarChart3'
  },
  {
    id: 3,
    type: 'ESTUDOS DE CASO',
    title: 'Perícia Assistencial: Validando Provas em Processos Judiciais',
    description: 'Veja como peritos assistentes utilizam o SafeHash para garantir a integridade de evidências digitais em casos complexos.',
    link: '/recursos/guias',
    icon: 'BookOpen'
  }
];

const iconMap: Record<string, React.ReactNode> = {
  'GUIAS PRÁTICOS': <FileText size={32} />,
  'WEBINARS': <BarChart3 size={32} />,
  'ESTUDOS DE CASO': <BookOpen size={32} />,
};

export default function ResourcesSection() {
  const [, setLocation] = useLocation();

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
    <section className="py-16 md:py-24 bg-gray-50">
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
            Educação e Autoridade Forense
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aprenda como o SafeHash potencializa suas investigações e garante a segurança jurídica das suas evidências digitais.
          </p>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {resourcesData.map((resource) => (
            <motion.div
              key={resource.id}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col"
              
            >
              {/* Icon Background */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex items-center justify-center">
                <div className="text-blue-500 group-hover:scale-110 transition-transform duration-300">
                  {iconMap[resource.type as keyof typeof iconMap]}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <span className="inline-block text-blue-600 font-semibold text-xs uppercase tracking-wider mb-3">
                  {resource.type}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                  {resource.description}
                </p>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}