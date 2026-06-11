import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Mail, Lock, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({ email: '', cpf: '', password: '' });
  const [errors, setErrors] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formatCPF = (v: string) => {
    const c = v.replace(/\D/g, '');
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'cpf' ? formatCPF(value) : value });
  };

  const isFormValid = () => {
    const hasId = formData.email.includes('@') || validateCPF(formData.cpf);
    return hasId && formData.password.length >= 6;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData ),
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitted(true);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userName', data.user.full_name);
        setTimeout(() => setLocation('/dashboard'), 1500);
      } else {
        alert(data.error || "Credenciais inválidas.");
      }
    } catch {
      alert("Servidor offline.");
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

          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-900 font-semibold">
              <CheckCircle className="text-green-600" /> Login realizado!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">CPF</label>
              <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" maxLength={14} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none ${formData.cpf && !validateCPF(formData.cpf) ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} />
              {formData.cpf && !validateCPF(formData.cpf) && <p className="mt-1 text-xs text-red-600">CPF inválido</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
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
