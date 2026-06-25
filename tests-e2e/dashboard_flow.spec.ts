import { test, expect } from '@playwright/test';

test.describe('Fluxo Principal - Login Real e Custódia', () => {

  test('Deve logar com sucesso e registrar evidência', async ({ page }) => {
    // 1. Acessa a página de login
    await page.goto('/login');

    // 2. Preenche os dados de acesso
    await page.fill('input[placeholder="seu@email.com"]', 'peritodeteste@gmail.com');
    await page.fill('input[placeholder="000.000.000-00"]', '245.369.600-90');
    await page.fill('input[placeholder="••••••••"]', 'Perito@26');
    
    // 3. Clica para entrar
    await page.click('button:has-text("Entrar")');

    // 4. Verifica se chegou no dashboard
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('h1')).toContainText(/Olá/i);

    // 5. Preenche o nome do cliente
    await page.fill('input[placeholder="Ex: Nome do Cliente"]', 'Caso Real TCC');
    
    // 6. Faz o upload do arquivo usando o seletor de arquivos do Playwright
    // Esta forma evita o uso de Buffer ou Path
    await page.setInputFiles('input[type="file"]', {
      name: 'evidencia-tcc.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Integridade garantida pelo SafeHash')
    });

    // 7. Finaliza a custódia
    await page.click('button:has-text("Registrar Custódia")');
    
    // 8. Verifica o sucesso
    await expect(page.locator('text=Custódia registrada com sucesso')).toBeVisible();
  });
});
