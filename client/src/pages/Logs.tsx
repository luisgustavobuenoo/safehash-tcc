import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardList, CheckCircle, XCircle, Calendar, 
  Search, ShieldCheck, Filter, ArrowUpDown, FileText
} from 'lucide-react';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/button';

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      try {
        const response = await fetch(`http://localhost:5000/api/evidence/logs?userId=${userId}` );
        const data = await response.json();
        if (response.ok) setLogs(data);
      } catch (error) {
        console.error("Erro ao buscar auditoria:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log: any) => 
    log.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.file_hash.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
        >
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <ClipboardList className="text-blue-600" size={32} />
              Trilha de Auditoria
            </h1>
            <p className="text-slate-500 mt-1">Monitoramento de integridade e registros de acesso forense.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Buscar arquivo ou hash..."
                className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl w-full md:w-80 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="rounded-xl gap-2">
              <Filter size={18} /> Filtrar
            </Button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loading" className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-slate-500 font-medium">Sincronizando registros...</p>
            </motion.div>
          ) : filteredLogs.length > 0 ? (
            <motion.div 
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-200">
                      <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Evidência</th>
                      <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Hash de Origem</th>
                      <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Data/Hora</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLogs.map((log: any) => (
                      <tr key={log.id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-6 py-5">
                          {log.is_valid ? (
                            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 w-fit">
                              <CheckCircle size={16} />
                              <span className="text-xs font-bold">Íntegro</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 w-fit">
                              <XCircle size={16} />
                              <span className="text-xs font-bold">Violado</span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                              <FileText size={18} className="text-slate-500 group-hover:text-blue-600" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-slate-900">{log.file_name}</span>
                              <span className="text-[11px] text-slate-400">ID: #{log.evidence_id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <code className="text-[11px] bg-slate-100 px-2 py-1 rounded text-slate-600 font-mono">
                            {log.file_hash.substring(0, 16)}...
                          </code>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-600 font-medium">
                          {new Date(log.verified_at).toLocaleString('pt-BR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-20 text-center"
            >
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-blue-200" size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Sem registros de auditoria</h3>
              <p className="text-slate-500 max-w-sm mx-auto">
                Realize uma verificação de integridade no módulo "Verificador" para gerar os primeiros logs.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
