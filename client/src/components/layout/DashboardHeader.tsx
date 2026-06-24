import { useState, useEffect } from 'react';
import { Button } from '../ui/button'; 
import { 
  Shield, 
  LogOut, 
  ChevronDown,
  LayoutDashboard,
  FileSearch,
  ClipboardList
} from 'lucide-react';
import { useLocation } from 'wouter';


const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function DashboardHeader( ) {
  const [location, setLocation] = useLocation();
  const [userName, setUserName] = useState('Usuário');
  const [userInitials, setUserInitials] = useState('US');

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      try {
       
        const response = await fetch(`${API_BASE_URL}/auth/profile?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        
       
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Oops, não recebemos um JSON do servidor!");
        }

        const data = await response.json();
        if (response.ok && data.full_name) {
          setUserName(data.full_name);
          
          const initials = data.full_name
            .split(' ')
            .map((n: string) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
          setUserInitials(initials);
          
          localStorage.setItem('userName', data.full_name);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do cabeçalho:", error);
        const savedName = localStorage.getItem('userName');
        if (savedName) setUserName(savedName);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLocation('/');
  };

  const isActive = (path: string) => location === path;

  return (
    <header className="bg-white border-b sticky top-0 z-50 w-full shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setLocation('/dashboard')}
          >
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors shadow-blue-200 shadow-lg">
              <Shield className="text-white" size={20} />
            </div>
            <div className="flex flex-col leading-none hidden sm:flex">
              <span className="text-lg font-bold text-blue-900 tracking-tight">SafeHash</span>
              <span className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter">Custódia Digital</span>
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-1 md:gap-2">
          <button 
            onClick={() => setLocation('/dashboard')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive('/dashboard') 
                ? 'bg-blue-50 text-blue-700 shadow-sm' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard size={16} />
            <span className="hidden lg:inline">Dashboard</span>
          </button>

          <button 
            onClick={() => setLocation('/verify')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive('/verify') 
                ? 'bg-blue-50 text-blue-700 shadow-sm' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FileSearch size={16} />
            <span className="hidden lg:inline">Verificador</span>
          </button>

          <button 
            onClick={() => setLocation('/logs')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive('/logs') 
                ? 'bg-blue-50 text-blue-700 shadow-sm' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <ClipboardList size={16} />
            <span className="hidden lg:inline">Auditoria</span>
          </button>
        </nav>

        <div className="flex items-center gap-2 lg:gap-4">
          <div className="hidden xl:flex items-center gap-2 px-2 py-1 bg-emerald-50 border border-emerald-100 rounded-md">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-widest">Online</span>
          </div>

          <div className="h-6 w-[1px] bg-slate-200 mx-1 hidden md:block"></div>

          <div className="flex items-center gap-3">
            <div 
              onClick={() => setLocation('/profile')}
              className={`flex items-center gap-2 p-1 pr-2 rounded-full cursor-pointer transition-all hover:bg-slate-50 ${
                isActive('/profile') ? 'bg-blue-50 ring-1 ring-blue-100' : ''
              }`}
            >
              <div className="h-8 w-8 rounded-full bg-blue-600 border border-white shadow flex items-center justify-center text-white text-[10px] font-bold">
                {userInitials}
              </div>
              <div className="hidden md:flex flex-col items-start leading-tight">
                <span className="text-[11px] font-bold text-slate-800">{userName}</span>
                <span className="text-[9px] text-slate-500 font-medium">Ver Perfil</span>
              </div>
              <ChevronDown size={12} className="text-slate-400 hidden md:block" />
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-400 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
              title="Sair"
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
