import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from "../lib/db.ts";

export const register = async (req, res) => {
  const { email, full_name, cpf, password, professional_type, professional_id } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await db.execute(
      'INSERT INTO users (email, full_name, cpf, password_hash, professional_type, professional_id) VALUES (?, ?, ?, ?, ?, ?)',
      [email, full_name, cpf, hash, professional_type || 'Perito', professional_id || null]
    );
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
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
        user: { id: user.id, full_name: user.full_name, professional_type: user.professional_type } 
      });
    }
    res.status(401).json({ error: "Credenciais inválidas." });
  } catch (err) {
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};

export const getProfile = async (req, res) => {
  const { userId } = req.query;
  try {
    const [userRows]: any = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
    const user = userRows[0];
    const [evRows]: any = await db.execute('SELECT COUNT(*) as total FROM evidences WHERE user_id = ?', [userId]);
    
    res.json({
      ...user,
      totalEvidencias: evRows[0]?.total || 0,
      cargo: user.professional_type === 'Perito' ? 'Perito Adjunto de Sistemas' : 'Advogado',
      matricula: user.professional_id
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar perfil." });
  }
};
