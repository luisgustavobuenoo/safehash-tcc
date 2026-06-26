// server/index.ts
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// server/src/routes/auth.ts
import { Router } from "express";

// server/src/controllers/authController.ts
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// server/src/lib/db.ts
import mysql from "mysql2/promise";
import "dotenv/config";
var connection = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "safehash_db",
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
connection.getConnection().then(() => console.log("\u2705 Conectado ao banco de dados MySQL com sucesso!")).catch((err) => {
  console.error("\u274C Erro ao conectar no banco de dados:", err.message);
  console.log("Verifique se o seu MySQL est\xE1 rodando e se os dados no .env est\xE3o corretos.");
});
var db_default = connection;

// server/src/schemas/validation.ts
import { z } from "zod";
function isValidCPF(cpf) {
  const clean = cpf.replace(/\D/g, "");
  if (clean.length !== 11 || /^(\d)\1{10}$/.test(clean)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(clean[i]) * (10 - i);
  let digit = 11 - sum % 11;
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(clean[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(clean[i]) * (11 - i);
  digit = 11 - sum % 11;
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(clean[10])) return false;
  return true;
}
var RegisterSchema = z.object({
  fullName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(255, "Nome muito longo"),
  email: z.string().email("Email inv\xE1lido").max(255, "Email muito longo"),
  cpf: z.string().refine((cpf) => isValidCPF(cpf), "CPF inv\xE1lido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres").regex(/[0-9]/, "Senha deve conter pelo menos 1 n\xFAmero").regex(/[!@#$%^&*(),.?":{}|<>]/, "Senha deve conter 1 caractere especial"),
  professionalType: z.enum(["Perito", "Perita", "Advogado", "Advogada"], {
    errorMap: () => ({ message: "Tipo profissional inv\xE1lido" })
  }),
  professionalId: z.string().min(4, "ID profissional deve ter pelo menos 4 caracteres").max(50, "ID profissional muito longo"),
  professionalUf: z.string().length(2, "UF deve ter 2 caracteres").regex(/^[A-Z]{2}$/, "UF inv\xE1lida")
});
var LoginSchema = z.object({
  email: z.string().email("Email inv\xE1lido").optional(),
  cpf: z.string().optional(),
  password: z.string().min(1, "Senha \xE9 obrigat\xF3ria")
}).refine(
  (data) => data.email || data.cpf,
  { message: "Email ou CPF \xE9 necess\xE1rio", path: ["email"] }
);
var RegisterEvidenceSchema = z.object({
  userId: z.number().int().positive("User ID inv\xE1lido"),
  fileName: z.string().min(1, "Nome do arquivo \xE9 obrigat\xF3rio").max(255, "Nome do arquivo muito longo"),
  fileHash: z.string().regex(/^[a-f0-9]{64}$/i, "Hash SHA-256 inv\xE1lido (deve ter 64 caracteres hex)"),
  fileSize: z.number().int().nonnegative("Tamanho do arquivo inv\xE1lido").optional(),
  mimeType: z.string().max(100, "MIME type muito longo").optional(),
  clientName: z.string().max(255, "Nome do cliente muito longo").optional(),
  professionalTitle: z.string().max(50, "T\xEDtulo profissional muito longo").optional(),
  professionalRegistry: z.string().max(50, "Registro profissional muito longo").optional(),
  professionalId: z.string().max(50, "ID profissional muito longo").optional(),
  professionalUf: z.string().length(2, "UF inv\xE1lida").optional(),
  description: z.string().max(1e3, "Descri\xE7\xE3o muito longa").optional(),
  gpsLocation: z.string().max(255, "GPS muito longo").optional(),
  exifMetadata: z.record(z.any()).optional()
});
var VerifyIntegritySchema = z.object({
  currentHash: z.string().regex(/^[a-f0-9]{64}$/i, "Hash atual inv\xE1lido"),
  originalHash: z.string().regex(/^[a-f0-9]{64}$/i, "Hash original inv\xE1lido"),
  ip: z.string().optional()
});

// server/src/controllers/authController.ts
var JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("\u274C ERRO FATAL: JWT_SECRET n\xE3o definido no arquivo .env ou nas vari\xE1veis de ambiente do servidor.");
}
var register = async (req, res) => {
  try {
    const parsed = RegisterSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Valida\xE7\xE3o falhou",
        details: parsed.error.flatten()
      });
    }
    const { fullName, email, password, cpf, professionalType, professionalId, professionalUf } = parsed.data;
    const [existing] = await db_default.execute("SELECT id FROM users WHERE email = ? OR cpf = ?", [email, cpf]);
    if (existing.length > 0) {
      return res.status(400).json({ error: "E-mail ou CPF j\xE1 cadastrados." });
    }
    const hash = await bcrypt.hash(password, 10);
    await db_default.execute(
      "INSERT INTO users (full_name, email, password_hash, cpf, professional_type, professional_id, professional_uf) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [fullName, email, hash, cpf, professionalType, professionalId, professionalUf]
    );
    res.status(201).json({ message: "Usu\xE1rio criado com sucesso!" });
  } catch (err) {
    console.error("Erro no registro:", err);
    res.status(500).json({ error: "Erro interno ao registrar usu\xE1rio." });
  }
};
var login = async (req, res) => {
  try {
    const parsed = LoginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Valida\xE7\xE3o falhou",
        details: parsed.error.flatten()
      });
    }
    const { email, cpf, password } = parsed.data;
    const [rows] = await db_default.execute(
      "SELECT * FROM users WHERE email = ? OR cpf = ?",
      [email || "", cpf || ""]
    );
    const user = rows[0];
    if (user && await bcrypt.compare(password, user.password_hash)) {
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });
      return res.json({
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          professional_type: user.professional_type,
          professional_id: user.professional_id,
          professional_uf: user.professional_uf
        }
      });
    }
    res.status(401).json({ error: "Credenciais inv\xE1lidas." });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};
var getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const [userRows] = await db_default.execute(
      "SELECT id, full_name, email, cpf, professional_type, professional_id, professional_uf, created_at FROM users WHERE id = ?",
      [userId]
    );
    const user = userRows[0];
    if (!user) return res.status(404).json({ error: "Usu\xE1rio n\xE3o encontrado." });
    const [evRows] = await db_default.execute("SELECT COUNT(*) as total FROM evidences WHERE user_id = ?", [userId]);
    res.json({ ...user, totalEvidencias: evRows[0]?.total || 0 });
  } catch (err) {
    console.error("Erro ao buscar perfil:", err);
    res.status(500).json({ error: "Erro ao buscar perfil." });
  }
};

// server/src/middlewares/authMiddleware.ts
import jwt2 from "jsonwebtoken";
var JWT_SECRET2 = process.env.JWT_SECRET;
var authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Acesso negado. Token n\xE3o fornecido." });
  }
  try {
    const decoded = jwt2.verify(token, JWT_SECRET2);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Sess\xE3o inv\xE1lida ou expirada. Por favor, fa\xE7a login novamente." });
  }
};

// server/src/routes/auth.ts
var router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticateToken, getProfile);
var auth_default = router;

// server/src/routes/evidence.ts
import { Router as Router2 } from "express";

// server/src/controllers/evidenceController.ts
var verificationLocks = /* @__PURE__ */ new Map();
var registerEvidence = async (req, res) => {
  try {
    const parsed = RegisterEvidenceSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Valida\xE7\xE3o falhou",
        details: parsed.error.flatten()
      });
    }
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
      professionalUf,
      description
    } = parsed.data;
    const timestampSignature = `SAFEHASH-AUTH-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
    const sql = `
      INSERT INTO evidences (
        user_id, file_name, file_hash, file_size, mime_type,
        description, exif_metadata, timestamp_signature, gps_location, 
        client_name, professional_title, professional_registry, 
        professional_id, professional_uf, iso_compliance
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `;
    const [result] = await db_default.execute(sql, [
      userId,
      fileName,
      fileHash,
      fileSize || 0,
      mimeType || "application/octet-stream",
      description || null,
      JSON.stringify(exifMetadata || {}),
      timestampSignature,
      gpsLocation || null,
      clientName || "N\xE3o Informado",
      professionalTitle || "Perito Forense",
      professionalRegistry || null,
      professionalId || null,
      professionalUf || null
    ]);
    return res.status(201).json({
      message: "Cust\xF3dia realizada com sucesso!",
      id: result.insertId,
      signature: timestampSignature
    });
  } catch (error) {
    console.error("[Evidence] Erro ao salvar evid\xEAncia:", error);
    return res.status(500).json({ error: "Erro interno ao salvar evid\xEAncia." });
  }
};
var verifyIntegrity = async (req, res) => {
  try {
    const parsed = VerifyIntegritySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Valida\xE7\xE3o falhou",
        details: parsed.error.flatten()
      });
    }
    const { currentHash, originalHash, ip } = parsed.data;
    const [rows] = await db_default.execute(
      "SELECT id, file_name FROM evidences WHERE file_hash = ?",
      [originalHash]
    );
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "Hash original n\xE3o encontrado." });
    }
    const evidenceId = rows[0].id;
    if (verificationLocks.has(evidenceId)) {
      await verificationLocks.get(evidenceId);
    }
    let resolveLock;
    const lockPromise = new Promise((resolve) => {
      resolveLock = resolve;
    });
    verificationLocks.set(evidenceId, lockPromise);
    try {
      const isValid = originalHash.toLowerCase() === currentHash.toLowerCase();
      await db_default.execute(
        "INSERT INTO verification_logs (evidence_id, is_valid, ip_address) VALUES (?, ?, ?)",
        [evidenceId, isValid, ip || req.ip || "127.0.0.1"]
      );
      return res.status(200).json({
        valid: isValid,
        fileName: rows[0].file_name,
        message: isValid ? "Integridade Confirmada" : "Alerta de Viola\xE7\xE3o"
      });
    } finally {
      resolveLock();
      verificationLocks.delete(evidenceId);
    }
  } catch (error) {
    console.error("[Verify] Erro:", error);
    return res.status(500).json({ error: "Erro ao processar verifica\xE7\xE3o." });
  }
};
var listEvidences = async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "userId \xE9 necess\xE1rio." });
  try {
    const [rows] = await db_default.execute(
      "SELECT * FROM evidences WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.error("[Evidence] Erro ao listar:", error);
    return res.status(500).json({ error: "Erro ao buscar hist\xF3rico." });
  }
};
var listLogs = async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "userId n\xE3o informado." });
  try {
    const sql = `
      SELECT vl.*, e.file_name, e.file_hash, e.client_name 
      FROM verification_logs vl
      JOIN evidences e ON e.id = vl.evidence_id
      WHERE e.user_id = ?
      ORDER BY vl.verified_at DESC
    `;
    const [rows] = await db_default.execute(sql, [userId]);
    return res.status(200).json(rows);
  } catch (error) {
    console.error("[Logs] Erro:", error);
    return res.status(500).json([]);
  }
};

// server/src/routes/evidence.ts
var router2 = Router2();
router2.post("/register-hash", authenticateToken, registerEvidence);
router2.get("/list", authenticateToken, listEvidences);
router2.post("/verify", verifyIntegrity);
router2.get("/logs", authenticateToken, listLogs);
var evidence_default = router2;

// server/index.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 3600
  }));
  app.use(express.json());
  app.use("/api/auth", auth_default);
  app.use("/api/evidence", evidence_default);
  const staticPath = process.env.NODE_ENV === "production" ? path.resolve(__dirname, "public") : path.resolve(__dirname, "..", "dist", "public");
  app.use(express.static(staticPath));
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api")) return res.status(404).json({ error: "Rota n\xE3o encontrada" });
    res.sendFile(path.join(staticPath, "index.html"));
  });
  const port = process.env.PORT || 5e3;
  server.listen(port, () => console.log(`\u{1F680} SafeHash Backend rodando na porta ${port}`));
}
startServer().catch(console.error);
