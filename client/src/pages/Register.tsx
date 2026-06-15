// Local: client/src/pages/Register.tsx
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, User, Mail, Lock, FileText, ArrowRight, CheckCircle2,
  AlertCircle, Briefcase, Check, X, MapPin, Eye, EyeOff
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const BRAZILIAN_UFS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

export default function Register( ) {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cpf: '',
    professionalType: 'Perito',
    professionalId: '',
    professionalUf: 'PR',
    password: '',
    confirmPassword: ''
  });

  // --- VALIDAÇÕES ---
  const isValidCPF = (cpf: string) => {
    const cleanCPF = cpf.replace(/\D/g, '');
    if (cleanCPF.length !== 11 || !!cleanCPF.match(/(\d)\1{10}/)) return false;
    let sum = 0, rest;
    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cleanCPF.substring(i-1, i)) * (11 - i);
    rest = (sum * 10) % 11;
    if ((rest === 10) || (rest === 11)) rest = 0;
    if (rest !== parseInt(cleanCPF.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cleanCPF.substring(i-1, i)) * (12 - i);
    rest = (sum * 10) % 11;
    if ((rest === 10) || (rest === 11)) rest = 0;
    if (rest !== parseInt(cleanCPF.substring(10, 11))) return false;
    return true;
  };

  const cpfStatus = useMemo(() => {
    if (formData.cpf.length === 0) return 'empty';
    const clean = formData.cpf.replace(/\D/g, '');
    if (clean.length < 11) return 'typing';
    return isValidCPF(formData.cpf) ? 'valid' : 'invalid';
  }, [formData.cpf]);

  const emailStatus = useMemo(() => {
    if (formData.email.length === 0) return 'empty';
    return formData.email.includes('@') && formData.email.includes('.') ? 'valid' : 'invalid';
  }, [formData.email]);

  const passwordRequirements = useMemo(() => ({
    length: formData.password.length >= 8,
    number: /\d/.test(formData.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    match: formData.password === formData.confirmPassword && formData.password !== ''
  }), [formData.password, formData.confirmPassword]);

  const isFormValid = useMemo(() => {
    return (
      formData.fullName.trim().split(' ').length >= 2 &&
      emailStatus === 'valid' &&
      cpfStatus === 'valid' &&
      formData.professionalId.length >= 4 &&
      passwordRequirements.length &&
      passwordRequirements.number &&
      passwordRequirements.special &&
      passwordRequirements.match
    );
  }, [formData, emailStatus, cpfStatus, passwordRequirements]);

  const isMatricula = () => formData.professionalType.toLowerCase().includes('perit');

  const formatCPF = (value: string) => {
    const clean = value.replace(/\D/g, '').slice(0, 11);
    return clean
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatProfessionalId = (value: string, type: string) => {
    if (type.toLowerCase().includes('perit')) {
      const clean = value.replace(/\D/g, '').slice(0, 7);
      if (clean.length <= 3) return clean;
      if (clean.length <= 6) return `${clean.slice(0, 3)}.${clean.slice(3)}`;
      return `${clean.slice(0, 3)}.${clean.slice(3, 6)}-${clean.slice(6)}`;
    }
    return value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 7).toUpperCase();
  };

  const handleInputChange = (field: string, value: string) => {
    let finalValue = value;
    if (field === 'fullName') finalValue = value.replace(/[0-9]/g, '');
    if (field === 'cpf') finalValue = formatCPF(value);
    if (field === 'professionalId') finalValue = formatProfessionalId(value, formData.professionalType);
    setFormData(prev => ({ ...prev, [field]: finalValue }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email.toLowerCase().trim(),
          cpf: formData.cpf.replace(/\D/g, ''),
          password: formData.password,
          professionalType: formData.professionalType,
          professionalId: formData.professionalId.replace(/[^a-zA-Z0-9]/g, ''),
          professionalUf: formData.professionalUf
        })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Conta criada com sucesso!');
        setTimeout(() => setLocation('/login'), 2000);
      } else {
        toast.error(data.error || 'Erro ao cadastrar.');
      }
    } catch (error) {
      toast.error('Erro de conexão com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[32px] shadow-2xl shadow-blue-900/10 overflow-hidden border border-slate-100">
        
        {/* Lado Esquerdo (Original) */}
        <div className="hidden lg:flex bg-blue-600 p-12 flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md"><ShieldCheck size={28} /></div>
              <span className="text-2xl font-black tracking-tighter">SAFEHASH</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-6">Sua identidade digital   
<span className="text-blue-200">blindada e segura.</span></h1>
            <div className="space-y-6">
              {['Cadeia de custódia imutável', 'Conformidade com ISO 27037', 'Assinatura com carimbo de tempo'].map((text, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center group-hover:bg-blue-400 transition-colors"><CheckCircle2 size={14} /></div>
                  <span className="text-sm font-medium text-blue-50 opacity-90">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lado Direito */}
        <div className="p-8 lg:p-12 overflow-y-auto max-h-[95vh]">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Criar Nova Conta</h2>
            <p className="text-slate-500 text-sm mt-1">Preencha seus dados profissionais abaixo.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Nome Completo</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input required type="text" placeholder="Seu nome completo" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">E-mail</label>
                  <div className="relative group">
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${emailStatus === 'invalid' ? 'text-rose-500' : 'text-slate-400'}`} size={18} />
                    <input required type="email" placeholder="email@exemplo.com" className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-2xl text-sm outline-none transition-all ${emailStatus === 'invalid' ? 'border-rose-200 focus:ring-rose-500/10' : 'border-slate-200 focus:ring-blue-500/10'}`} value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                  </div>
                  {emailStatus === 'invalid' && <p className="text-[9px] font-bold text-rose-500 uppercase ml-1">E-mail incompleto</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">CPF</label>
                  <div className="relative group">
                    <FileText className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${cpfStatus === 'valid' ? 'text-emerald-500' : cpfStatus === 'invalid' ? 'text-rose-500' : 'text-slate-400'}`} size={18} />
                    <input required type="text" placeholder="000.000.000-00" className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-2xl text-sm outline-none transition-all ${cpfStatus === 'valid' ? 'border-emerald-200 focus:ring-emerald-500/10' : cpfStatus === 'invalid' ? 'border-rose-200 focus:ring-rose-500/10' : 'border-slate-200 focus:ring-blue-500/10'}`} value={formData.cpf} onChange={(e) => handleInputChange('cpf', e.target.value)} />
                  </div>
                  {cpfStatus === 'invalid' && <p className="text-[9px] font-bold text-rose-500 uppercase ml-1">CPF Inválido</p>}
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-5 space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Título</label>
                  <select className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" value={formData.professionalType} onChange={(e) => setFormData(prev => ({ ...prev, professionalType: e.target.value, professionalId: '' }))}>
                    <option value="Perito">Perito</option><option value="Perita">Perita</option><option value="Advogado">Advogado</option><option value="Advogada">Advogada</option>
                  </select>
                </div>
                <div className="col-span-4 md:col-span-3 space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">UF</label>
                  <select className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none" value={formData.professionalUf} onChange={(e) => setFormData(prev => ({ ...prev, professionalUf: e.target.value }))}>
                    {BRAZILIAN_UFS.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                  </select>
                </div>
                <div className="col-span-8 md:col-span-4 space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">{isMatricula() ? 'Matrícula' : 'OAB'}</label>
                  <input required type="text" placeholder={isMatricula() ? "000.000-0" : "000000X"} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" value={formData.professionalId} onChange={(e) => handleInputChange('professionalId', e.target.value)} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Senha de Acesso</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input required type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-1">
                  {[
                    { label: '8+ caracteres', met: passwordRequirements.length },
                    { label: '1 número', met: passwordRequirements.number },
                    { label: '1 especial', met: passwordRequirements.special }
                  ].map((req, i) => (
                    <div key={i} className={`flex items-center gap-1.5 text-[9px] font-bold uppercase transition-colors ${req.met ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {req.met ? <Check size={10} strokeWidth={4} /> : <X size={10} strokeWidth={4} />}
                      {req.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Confirmar Senha</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input required type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)} />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors">
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading || !isFormValid}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 disabled:active:scale-100 ${
                isFormValid 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              {isLoading ? 'CRIANDO CONTA...' : 'CRIAR CONTA AGORA'}
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">Já possui uma conta? <Link href="/login" className="text-blue-600 font-bold hover:underline">Acessar Painel</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
