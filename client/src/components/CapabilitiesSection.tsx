import { motion } from 'framer-motion';
import { Shield, Clock, Search, Lock } from 'lucide-react';

const capabilities = [
  {
    title: "Cálculo de Hash SHA-256 Local",
    description: "A integridade da prova é gerada instantaneamente no seu navegador. O arquivo original nunca sai da sua máquina, garantindo privacidade forense absoluta e conformidade com a LGPD.",
    icon: <Shield className="w-6 h-6 text-blue-600" />,
    id: "01"
  },
  {
    title: "Registro de Integridade Temporal",
    description: "Cada evidência recebe um registro de tempo imutável vinculado ao hash, permitindo a comprovação da tempestividade e ordem cronológica dos fatos sem necessidade de APIs externas pagas.",
    icon: <Clock className="w-6 h-6 text-blue-600" />,
    id: "02"
  },
  {
    title: "Verificador Público de Mesmidade",
    description: "Ferramenta de auditoria que permite a qualquer parte interessada validar se um arquivo permanece idêntico ao que foi originalmente custodiado, combatendo fraudes processuais.",
    icon: <Search className="w-8 h-8 text-blue-600" />,
    id: "03"
  },
  {
    title: "Cadeia de Custódia Blindada",
    description: "Registro detalhado de metadados EXIF e trilha de auditoria completa, em conformidade com o Art. 158-B do CPP e as diretrizes internacionais da ISO 27037.",
    icon: <Lock className="w-8 h-8 text-blue-600" />,
    id: "04"
  }
];

const capabilityImages = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80"
];

export default function CapabilitiesSection( ) {
  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Capacidades Forenses</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Tecnologia avançada para garantir que a evidência digital coletada hoje seja aceita como prova irrefutável amanhã.
          </p>
        </motion.div>

        <div className="space-y-20 md:space-y-24">
          {capabilities.map((capability, index) => (
            <motion.div 
              key={capability.id}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              
              <div className={`w-full md:w-1/2 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                  <img 
                    src={capabilityImages[index]} 
                    alt={capability.title} 
                    className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md border border-white/20">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></div>
                      <span className="text-[9px] font-black text-slate-900 uppercase tracking-tighter">Integridade Garantida</span>
                    </div>
                  </div>
                </div>
              </div>

             
              <div className={`w-full md:w-1/2 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold mb-4 uppercase tracking-widest">
                  Capacidade {capability.id}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 leading-tight">
                  {capability.title}
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                  {capability.description}
                </p>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 w-fit">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {capability.icon}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocolo Seguro</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
