import {test,expect} from "@playwright/test"

test("TC-INI-01 - Ordenar alfabéticamente",async({page})=>{
    // Paso 1: Abrir la URL
    await page.goto("https://practicesoftwaretesting.com/");
    // VAlidar que el título corresponda a la página que he abierto
    await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
    
    // Paso 2: Clic en "Iniciar Sesión"
    await page.getByTestId("nav-sign-in").click();
    // Paso 3: Llenar Usuario y Password
    await page.getByTestId("email").fill("customer@practicesoftwaretesting.com");
    await page.getByTestId("password").fill("welcome01");
    // Paso 4: Clic botón Iniciar Sesión-
    await page.getByTestId("login-submit").click();
    
    // Paso 5: Validar que he llegado a la pantalla de Home
    // page-title=My account
    await expect(page.getByTestId("page-title")).toContainText("Mi cuenta");


    //clic en Inicio
    await page.getByTestId("nav-home").click();
    
    //obtener la lista al dar clic en Inicio
    const itemsAntes = page.getByTestId("product-name");
    await expect(itemsAntes.first()).not.toHaveText('');
    const primerTextoInicial = await itemsAntes.first().innerText();
    console.log(primerTextoInicial);

    //clic en ordenar ascendente
    await page.getByTestId("sort").selectOption({label:'Nombre (A - Z)'});

    // validar

    const items = page.getByTestId("product-name");

    await expect(items.first()).not.toHaveText(primerTextoInicial);

    const nombreProductos = await items.allTextContents();
    console.log(nombreProductos);
    
    // Validar que se hayan ordenado

    // 1. Obtienes los textos de la página (limpios de espacios)
    const actualTitles = (await items.allTextContents()).map(text => text.trim());

    // 2. Creas una copia del arreglo y la ordenas alfabéticamente
    const expectedTitles = [...actualTitles].sort((a, b) => a.localeCompare(b));

    // 3. Validas que el arreglo original sea idéntico al arreglo ordenado
    expect(actualTitles).toEqual(expectedTitles);

    
});