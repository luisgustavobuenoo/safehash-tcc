import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardList, 
  ShieldCheck, 
  User, 
  Calendar, 
  Search, 
  Download, 
  Filter,
  FileText
} from 'lucide-react';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { Button } from '@/components/ui/button';

export default function Logs() {
  const [searchTerm, setSearchTerm] = useState("");
  
  
  const [logs] = useState([
    { id: 1, action: "Registro de Evidência", user: "Luís Gustavo", detail: "Doc: contrato_digital_v1.pdf", date: "2026-04-03 22:15", type: "create" },
    { id: 2, action: "Verificação de Hash", user: "Luís Gustavo", detail: "Integridade Confirmada (SHA-256)", date: "2026-04-03 22:18", type: "verify" },
    { id: 3, action: "Login no Sistema", user: "Luís Gustavo", detail: "IP: 192.168.0.1 (Sessão Segura)", date: "2026-04-03 22:00", type: "system" },
    { id: 4, action: "Exportação de Relatório", user: "Luís Gustavo", detail: "Relatório Mensal PDF", date: "2026-04-03 22:30", type: "system" },
  ]);

  // Lógica de filtro para a demonstração
  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.detail.toLowerCase().includes(searchTerm.toLowerCase())
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
            <Button variant="outline" className="flex items-center gap-2 border-slate-300">
              <Download size={16} /> Exportar PDF
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <FileText size={16} /> Relatório Full
            </Button>
          </div>
        </div>

        {/* Barra de Filtros (Destaque para o TCC) */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Filtrar por ação ou detalhe do arquivo..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="ghost" className="text-slate-500 flex items-center gap-2">
            <Filter size={16} /> Filtros Avançados
          </Button>
        </div>

        {/* Tabela de Auditoria */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/80 text-slate-500 font-bold text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Evento / Ação</th>
                  <th className="px-6 py-4">Operador</th>
                  <th className="px-6 py-4">Detalhes</th>
                  <th className="px-6 py-4 text-right">Timestamp (BRT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-md ${
                          log.type === 'create' ? 'bg-green-100 text-green-600' : 
                          log.type === 'verify' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <ShieldCheck size={14} />
                        </div>
                        <span className="font-bold text-slate-700">{log.action}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                          {log.user.split(' ').map(n => n[0]).join('')}
                        </div>
                        {log.user}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {log.detail}
                    </td>
                    <td className="px-6 py-4 text-right text-slate-400 font-mono text-xs">
                      {log.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredLogs.length === 0 && (
              <div className="p-12 text-center text-slate-400">
                Nenhum registro encontrado para sua busca.
              </div>
            )}
          </div>
        </div>

        {/* Footer Técnico (Fundamental para ADS) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-3">
            <ShieldCheck className="text-emerald-600 mt-1" size={20} />
            <div>
              <p className="text-sm font-bold text-emerald-900">Integridade de Log</p>
              <p className="text-xs text-emerald-700 leading-relaxed">
                Cada entrada de auditoria gera um checkpoint no banco de dados, garantindo que o histórico de custódia não seja deletado ou alterado.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
            <Calendar className="text-blue-600 mt-1" size={20} />
            <div>
              <p className="text-sm font-bold text-blue-900">Retenção de Dados</p>
              <p className="text-xs text-blue-700 leading-relaxed">
                Período de retenção configurado para 5 anos, em conformidade com as normas vigentes de perícia forense digital.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}