import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import authRoutes from "./src/routes/auth.ts";
import evidenceRoutes from './src/routes/evidence.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(cors());
  app.use(express.json());

  // Rotas da API
  app.use("/api/auth", authRoutes);
  app.use('/api/evidence', evidenceRoutes);

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.get("*", (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: "Rota de API não encontrada" });
    }
    res.sendFile(path.join(staticPath, "index.html"));
  });

 // Mude a linha 33 do seu index.ts:
const port = process.env.PORT || 5000;

  server.listen(port, () => {
    console.log(`🚀 SafeHash Backend rodando em http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
