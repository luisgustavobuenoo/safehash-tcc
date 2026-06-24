import { test, expect } from '@playwright/test';

test.describe('Validações Robustas de Cadastro - SafeHash', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('Deve validar o comportamento do formulário de cadastro (Caminho Triste)', async ({ page }) => {
    // 1. Testar Email inválido
    const emailInput = page.locator('input[placeholder="email@exemplo.com"]');
    await emailInput.fill('usuario_sem_arroba');
    await expect(page.locator('text=E-mail incompleto')).toBeVisible();

    // 2. Testar CPF inválido
    const cpfInput = page.locator('input[placeholder="000.000.000-00"]');
    await cpfInput.fill('111.111.111-11'); 
    await expect(page.locator('text=CPF Inválido')).toBeVisible();

    // 3. Verificar se o botão de cadastro está desabilitado
    // encontrar o botão de submit mesmo sem texto direto
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();
  });

  test('Deve validar os requisitos de senha em tempo real', async ({ page }) => {
    // Pegamos o primeiro campo de senha (o de cadastro)
    const passwordInput = page.locator('input[placeholder="••••••••"]').first();
    
    // Teste 1: Senha curta
    await passwordInput.fill('abc');
    await expect(page.locator('text=8+ caracteres')).toHaveClass(/text-slate-400/);
    
    // Teste 2: Senha forte
    await passwordInput.fill('Senha@123');
    await expect(page.locator('text=8+ caracteres')).toHaveClass(/text-emerald-600/);
  });
});
