import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from "../lib/db.ts";

export const register = async (req, res) => {
  const { email, full_name, cpf, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await db.execute(
      'INSERT INTO users (email, full_name, cpf, password_hash) VALUES (?, ?, ?, ?)',
      [email, full_name, cpf, hash]
    );
    res.status(201).json({ message: "Perito cadastrado com sucesso!" });
  } catch (err) {
    res.status(400).json({ error: "E-mail ou CPF já cadastrados." });
  }
};

export const login = async (req, res) => {
  const { email, cpf, password } = req.body; 
  try {
    const [rows]: any = await db.execute('SELECT * FROM users WHERE email = ? OR cpf = ?', [email, cpf]);
    const user = rows[0];
    if (user && await bcrypt.compare(password, user.password_hash)) {
      const token = jwt.sign({ id: user.id, cpf: user.cpf }, 'CHAVE_PERICIA_2026', { expiresIn: '1d' });
      return res.json({ 
        token, 
        user: { id: user.id, email: user.email, full_name: user.full_name, cpf: user.cpf } 
      });
    }
    res.status(401).json({ error: "Credenciais inválidas." });
  } catch (err) {
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

export const getProfile = async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "ID não fornecido." });
  try {
    const [rows]: any = await db.execute('SELECT id, email, full_name, cpf, created_at FROM users WHERE id = ?', [userId]);
    const user = rows[0];
    if (!user) return res.status(404).json({ error: "Usuário não encontrado." });
    const [evidenceRows]: any = await db.execute('SELECT COUNT(*) as total FROM evidences WHERE user_id = ?', [userId]);
    res.json({
      ...user,
      totalEvidencias: evidenceRows[0].total,
      cargo: "Perito Adjunto de Sistemas",
      matricula: `PC-PR-2026-${String(user.id).padStart(4, '0')}`
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar perfil." });
  }
};
