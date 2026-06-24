import { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Mail, Lock, CheckCircle, Eye, EyeOff, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Login( ) {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({ email: '', cpf: '', password: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formatCPF = (v: string) => {
    const c = v.replace(/\D/g, '').slice(0, 11);
    if (c.length <= 3) return c;
    if (c.length <= 6) return `${c.slice(0, 3)}.${c.slice(3)}`;
    if (c.length <= 9) return `${c.slice(0, 3)}.${c.slice(3, 6)}.${c.slice(6)}`;
    return `${c.slice(0, 3)}.${c.slice(3, 6)}.${c.slice(6, 9)}-${c.slice(9, 11)}`;
  };

  const validateCPF = (cpf: string) => {
    const c = cpf.replace(/\D/g, '');
    if (c.length !== 11 || /^(\d)\1{10}$/.test(c)) return false;
    let s = 0, r;
    for (let i = 1; i <= 9; i++) s += parseInt(c[i-1]) * (11 - i);
    r = (s * 10) % 11; if (r >= 10) r = 0; if (r !== parseInt(c[9])) return false;
    s = 0; for (let i = 1; i <= 10; i++) s += parseInt(c[i-1]) * (12 - i);
    r = (s * 10) % 11; if (r >= 10) r = 0; return r === parseInt(c[10]);
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const passwordRequirements = useMemo(() => [
    { label: '8+ Caracteres', met: formData.password.length >= 8 },
    { label: '1 Número', met: /\d/.test(formData.password) },
    { label: '1 Especial', met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) },
  ], [formData.password]);

  const isFormValid = () => validateEmail(formData.email) && validateCPF(formData.cpf) && passwordRequirements.every(r => r.met);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setIsLoading(true);
    try {
     
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email.toLowerCase().trim(),
          cpf: formData.cpf.replace(/\D/g, ""), 
          password: formData.password 
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.clear();
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', String(data.user.id));
        localStorage.setItem('userName', data.user.full_name);
        setSubmitted(true);
        toast.success(`Bem-vindo, ${data.user.full_name}!`);
        setTimeout(() => setLocation('/dashboard'), 1000);
      } else {
        toast.error(data.error || "Credenciais inválidas.");
      }
    } catch {
      toast.error("Servidor offline ou erro de conexão.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-12 px-4">
      <motion.div className="w-full max-w-md relative z-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Entrar</h1>
            <p className="text-gray-600">Acesse sua conta do SafeHash</p>
          </div>
          {submitted && <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-900 font-semibold"><CheckCircle className="text-green-600" /> Login realizado!</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="seu@email.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">CPF</label>
              <input type="text" value={formData.cpf} onChange={(e) => setFormData({...formData, cpf: formatCPF(e.target.value)})} placeholder="000.000.000-00" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Senha</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="••••••••" className="w-full px-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
              </div>
              <div className="flex gap-3 mt-3">
                {passwordRequirements.map((req, i) => (
                  <div key={i} className={`flex items-center gap-1 text-[9px] font-bold uppercase ${req.met ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {req.met ? <Check size={10} /> : <X size={10} />} {req.label}
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit" disabled={isLoading || !isFormValid()} className={`w-full font-semibold py-3 rounded-lg transition-all ${isFormValid() ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
          <p className="text-center text-gray-600 mt-8">Não tem conta? <button onClick={() => setLocation('/register')} className="text-blue-600 font-semibold hover:text-blue-700">Registre-se aqui</button></p>
        </div>
      </motion.div>
    </div>
  );
}
