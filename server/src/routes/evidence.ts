import { Router } from 'express';
import { 
    registerEvidence, 
    listEvidences, 
    verifyIntegrity, 
    listLogs 
} from '../controllers/evidenceController.ts';

const router = Router();

// 1. Rota para REGISTRAR (POST)
// Envia: userId, fileName, fileHash, fileSize, mimeType, clientName, exifMetadata
router.post('/register-hash', registerEvidence);

// 2. Rota para LISTAR (GET)
// Retorna todas as evidências do usuário, incluindo o client_name
router.get('/list', listEvidences);

// 3. Rota para VERIFICAR (POST)
// Compara hashes e gera log de auditoria
router.post('/verify', verifyIntegrity);

// 4. Rota para AUDITORIA (GET)
// Lista a trilha de auditoria completa
router.get('/logs', listLogs);

export default router;
