import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardList, 
  ShieldCheck, 
  Calendar, 
  Search, 
  Download, 
  Filter,
  FileText,
  RefreshCw
} from 'lucide-react';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/button';

export default function Logs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [logs, setLogs] = useState<any[]>([]); // Estado para os logs reais
  const [isLoading, setIsLoading] = useState(true);

  // FUNÇÃO PARA BUSCAR OS LOGS REAIS DO BACKEND
  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/evidence/logs' );
      const data = await response.json();
      if (response.ok) {
        setLogs(data);
      }
    } catch (error) {
      console.error("Erro ao buscar logs de auditoria:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // Lógica de filtro dinâmica
  const filteredLogs = logs.filter(log => 
    log.file_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.file_hash?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.is_valid ? 'sucesso' : 'falha').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <DashboardHeader />

      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="max-w-7xl mx-auto p-6 lg:p-8"
      >
        {/* Header da Página */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <ClipboardList className="text-blue-600" size={28} />
              Trilha de Auditoria
            </h1>
            <p className="text-slate-500 text-sm italic">Cadeia de custódia e logs de eventos do SafeHash</p>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={fetchLogs} variant="outline" className="flex items-center gap-2 border-slate-300">
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} /> Atualizar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <FileText size={16} /> Relatório Full
            </Button>
          </div>
        </div>

        {/* Barra de Filtros */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Filtrar por nome do arquivo ou hash..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tabela de Auditoria Real */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/80 text-slate-500 font-bold text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Evento / Ação</th>
                  <th className="px-6 py-4">Arquivo Relacionado</th>
                  <th className="px-6 py-4">Status de Integridade</th>
                  <th className="px-6 py-4 text-right">Timestamp (BRT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-md ${log.is_valid ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                          <ShieldCheck size={14} />
                        </div>
                        <span className="font-bold text-slate-700">Verificação de Hash</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-slate-700 font-medium">{log.file_name}</span>
                        <span className="text-[10px] text-slate-400 font-mono truncate max-w-[200px]">{log.file_hash}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        log.is_valid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {log.is_valid ? 'Integridade Confirmada' : 'Falha na Integridade'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-500 font-mono text-xs">
                      {new Date(log.verified_at).toLocaleString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredLogs.length === 0 && !isLoading && (
              <div className="p-12 text-center text-slate-400">
                Nenhum registro de auditoria encontrado no banco.
              </div>
            )}
          </div>
        </div>

        {/* Footer Técnico */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-3">
            <ShieldCheck className="text-emerald-600 mt-1" size={20} />
            <div>
              <p className="text-sm font-bold text-emerald-900">Integridade de Log Imutável</p>
              <p className="text-xs text-emerald-700 leading-relaxed">
                Cada verificação realizada pelo sistema gera um checkpoint automático nesta trilha, garantindo a transparência da cadeia de custódia.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
            <Calendar className="text-blue-600 mt-1" size={20} />
            <div>
              <p className="text-sm font-bold text-blue-900">Conformidade ISO 27037</p>
              <p className="text-xs text-blue-700 leading-relaxed">
                Este registro de auditoria atende aos requisitos de rastreabilidade exigidos pelas normas internacionais de perícia forense.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
