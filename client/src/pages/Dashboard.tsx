import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, List, Database, RefreshCw, FileText, CheckCircle2, Shield } from 'lucide-react';
import { toast } from "sonner";
import DashboardHeader from '@/components/layout/DashboardHeader';

export default function Dashboard() {
  const [fileHash, setFileHash] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [isRegistering, setIsRegistering] = useState(false);
  const [evidences, setEvidences] = useState<any[]>([]);

  // 1. BUSCAR HISTÓRICO (GET)
  const fetchEvidences = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/evidence/list');
      const data = await response.json();
      if (response.ok) setEvidences(data);
    } catch (error) {
      console.error("Erro ao carregar banco.");
    }
  };

  useEffect(() => { fetchEvidences(); }, []);

  // 2. GERAR HASH AO SELECIONAR ARQUIVO
  const handleFileSelection = async (file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setFileHash(hashHex);
      toast.success("Hash SHA-256 gerado!");
    } catch (error) {
      toast.error("Erro ao processar arquivo.");
    }
  };

  // 3. POSTAR NO BANCO 
  const handleRegister = async () => {
    if (!fileHash) return;
    setIsRegistering(true);
    try {
      const response = await fetch('http://localhost:5000/api/evidence/register-hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1, 
          fileName: fileName,
          fileHash: fileHash,
          fileSize: fileSize 
        }),
      });

      if (response.ok) {
        toast.success("Evidência protocolada no MySQL!");
        setFileHash(null); // Limpa para o próximo
        fetchEvidences(); // Atualiza a tabela
      }
    } catch (error) {
      toast.error("Erro de conexão com o servidor.");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ÁREA DE POSTAGEM (UPLOAD) */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
              <div className="flex items-center gap-3 mb-6 text-blue-700 font-bold">
                <Shield size={20} />
                <h2>Custodiar Evidência</h2>
              </div>
              
              {/* Campo de Seleção */}
              <label className="cursor-pointer group block">
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center group-hover:border-blue-400 group-hover:bg-blue-50/50 transition-all">
                  <Upload className="mx-auto text-slate-400 mb-2" size={28} />
                  <p className="text-sm font-semibold text-slate-700">Clique para subir a imagem</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase">Formatos: JPG, PNG, PDF</p>
                  <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileSelection(e.target.files[0])} />
                </div>
              </label>

              {/* Resultado e Botão de Postar */}
              {fileHash && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 mb-4">
                    <p className="text-[10px] font-bold text-blue-400 uppercase mb-2">Hash da Evidência:</p>
                    <code className="text-[11px] font-mono text-slate-300 break-all leading-relaxed">
                      {fileHash}
                    </code>
                  </div>
                  
                  <button 
                    onClick={handleRegister}
                    disabled={isRegistering}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <Database size={16} />
                    {isRegistering ? "Enviando para o Banco..." : "Registrar no MySQL"}
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* TABELA DE HISTÓRICO */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                  <List size={20} className="text-blue-600" /> Histórico Forense
                </h2>
                <button onClick={fetchEvidences} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
                  <RefreshCw size={18} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-[10px] uppercase">
                    <tr>
                      <th className="px-6 py-4">Arquivo</th>
                      <th className="px-6 py-4 text-right">Data/Hora</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {evidences.map((ev) => (
                      <tr key={ev.id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-700 text-sm">{ev.file_name}</p>
                          <code className="text-[10px] text-blue-500 font-mono truncate block max-w-[200px]">{ev.file_hash}</code>
                        </td>
                        <td className="px-6 py-4 text-right text-slate-400 text-xs font-mono">
                          {new Date(ev.created_at).toLocaleString('pt-BR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}