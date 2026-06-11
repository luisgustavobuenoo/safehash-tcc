import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Mail, Lock, AlertCircle, CheckCircle, User, Eye, EyeOff, ShieldCheck, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormErrors {
  email?: string;
  fullName?: string;
  cpf?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Register() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    cpf: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Requisitos de Senha (Feedback Visual)
  const [passwordReqs, setPasswordReqs] = useState({
    length: false,
    special: false,
    letter: false
  });

  useEffect(() => {
    const pass = formData.password;
    setPasswordReqs({
      length: pass.length >= 8,
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
      letter: /[a-zA-Z]/.test(pass)
    });
  }, [formData.password]);

  // Máscara CPF
  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
  };

  // Validar CPF (Cálculo Real)
  const validateCPF = (cpf: string): boolean => {
    const cleaned = cpf.replace(/\D/g, '');
    if (cleaned.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleaned)) return false;
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleaned.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleaned.substring(10, 11))) return false;
    return true;
  };

  const isFormValid = () => {
    return (
      formData.email.includes('@') &&
      formData.fullName.length >= 3 &&
      !/\d/.test(formData.fullName) &&
      validateCPF(formData.cpf) &&
      passwordReqs.length &&
      passwordReqs.special &&
      passwordReqs.letter &&
      formData.password === formData.confirmPassword
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Bloquear números no nome
    if (name === 'fullName' && /\d/.test(value)) {
      setErrors({ ...errors, fullName: 'O nome não pode conter números' });
      return;
    }

    const updatedValue = name === 'cpf' ? formatCPF(value) : value;
    setFormData({ ...formData, [name]: updatedValue });

    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.fullName, 
          email: formData.email,
          cpf: formData.cpf,
          password: formData.password
        } ),
      });

      const data = await response.json();
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setLocation('/login'), 2000);
      } else {
        alert(data.error || "Erro ao realizar cadastro.");
      }
    } catch (error) {
      alert("Erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-12 px-4">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_25%,rgba(68,68,68,.2)_50%,transparent_50%,transparent_75%,rgba(68,68,68,.2)_75%,rgba(68,68,68,.2))] bg-[length:40px_40px]"></div>
      </div>

      <motion.div className="w-full max-w-2xl relative z-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Conta</h1>
            <p className="text-gray-600">Registre-se para usar o SafeHash</p>
          </div>

          {submitted && (
            <motion.div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <CheckCircle className="text-green-600" size={20} />
              <div>
                <p className="font-semibold text-green-900">Conta criada com sucesso!</p>
                <p className="text-sm text-green-700">Redirecionando para o login...</p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} disabled={isLoading} />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600 flex items-center gap-1"><AlertCircle size={16} /> {errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Seu nome completo" className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.fullName ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} disabled={isLoading} />
                </div>
                {errors.fullName && <p className="mt-2 text-sm text-red-600 flex items-center gap-1"><AlertCircle size={16} /> {errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">CPF</label>
                <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" maxLength={14} className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.cpf ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} disabled={isLoading} />
                {errors.cpf && <p className="mt-2 text-sm text-red-600 flex items-center gap-1"><AlertCircle size={16} /> {errors.cpf}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} disabled={isLoading} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                </div>
                
                {/* CHECKLIST DE SENHA */}
                <div className="mt-3 space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-2">
                    {passwordReqs.length ? <ShieldCheck size={14} className="text-green-500" /> : <ShieldAlert size={14} className="text-slate-300" />}
                    <span className={`text-xs ${passwordReqs.length ? 'text-green-600 font-medium' : 'text-slate-500'}`}>Mínimo 8 caracteres</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordReqs.letter ? <ShieldCheck size={14} className="text-green-500" /> : <ShieldAlert size={14} className="text-slate-300" />}
                    <span className={`text-xs ${passwordReqs.letter ? 'text-green-600 font-medium' : 'text-slate-500'}`}>Pelo menos uma letra</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordReqs.special ? <ShieldCheck size={14} className="text-green-500" /> : <ShieldAlert size={14} className="text-slate-300" />}
                    <span className={`text-xs ${passwordReqs.special ? 'text-green-600 font-medium' : 'text-slate-500'}`}>Caractere especial (!@#$)</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Confirmar Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} disabled={isLoading} />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isLoading || !isFormValid()} className={`w-full font-semibold py-3 rounded-lg transition-all ${isFormValid() ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
              {isLoading ? 'Criando conta...' : 'Registrar'}
            </Button>
          </form>

          <p className="text-center text-gray-600 mt-8">Já tem conta? <button onClick={() => setLocation('/login')} className="text-blue-600 font-semibold hover:text-blue-700">Faça login aqui</button></p>
        </div>
      </motion.div>
    </div>
  );
}
