import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Mail, Lock, AlertCircle, CheckCircle, User, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

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

  // Máscara CPF
  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
  };

  // Validar CPF
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

  // Validação Detalhada de Email
  const getEmailError = (email: string): string | null => {
    if (!email) return 'Email é obrigatório';
    if (!email.includes('@')) return 'O email deve conter "@"';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return 'Formato de email inválido';
    return null;
  };

  // Validação Detalhada de Senha
  const getPasswordRequirements = (pass: string): string | null => {
    if (!pass) return 'Senha é obrigatória';
    const reqs = [];
    if (pass.length < 6) reqs.push("mínimo 6 caracteres");
    if (!/[A-Z]/.test(pass)) reqs.push("uma letra maiúscula");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) reqs.push("um caractere especial");
    
    if (reqs.length > 0) return `A senha precisa de: ${reqs.join(', ')}.`;
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === 'cpf' ? formatCPF(value) : value;
    
    setFormData({ ...formData, [name]: updatedValue });

    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    const emailErr = getEmailError(formData.email);
    if (emailErr) newErrors.email = emailErr;

    if (!formData.fullName || formData.fullName.length < 3) {
      newErrors.fullName = 'O nome deve ter no mínimo 3 caracteres';
    }

    if (!formData.cpf || !validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    const passErr = getPasswordRequirements(formData.password);
    if (passErr) newErrors.password = passErr;

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setLocation('/login'), 2000);
      } else {
        alert(data.error || "Erro ao realizar cadastro.");
      }
    } catch (error) {
      alert("Servidor SafeHash offline na porta 5000. Verifique o terminal.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-12 px-4">
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_25%,rgba(68,68,68,.2)_50%,transparent_50%,transparent_75%,rgba(68,68,68,.2)_75%,rgba(68,68,68,.2))] bg-[length:40px_40px]"></div>
      </div>

      <motion.div
        className="w-full max-w-2xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Conta</h1>
            <p className="text-gray-600">Registre-se para usar o SafeHash</p>
          </div>

          {submitted && (
            <motion.div
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
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
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <motion.p className="mt-2 text-sm text-red-600 flex items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <AlertCircle size={16} /> {errors.email}
                </motion.p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.fullName ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.fullName && (
                  <motion.p className="mt-2 text-sm text-red-600 flex items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <AlertCircle size={16} /> {errors.fullName}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">CPF</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.cpf ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  disabled={isLoading}
                />
                {errors.cpf && (
                  <motion.p className="mt-2 text-sm text-red-600 flex items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <AlertCircle size={16} /> {errors.cpf}
                  </motion.p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p className="mt-2 text-sm text-red-600 flex items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <AlertCircle size={16} /> {errors.password}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Confirmar Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <motion.p className="mt-2 text-sm text-red-600 flex items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <AlertCircle size={16} /> {errors.confirmPassword}
                  </motion.p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
            >
              {isLoading ? 'Criando conta...' : 'Registrar'}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-600">ou</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <p className="text-center text-gray-600">
            Já tem conta?{' '}
            <button
              onClick={() => setLocation('/login')}
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Faça login aqui
            </button>
          </p>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => setLocation('/')}
            className="text-gray-300 hover:text-white transition-colors text-sm"
          >
            ← Voltar para home
          </button>
        </div>
      </motion.div>
    </div>
  );
}