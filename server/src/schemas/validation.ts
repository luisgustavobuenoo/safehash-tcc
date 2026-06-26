import { z } from 'zod';


function isValidCPF(cpf: string): boolean {
  const clean = cpf.replace(/\D/g, '');
  if (clean.length !== 11 || /^(\d)\1{10}$/.test(clean)) return false;
 
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(clean[i]) * (10 - i);
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(clean[9])) return false;
  
  
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(clean[i]) * (11 - i);
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(clean[10])) return false;
  
  return true;
}


export const RegisterSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(255, 'Nome muito longo'),
  
  email: z
    .string()
    .email('Email inválido')
    .max(255, 'Email muito longo'),
  
  cpf: z
    .string()
    .refine(cpf => isValidCPF(cpf), 'CPF inválido'),
  
  password: z
    .string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/[0-9]/, 'Senha deve conter pelo menos 1 número')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Senha deve conter 1 caractere especial'),
  
  professionalType: z
    .enum(['Perito', 'Perita', 'Advogado', 'Advogada'], {
      errorMap: () => ({ message: 'Tipo profissional inválido' })
    }),
  
  professionalId: z
    .string()
    .min(4, 'ID profissional deve ter pelo menos 4 caracteres')
    .max(50, 'ID profissional muito longo'),
  
  professionalUf: z
    .string()
    .length(2, 'UF deve ter 2 caracteres')
    .regex(/^[A-Z]{2}$/, 'UF inválida')
});

//  Validação de Login
export const LoginSchema = z.object({
  email: z.string().email('Email inválido').optional(),
  cpf: z.string().optional(),
  password: z.string().min(1, 'Senha é obrigatória')
}).refine(
  data => data.email || data.cpf,
  { message: 'Email ou CPF é necessário', path: ['email'] }
);

//  Validação de Registro de Evidência
export const RegisterEvidenceSchema = z.object({
  userId: z.number().int().positive('User ID inválido'),
  fileName: z
    .string()
    .min(1, 'Nome do arquivo é obrigatório')
    .max(255, 'Nome do arquivo muito longo'),
  fileHash: z
    .string()
    .regex(/^[a-f0-9]{64}$/i, 'Hash SHA-256 inválido (deve ter 64 caracteres hex)'),
  fileSize: z.number().int().nonnegative('Tamanho do arquivo inválido').optional(),
  mimeType: z.string().max(100, 'MIME type muito longo').optional(),
  clientName: z.string().max(255, 'Nome do cliente muito longo').optional(),
  professionalTitle: z.string().max(50, 'Título profissional muito longo').optional(),
  professionalRegistry: z.string().max(50, 'Registro profissional muito longo').optional(),
  professionalId: z.string().max(50, 'ID profissional muito longo').optional(),
  professionalUf: z.string().length(2, 'UF inválida').optional(),
  description: z.string().max(1000, 'Descrição muito longa').optional(),
  gpsLocation: z.string().max(255, 'GPS muito longo').optional(),
  exifMetadata: z.record(z.any()).optional()
});

//  Validação de Verificação de Integridade
export const VerifyIntegritySchema = z.object({
  currentHash: z
    .string()
    .regex(/^[a-f0-9]{64}$/i, 'Hash atual inválido'),
  originalHash: z
    .string()
    .regex(/^[a-f0-9]{64}$/i, 'Hash original inválido'),
  ip: z.string().optional()
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterEvidenceInput = z.infer<typeof RegisterEvidenceSchema>;
export type VerifyIntegrityInput = z.infer<typeof VerifyIntegritySchema>;