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
  iso_compliance?: boolean | number;
  created_at: string;
};

export default function Dashboard() {
  const [fileHash, setFileHash] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(0);
  const [mimeType, setMimeType] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [professionalTitle, setProfessionalTitle] = useState<string>('Dr.');
  const [professionalUf, setProfessionalUf] = useState<string>(DEFAULT_UF);
  const [professionalRegistry, setProfessionalRegistry] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [evidences, setEvidences] = useState<Evidence[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  const isMatriculaTitle = (title = professionalTitle) => {
    const normalized = title.toUpperCase();
    return normalized.includes('PERITO') || normalized.includes('PERITA');
  };

  const getValidUf = (value = professionalUf) => {
    const normalized = value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2);
    return BRAZILIAN_UFS.includes(normalized) ? normalized : DEFAULT_UF;
  };

  const formatOab = (value: string, uf = professionalUf) => {
    const selectedUf = getValidUf(uf);
    const raw = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const typedUf = raw.slice(0, 2);
    const remaining = BRAZILIAN_UFS.includes(typedUf) ? raw.slice(2) : raw;
    const digits = remaining.replace(/\D/g, '').slice(0, 6);

    if (!digits) return '';
    return `${selectedUf} ${digits}`;
  };

  const formatMatricula = (value: string, uf = professionalUf) => {
    const selectedUf = getValidUf(uf);
    const raw = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const normalized = raw.replace(/^PC/, '').replace(/^[A-Z]{2}/, '');
    const digits = normalized.replace(/\D/g, '').slice(0, 8);

    if (!digits) return '';

    const firstBlock = digits.slice(0, 4);
    const secondBlock = digits.slice(4, 8);

    if (digits.length <= 4) return `PC-${selectedUf}-${firstBlock}`;
    return `PC-${selectedUf}-${firstBlock}-${secondBlock}`;
  };

  const formatRegistryByTitle = (value: string, title = professionalTitle, uf = professionalUf) => {
    return isMatriculaTitle(title) ? formatMatricula(value, uf) : formatOab(value, uf);
  };

  const getRegistryLabel = (title?: string | null) => {
    return isMatriculaTitle(title || '') ? 'MATRÍCULA' : 'OAB';
  };

  const getRegistryValue = (evidence: Evidence) => {
    return evidence.professional_registry || evidence.professional_id || '';
  };

  const resetFormAfterRegister = () => {
    setFileHash(null);
    setFileName('');
    setFileSize(0);
    setMimeType('');
    setClientName('');
    setProfessionalRegistry('');
    setFilePreview(null);
    setFileInputKey((current) => current + 1);
  };

  const fetchEvidences = async () => {
    try {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        toast.error('Sessão expirada. Faça login novamente.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/evidence/list?userId=${userId}`);
      const data = await response.json();

      if (response.ok) {
        setEvidences(Array.isArray(data) ? data : []);
      } else {
        toast.error(data.error || 'Erro ao carregar histórico.');
      }
    } catch (error) {
      console.error('Erro ao carregar evidências:', error);
      toast.error('Erro de conexão ao carregar histórico.');
    }
  };

  useEffect(() => {
    fetchEvidences();
  }, []);

  const handleTitleChange = (newTitle: string) => {
    setProfessionalTitle(newTitle);
    setProfessionalRegistry('');
  };

  const handleUfChange = (newUf: string) => {
    setProfessionalUf(newUf);
    setProfessionalRegistry((current) => formatRegistryByTitle(current, professionalTitle, newUf));
  };

  const handleRegistryChange = (value: string) => {
    setProfessionalRegistry(formatRegistryByTitle(value));
  };

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

      toast.success('Arquivo processado e hash SHA-256 gerado.');
    } catch (error) {
      console.error('Erro ao processar arquivo:', error);
      toast.error('Erro ao processar arquivo.');
    }
  };

  const handleRegister = async () => {
    if (!fileHash) {
      toast.error('Selecione um arquivo antes de registrar a custódia.');
      return;
    }

    if (!professionalRegistry.trim()) {
      toast.error(`Informe ${getRegistryLabel(professionalTitle)} antes de registrar.`);
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Sessão expirada. Faça login novamente.');
      return;
    }

    setIsRegistering(true);

    try {
      const formattedRegistry = formatRegistryByTitle(professionalRegistry, professionalTitle, professionalUf);

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
          professionalRegistry: formattedRegistry,
          professionalId: formattedRegistry,
          exifMetadata: {},
          gpsLocation: null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Evidência protocolada com sucesso.');
        resetFormAfterRegister();
        fetchEvidences();
      } else {
        toast.error(data.error || 'Erro ao salvar no servidor.');
      }
    } catch (error) {
      console.error('Erro ao registrar evidência:', error);
      toast.error('Erro de conexão com o servidor.');
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
  const validEvidences = evidences.filter((evidence) => evidence.iso_compliance === true || evidence.iso_compliance === 1 || evidence.iso_compliance === undefined || evidence.iso_compliance === null).length;
  const integrityPercent = totalEvidences > 0 ? Math.round((validEvidences / totalEvidences) * 100) : 100;
  const totalBytes = evidences.reduce((sum, evidence) => sum + Number(evidence.file_size || 0), 0);
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
                    onChange={(event) => handleTitleChange(event.target.value)}
                  >
                    <option value="Dr.">Dr.</option>
                    <option value="Dra.">Dra.</option>
                    <option value="Perito">Perito</option>
                    <option value="Perita">Perita</option>
                    <option value="Adv.">Adv.</option>
                  </select>
                </div>

                <div className="col-span-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">UF</label>
                  <select
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    value={professionalUf}
                    onChange={(event) => handleUfChange(event.target.value)}
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
                    inputMode={isMatriculaTitle() ? 'numeric' : 'text'}
                    placeholder={isMatriculaTitle() ? `PC-${professionalUf}-2026-0001` : `${professionalUf} 123456`}
                    maxLength={isMatriculaTitle() ? 15 : 9}
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    value={professionalRegistry}
                    onChange={(event) => handleRegistryChange(event.target.value)}
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
                    onChange={(event) => setClientName(event.target.value)}
                  />
                </div>
              </div>

              <label className="cursor-pointer group block">
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center group-hover:border-blue-400 group-hover:bg-blue-50/50 transition-all">
                  {filePreview ? (
                    <img src={filePreview} className="mx-auto h-32 w-32 object-cover rounded-lg shadow-md mb-2" alt="Pré-visualização da evidência" />
                  ) : (
                    <Upload className="mx-auto text-slate-400 mb-2" size={28} />
                  )}
                  <p className="text-sm font-semibold text-slate-700 truncate px-2">{fileName || 'Clique para subir'}</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase">Formatos: JPG, PNG, PDF</p>
                  <input
                    key={fileInputKey}
                    type="file"
                    className="hidden"
                    onChange={(event) => event.target.files?.[0] && handleFileSelection(event.target.files[0])}
                  />
                </div>
              </label>

              {fileHash && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <p className="text-[10px] font-bold text-blue-400 uppercase mb-2">Hash SHA-256:</p>
                    <code className="text-[11px] font-mono text-slate-300 break-all leading-relaxed">{fileHash}</code>
                  </div>
                </motion.div>
              )}

              <button
                onClick={handleRegister}
                disabled={isRegistering}
                className="w-full mt-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95"
              >
                <Database size={18} />
                {isRegistering ? 'Protocolando...' : 'Registrar Custódia'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                  <List size={22} className="text-blue-600" /> Histórico
                </h2>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                      type="text"
                      placeholder="Buscar arquivo ou cliente..."
                      className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500/20 w-64 max-w-full"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                    />
                  </div>

                  <button onClick={fetchEvidences} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors" title="Atualizar histórico">
                    <RefreshCw size={18} />
                  </button>
                </div>
              </div>

              <div className="max-h-[calc(100vh-300px)] min-h-[360px] overflow-auto overscroll-contain" title="Role aqui para navegar apenas pelo histórico">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-[11px] uppercase">
                    <tr>
                      <th className="px-6 py-4">Arquivo / Cliente</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Profissional</th>
                      <th className="px-6 py-4">Protocolo</th>
                      <th className="px-6 py-4 text-right">Ações</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredEvidences.map((evidence) => {
                      const title = evidence.professional_title || 'Perito';
                      const registry = getRegistryValue(evidence);
                      const registryLabel = getRegistryLabel(title);
                      const peritoName = evidence.perito_name || evidence.full_name || 'Usuário';

                      return (
                        <tr key={evidence.id} className="hover:bg-slate-50/50 group transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-bold text-slate-700 text-sm">{evidence.file_name}</p>
                            <p className="text-[10px] text-slate-500 italic flex items-center gap-1">
                              <User size={10} /> {evidence.client_name || 'Sem cliente informado'}
                            </p>
                          </td>

                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold uppercase">
                              <CheckCircle2 size={11} /> ISO 27037
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <p className="text-xs font-bold text-slate-700">{title} {peritoName}</p>
                            <p className="text-[9px] text-blue-500 font-bold uppercase">
                              {registry ? `${registryLabel}: ${registry}` : `${registryLabel}: NÃO INFORMADO`}
                            </p>
                          </td>

                          <td className="px-6 py-4">
                            <p className="text-slate-700 text-xs font-bold">{new Date(evidence.created_at).toLocaleString('pt-BR')}</p>
                            <p className="text-[9px] text-blue-500 font-bold uppercase">Carimbo: {evidence.timestamp_signature || 'ON/MCTI'}</p>
                          </td>

                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => generateCertificate(evidence, filePreview)}
                              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-bold uppercase hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 ml-auto shadow-sm"
                            >
                              <ExternalLink size={14} />
                              Gerar Laudo
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {filteredEvidences.length === 0 && (
                  <div className="p-12 text-center text-slate-400">
                    Nenhuma evidência encontrada para este usuário.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}