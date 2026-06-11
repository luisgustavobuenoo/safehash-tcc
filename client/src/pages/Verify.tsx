import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileSearch, ShieldCheck, ShieldAlert, Upload, Hash, ArrowRight, Loader2 } from 'lucide-react';
import DashboardHeader from "@/components/layout/DashboardHeader";
import { toast } from "sonner";

export default function Verify() {
  const [fileHash, setFileHash] = useState<string | null>(null);
  const [inputHash, setInputHash] = useState<string>("");
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Função para gerar o hash do arquivo que está sendo verificado agora
  const handleFileVerify = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    setFileHash(hashHex);
    setIsMatch(null); // Reseta a comparação ao subir novo arquivo
    
    // Se o campo de hash estiver vazio, preenche automaticamente para facilitar o teste
    if (!inputHash) {
        setInputHash(hashHex);
    }
  };

  // Lógica de comparação e registro no backend para a Auditoria
  const compareHashes = async () => {
    if (!fileHash || !inputHash) {
      toast.error("Suba um arquivo e insira o hash de comparação.");
      return;
    }

    setIsVerifying(true);
    const match = fileHash.toLowerCase() === inputHash.trim().toLowerCase();
    setIsMatch(match);

    try {
      const token = localStorage.getItem('token');
      // Envia para o backend registrar o log de auditoria que aparece na outra página
      const response = await fetch('http://localhost:5000/api/evidence/verify', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentHash: fileHash,
          originalHash: inputHash.trim( ),
          ip: '127.0.0.1' 
        }),
      });

      if (response.ok) {
        if (match) {
          toast.success("Integridade Confirmada e registrada na auditoria!");
        } else {
          toast.error("Alerta: Hash divergente! Log de violação registrado.");
        }
      }
    } catch (error) {
      console.error("Erro de conexão ao registrar log:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <DashboardHeader />

      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="max-w-4xl mx-auto p-6 lg:p-12"
      >
        <div className="text-center mb-10">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileSearch className="text-blue-600" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Verificador de Integridade</h1>
          <p className="text-slate-500 mt-2">Compare o hash de um arquivo com o registro oficial da cadeia de custódia.</p>
        </div>

        <div className="grid gap-6">
          {/* PASSO 1: Upload do Arquivo Suspeito */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">1</span>
              Analisar Arquivo Atual
            </h2>
            <label className="cursor-pointer block">
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-all">
                <Upload className="mx-auto text-slate-400 mb-2" size={24} />
                <p className="text-sm text-slate-600 font-medium">Clique para calcular o Hash do arquivo</p>
                <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileVerify(e.target.files[0])} />
              </div>
            </label>
            {fileHash && (
              <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Hash Gerado:</p>
                <code className="text-xs break-all text-blue-700 font-mono">{fileHash}</code>
              </div>
            )}
          </div>

          {/* PASSO 2: Inserir Hash de Comparação */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">2</span>
              Hash de Referência (Original)
            </h2>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Cole aqui o Hash SHA-256 registrado no sistema..." 
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                value={inputHash}
                onChange={(e) => setInputHash(e.target.value)}
              />
            </div>
            <button 
              onClick={compareHashes}
              disabled={isVerifying}
              className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Verificando...
                </>
              ) : (
                <>
                  Verificar Autenticidade <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>

          {/* RESULTADO DA PERÍCIA */}
          {isMatch !== null && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              className={`p-8 rounded-2xl border-2 flex flex-col items-center text-center ${
                isMatch ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              {isMatch ? (
                <>
                  <ShieldCheck size={48} className="mb-4 text-emerald-600" />
                  <h3 className="text-xl font-bold">Documento Autêntico</h3>
                  <p className="text-sm opacity-80 mt-1">O arquivo não sofreu nenhuma alteração desde o seu registro original.</p>
                </>
              ) : (
                <>
                  <ShieldAlert size={48} className="mb-4 text-red-600" />
                  <h3 className="text-xl font-bold">Violação Detectada</h3>
                  <p className="text-sm opacity-80 mt-1">Os hashes não coincidem. A integridade desta evidência foi comprometida!</p>
                </>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
