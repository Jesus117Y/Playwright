import {test,expect, errors} from "@playwright/test"

test("TC-Compras-02 - Carrito de compras",async({page})=>{
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

    await page.getByTestId("nav-home").click();

    // Paso 6: Buscar un producto
    await page.getByTestId("search-query").fill("Hammer");

    // Paso 7: Clic en el botón de buscar
    await page.getByTestId("search-submit").click();
    
    //validar que el producto buscado se encuentre en la lista de resultados
    const producto = page.locator("[data-test='search_completed'] a.card");
    //await expect(producto).toHaveCount(1);

    await expect(producto.first()).not.toHaveText("");

    const contarproductos = await producto.count();

    console.log("Total de productos " + contarproductos )

    if( contarproductos > 0 ){
        //await page.getByTestId("product-01M3QPBHTWHBQ77KQ919B1WV94").click();

        const ramdomIndex = Math.floor(Math.random()* contarproductos);

        await producto.nth(ramdomIndex).click();

        //Agregar al carrito 
        await page.getByTestId("add-to-cart").click();
        // Validar Alert
        const AlertMs = page.getByRole("alert", { name: "Producto añadido al carrito."});
        await expect(AlertMs).toBeVisible();
        console.log("Se mostro mensaje: " + AlertMs)

    }else {
        console.log("Los productos son 0 " + contarproductos)
        throw new Error ("No hay tarjetas")
    }
    //Seleccionar nuevo producto
    await page.getByTestId("nav-home").click();

    // Paso 1.1: Buscar un producto
    await page.getByTestId("search-query").fill("Ruler");

    // Paso 7: Clic en el botón de buscar
    await page.getByTestId("search-submit").click();
    
    //validar que el producto buscado se encuentre en la lista de resultados
    const producto1 = page.locator("[data-test='search_completed'] a.card");
    //await expect(producto1).toHaveCount(1);

    await expect(producto1.first()).not.toHaveText("");

    const contarproductos1 = await producto1.count();

    console.log("Total de productos " + contarproductos1 )

    if( contarproductos1 > 0 ){
       const ramdomIndex = Math.floor(Math.random()* contarproductos1);

       await producto1.nth(ramdomIndex).click();

        //Agregar al carrito 
        await page.getByTestId("add-to-cart").click();
        // Validar Alert
        const AlertMs2 = page.getByRole("alert", { name: "Producto añadido al carrito."});
        await expect(AlertMs2).toBeVisible();
        console.log("Se mostro mensaje: " + AlertMs2)

    }else {
        console.log("Los productos son 0 " + contarproductos)
        throw new Error ("No hay tarjetas")
    }

    await page.getByTestId("nav-home").click();
    await page.getByTestId("nav-cart").click();
    //Validar que el carrito tenga 2 productos 
    
    const filasCarrito = page.locator('app-cart tbody tr');

    await expect(filasCarrito).toHaveCount(2);
    return 0;
    await page.getByTestId("proceed-1").click();




    
});