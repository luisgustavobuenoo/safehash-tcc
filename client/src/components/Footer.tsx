import { motion } from 'framer-motion';
import { useLocation } from 'wouter';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [, setLocation] = useLocation();

  const footerLinks = [
    {
      category: 'Plataforma',
      links: [
        { name: 'Página Inicial', path: '/' },
        { name: 'Verificar Integridade', path: '/verify' },
        { name: 'Área do Perito', path: '/login' },
        { name: 'Criar Conta', path: '/register' },
      ]
    },
    {
      category: 'Soluções',
      links: [
        { name: 'Para Advogados', path: '/solucoes/advogados' },
        { name: 'Para Peritos', path: '/solucoes/peritos' },
        { name: 'Captura de Imagens', path: '/solucoes/captura' },
      ]
    },
    {
      category: 'Conformidade',
      links: [
        { name: 'Art. 158-B do CPP', path: '/conformidade/cpp' },
        { name: 'Padrão ICP-Brasil', path: '/conformidade/icp-brasil' },
        { name: 'Segurança SHA-256', path: '/conformidade/sha256' },
      ]
    },
    {
      category: 'Recursos',
      links: [
        { name: 'Guias e Tutoriais', path: '/recursos/guias' },
        { name: 'Documentação Técnica', path: '/recursos/docs' },
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <footer className="bg-blue-950 text-gray-300 border-t border-white/5">
    
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div 
              className="text-2xl font-bold text-white mb-4 flex items-center gap-2 cursor-pointer"
              onClick={() => setLocation('/')}
            >
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-sm">SH</div>
              SafeHash
            </div>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
              Especialistas em preservação de integridade de imagens e capturas digitais. 
              Garantimos a cadeia de custódia conforme o Art. 158-B do CPP para peritos e advogados.
            </p>
            <div className="flex gap-4">
              <div className="px-3 py-1 bg-white/5 rounded border border-white/10 text-xs font-mono text-blue-400">
                Art. 158-B CPP
              </div>
              <div className="px-3 py-1 bg-white/5 rounded border border-white/10 text-xs font-mono text-blue-400">
                ICP-Brasil
              </div>
              <div className="px-3 py-1 bg-white/5 rounded border border-white/10 text-xs font-mono text-blue-400">
                SHA-256
              </div>
            </div>
          </motion.div>

         
          <motion.div
            className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {footerLinks.map((section) => (
              <motion.div key={section.category} variants={itemVariants}>
                <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-widest">{section.category}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => {
                          setLocation(link.path);
                          window.scrollTo(0, 0);
                        }}
                        className="text-gray-400 hover:text-blue-400 transition-colors text-sm text-left"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>

        
        <motion.div 
          className="bg-white/5 rounded-xl p-6 mb-12 border border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-gray-500 leading-relaxed text-center">
            <strong>Privacidade Forense:</strong> O SafeHash processa o cálculo do hash localmente no seu navegador. Seus arquivos jamais são enviados ou armazenados em nossos servidores. 
            A validade jurídica dos laudos depende da correta preservação do arquivo original e do respectivo Protocolo de Integridade gerado pela plataforma.
          </p>
        </motion.div>

      
        <div className="border-t border-white/10 my-8"></div>

        
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
         
          <div className="text-gray-500 text-sm">
            © {currentYear} SafeHash. Desenvolvido para a Justiça Digital Brasileira.
          </div>

          
          <div className="flex items-center gap-6">
            <span className="text-xs text-gray-600 uppercase tracking-tighter">Segurança Criptográfica SHA-256</span>
            <div className="h-4 w-px bg-white/10"></div>
            <span className="text-xs text-gray-600 uppercase tracking-tighter">Conformidade ISO/IEC 27037</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
