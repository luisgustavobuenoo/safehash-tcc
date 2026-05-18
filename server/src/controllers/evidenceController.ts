import { Request, Response } from 'express';
import db from '../lib/db.ts';

// 1. REGISTRAR EVIDÊNCIA (Agora com Título e Registro Profissional)
export const registerEvidence = async (req: Request, res: Response) => {
  console.log("DADOS RECEBIDOS NO BACKEND:", req.body);

  const { 
    userId, fileName, fileHash, fileSize, mimeType, 
    exifMetadata, gpsLocation, clientName,
    professionalTitle, professionalId // NOVOS CAMPOS
  } = req.body;

  if (!userId || !fileName || !fileHash) {
    return res.status(400).json({ error: 'Dados incompletos para a custódia.' });
  }

  try {
    const timestampSignature = `TS-${Date.now()}-SIGNED-BY-ON-MCTI`;

    const sql = `
      INSERT INTO evidences 
      (user_id, file_name, file_hash, file_size, mime_type, exif_metadata, timestamp_signature, gps_location, client_name, professional_title, professional_id, iso_compliance) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const finalClientName = clientName && clientName.trim() !== "" ? clientName : 'NÃO INFORMADO';

    await db.execute(sql, [
      userId, 
      fileName, 
      fileHash, 
      fileSize || 0, 
      mimeType || 'unknown',
      JSON.stringify(exifMetadata || {}),
      timestampSignature,
      gpsLocation || null,
      finalClientName,
      professionalTitle || 'Dr.', // Salva Dr./Dra./Perito
      professionalId || '---',    // Salva OAB/Matrícula
      1 
    ]);
    
    console.log("SUCESSO: Evidência salva para:", finalClientName);

    return res.status(201).json({ 
      message: 'Evidência protocolada com sucesso!',
      hash: fileHash 
    });
  } catch (error) {
    console.error('ERRO NO BANCO:', error);
    return res.status(500).json({ error: 'Erro ao processar custódia.' });
  }
};

// 2. LISTAR EVIDÊNCIAS (Com JOIN para pegar o nome do perito/usuário)
export const listEvidences = async (req: Request, res: Response) => {
  const { userId } = req.query;
  try {
    const sql = `
      SELECT e.*, u.name as perito_name 
      FROM evidences e
      LEFT JOIN users u ON e.user_id = u.id
      WHERE e.user_id = ? 
      ORDER BY e.created_at DESC
    `;
    const [rows]: any = await db.execute(sql, [userId]);
    return res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    return res.status(500).json({ error: 'Erro ao buscar histórico.' });
  }
};

// 3. VERIFICAR INTEGRIDADE
export const verifyIntegrity = async (req: Request, res: Response) => {
  const { fileHash } = req.body;
  try {
    const sql = 'SELECT * FROM evidences WHERE file_hash = ?';
    const [rows]: any = await db.execute(sql, [fileHash]);

    if (rows.length > 0) {
      const evidence = rows[0];
      await db.execute(
        'INSERT INTO verification_logs (evidence_id, is_valid, ip_address) VALUES (?, ?, ?)',
        [evidence.id, true, req.ip || '127.0.0.1']
      );
      return res.status(200).json({ status: 'Íntegro', evidence });
    } else {
      return res.status(404).json({ status: 'Não Encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Erro na verificação.' });
  }
};

// 4. LISTAR LOGS
export const listLogs = async (req: Request, res: Response) => {
  try {
    const sql = `
      SELECT v.*, e.file_name, e.file_hash 
      FROM verification_logs v
      JOIN evidences e ON v.evidence_id = e.id
      ORDER BY v.verified_at DESC
    `;
    const [rows]: any = await db.execute(sql);
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar logs.' });
  }
};
