import db from '../lib/db.ts';

export const registerHash = async (req, res) => {
  const {
    userId,
    fileName,
    fileHash,
    fileSize,
    mimeType,
    exifMetadata,
    gpsLocation,
    clientName,
    professionalTitle,
    professionalRegistry,
    professionalId,
  } = req.body;

  if (!userId || !fileName || !fileHash) {
    return res.status(400).json({ error: 'Dados incompletos para a custódia.' });
  }

  const finalProfessionalTitle = professionalTitle || 'Perito';
  const finalProfessionalRegistry = professionalRegistry || professionalId || null;
  const finalClientName = clientName && String(clientName).trim() ? clientName : 'Sem cliente informado';
  const timestampSignature = `ON-MCTI-${Date.now()}`;

  try {
    const sql = `
      INSERT INTO evidences (
        user_id,
        file_name,
        file_hash,
        file_size,
        mime_type,
        exif_metadata,
        timestamp_signature,
        gps_location,
        client_name,
        professional_title,
        professional_registry,
        iso_compliance
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result]: any = await db.execute(sql, [
      userId,
      fileName,
      fileHash,
      fileSize || 0,
      mimeType || 'application/octet-stream',
      JSON.stringify(exifMetadata || {}),
      timestampSignature,
      gpsLocation || null,
      finalClientName,
      finalProfessionalTitle,
      finalProfessionalRegistry,
      1,
    ]);

    return res.status(201).json({
      message: 'Evidência registrada com sucesso!',
      id: result.insertId,
      hash: fileHash,
      professional_title: finalProfessionalTitle,
      professional_registry: finalProfessionalRegistry,
    });
  } catch (error) {
    console.error('Erro ao salvar evidência no MySQL:', error);
    return res.status(500).json({ error: 'Erro ao salvar evidência no banco.' });
  }
};

export const listEvidences = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Usuário não informado.' });
  }

  try {
    const sql = `
      SELECT
        e.id,
        e.user_id,
        e.file_name,
        e.file_hash,
        e.file_size,
        e.mime_type,
        e.description,
        e.created_at,
        e.exif_metadata,
        e.timestamp_signature,
        e.gps_location,
        e.iso_compliance,
        e.client_name,
        e.professional_title,
        e.professional_registry,
        e.professional_id,
        u.full_name AS perito_name
      FROM evidences e
      JOIN users u ON u.id = e.user_id
      WHERE e.user_id = ?
      ORDER BY e.created_at DESC
    `;

    const [rows]: any = await db.execute(sql, [userId]);
    return res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar evidências:', error);
    return res.status(500).json({ error: 'Erro ao buscar histórico.' });
  }
};

export const listLogs = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Usuário não informado.' });
  }

  try {
    const sql = `
      SELECT
        vl.id,
        vl.evidence_id,
        vl.verified_at,
        vl.is_valid,
        vl.ip_address,
        e.file_name,
        e.file_hash,
        e.client_name,
        e.professional_title,
        e.professional_registry,
        u.full_name AS perito_name
      FROM verification_logs vl
      JOIN evidences e ON e.id = vl.evidence_id
      JOIN users u ON u.id = e.user_id
      WHERE e.user_id = ?
      ORDER BY vl.verified_at DESC
    `;

    const [rows]: any = await db.execute(sql, [userId]);
    return res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar logs:', error);
    return res.status(500).json({ error: 'Erro ao buscar logs.' });
  }
};