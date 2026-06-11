import db from '../lib/db.ts';

/**
 * REGISTRAR EVIDÊNCIA (Cadeia de Custódia)
 * Salva o hash e todos os metadados forenses
 */
export const registerEvidence = async (req: any, res: any) => {
  const {
    userId, fileName, fileHash, fileSize, mimeType,
    exifMetadata, gpsLocation, clientName, professionalTitle,
    professionalRegistry, professionalId, description
  } = req.body;

  console.log(`[Evidence] Registrando nova evidência para o usuário: ${userId}`);

  if (!userId || !fileName || !fileHash) {
    return res.status(400).json({ error: 'Dados obrigatórios ausentes (userId, fileName ou fileHash).' });
  }

  try {
    const timestampSignature = `SAFEHASH-AUTH-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
    
    const sql = `
      INSERT INTO evidences (
        user_id, file_name, file_hash, file_size, mime_type,
        description, exif_metadata, timestamp_signature, gps_location, 
        client_name, professional_title, professional_registry, 
        professional_id, iso_compliance
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `;

    const [result]: any = await db.execute(sql, [
      userId, fileName, fileHash, fileSize || 0, mimeType || 'application/octet-stream',
      description || null, JSON.stringify(exifMetadata || {}), timestampSignature, 
      gpsLocation || null, clientName || 'Não Informado', 
      professionalTitle || 'Perito Forense', professionalRegistry || null,
      professionalId || null
    ]);

    console.log(`[Evidence] Sucesso! ID Gerado: ${result.insertId}`);
    return res.status(201).json({
      message: 'Custódia realizada com sucesso!',
      id: result.insertId,
      signature: timestampSignature
    });
  } catch (error) {
    console.error('[Evidence] Erro Crítico no MySQL:', error);
    return res.status(500).json({ error: 'Erro interno ao salvar evidência no banco de dados.' });
  }
};

/**
 * LISTAR EVIDÊNCIAS
 */
export const listEvidences = async (req: any, res: any) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'userId é necessário.' });

  try {
    const [rows]: any = await db.execute(
      'SELECT * FROM evidences WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.error('[Evidence] Erro ao listar:', error);
    return res.status(500).json({ error: 'Erro ao buscar histórico.' });
  }
};

/**
 * VERIFICAR INTEGRIDADE (Gera o Log de Auditoria)
 */
export const verifyIntegrity = async (req: any, res: any) => {
  const { currentHash, originalHash, ip } = req.body;

  if (!currentHash || !originalHash) {
    return res.status(400).json({ error: 'Hashes para comparação não fornecidos.' });
  }

  try {
    const [rows]: any = await db.execute(
      'SELECT id, file_name FROM evidences WHERE file_hash = ?',
      [originalHash]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: 'Hash original não encontrado na base de dados.' });
    }

    const evidenceId = rows[0].id;
    const isValid = originalHash.toLowerCase() === currentHash.toLowerCase();

    // REGISTRA NA TABELA DE AUDITORIA
    await db.execute(
      'INSERT INTO verification_logs (evidence_id, is_valid, ip_address) VALUES (?, ?, ?)',
      [evidenceId, isValid, ip || req.ip || '127.0.0.1']
    );

    return res.status(200).json({
      valid: isValid,
      fileName: rows[0].file_name,
      message: isValid ? 'Integridade Confirmada' : 'Alerta de Violação'
    });
  } catch (error) {
    console.error('[Verify] Erro:', error);
    return res.status(500).json({ error: 'Erro ao processar verificação.' });
  }
};

/**
 * LISTAR LOGS DE AUDITORIA
 */
export const listLogs = async (req: any, res: any) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'userId não informado.' });

  try {
    const sql = `
      SELECT vl.*, e.file_name, e.file_hash, e.client_name 
      FROM verification_logs vl
      JOIN evidences e ON e.id = vl.evidence_id
      WHERE e.user_id = ?
      ORDER BY vl.verified_at DESC
    `;
    const [rows]: any = await db.execute(sql, [userId]);
    return res.status(200).json(rows);
  } catch (error) {
    console.error('[Logs] Erro:', error);
    return res.status(500).json([]);
  }
};

export const registerHash = registerEvidence;
