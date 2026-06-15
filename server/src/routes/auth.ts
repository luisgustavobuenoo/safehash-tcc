// Local: server/src/routes/auth.ts
import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController.ts';
import { authenticateToken } from '../middlewares/authMiddleware.ts'; // <-- INCLUÍDO

const router = Router();

// Rota para REGISTRAR (Pública)
router.post('/register', register);

// Rota para LOGIN (Pública)
router.post('/login', login);

// Rota para PERFIL (PROTEGIDA)
// Agora o Dashboard só consegue puxar seus dados se o token for válido
router.get('/profile', authenticateToken, getProfile);

export default router;
