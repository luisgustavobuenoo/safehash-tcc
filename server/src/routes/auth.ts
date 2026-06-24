// Local: server/src/routes/auth.ts
import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController.ts';
import { authenticateToken } from '../middlewares/authMiddleware.ts'; // <-- INCLUÍDO

const router = Router();


router.post('/register', register);


router.post('/login', login);


router.get('/profile', authenticateToken, getProfile);

export default router;
