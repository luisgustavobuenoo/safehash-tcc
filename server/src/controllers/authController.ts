import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from "../lib/db.ts";




// REGISTRO
export const register = async (req, res) => {
  // Ajustado para 'full_name' (como vem do React agora)
  const { email, full_name, cpf, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    
    await db.execute(
      'INSERT INTO users (email, full_name, cpf, password_hash) VALUES (?, ?, ?, ?)',
      [email, full_name, cpf, hash]
    );

    res.status(201).json({ message: "Perito cadastrado com sucesso!" });
  } catch (err) {
    console.error("Erro no cadastro:", err);
    res.status(400).json({ error: "E-mail ou CPF já cadastrados." });
  }
};

// LOGIN
export const login = async (req, res) => {
  // Ajustado para receber email e cpf separadamente (como o formulário React envia)
  const { email, cpf, password } = req.body; 

  try {
    // Busca por Email OU CPF para garantir que o perito consiga logar
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ? OR cpf = ?', 
      [email, cpf]
    );
    
    const user = rows[0];

    // Verifica se usuário existe e se a senha "bate"
    if (user && await bcrypt.compare(password, user.password_hash)) {
      
      const token = jwt.sign(
        { id: user.id, cpf: user.cpf }, 
        'CHAVE_PERICIA_2026', // Ideal usar variável de ambiente (.env)
        { expiresIn: '1d' }
      );

      return res.json({ 
        token, 
        user: { 
          id: user.id, 
          email: user.email, 
          full_name: user.full_name, 
          cpf: user.cpf 
        } 
      });
    }
    
    res.status(401).json({ error: "Credenciais inválidas." });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};