import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  
  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
   
    const decoded = jwt.verify(token, JWT_SECRET as string);
    
   
    req.user = decoded;
    next();
  } catch (err) {
   
    return res.status(403).json({ error: 'Sessão inválida ou expirada. Por favor, faça login novamente.' });
  }
};
