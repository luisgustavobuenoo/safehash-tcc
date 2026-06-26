import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, List, Database, RefreshCw, Clock, HardDrive, Search,
  ExternalLink, User, CheckCircle2, Shield, Fingerprint, Copy
} from 'lucide-react';
import { toast } from 'sonner';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { generateCertificate } from '../lib/generateCertificate';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Dashboard(   ) {
  const [fileHash, setFileHash] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(0);
  const [mimeType, setMimeType] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [professionalTitle, setProfessionalTitle] = useState<string>('Perito');
  const [professionalUf, setProfessionalUf] = useState<string>('PR');
  const [professionalRegistry, setProfessionalRegistry] = useState<string>('');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'Usuário');
  const [isRegistering, setIsRegistering] = useState(false);
  const [evidences, setEvidences] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  const getAuthHeader = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  });

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, { headers: getAuthHeader() });
      if (response.ok) {
        const data = await response.json();
        setUserName(data.full_name);
        setProfessionalTitle(data.professional_type || 'Perito');
        setProfessionalUf(data.professional_uf || 'PR');
        setProfessionalRegistry(data.professional_id || '');
        localStorage.setItem('userName', data.full_name);
      }
    } catch (error) { console.error(error); }
  };

  const fetchEvidences = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`${API_BASE_URL}/evidence/list?userId=${userId}`, { headers: getAuthHeader() });
      const data = await response.json();
      if (response.ok) setEvidences(Array.isArray(data) ? data : []);
    } catch (error) { console.error(error); }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchEvidences();
  }, []);

  const handleFileSelection = async (file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    setMimeType(file.type || 'application/octet-stream');
    try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
      setFileHash(hashHex);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => setFilePreview(event.target?.result as string);
        reader.readAsDataURL(file);
      } else { setFilePreview(null); }
      toast.success('Assinatura digital calculada!', {
        style: { background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0' }
      });
    } catch (error) { toast.error('Erro no processamento.'); }
  };

  const handleRegister = async () => {
    if (!fileHash) return toast.error('Selecione um arquivo.');
    setIsRegistering(true);
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`${API_BASE_URL}/evidence/register-hash`, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({
          userId: Number(userId), fileName, fileHash, fileSize, mimeType, clientName,
          professionalTitle, professionalRegistry, professionalId: professionalRegistry, professionalUf
        }),
      });
      if (response.ok) {
        toast.success('Custódia registrada com sucesso!', {
          style: { background: '#10b981', color: '#fff', fontWeight: 'bold' }
        });
        fetchEvidences();
        setFileHash(null); setFileName(''); setClientName(''); setFilePreview(null);
        setFileInputKey(k => k + 1);
      }
    } catch (error) { toast.error('Erro ao registrar.'); } finally { setIsRegistering(false); }
  };

  const getRegistryLabel = (title?: string) => {
    const t = (title || professionalTitle).toUpperCase();
    return t.includes('ADVOGADO') || t.includes('ADVOGADA') ? 'OAB' : 'MATRÍCULA';
  };

  const filteredEvidences = evidences.filter(ev => 
    ev.file_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ev.client_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Hash copiado para a área de transferência!', {
      style: { background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe' }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      <DashboardHeader />
      <main className="max-w-[1440px] mx-auto p-6 lg:p-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Olá, {userName.split(' ')[0]}</h1>
            <p className="text-slate-500 mt-1 font-medium">Gerencie evidências digitais com validade jurídica ISO 27037.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Shield size={16} className="text-blue-600" />
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Protocolo Ativo / ISO 27037</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-3xl font-black text-slate-900">{evidences.length}</p>
            <p className="text-slate-400 mt-2 font-bold uppercase text-[10px] tracking-widest">Evidências Custodiadas</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-3xl font-black text-slate-900">100%</p>
            <p className="text-slate-400 mt-2 font-bold uppercase text-[10px] tracking-widest">Integridade Garantida</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-3xl font-black text-slate-900">MCTI / ISO 27037</p>
            <p className="text-slate-400 mt-2 font-bold uppercase text-[10px] tracking-widest">Padrão Brasileiro e Internacional</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 sticky top-24">
              <div className="flex items-center gap-3 mb-6 text-slate-800 font-bold uppercase">
                <Upload size={20} className="text-blue-600" />
                <h2 className="tracking-tight">Nova Custódia</h2>
              </div>

              <div className="grid grid-cols-12 gap-3 mb-6">
                <div className="col-span-4">
                  <label className="text-[11px] font-bold text-slate-900 uppercase block mb-1.5 tracking-wide">Título</label>
                  <input readOnly className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 outline-none pointer-events-none" value={professionalTitle} />
                </div>
                <div className="col-span-3">
                  <label className="text-[11px] font-bold text-slate-900 uppercase block mb-1.5 tracking-wide">UF</label>
                  <input readOnly className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 text-center outline-none pointer-events-none" value={professionalUf} />
                </div>
                <div className="col-span-5">
                  <label className="text-[11px] font-bold text-slate-900 uppercase block mb-1.5 tracking-wide">{getRegistryLabel()}</label>
                  <input readOnly className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 outline-none pointer-events-none" value={professionalRegistry} />
                </div>
              </div>

              <div className="mb-6">
                <label className="text-[11px] font-bold text-slate-900 uppercase block mb-1.5 tracking-wide">Nome do Cliente / Caso</label>
                <input 
                  type="text" 
                  placeholder="Ex: Nome do Cliente" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 placeholder:text-[10px] placeholder:text-slate-400 outline-none focus:ring-4 focus:ring-blue-500/5 transition-all" 
                  value={clientName} 
                  onChange={(e) => setClientName(e.target.value)} 
                />
              </div>

              <div className="mb-6">
                <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${fileHash ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'}`} onClick={() => document.getElementById('file-upload')?.click()}>
                  <input id="file-upload" key={fileInputKey} type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileSelection(e.target.files[0])} />
                  {fileHash ? (
                    <div className="flex flex-col items-center">
                      <CheckCircle2 className="text-emerald-600 mb-2" size={28} />
                      <p className="text-sm font-bold text-slate-900 truncate max-w-full px-4">{fileName}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="text-blue-600 mb-2" size={28} />
                      <p className="text-xs font-bold text-slate-900 uppercase tracking-tighter">Clique para carregar evidência</p>
                    </div>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {fileHash && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="mb-6 p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl relative group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Fingerprint size={18} className="text-blue-400" />
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Hash SHA-256 Gerado</span>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(fileHash)}
                        className="p-1.5 bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
                        title="Copiar Hash"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                    <p className="text-[13px] font-mono text-white font-bold break-all leading-relaxed tracking-tight pr-2">
                      {fileHash}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button disabled={isRegistering || !fileHash} onClick={handleRegister} className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${isRegistering || !fileHash ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-200'}`}>
                <Database size={18} /> {isRegistering ? 'Sincronizando...' : 'Registrar Custódia'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4 bg-white">
                <div className="flex items-center gap-3 text-slate-800 font-bold uppercase">
                  <List size={20} className="text-blue-600" />
                  <h2 className="tracking-tight">Histórico de Custódia</h2>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input type="text" placeholder="Buscar evidência..." className="pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-4 focus:ring-blue-500/5 w-full md:w-64 transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Arquivo / Cliente</th>
                      <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Profissional</th>
                      <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Data / Hora</th>
                      <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEvidences.map((ev) => (
                      <tr key={ev.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-6">
                          <p className="text-sm font-bold text-slate-900 truncate max-w-[180px]">{ev.file_name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Cliente: {ev.client_name || 'N/A'}</p>
                          <div className="mt-3 flex flex-col gap-1 group/hash relative">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Digital Hash:</span>
                            <div className="flex items-center gap-2">
                              <p className="text-[11px] font-mono text-blue-600 font-bold truncate max-w-[150px]" title={ev.file_hash}>
                                {ev.file_hash}
                              </p>
                              <button 
                                onClick={() => copyToClipboard(ev.file_hash)}
                                className="opacity-0 group-hover/hash:opacity-100 p-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded transition-all"
                                title="Copiar Hash"
                              >
                                <Copy size={10} />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <p className="text-[11px] font-bold text-slate-900 uppercase">{ev.perito_name || ev.full_name || userName}</p>
                          <p className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">{getRegistryLabel(ev.professional_title)}: {ev.professional_id || ev.professional_registry || 'N/A'}</p>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md w-fit border border-emerald-100">
                            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-tighter">Íntegro</span>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-2 text-slate-500">
                            <Clock size={12} />
                            <span className="text-[10px] font-bold">{new Date(ev.created_at).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <p className="text-[9px] text-slate-400 font-medium mt-1 ml-5">{new Date(ev.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                        </td>
                        <td className="px-6 py-6 text-right">
                          <button 
                            onClick={() => generateCertificate(ev)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-[10px] font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 uppercase tracking-widest"
                          >
                            <ExternalLink size={12} /> Laudo
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredEvidences.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-20 text-center">
                          <div className="flex flex-col items-center opacity-20">
                            <HardDrive size={48} className="mb-4" />
                            <p className="text-sm font-bold uppercase tracking-widest">Nenhuma evidência encontrada</p>
                          </div>
                        </td>
                      </tr>
                    )}
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
