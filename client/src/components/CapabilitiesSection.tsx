import { motion } from 'framer-motion';


const capabilitiesData = [
  {
    id: 1,
    title: 'Geração de Hash SHA-256',
    description: 'Crie impressões digitais únicas e irreproduzíveis para seus arquivos. Se um único pixel mudar, o código muda totalmente, garantindo total rastreabilidade e imutabilidade da prova digital conforme o Art. 158-B do CPP.'
  },
  {
    id: 2,
    title: 'Relatórios Técnicos em PDF',
    description: 'Gere documentos profissionais com Carimbo do Tempo ICP-Brasil, metadados e hashes. Nossos laudos servem como prova técnica irrefutável em processos judiciais e auditorias corporativas com validade jurídica comprovada.'
  },
  {
    id: 3,
    title: 'Verificação de Integridade Forense',
    description: 'Compare o hash atual de um arquivo com o registro original. Detecte qualquer alteração, mesmo que mínima, com precisão absoluta e gere relatórios de divergência para apontar quebras na cadeia de custódia.'
  },
  {
    id: 4,
    title: 'Preservação de Provas Digitais',
    description: 'Registre prints de WhatsApp, e-mails e redes sociais com comprovação técnica de autenticidade. Ideal para advogados e investigadores que precisam de evidências robustas e aceitáveis em juízo.'
  },
  {
    id: 5,
    title: 'Auditoria e Rastreabilidade',
    description: 'Mantenha um histórico completo de integridade de seus documentos. Prove a existência e o estado original de arquivos em datas específicas com o suporte de Carimbos do Tempo oficiais.'
  },
  {
    id: 6,
    title: 'Integração via API Forense',
    description: 'Integre o SafeHash em seus sistemas e fluxos de trabalho automatizados. Validação de integridade em escala para empresas que exigem segurança contínua e conformidade regulatória.'
  }
];

const capabilityImages = [
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop',
];

export default function CapabilitiesSection() {
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Recursos Forenses Avançados
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl">
            O SafeHash fornece ferramentas abrangentes para a fixação, preservação e análise de evidências digitais com total segurança jurídica.
          </p>
        </motion.div>

        {/* Capabilities */}
        <div className="space-y-16">
          {capabilitiesData.map((capability, index) => (
            <motion.div
              key={capability.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.2 }}
            >
              {/* Alternating layout */}
              {index % 2 === 0 ? (
                <>
                  {/* Content Left */}
                  <motion.div variants={itemVariants}>
                    <div className="bg-blue-100 text-blue-600 inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      Capacidade Forense {capability.id}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {capability.title}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {capability.description}
                    </p>
                  </motion.div>
                  {/* Image Right */}
                  <motion.div variants={imageVariants}>
                    <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
                      <img
                        src={capabilityImages[index]}
                        alt={capability.title}
                        className="w-full h-96 object-cover"
                      />
                    </div>
                  </motion.div>
                </>
              ) : (
                <>
                  {/* Image Left */}
                  <motion.div variants={imageVariants} className="md:order-2">
                    <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
                      <img
                        src={capabilityImages[index]}
                        alt={capability.title}
                        className="w-full h-96 object-cover"
                      />
                    </div>
                  </motion.div>
                  {/* Content Right */}
                  <motion.div variants={itemVariants} className="md:order-1">
                    <div className="bg-blue-100 text-blue-600 inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      Capacidade Forense {capability.id}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {capability.title}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {capability.description}
                    </p>
                  </motion.div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}