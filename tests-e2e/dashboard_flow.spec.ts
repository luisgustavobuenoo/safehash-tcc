import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('Fluxo Principal - Login Real e Custódia', () => {

  test('Deve logar com sucesso e registrar evidência', async ({ page }) => {
   
    await page.goto('/login');

    
    await page.fill('input[placeholder="seu@email.com"]', 'peritodeteste@gmail.com');
    await page.fill('input[placeholder="000.000.000-00"]', '245.369.600-90'); // CPF do seu usuário
    await page.fill('input[placeholder="••••••••"]', 'Perito@26');
    
   
    await page.click('button:has-text("Entrar")');

    
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('h1')).toContainText(/Olá/i);

    
    await page.fill('input[placeholder="Ex: Nome do Cliente"]', 'Caso Real TCC');
    
   
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('text=CLIQUE PARA CARREGAR EVIDÊNCIA');
    const fileChooser = await fileChooserPromise;
    
    const filePath = path.join(__dirname, 'test-evidence.txt');
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, 'conteudo de prova para hash');
    }
    await fileChooser.setFiles(filePath);

  
    await page.click('button:has-text("Registrar Custódia")');
    
   
    await expect(page.locator('text=Custódia registrada com sucesso')).toBeVisible();
  });
});
