import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import authRoutes from '../routes/auth.ts';
import evidenceRoutes from '../routes/evidence.ts';

vi.mock('../lib/db.ts', () => ({
  default: {
    execute: vi.fn().mockResolvedValue([[{ id: 1, full_name: 'Test User' }]]),
    query: vi.fn().mockResolvedValue([[]])
  }
}));

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/evidence', evidenceRoutes);

describe('Segurança da API SafeHash', () => {
  it('Deve barrar acesso à listagem sem Token', async () => {
    const res = await request(app).get('/api/evidence/list');
    expect([401, 403]).toContain(res.status);
  });

  it('Deve rejeitar Token inválido no registro', async () => {
    const res = await request(app)
      .post('/api/evidence/register-hash')
      .set('Authorization', 'Bearer token-falso')
      .send({ userId: 1, fileName: 'teste.png', fileHash: 'abc' });
    expect(res.status).toBe(403);
  });
});
