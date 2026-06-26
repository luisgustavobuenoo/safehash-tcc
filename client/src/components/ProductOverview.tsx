import { motion } from 'framer-motion';
import productImage from '@/img/product-overview.jpg';

export default function ProductOverview() {
  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
         
          <motion.div 
            className="w-full lg:w-[45%]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-[24px] overflow-hidden shadow-xl group">
              <img 
                src={productImage}
                alt="Análise Forense Digital" 
                className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blue-600/30 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            </div>
          </motion.div>

          
          <motion.div 
            className="w-full lg:w-[55%]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.25em] mb-3 block">
              Visão Geral do Produto
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-6 leading-[1.2] tracking-tight">
              Análise forense de imagens   

              <span className="text-blue-600 mt-2 block">simplificada.</span>
            </h2>
            <p className="text-base text-slate-600 mb-8 leading-relaxed font-medium">
              Proteja dados críticos com a ferramenta definitiva para aquisição de evidências. O SafeHash elimina a complexidade, permitindo que você capture facilmente evidências digitais, preservando sua integridade.
            </p>

            
            <div className="space-y-6">
              <div className="relative pl-5 border-l-2 border-blue-600">
                <h4 className="text-base font-bold text-slate-900 mb-1">Imagens Forenses Digitais</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Crie registros exatos de provas digitais, preservando a integridade dos dados originais para uso legal e investigativo.
                </p>
              </div>

              <div className="relative pl-5 border-l-2 border-blue-600">
                <h4 className="text-base font-bold text-slate-900 mb-1">Aquisição rápida de evidências</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Capture metadados e hashes rapidamente para iniciar investigações sem demora, com processamento 100% local.
                </p>
              </div>

              <div className="relative pl-5 border-l-2 border-blue-600">
                <h4 className="text-base font-bold text-slate-900 mb-1">Simples e fácil de usar.</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Interface intuitiva, confiável para investigadores na coleta de evidências de forma consistente e repetível.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
    );
}