"use strict";

let oTienda = new Tienda();
datosIniciales();

// ================================
// Datos de prueba iniciales
// ================================
function datosIniciales() {
    oTienda.altaProducto(new Televisor(1, "Samsung QLED", 900, 5, 55, "4K"));
    oTienda.altaProducto(new Televisor(2, "LG NanoCell", 700, 3, 50, "Full HD"));
    oTienda.altaProducto(new Portatil(3, "HP Envy", 1100, 4, 16, "Intel i7"));
    oTienda.altaProducto(new Portatil(4, "Lenovo ThinkPad", 950, 2, 8, "AMD Ryzen 5"));
    oTienda.altaProducto(new Televisor(5, "Sony Bravia", 1200, 1, 65, "8K"));
}

// ================================
// Función: Alta de producto
// ================================
function aceptarAltaProducto() {
    return
}

// ================================
// Función: Actualizar precio
// ================================
function aceptarActualizarPrecio() {
    return
}

// ================================
// Función: Listado televisores 4K
// ================================
function aceptarListadoTelevisores() {
    return
}

// ================================
// Función: Listado portátiles por RAM
// ================================
function aceptarListadoPortatiles() {
    return
}
