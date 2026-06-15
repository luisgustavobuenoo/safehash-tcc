import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../lib/db.ts';


const JWT_SECRET = process.env.JWT_SECRET || 'pericia-forense-segredo-muito-seguro';

export const register = async (req: Request, res: Response) => {
  const { full_name, email, password, cpf, professional_type, professional_id, professional_uf } = req.body;
  try {
    const [existing]: any = await db.execute('SELECT id FROM users WHERE email = ? OR cpf = ?', [email, cpf]);
    if (existing.length > 0) return res.status(400).json({ error: "E-mail ou CPF já cadastrados." });

    const hash = await bcrypt.hash(password, 10);
    await db.execute(
      'INSERT INTO users (full_name, email, password_hash, cpf, professional_type, professional_id, professional_uf) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [full_name, email, hash, cpf, professional_type, professional_id, professional_uf]
    );
    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao registrar usuário." });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const [rows]: any = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (user && await bcrypt.compare(password, user.password_hash)) {
      // Usando a constante que definimos no topo
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
      
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
    res.status(500).json({ error: "Erro ao buscar perfil." });
  }
};
