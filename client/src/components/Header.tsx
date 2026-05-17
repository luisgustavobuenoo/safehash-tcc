

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Shield, Scale, BookOpen, CreditCard, Camera, Scale as JusticeIcon } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Menu items com dropdowns
  const menuItems = [
    {
      title: 'Soluções',
      icon: <Shield size={18} />,
      items: [
        { name: 'Para Advogados', desc: 'Preservação de prints e provas digitais.', path: '/solucoes/advogados' },
        { name: 'Para Peritos', desc: 'Laudos técnicos e cadeia de custódia.', path: '/solucoes/peritos' },
        { name: 'Captura de Imagens', desc: 'Validação de fotos e capturas de tela.', path: '/solucoes/captura' },
      ]
    },
    {
      title: 'Conformidade',
      icon: <Scale size={18} />,
      items: [
        { name: 'Validade Jurídica (CPP)', desc: 'Conformidade com o Art. 158-B.', path: '/conformidade/cpp' },
        { name: 'Carimbo do Tempo ICP-Brasil', desc: 'Prova de tempestividade oficial.', path: '/conformidade/icp-brasil' },
        { name: 'Segurança SHA-256', desc: 'Integridade criptográfica de ponta.', path: '/conformidade/sha256' },
      ]
    },
    {
      title: 'Recursos',
      icon: <BookOpen size={18} />,
      items: [
        { name: 'Guias e Tutoriais', desc: 'Aprenda a registrar suas provas.', path: '/recursos/guias' },
        { name: 'Documentação Técnica', desc: 'Detalhes para integração e perícia.', path: '/recursos/docs' },
      ]
    }
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      {/* Top Bar de Autoridade */}
      <div className="bg-blue-900 text-white py-1.5 px-4 text-[10px] sm:text-xs font-medium">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Shield size={12} className="text-blue-400" />
              Conforme Art. 158-B do CPP
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Scale size={12} className="text-blue-400" />
              Padrão ICP-Brasil
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Camera size={12} className="text-blue-400" />
            Especialista em Integridade de Imagens
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div
          className="text-2xl font-bold text-blue-900 cursor-pointer flex items-center gap-2"
          onClick={() => setLocation('/')}
        >
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-sm">SH</div>
          SafeHash
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {/* Menu Items com Dropdown */}
          {menuItems.map((menu) => (
            <div 
              key={menu.title} 
              className="relative group"
              onMouseEnter={() => setActiveDropdown(menu.title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 font-medium transition-colors py-2">
                {menu.title}
                <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === menu.title ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === menu.title && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-72 bg-white shadow-xl rounded-xl border border-gray-100 p-4 mt-1"
                  >
                    <div className="grid gap-4">
                      {menu.items.map((item) => (
                        <div 
                          key={item.name}
                          className="group/item cursor-pointer p-2 rounded-lg hover:bg-blue-50 transition-colors"
                          onClick={() => {
                            setLocation(item.path);
                            setActiveDropdown(null);
                          }}
                        >
                          <div className="font-bold text-gray-900 group-hover/item:text-blue-600 text-sm">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* ✨ NOVO: Jurisprudência como item separado (SEM dropdown) */}
          <button 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors py-2"
            onClick={() => setLocation('/jurisprudencia')}
          >
            <JusticeIcon size={18} />
            Jurisprudência
          </button>

          {/* Planos e Assinaturas */}
          <button 
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-1"
            onClick={() => setLocation('/planos')}
          >
            <CreditCard size={18} />
            Planos e Assinaturas
          </button>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all"
            onClick={() => setLocation('/login')}
          >
            Entrar
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 shadow-md shadow-blue-600/20 transition-all"
            onClick={() => setLocation('/register')}
          >
            Registrar
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-gray-600"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-6">
              {menuItems.map((menu) => (
                <div key={menu.title} className="space-y-3">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    {menu.icon}
                    {menu.title}
                  </div>
                  <div className="grid gap-3 pl-6">
                    {menu.items.map((item) => (
                      <div 
                        key={item.name}
                        className="text-gray-700 font-medium hover:text-blue-600 cursor-pointer"
                        onClick={() => {
                          setLocation(item.path);
                          setIsOpen(false);
                        }}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* ✨ NOVO: Jurisprudência no mobile */}
              <div 
                className="text-gray-700 font-bold flex items-center gap-2 pt-2 border-t border-gray-50"
                onClick={() => {
                  setLocation('/jurisprudencia');
                  setIsOpen(false);
                }}
              >
                <JusticeIcon size={18} className="text-blue-600" />
                Jurisprudência
              </div>

              {/* Planos */}
              <div 
                className="text-gray-700 font-bold flex items-center gap-2"
                onClick={() => {
                  setLocation('/planos');
                  setIsOpen(false);
                }}
              >
                <CreditCard size={18} className="text-blue-600" />
                Planos e Assinaturas
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                  onClick={() => {
                    setLocation('/login');
                    setIsOpen(false);
                  }}
                >
                  Entrar
                </Button>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    setLocation('/register');
                    setIsOpen(false);
                  }}
                >
                  Registrar
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}