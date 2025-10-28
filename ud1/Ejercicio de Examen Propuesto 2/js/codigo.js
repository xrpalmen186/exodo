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
    console.log("Alta de producto");

    let codigo = parseInt(document.getElementById("txtCodigo").value.trim());
    let nombre = document.getElementById("txtNombre").value.trim();
    let precio = parseFloat(document.getElementById("txtPrecio").value.trim());
    let stock = parseInt(document.getElementById("txtStock").value.trim());
    let tipo = document.querySelector("input[name='rbtTipo']:checked").value;

    let oProducto;

    // Validación general
    if (isNaN(codigo) || !nombre || isNaN(precio) || isNaN(stock)) {
        alert("Faltan datos obligatorios.");
        return;
    }

    if (tipo === "televisor") {
        let pulgadas = parseInt(document.getElementById("txtPulgadas").value.trim());
        let resolucion = document.getElementById("txtResolucion").value.trim();

        if (isNaN(pulgadas) || resolucion === "") {
            alert("Faltan datos del televisor.");
            return;
        }
        oProducto = new Televisor(codigo, nombre, precio, stock, pulgadas, resolucion);

    } else {
        let ram = parseInt(document.getElementById("txtRAM").value.trim());
        let procesador = document.getElementById("txtProcesador").value.trim();

        if (isNaN(ram) || procesador === "") {
            alert("Faltan datos del portátil.");
            return;
        }

        oProducto = new Portatil(codigo, nombre, precio, stock, ram, procesador);
    }

    if (oTienda.altaProducto(oProducto)) {
        alert("Producto dado de alta con éxito.");

        document.getElementById("frmAlta").reset();
        ocultarTodosLosFormularios();
    } else {
        alert("Este producto ya existe");
    }
}

// ================================
// Función: Actualizar precio
// ================================
function aceptarActualizarPrecio() {
    console.log("Actualizar precio");

    let codigo = parseInt(document.getElementById("txtCodigoPrecio").value.trim());

    let nuevoPrecio = parseFloat(document.getElementById("txtNuevoPrecio").value.trim());

    if (isNaN(codigo) || isNaN(nuevoPrecio)) {
        alert("Faltan datos por rellenar.");
        return;
    }

    let mensaje = oTienda.actualizarPrecio(codigo, nuevoPrecio);
    alert(mensaje);
    document.getElementById("frmPrecio").reset();
    ocultarTodosLosFormularios();
}

// ================================
// Función: Listado televisores 4K
// ================================
function aceptarListadoTelevisores() {
    console.log("Listado televisores 4K");
    let listado = oTienda.listarTelevisores4K();

    let oVentana = open("", "_blank", "");
    oVentana.document.open();
    oVentana.document.write("<h1>Listado de televisores 4K / 8K</h1>");
    oVentana.document.write(listado);
    oVentana.document.close();
    oVentana.document.title = "Televisores 4K";

    document.getElementById("frmListadoTV").reset();
    ocultarTodosLosFormularios();
}

// ================================
// Función: Listado portátiles por RAM
// ================================
function aceptarListadoPortatiles() {
    console.log("Listado portátiles por RAM");

    let minRAM = parseInt(document.getElementById("txtMinRAM").value.trim());

    let listado = oTienda.listarPortatilesRAM(minRAM);

    let oVentana = open("", "_blank", "");
    oVentana.document.open();
    oVentana.document.write("<h1>Listado de portátiles con al menos " + minRAM + " GB RAM</h1>");
    oVentana.document.write(listado);
    oVentana.document.close();
    oVentana.document.title = "Listado Portátiles";

    document.getElementById("frmListadoPortatiles").reset();
    ocultarTodosLosFormularios();

    return
}
