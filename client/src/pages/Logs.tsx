
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  History, Search, Shield, Clock, CheckCircle2, AlertTriangle,
  RefreshCw, FileText, Fingerprint, User, Calendar, Globe
} from 'lucide-react';
import { toast } from 'sonner';
import DashboardHeader from '@/components/layout/DashboardHeader';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

type Log = {
  id: number;
  evidence_id: number;
  file_name: string;
  file_hash: string;
  client_name: string;
  is_valid: boolean | number;
  ip_address: string;
  verified_at: string;
};

export default function Logs( ) {
  const [logs, setLogs] = useState<Log[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return;
      setIsLoading(true);
      
    
      const response = await fetch(`${API_BASE_URL}/evidence/logs?userId=${userId}`, {
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      if (response.ok) {
        setLogs(Array.isArray(data) ? data : []);
      } else if (response.status === 401 || response.status === 403) {
        toast.error('Sessão expirada. Por favor, faça login novamente.');
      }
    } catch (error) {
      console.error('Erro ao carregar logs:', error);
      toast.error('Erro ao carregar trilha de auditoria.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const term = searchTerm.toLowerCase();
    return (
      log.file_name?.toLowerCase().includes(term) ||
      log.client_name?.toLowerCase().includes(term) ||
      log.file_hash?.toLowerCase().includes(term) ||
      log.ip_address?.includes(term)
    );
  });

  const totalVerifications = logs.length;
  const validVerifications = logs.filter(l => l.is_valid).length;
  const alertVerifications = totalVerifications - validVerifications;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      <DashboardHeader />
      <main className="max-w-[1440px] mx-auto p-6 lg:p-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Trilha de Auditoria</h1>
            <p className="text-slate-500 mt-1">Histórico completo de verificações e integridade.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
            <Shield size={16} className="text-emerald-600" />
            <span className="text-sm font-medium text-slate-700">Imutabilidade: Ativa</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-3xl font-bold text-slate-900">{totalVerifications}</p>
            <p className="text-slate-500 mt-2">Total de Verificações</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-3xl font-bold text-emerald-600">{validVerifications}</p>
            <p className="text-slate-500 mt-2">Integridades Confirmadas</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-3xl font-bold text-rose-600">{alertVerifications}</p>
            <p className="text-slate-500 mt-2">Alertas de Violação</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-slate-800 font-bold">
              <History size={20} className="text-blue-600" />
              <h2>Logs do Sistema</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="text"
                  placeholder="Buscar logs..."
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500/20 w-full md:w-64 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                onClick={fetchLogs}
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Evidência</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Hash SHA-256</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Data e IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400 text-xs font-bold uppercase">Carregando logs...</td>
                  </tr>
                ) : filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-5">
                        {log.is_valid ? (
                          <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase">
                            <CheckCircle2 size={14} />
                            <span>Íntegro</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-rose-600 font-bold text-[10px] uppercase">
                            <AlertTriangle size={14} />
                            <span>Violado</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-slate-900 truncate max-w-[250px]">{log.file_name}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <User size={10} className="text-slate-400" />
                          <p className="text-[10px] text-slate-500 font-medium">{log.client_name || 'N/A'}</p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1.5 text-slate-400 bg-slate-50 px-2 py-1 rounded-lg w-fit border border-slate-100">
                          <Fingerprint size={12} />
                          <span className="text-[10px] font-mono">{log.file_hash.slice(0, 16)}...</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex flex-col items-end gap-1">
                          <div className="flex items-center gap-1.5 text-slate-900 font-bold text-[10px]">
                            <Calendar size={12} className="text-blue-600" />
                            {new Date(log.verified_at).toLocaleString('pt-BR')}
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-medium">
                            <Globe size={12} />
                            {log.ip_address}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500 text-xs font-bold uppercase opacity-30">Nenhum registro de auditoria</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
