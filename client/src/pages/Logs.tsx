import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardList, 
  ShieldCheck, 
  Calendar, 
  Search, 
  RefreshCw,
  FileText
} from 'lucide-react';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Logs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLogs = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/evidence/logs?userId=${userId}` );
      const data = await response.json();
      if (response.ok) {
        setLogs(data);
      }
    } catch (error) {
      console.error("Erro ao buscar logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const generateFullReport = () => {
    const doc = new jsPDF();
    const userName = localStorage.getItem('userName') || 'Perito';
    
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text('RELATÓRIO DE AUDITORIA DE CUSTÓDIA', 105, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`EMISSOR: ${userName.toUpperCase()}`, 105, 30, { align: 'center' });

    autoTable(doc, {
      startY: 45,
      head: [['Data/Hora', 'Arquivo', 'Status', 'Perito']],
      body: logs.map(log => [
        new Date(log.verified_at).toLocaleString('pt-BR'),
        log.file_name,
        log.is_valid ? 'VÁLIDO' : 'INVÁLIDO',
        log.perito_name
      ]),
      headStyles: { fillColor: [15, 23, 42] }
    });

    doc.save('Relatorio_Auditoria_SafeHash.pdf');
  };

  const filteredLogs = logs.filter(log => 
    log.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.file_hash.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <DashboardHeader />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto p-6 lg:p-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <ClipboardList className="text-blue-600" /> Trilha de Auditoria
            </h1>
            <p className="text-slate-500 mt-1 text-sm">Registro imutável de todas as verificações de integridade.</p>
          </div>
          
          <Button 
            onClick={generateFullReport}
            className="bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-2 px-6 py-6 rounded-xl shadow-lg shadow-slate-200 transition-all"
          >
            <FileText size={18} />
            Gerar Relatório Full
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Filtrar por nome do arquivo ou hash..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={fetchLogs}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold text-[11px] uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Evento / Timestamp</th>
                  <th className="px-6 py-4">Arquivo / Evidência</th>
                  <th className="px-6 py-4">Responsável</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">Carregando registros...</td>
                  </tr>
                ) : filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">Nenhum log encontrado.</td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-xs font-bold text-slate-700">{new Date(log.verified_at).toLocaleString('pt-BR')}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">IP: {log.ip_address}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-bold text-slate-700">{log.file_name}</p>
                        <p className="text-[10px] text-blue-500 font-mono truncate max-w-[200px]">{log.file_hash}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                            {log.perito_name?.split(' ').map((n:any) => n[0]).join('').slice(0,2)}
                          </div>
                          <p className="text-xs font-medium text-slate-600">{log.perito_name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[9px] px-2 py-1 rounded-full font-bold uppercase ${
                          log.is_valid 
                            ? "bg-emerald-100 text-emerald-700" 
                            : "bg-red-100 text-red-700"
                        }`}>
                          {log.is_valid ? "Válido" : "Inválido"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
