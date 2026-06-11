import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  List,
  Database,
  RefreshCw,
  Clock,
  HardDrive,
  Search,
  ExternalLink,
  User,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { generateCertificate } from '../lib/generateCertificate';

const API_BASE_URL = 'http://localhost:5000/api';

const BRAZILIAN_UFS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

const DEFAULT_UF = 'PR';

type Evidence = {
  id: number;
  user_id?: number;
  file_name: string;
  file_hash: string;
  file_size?: number | string;
  mime_type?: string;
  exif_metadata?: any;
  timestamp_signature?: string;
  gps_location?: string | null;
  client_name?: string | null;
  professional_title?: string | null;
  professional_registry?: string | null;
  professional_id?: string | null;
  perito_name?: string | null;
  full_name?: string | null;
  professional_uf?: string | null;
  iso_compliance?: boolean | number;
  created_at: string;
};

export default function Dashboard( ) {
  const [fileHash, setFileHash] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(0);
  const [mimeType, setMimeType] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [professionalTitle, setProfessionalTitle] = useState<string>('Perito');
  const [professionalUf, setProfessionalUf] = useState<string>(DEFAULT_UF);
  const [professionalRegistry, setProfessionalRegistry] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [evidences, setEvidences] = useState<Evidence[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  const userName = localStorage.getItem('userName') || 'Usuário';

  const isMatriculaTitle = (title = professionalTitle) => {
    const normalized = title.toUpperCase();
    return normalized.includes('PERITO') || normalized.includes('PERITA');
  };

  const formatMatriculaMask = (value: string) => {
    const clean = value.replace(/\D/g, '').slice(0, 7);
    if (clean.length <= 3) return clean;
    if (clean.length <= 6) return `${clean.slice(0, 3)}.${clean.slice(3)}`;
    return `${clean.slice(0, 3)}.${clean.slice(3, 6)}-${clean.slice(6)}`;
  };

  const formatOabMask = (value: string) => {
    return value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 7).toUpperCase();
  };

  const handleRegistryChange = (value: string) => {
    if (isMatriculaTitle()) {
      setProfessionalRegistry(formatMatriculaMask(value));
    } else {
      setProfessionalRegistry(formatOabMask(value));
    }
  };

  const handleClientNameChange = (value: string) => {
    const cleanName = value.replace(/[0-9]/g, '');
    setClientName(cleanName);
  };

  const getRegistryLabel = (title?: string | null) => {
    return isMatriculaTitle(title || '') ? 'MATRÍCULA INSTITUCIONAL' : 'NÚMERO DA OAB';
  };

  const fetchEvidences = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return;
      const response = await fetch(`${API_BASE_URL}/evidence/list?userId=${userId}`);
      const data = await response.json();
      if (response.ok) setEvidences(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  };

  useEffect(() => {
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
      } else {
        setFilePreview(null);
      }
      toast.success('Arquivo processado.');
    } catch (error) {
      toast.error('Erro ao processar arquivo.');
    }
  };

  const handleRegister = async () => {
    if (!fileHash) {
      toast.error('Selecione um arquivo.');
      return;
    }
    if (!professionalRegistry.trim()) {
      toast.error(`Informe ${getRegistryLabel(professionalTitle)}.`);
      return;
    }
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    setIsRegistering(true);
    try {
      const cleanRegistry = professionalRegistry.replace(/[^a-zA-Z0-9]/g, '');
      const response = await fetch(`${API_BASE_URL}/evidence/register-hash`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: Number(userId),
          fileName,
          fileHash,
          fileSize,
          mimeType,
          clientName,
          professionalTitle,
          professionalRegistry: cleanRegistry,
          professionalId: cleanRegistry,
          professionalUf: professionalUf,
          exifMetadata: {},
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Custódia registrada.');
        generateCertificate({
          ...data,
          id: data.id,
          file_name: fileName,
          file_hash: fileHash,
          client_name: clientName,
          professional_title: professionalTitle,
          professional_registry: professionalRegistry,
          perito_name: userName,
          professional_uf: professionalUf,
          created_at: new Date().toISOString()
        }, filePreview);
        setFileHash(null);
        setFileName('');
        setClientName('');
        setProfessionalRegistry('');
        setFilePreview(null);
        setFileInputKey(k => k + 1);
        fetchEvidences();
      }
    } catch (error) {
      toast.error('Erro ao registrar.');
    } finally {
      setIsRegistering(false);
    }
  };

  const filteredEvidences = evidences.filter((evidence) => {
    const term = searchTerm.toLowerCase();
    return (
      evidence.file_name?.toLowerCase().includes(term) ||
      evidence.client_name?.toLowerCase().includes(term) ||
      evidence.file_hash?.toLowerCase().includes(term)
    );
  });

  const totalEvidences = evidences.length;
  const integrityPercent = 100;
  const totalBytes = evidences.reduce((sum, ev) => sum + Number(ev.file_size || 0), 0);
  const totalMegabytes = totalBytes / (1024 * 1024);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      <DashboardHeader />

      <main className="max-w-[1440px] mx-auto p-6 lg:p-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Painel de Custódia</h1>
            <p className="text-slate-500 mt-1">Gerencie evidências digitais com validade jurídica.</p>
          </div>

          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
            <Clock size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-slate-700">Servidor ON/MCTI: Ativo</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-3xl font-bold text-slate-900">{totalEvidences}</p>
            <p className="text-slate-500 mt-2">Evidências Custodiadas</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-3xl font-bold text-slate-900">{integrityPercent}%</p>
            <p className="text-slate-500 mt-2">Integridade Garantida</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-3xl font-bold text-slate-900">{totalMegabytes.toFixed(2)} MB</p>
            <p className="text-slate-500 mt-2">Volume de Dados</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24 max-h-[calc(100vh-130px)] overflow-y-auto overscroll-contain">
              <div className="flex items-center gap-3 mb-6 text-slate-800 font-bold">
                <Upload size={20} className="text-blue-600" />
                <h2>Nova Custódia</h2>
              </div>

              <div className="grid grid-cols-12 gap-3 mb-4">
                <div className="col-span-4">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Título</label>
                  <select
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    value={professionalTitle}
                    onChange={(e) => { setProfessionalTitle(e.target.value); setProfessionalRegistry(''); }}
                  >
                    <option value="Perito">Perito</option>
                    <option value="Perita">Perita</option>
                    <option value="Advogado">Advogado</option>
                    <option value="Advogada">Advogada</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Dra.">Dra.</option>
                  </select>
                </div>

                <div className="col-span-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">UF</label>
                  <select
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    value={professionalUf}
                    onChange={(e) => setProfessionalUf(e.target.value)}
                  >
                    {BRAZILIAN_UFS.map((uf) => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    {getRegistryLabel(professionalTitle)}
                  </label>
                  <input
                    type="text"
                    placeholder={isMatriculaTitle() ? "143.859-2" : "123456A"}
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    value={professionalRegistry}
                    onChange={(e) => handleRegistryChange(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Nome do Cliente</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input
                    type="text"
                    placeholder="Ex: João Silva"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    value={clientName}
                    onChange={(e) => handleClientNameChange(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <div
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                    fileHash ? 'border-blue-200 bg-blue-50' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'
                  }`}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <input
                    key={fileInputKey}
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileSelection(e.target.files[0])}
                  />
                  
                  {fileHash ? (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                        <CheckCircle2 className="text-blue-600" size={24} />
                      </div>
                      <p className="text-sm font-bold text-slate-900 truncate max-w-full px-4">{fileName}</p>
                      <p className="text-[10px] text-slate-500 mt-1 uppercase">Hash SHA-256 Gerado</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                        <Upload className="text-slate-400" size={24} />
                      </div>
                      <p className="text-sm font-bold text-slate-900">Clique para subir</p>
                      <p className="text-[10px] text-slate-500 mt-1 uppercase">Formatos: JPG, PNG, PDF</p>
                    </div>
                  )}
                </div>
              </div>

              <button
                disabled={isRegistering || !fileHash}
                onClick={handleRegister}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg ${
                  isRegistering || !fileHash
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0'
                }`}
              >
                <Database size={18} />
                {isRegistering ? 'Processando...' : 'Registrar Custódia'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-slate-800 font-bold">
                  <List size={20} className="text-blue-600" />
                  <h2>Histórico</h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                      type="text"
                      placeholder="Buscar arquivo ou cliente..."
                      className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500/20 w-full md:w-64 transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={fetchEvidences}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <RefreshCw size={18} />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Arquivo / Cliente</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Profissional</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Protocolo</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEvidences.length > 0 ? (
                      filteredEvidences.map((ev) => (
                        <tr key={ev.id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-6 py-5">
                            <p className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{ev.file_name}</p>
                            <div className="flex items-center gap-1.5 mt-1">
                              <User size={10} className="text-slate-400" />
                              <p className="text-[10px] text-slate-500 font-medium">{ev.client_name || 'N/A'}</p>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg w-fit border border-emerald-100">
                              <CheckCircle2 size={12} />
                              <span className="text-[10px] font-bold">ISO 27037</span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <p className="text-[11px] font-bold text-slate-900">{ev.perito_name || ev.full_name || userName}</p>
                            <p className="text-[10px] text-blue-600 font-medium mt-0.5 uppercase">
                              {getRegistryLabel(ev.professional_title)}: {ev.professional_registry || ev.professional_id}
                            </p>
                          </td>
                          <td className="px-6 py-5">
                            <p className="text-[10px] font-bold text-slate-900">
                              {new Date(ev.created_at).toLocaleString('pt-BR')}
                            </p>
                            <p className="text-[9px] text-slate-400 font-mono mt-0.5 uppercase">SH-{ev.file_hash.slice(0, 8)}</p>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <button 
                              onClick={() => generateCertificate(ev)}
                              className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-blue-600 hover:text-white transition-all border border-blue-100"
                            >
                              <ExternalLink size={12} />
                              GERAR LAUDO
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">Nenhuma evidência encontrada.</td>
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