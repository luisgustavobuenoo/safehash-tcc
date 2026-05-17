import { Router } from 'express';
import connection from '../lib/db.ts'; 

const router = Router();

// 1. Rota para REGISTRAR (POST)
router.post('/register-hash', async (req, res) => {
    // Adicionei fileSize aqui para bater com seu SQL NOT NULL
    const { userId, fileName, fileHash, fileSize } = req.body;

    if (!userId || !fileName || !fileHash) {
        return res.status(400).json({ error: 'Dados incompletos para a custódia.' });
    }

    try {
        // CORREÇÃO: Tabela no plural 'evidences' e inclusão de file_size
        const sql = 'INSERT INTO evidences (user_id, file_name, file_hash, file_size) VALUES (?, ?, ?, ?)';
        
        // Passando os 4 valores para os 4 '?'
        await connection.query(sql, [userId, fileName, fileHash, fileSize || 0]);
        
        return res.status(201).json({ 
            message: 'Evidência registrada com sucesso!',
            hash: fileHash 
        });
    } catch (error) {
        console.error('Erro no MySQL:', error);
        return res.status(500).json({ error: 'Erro ao salvar no banco.' });
    }
});

// 2. Rota para LISTAR (GET)
router.get('/list', async (req, res) => {
    try {
        // CORREÇÃO: Tabela 'evidences' no plural
        const sql = `
            SELECT e.id, e.file_name, e.file_hash, e.created_at, u.full_name as username 
            FROM evidences e 
            JOIN users u ON e.user_id = u.id 
            ORDER BY e.created_at DESC
        `;
        
        const [rows]: any = await connection.query(sql);
        
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar evidências:', error);
        return res.status(500).json({ error: 'Erro ao buscar histórico.' });
    }
});

export default router;