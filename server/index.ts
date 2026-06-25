import 'dotenv/config'; 
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import authRoutes from "./src/routes/auth.ts";
import evidenceRoutes from './src/routes/evidence.ts';

const __filename = fileURLToPath(import.meta.url );
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
    'http://localhost:3000',
    'http://localhost:5000'
  ];

  app.use(cors({
    origin: (origin, callback) => {
      
      if (!origin) {
        return callback(null, true);
      }
      
     
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS não permitido para esta origem'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 3600
  }));

  app.use(express.json());
  app.use("/api/auth", authRoutes);
  app.use('/api/evidence', evidenceRoutes);

  const staticPath = process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));
  app.get("*", (req, res) => {
    if (req.path.startsWith('/api')) return res.status(404).json({ error: "Rota não encontrada" });
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 5000;
  server.listen(port, () => console.log(`🚀 SafeHash Backend rodando na porta ${port}`));
}
startServer().catch(console.error);