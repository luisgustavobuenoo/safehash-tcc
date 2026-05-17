import { motion } from 'framer-motion';
import { User, Mail, Shield, Calendar, Award, Fingerprint, FileCheck } from 'lucide-react';
import DashboardHeader from '@/components/layout/DashboardHeader';

export default function Profile() {
  // Dados que depois virão do auth do banco
  const user = {
    nome: "Luís Gustavo Bueno",
    cargo: "Perito Adjunto de Sistemas",
    email: "luis.ads@safehash.com.br",
    matricula: "PC-PR-2026-0882",
    desde: "Março de 2026",
    organizacao: "Centro Universitário Integrado / SafeHash Project",
    totalEvidencias: 24
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <DashboardHeader />

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="max-w-4xl mx-auto p-6 lg:p-12"
      >
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden">
          
          <div className="h-32 bg-gradient-to-r from-blue-700 to-indigo-800 flex items-end justify-center">
            <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-lg -mb-12 flex items-center justify-center text-blue-700">
              <User size={48} />
            </div>
          </div>

          <div className="pt-16 pb-10 px-8 text-center border-b border-slate-100">
            <h1 className="text-2xl font-bold text-slate-900">{user.nome}</h1>
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mt-1">{user.cargo}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 lg:p-12">
            
            {/* Dados Funcionais */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Fingerprint size={16} /> Identidade Funcional
              </h3>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><Mail size={18} /></div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">E-mail Institucional</p>
                  <p className="text-sm font-semibold text-slate-700">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><Shield size={18} /></div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Matrícula / ID</p>
                  <p className="text-sm font-mono font-bold text-slate-700">{user.matricula}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><Calendar size={18} /></div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Membro desde</p>
                  <p className="text-sm font-semibold text-slate-700">{user.desde}</p>
                </div>
              </div>
            </div>

            {/* Atividade no Sistema */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Award size={16} /> Estatísticas de Uso
              </h3>
              
              <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex flex-col items-center">
                <div className="p-3 bg-blue-600 text-white rounded-full mb-3">
                  <FileCheck size={24} />
                </div>
                <span className="text-3xl font-black text-blue-900">{user.totalEvidencias}</span>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-tighter">Evidências Custodiadas</span>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                <p className="text-[10px] font-bold text-amber-700 uppercase leading-relaxed text-center italic">
                  "Os dados acima são imutáveis e vinculados à auditoria do sistema SafeHash."
                </p>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}