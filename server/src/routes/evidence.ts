// Local: server/src/routes/evidence.ts
import { Router } from 'express';
import { 
    registerEvidence, 
    listEvidences, 
    verifyIntegrity, 
    listLogs 
} from '../controllers/evidenceController.ts';
import { authenticateToken } from '../middlewares/authMiddleware.ts';

const router = Router();

/**
 * 1. Rota para REGISTRAR (POST)
 * PROTEGIDA: Apenas peritos logados podem registrar novas evidências.
 */
router.post('/register-hash', authenticateToken, registerEvidence);

/**
 * 2. Rota para LISTAR (GET)
 * PROTEGIDA: Retorna o histórico de evidências do perito autenticado.
 */
router.get('/list', authenticateToken, listEvidences);

/**
 * 3. Rota para VERIFICAR (POST)
 * PÚBLICA: Permite que qualquer pessoa valide a integridade de um arquivo 
 * contra o hash original, garantindo a transparência forense.
 */
router.post('/verify', verifyIntegrity);

/**
 * 4. Rota para AUDITORIA (GET)
 * PROTEGIDA: Lista a trilha de auditoria completa das verificações.
 */
router.get('/logs', authenticateToken, listLogs);

export default router;
