import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, List, Database, RefreshCw, FileText, 
  CheckCircle2, Shield, Clock, HardDrive, 
  Search, Filter, Download, ExternalLink,
  Camera, MapPin, User, Briefcase
} from 'lucide-react';
import { toast } from "sonner";
import DashboardHeader from '@/components/layout/DashboardHeader';
import { useExifExtraction } from '@/hooks/useExifExtraction';
import { generateCertificate } from '../lib/generateCertificate';

export default function Dashboard() {
  const [fileHash, setFileHash] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [mimeType, setMimeType] = useState<string>("");
  const [clientName, setClientName] = useState<string>(""); 
  
  // NOVOS ESTADOS PARA TÍTULO PROFISSIONAL
  const [professionalTitle, setProfessionalTitle] = useState<string>("Dr.");
  const [professionalId, setProfessionalId] = useState<string>("");

  const [isRegistering, setIsRegistering] = useState(false);
  const [evidences, setEvidences] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const { exifData, extractExif } = useExifExtraction();

  const fetchEvidences = async () => {
    try {
      const userId = localStorage.getItem('userId') || '1';
      const response = await fetch(`http://localhost:5000/api/evidence/list?userId=${userId}`  );
      const data = await response.json();
      if (response.ok) setEvidences(data);
    } catch (error) {
      console.error("Erro ao carregar banco.");
    }
  };

  useEffect(() => { fetchEvidences(); }, []);

  const handleFileSelection = async (file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    setMimeType(file.type);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setFileHash(hashHex);

      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target?.result as string);
      reader.readAsDataURL(file);

      if (file.type.startsWith('image/')) {
        await extractExif(file);
      }
      toast.success("Arquivo processado!");
    } catch (error) {
      toast.error("Erro ao processar arquivo.");
    }
  };

  const handleRegister = async () => {
    if (!fileHash) {
      toast.error("Selecione um arquivo primeiro!");
      return;
    }
    setIsRegistering(true);
    try {
      const userId = localStorage.getItem('userId') || '1';
      
      const response = await fetch('http://localhost:5000/api/evidence/register-hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: parseInt(userId ), 
          fileName: fileName,
          fileHash: fileHash,
          fileSize: fileSize,
          mimeType: mimeType,
          clientName: clientName,
          professionalTitle: professionalTitle, // NOVO
          professionalId: professionalId,       // NOVO
          exifMetadata: exifData || {},
          gpsLocation: exifData ? `${exifData.gpsLatitude}, ${exifData.gpsLongitude}` : null
        }),
      });

      if (response.ok) {
        toast.success("Evidência protocolada!");
        setFileHash(null);
        setClientName("");
        setProfessionalId(""); // Limpa o campo de OAB/Matrícula
        setFilePreview(null);
        setFileName("");
        fetchEvidences();
      } else {
        toast.error("Erro ao salvar no servidor.");
      }
    } catch (error) {
      toast.error("Erro de conexão.");
    } finally {
      setIsRegistering(false);
    }
  };

  const filteredEvidences = evidences.filter(ev => 
    ev.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (ev.client_name && ev.client_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Header do Painel */}
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Nova Custódia */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
              <div className="flex items-center gap-3 mb-6 text-slate-800 font-bold">
                <Upload size={20} className="text-blue-600" />
                <h2>Nova Custódia</h2>
              </div>

              {/* NOVOS CAMPOS: TÍTULO E REGISTRO */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Título</label>
                  <select 
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    value={professionalTitle}
                    onChange={(e) => setProfessionalTitle(e.target.value)}
                  >
                    <option value="Dr.">Dr.</option>
                    <option value="Dra.">Dra.</option>
                    <option value="Perito">Perito</option>
                    <option value="Perita">Perita</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">
                    {professionalTitle.includes("Perit") ? "Matrícula" : "OAB"}
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ex: 123.456" 
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    value={professionalId}
                    onChange={(e) => setProfessionalId(e.target.value)}
                  />
                </div>
              </div>

              {/* CAMPO DE CLIENTE */}
              <div className="mb-6">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Nome do Cliente / Caso</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input 
                    type="text" 
                    placeholder="Ex: João Silva - Processo 123" 
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>
              </div>
              
              <label className="cursor-pointer group block">
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center group-hover:border-blue-400 group-hover:bg-blue-50/50 transition-all">
                  {filePreview ? (
                    <img src={filePreview} className="mx-auto h-32 w-32 object-cover rounded-lg shadow-md mb-2" alt="Preview" />
                  ) : (
                    <Upload className="mx-auto text-slate-400 mb-2" size={28} />
                  )}
                  <p className="text-sm font-semibold text-slate-700 truncate px-2">{fileName || "Clique para subir"}</p>
                  <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileSelection(e.target.files[0])} />
                </div>
              </label>

              {fileHash && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <p className="text-[10px] font-bold text-blue-400 uppercase mb-2">Hash SHA-256:</p>
                    <code className="text-[11px] font-mono text-slate-300 break-all leading-relaxed">{fileHash}</code>
                  </div>
                  
                  <button 
                    onClick={handleRegister} 
                    disabled={isRegistering} 
                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95"
                  >
                    <Database size={18} />
                    {isRegistering ? "Protocolando..." : "Registrar no MySQL"}
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Histórico */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-bold text-slate-800 flex items-center gap-2"><List size={22} className="text-blue-600" /> Histórico de Custódia</h2>
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                   <input 
                    type="text" 
                    placeholder="Buscar arquivo ou cliente..." 
                    className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                   />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-[11px] uppercase">
                    <tr>
                      <th className="px-6 py-4">Arquivo / Cliente</th>
                      <th className="px-6 py-4">Profissional</th>
                      <th className="px-6 py-4">Protocolo</th>
                      <th className="px-6 py-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEvidences.map((ev) => (
                      <tr key={ev.id} className="hover:bg-slate-50/50 group transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-700 text-sm">{ev.file_name}</p>
                          <p className="text-[10px] text-slate-500 italic flex items-center gap-1">
                            <User size={10} /> {ev.client_name || "Sem cliente informado"}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs font-bold text-slate-700">{ev.professional_title} {ev.perito_name || 'Usuário'}</p>
                          <p className="text-[9px] text-blue-500 font-bold uppercase">{ev.professional_id ? `${ev.professional_title.includes("Perit") ? "MAT" : "OAB"}: ${ev.professional_id}` : ""}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-slate-700 text-xs font-bold">{new Date(ev.created_at).toLocaleString('pt-BR')}</p>
                          <p className="text-[9px] text-emerald-600 font-bold uppercase">ISO 27037 VALIDADO</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => generateCertificate(ev, filePreview)} 
                            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-bold uppercase hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 ml-auto shadow-sm"
                          >
                            <ExternalLink size={14} />
                            Gerar Laudo
                          </button>
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
