import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, ArrowRight, FileText, BarChart3, BookOpen } from 'lucide-react';
import { useLocation } from 'wouter';

const faqs = [
  {
    question: 'O SafeHash realiza upload dos meus arquivos?',
    answer: 'Não. O SafeHash utiliza tecnologia local-first. O cálculo do hash SHA-256 e a extração de metadados ocorrem inteiramente no seu navegador. Seus arquivos sensíveis nunca saem da sua máquina, garantindo total privacidade e conformidade com a LGPD.'
  },
  {
    question: 'Como o SafeHash garante a validade jurídica?',
    answer: 'Nossa solução combina o algoritmo SHA-256 (padrão internacional de integridade) com o Carimbo do Tempo assinado pela ICP-Brasil. Isso atende rigorosamente aos requisitos de fixação e preservação da cadeia de custódia previstos no Art. 158-B do CPP.'
  },
  {
    question: 'O que é o Protocolo de Integridade SafeHash?',
    answer: 'É um documento técnico (laudo) que consolida o hash do arquivo, o carimbo do tempo, metadados e a assinatura digital do sistema. Ele serve como prova mestre da integridade do vestígio digital, pronta para ser apresentada em juízo.'
  },
  {
    question: 'Posso validar um arquivo registrado anteriormente?',
    answer: 'Sim. O SafeHash oferece um Verificador Público gratuito. Basta carregar o arquivo original e o Protocolo de Integridade para que o sistema confirme, em segundos, se a prova permanece íntegra e inalterada.'
  },
  {
    question: 'Quais tipos de arquivos são suportados?',
    answer: 'O SafeHash é otimizado para evidências digitais críticas, suportando exclusivamente imagens nos formatos PNG, JPG e JPEG. O foco principal é garantir que qualquer captura de tela ou fotografia pericial mantenha sua integridade bit-a-bit e validade jurídica inquestionável.'
  }
];

const relatedResources = [
  {
    type: 'GUIA TÉCNICO',
    title: 'Entendendo o SHA-256 na Perícia',
    link: '/recursos/guias',
    icon: <FileText className="w-5 h-5" />
  },
  {
    type: 'LEGISLAÇÃO',
    title: 'Art. 158-B do CPP Comentado',
    link: '/recursos/guias',
    icon: <BarChart3 className="w-5 h-5" />
  },
  {
    type: 'CASO REAL',
    title: 'Validação de Prints em Juízo',
    link: '/recursos/guias',
    icon: <BookOpen className="w-5 h-5" />
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [, setLocation] = useLocation();

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-gray-600 text-lg">
              Tire suas dúvidas sobre a tecnologia, segurança e validade jurídica do SafeHash.
            </p>
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto space-y-4 mb-20">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-300"
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-bold text-gray-900 pr-8">{faq.question}</span>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Related Resources / CTA Horizontal Amplo */}
          <div className="bg-blue-950 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="flex flex-col xl:flex-row items-center justify-between gap-12">
                {/* Texto à Esquerda */}
                <div className="xl:max-w-md text-center xl:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Dúvidas sobre a Validade Jurídica?</h3>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    Acesse nossa base de conhecimento técnica e jurídica para entender como garantimos a cadeia de custódia conforme o Art. 158-B do CPP.
                  </p>
                </div>

                {/* Recursos à Direita - Distribuição Horizontal */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full xl:w-auto flex-1">
                  {relatedResources.map((resource, idx) => (
                    <div 
                      key={idx}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl flex flex-col items-center text-center hover:bg-white/15 transition-all cursor-pointer group min-w-[200px]"
                      onClick={() => setLocation(resource.link)}
                    >
                      <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                        {resource.icon}
                      </div>
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">{resource.type}</span>
                      <h4 className="text-sm font-bold text-white leading-tight mb-4">{resource.title}</h4>
                      <div className="mt-auto flex items-center gap-2 text-[10px] font-bold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        ACESSAR <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Decorative Background Icon */}
            <HelpCircle className="absolute -bottom-16 -right-16 w-80 h-80 text-white/5 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}