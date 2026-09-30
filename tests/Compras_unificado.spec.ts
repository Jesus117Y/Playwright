import { test, expect } from '@playwright/test';

async function agregarProductoPorBusqueda(page, termino) {
  await page.getByTestId('nav-home').click();
  await page.getByTestId('search-query').fill(termino);
  await page.getByTestId('search-submit').click();

  const productos = page.locator("[data-test='search_completed'] a.card");

  // Espera a que aparezca al menos un resultado
  await expect(productos.first()).toBeVisible();

  const cantidad = await productos.count();
  console.log(`Resultados para "${termino}": ${cantidad}`);

  // Selecciona un resultado al azar
  const indice = Math.floor(Math.random() * cantidad);
  await productos.nth(indice).click();

  await page.getByTestId('add-to-cart').click();

  const alerta = page.getByRole('alert');
  await expect(alerta).toContainText('Producto añadido al carrito.');

  console.log(`Se añadió al carrito un producto de la búsqueda "${termino}".`);
}

test('TC-Compras-02 - Carrito de compras', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');

  await expect(page).toHaveTitle(
    'Practice Software Testing - Toolshop - v5.0'
  );

  await page.getByTestId('nav-sign-in').click();
  await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByTestId('login-submit').click();

  await expect(page.getByTestId('page-title')).toContainText('Mi cuenta');

  await agregarProductoPorBusqueda(page, 'Hammer');
  await agregarProductoPorBusqueda(page, 'Ruler');
});