import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Calendar, Award, Fingerprint, FileCheck, Briefcase } from 'lucide-react';
import DashboardHeader from '@/components/layout/DashboardHeader';

export default function Profile() {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:5000/api/auth/profile?userId=${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        } );
        const data = await response.json();
        if (response.ok) setUserData(data);
      } catch (error) { console.error(error); } finally { setIsLoading(false); }
    };
    fetchProfile();
  }, []);

  if (isLoading || !userData) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Carregando...</div>;

  const memberSince = new Date(userData.created_at).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <DashboardHeader />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto p-6 lg:p-12">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className={`h-32 bg-gradient-to-r flex items-end justify-center ${userData.professional_type === 'Perito' ? 'from-blue-700 to-indigo-800' : 'from-slate-700 to-slate-900'}`}>
            <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-lg -mb-12 flex items-center justify-center">
              {userData.professional_type === 'Perito' ? <Shield size={48} className="text-blue-700" /> : <Briefcase size={48} className="text-slate-700" />}
            </div>
          </div>

          <div className="pt-16 pb-10 px-8 text-center border-b border-slate-100">
            <h1 className="text-2xl font-bold text-slate-900">{userData.full_name}</h1>
            <p className={`font-bold text-xs uppercase tracking-widest mt-1 ${userData.professional_type === 'Perito' ? 'text-blue-600' : 'text-slate-600'}`}>{userData.cargo || 'Profissional'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 lg:p-12">
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Fingerprint size={16} /> Identidade Funcional</h3>
              <div className="flex items-start gap-4"><div className="p-2 bg-slate-50 rounded-lg text-slate-400"><Mail size={18} /></div><div><p className="text-xs text-slate-400 font-medium">E-mail Institucional</p><p className="text-sm font-semibold text-slate-700">{userData.email}</p></div></div>
              <div className="flex items-start gap-4"><div className="p-2 bg-slate-50 rounded-lg text-slate-400">{userData.professional_type === 'Perito' ? <Shield size={18} /> : <Briefcase size={18} />}</div><div><p className="text-xs text-slate-400 font-medium">{userData.professional_type === 'Perito' ? 'Matrícula / ID' : 'Número da OAB'}</p><p className="text-sm font-mono font-bold text-slate-700">{userData.matricula || 'Não informado'}</p></div></div>
              <div className="flex items-start gap-4"><div className="p-2 bg-slate-50 rounded-lg text-slate-400"><Calendar size={18} /></div><div><p className="text-xs text-slate-400 font-medium">Membro desde</p><p className="text-sm font-semibold text-slate-700">{memberSince}</p></div></div>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Award size={16} /> Estatísticas de Uso</h3>
              <div className={`p-6 rounded-2xl border flex flex-col items-center ${userData.professional_type === 'Perito' ? 'bg-blue-50/50 border-blue-100' : 'bg-slate-50 border-slate-200'}`}>
                <div className={`p-3 rounded-full mb-3 text-white ${userData.professional_type === 'Perito' ? 'bg-blue-600' : 'bg-slate-800'}`}><FileCheck size={24} /></div>
                <span className={`text-3xl font-black ${userData.professional_type === 'Perito' ? 'text-blue-900' : 'text-slate-900'}`}>{userData.totalEvidencias || 0}</span>
                <span className={`text-xs font-bold uppercase tracking-tighter ${userData.professional_type === 'Perito' ? 'text-blue-600' : 'text-slate-600'}`}>Evidências Custodiadas</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
