import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useLocation } from 'wouter';

const faqs = [
  { question: 'O SafeHash realiza upload dos meus arquivos?', answer: 'Não. O SafeHash utiliza tecnologia local-first. O cálculo do hash SHA-256 e a extração de metadados ocorrem inteiramente no seu navegador. Seus arquivos sensíveis nunca saem da sua máquina, garantindo total privacidade e conformidade com a LGPD.' },
  { question: 'Como o SafeHash garante a validade jurídica?', answer: 'Nossa solução utiliza o algoritmo SHA-256 (padrão internacional de integridade) vinculado a um registro de integridade temporal. Isso atende aos requisitos de fixação e preservação da cadeia de custódia previstos no Art. 158-B do CPP e segue as diretrizes da ISO 27037.' },
  { question: 'O que é o Protocolo de Integridade SafeHash?', answer: 'É um documento técnico que consolida o hash do arquivo, o registro de tempo, metadados EXIF e a assinatura digital do sistema. Ele serve como prova da integridade do vestígio digital desde o momento da custódia.' },
  { question: 'Posso validar um arquivo registrado anteriormente?', answer: 'Sim. O SafeHash oferece um Verificador Público. Basta carregar o arquivo original e os dados do Protocolo para que o sistema confirme se a prova permanece íntegra e inalterada.' },
  { question: 'Quais tipos de arquivos são suportados?', answer: 'O SafeHash é otimizado para evidências digitais críticas, suportando exclusivamente imagens nos formatos PNG, JPG e JPEG para garantir a extração precisa de metadados forenses.' }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [, setLocation] = useLocation();

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h2>
            <p className="text-gray-600 text-lg">Tire suas dúvidas sobre a tecnologia, segurança e validade jurídica do SafeHash.</p>
          </div>
          <div className="space-y-4 mb-20">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-300">
                <button className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                  <span className="font-bold text-gray-900 pr-8">{faq.question}</span>
                  {openIndex === index ? <Minus className="w-5 h-5 text-blue-600 flex-shrink-0" /> : <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                      <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <div className="bg-blue-900 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl text-center">
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ainda tem dúvidas técnicas?</h3>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">Nossa documentação técnica detalha cada etapa do processo de hashing e registro temporal para auditoria.</p>
              <button 
                className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
                onClick={() => setLocation('/recursos/docs')}
              >
                Acessar Recursos Técnicos
              </button>
            </div>
            <HelpCircle className="absolute -bottom-16 -right-16 w-64 h-64 text-white/5 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
