import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck, FileSearch, CheckCircle2, AlertTriangle, Fingerprint,
  UploadCloud, RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import DashboardHeader from '@/components/layout/DashboardHeader';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Verify( ) {
  const [file, setFile] = useState<File | null>(null);
  const [originalHash, setOriginalHash] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<{ valid: boolean; fileName: string; message: string } | null>(null);

  const calculateHash = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !originalHash) {
      toast.error('Selecione o arquivo e forneça o hash original.');
      return;
    }

    setIsVerifying(true);
    setResult(null);

    try {
      const currentHash = await calculateHash(file);
      
      const response = await fetch(`${API_BASE_URL}/evidence/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentHash,
          originalHash: originalHash.trim()
        })
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        if (data.valid) {
          toast.success('Integridade confirmada!');
        } else {
          toast.error('Alerta de violação detectado!');
        }
      } else {
        toast.error(data.error || 'Erro ao verificar integridade.');
      }
    } catch (error) {
      toast.error('Erro de conexão com o servidor.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      <DashboardHeader />
      <main className="max-w-[1440px] mx-auto p-6 lg:p-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Verificador de Integridade</h1>
            <p className="text-slate-500 mt-1">Compare evidências com o registro original na base de dados.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
            <ShieldCheck size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-slate-700">Auditoria Forense: Ativa</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/30 text-center">
              <div className="flex items-center justify-center gap-3 text-slate-800 font-bold">
                <FileSearch size={24} className="text-blue-600" />
                <h2>Verificação de Custódia</h2>
              </div>
            </div>

            <div className="p-8">
              <form onSubmit={handleVerify} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Arquivo para Auditoria</label>
                    <div 
                      className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer h-[180px] flex flex-col items-center justify-center ${
                        file ? 'border-blue-200 bg-blue-50' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'
                      }`}
                      onClick={() => document.getElementById('file-verify')?.click()}
                    >
                      <input type="file" id="file-verify" className="hidden" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
                      <UploadCloud className={`w-10 h-10 mb-3 ${file ? 'text-blue-600' : 'text-slate-400'}`} />
                      <p className="text-sm font-bold text-slate-900 truncate max-w-full px-4">{file ? file.name : 'Selecione o arquivo'}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Hash SHA-256 Original</label>
                    <div className="relative">
                      <Fingerprint className="absolute left-4 top-4 text-slate-400" size={18} />
                      <textarea 
                        className="w-full h-[180px] pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                        placeholder="Cole aqui o hash original (64 caracteres)..."
                        value={originalHash}
                        onChange={(e) => setOriginalHash(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isVerifying || !file || !originalHash}
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg ${
                    isVerifying || !file || !originalHash ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isVerifying ? <RefreshCw size={20} className="animate-spin" /> : <><ShieldCheck size={20} /><span>INICIAR AUDITORIA</span></>}
                </button>
              </form>

              {result && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`mt-10 p-6 rounded-2xl border-2 ${result.valid ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-rose-50 border-rose-100 text-rose-800'}`}>
                  <div className="flex items-start gap-5">
                    <div className={`p-3 rounded-xl ${result.valid ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                      {result.valid ? <CheckCircle2 size={28} /> : <AlertTriangle size={28} />}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold uppercase">{result.message}</h3>
                      <p className="text-sm font-medium opacity-80">Evidência: <span className="font-bold">{result.fileName}</span></p>
                      <p className="text-xs mt-3 leading-relaxed opacity-70">
                        {result.valid 
                          ? 'O arquivo é idêntico ao registro original. Integridade preservada (ISO 27037).' 
                          : 'ALERTA: O conteúdo foi alterado ou o hash não corresponde. Sem validade jurídica.'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
