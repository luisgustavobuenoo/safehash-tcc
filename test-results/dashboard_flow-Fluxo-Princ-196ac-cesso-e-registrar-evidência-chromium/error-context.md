# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard_flow.spec.ts >> Fluxo Principal - Login Real e Custódia >> Deve logar com sucesso e registrar evidência
- Location: tests-e2e\dashboard_flow.spec.ts:11:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login
Call log:
  - navigating to "http://localhost:3000/login", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import path from 'path';
  3  | import fs from 'fs';
  4  | import { fileURLToPath } from 'url';
  5  | 
  6  | const __filename = fileURLToPath(import.meta.url);
  7  | const __dirname = path.dirname(__filename);
  8  | 
  9  | test.describe('Fluxo Principal - Login Real e Custódia', () => {
  10 | 
  11 |   test('Deve logar com sucesso e registrar evidência', async ({ page }) => {
  12 |    
> 13 |     await page.goto('/login');
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login
  14 | 
  15 |     
  16 |     await page.fill('input[placeholder="seu@email.com"]', 'peritodeteste@gmail.com');
  17 |     await page.fill('input[placeholder="000.000.000-00"]', '245.369.600-90'); // CPF do seu usuário
  18 |     await page.fill('input[placeholder="••••••••"]', 'Perito@26');
  19 |     
  20 |    
  21 |     await page.click('button:has-text("Entrar")');
  22 | 
  23 |     
  24 |     await expect(page).toHaveURL(/.*dashboard/);
  25 |     await expect(page.locator('h1')).toContainText(/Olá/i);
  26 | 
  27 |     
  28 |     await page.fill('input[placeholder="Ex: Nome do Cliente"]', 'Caso Real TCC');
  29 |     
  30 |    
  31 |     const fileChooserPromise = page.waitForEvent('filechooser');
  32 |     await page.click('text=CLIQUE PARA CARREGAR EVIDÊNCIA');
  33 |     const fileChooser = await fileChooserPromise;
  34 |     
  35 |     const filePath = path.join(__dirname, 'test-evidence.txt');
  36 |     if (!fs.existsSync(filePath)) {
  37 |       fs.writeFileSync(filePath, 'conteudo de prova para hash');
  38 |     }
  39 |     await fileChooser.setFiles(filePath);
  40 | 
  41 |   
  42 |     await page.click('button:has-text("Registrar Custódia")');
  43 |     
  44 |    
  45 |     await expect(page.locator('text=Custódia registrada com sucesso')).toBeVisible();
  46 |   });
  47 | });
  48 | 
```