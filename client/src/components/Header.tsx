import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Shield, Scale, BookOpen, Camera } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  const menuItems = [
    {
      title: 'Soluções',
      icon: <Shield size={16} />,
      items: [
        { name: 'Para Advogados', desc: 'Preservação de provas digitais.', path: '/solucoes/advogados' },
        { name: 'Para Peritos', desc: 'Laudos e cadeia de custódia.', path: '/solucoes/peritos' },
      ]
    },
    {
      title: 'Conformidade',
      icon: <Scale size={16} />,
      items: [
        { name: 'Validade Jurídica', desc: 'Conformidade Art. 158-B CPP.', path: '/conformidade/cpp' },
        { name: 'Segurança SHA-256', desc: 'Integridade criptográfica.', path: '/conformidade/sha256' },
      ]
    }
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
    
      <div className="bg-slate-900 text-white py-1 px-4 text-[10px] font-bold tracking-widest uppercase">
        <div className="container mx-auto flex justify-between items-center opacity-80">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Shield size={10} className="text-blue-400" /> Art. 158-B CPP</span>
            <span className="hidden md:flex items-center gap-1"><Scale size={10} className="text-blue-400" /> Padrão Forense</span>
          </div>
          <div className="flex items-center gap-1">Online e Protegido</div>
        </div>
      </div>

      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setLocation('/')}>
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-600/20">SH</div>
          <span className="text-xl font-black text-slate-900 tracking-tighter">SafeHash</span>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((menu) => (
            <div key={menu.title} className="relative group" onMouseEnter={() => setActiveDropdown(menu.title)} onMouseLeave={() => setActiveDropdown(null)}>
              <button className="flex items-center gap-1 text-slate-600 hover:text-blue-600 font-bold text-xs uppercase tracking-wider transition-colors py-2">
                {menu.title}
                <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === menu.title ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === menu.title && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-xl border border-slate-100 p-3 mt-1">
                    {menu.items.map((item) => (
                      <div key={item.name} className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer group/item" onClick={() => { setLocation(item.path); setActiveDropdown(null); }}>
                        <div className="font-bold text-slate-900 group-hover/item:text-blue-600 text-xs">{item.name}</div>
                        <div className="text-[10px] text-slate-400">{item.desc}</div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <button onClick={() => setLocation('/recursos/guias')} className="text-slate-600 hover:text-blue-600 font-bold text-xs uppercase tracking-wider transition-colors">Recursos</button>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button className="text-xs font-bold text-slate-600 hover:text-blue-600 px-4 transition-all" onClick={() => setLocation('/login')}>Entrar</button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2 rounded-lg shadow-lg shadow-blue-600/20" onClick={() => setLocation('/register')}>Criar Conta</Button>
        </div>

        <button className="lg:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
