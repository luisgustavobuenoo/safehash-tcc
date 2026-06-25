import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 
import db from '../lib/db.ts';
import { RegisterSchema, LoginSchema } from '../schemas/validation.ts';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("❌ ERRO CRÍTICO: JWT_SECRET não definido no arquivo .env");
}

export const register = async (req: Request, res: Response) => {
  try {
    
    const parsed = RegisterSchema.safeParse(req.body);
    
    if (!parsed.success) {
      return res.status(400).json({ 
        error: 'Validação falhou',
        details: parsed.error.flatten()
      });
    }

    const { fullName, email, password, cpf, professionalType, professionalId, professionalUf } = parsed.data;
    
    
    const [existing]: any = await db.execute('SELECT id FROM users WHERE email = ? OR cpf = ?', [email, cpf]);
    if (existing.length > 0) {
      return res.status(400).json({ error: "E-mail ou CPF já cadastrados." });
    }

   
    const hash = await bcrypt.hash(password, 10);

    
    await db.execute(
      'INSERT INTO users (full_name, email, password_hash, cpf, professional_type, professional_id, professional_uf) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [fullName, email, hash, cpf, professionalType, professionalId, professionalUf]
    );

    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (err) {
    console.error("Erro no registro:", err);
    res.status(500).json({ error: "Erro interno ao registrar usuário." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    
    const parsed = LoginSchema.safeParse(req.body);
    
    if (!parsed.success) {
      return res.status(400).json({ 
        error: 'Validação falhou',
        details: parsed.error.flatten()
      });
    }

    const { email, cpf, password } = parsed.data;
    
    
    const [rows]: any = await db.execute(
      'SELECT * FROM users WHERE email = ? OR cpf = ?', 
      [email || '', cpf || '']
    );
    
    const user = rows[0];

    if (user && await bcrypt.compare(password, user.password_hash)) {
    
      const token = jwt.sign({ id: user.id }, JWT_SECRET as string, { expiresIn: '1d' });
      
      return res.json({ 
        token, 
        user: { 
          id: user.id, 
          full_name: user.full_name, 
          email: user.email,
          professional_type: user.professional_type,
          professional_id: user.professional_id,
          professional_uf: user.professional_uf
        } 
      });
    }
    
    res.status(401).json({ error: "Credenciais inválidas." });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

export const getProfile = async (req: any, res: Response) => {
  const userId = req.user.id;
  try {
    const [userRows]: any = await db.execute(
      'SELECT id, full_name, email, cpf, professional_type, professional_id, professional_uf, created_at FROM users WHERE id = ?', 
      [userId]
    );
    const user = userRows[0];
    if (!user) return res.status(404).json({ error: "Usuário não encontrado." });
    
    const [evRows]: any = await db.execute('SELECT COUNT(*) as total FROM evidences WHERE user_id = ?', [userId]);
    res.json({ ...user, totalEvidencias: evRows[0]?.total || 0 });
  } catch (err) {
    console.error("Erro ao buscar perfil:", err);
    res.status(500).json({ error: "Erro ao buscar perfil." });
  }
};