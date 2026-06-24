
import { Router } from 'express';
import { 
    registerEvidence, 
    listEvidences, 
    verifyIntegrity, 
    listLogs 
} from '../controllers/evidenceController.ts';
import { authenticateToken } from '../middlewares/authMiddleware.ts';

const router = Router();


router.post('/register-hash', authenticateToken, registerEvidence);


router.get('/list', authenticateToken, listEvidences);


router.post('/verify', verifyIntegrity);


router.get('/logs', authenticateToken, listLogs);

export default router;
