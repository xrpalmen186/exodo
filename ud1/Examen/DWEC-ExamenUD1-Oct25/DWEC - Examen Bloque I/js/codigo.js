"use strict";

let oAlmacen = new Almacen();
datosIniciales();

function datosIniciales() {
  oAlmacen.altaCatalogo(new Televisor("Samsung QLED", 900, 55, true));
  oAlmacen.altaCatalogo(new Televisor("Xiaomi TV", 400, 60, true));
  oAlmacen.altaCatalogo(new Televisor("LG QLED", 1200, 70, true));
  oAlmacen.altaCatalogo(new Televisor("Panasonic HD", 350, 35, false));
  oAlmacen.altaCatalogo(new Lavadora("Samsung", 120, 10));
  oAlmacen.altaCatalogo(new Lavadora("Turbolimpia", 100, 20));
  oAlmacen.altaCatalogo(new Lavadora("Lavadora 5000", 320, 50));
  oAlmacen.altaCatalogo(new Lavadora("UltraSonic", 250, 70));
}

// Gestión de formularios
function gestionFormularios(sFormularioVisible) {
  ocultarTodosLosFormularios();

  // Hacemos visible el formulario que llega como parámetro
  switch (sFormularioVisible) {
    case "frmAltaCatalogo":
      frmAltaCatalogo.style.display = "block";
      break;
    case "frmEntradaStock":
      frmEntradaStock.style.display = "block";
      break;
    case "frmSalidaStock":
      frmSalidaStock.style.display = "block";
      break;
  }
}

function ocultarTodosLosFormularios() {
  let oFormularios = document.querySelectorAll("form");

  for (let i = 0; i < oFormularios.length; i++) {
    oFormularios[i].style.display = "none";
  }
}

//Sé que no se pide validación de datos, pero como me sobraba tiempo y lo veía claro no veía mal ponerlo y así asegurarme de que todo va bien.

function aceptarAltaCatalogo() {

  let nombre = document.getElementById("txtNombre").value.trim();
  let precio = parseFloat(document.getElementById("txtPrecio").value.trim());
  let tipo = document.querySelector("input[name='rbtElectrodomestico']:checked").value;

  let oElectrodomestico;

  if (!nombre || isNaN(precio)) {
    alert("Faltan datos obligatorios.");
    return;
  }

  if (tipo === "TV") { //si es televisor...
    let pulgadas = parseInt(document.getElementById("txtPulgadas").value.trim());
    let fullHD = document.querySelector("input[name='rbtFullHD']:checked").value;

    if (fullHD === "S") {
      fullHD = true;
    } else {
      fullHD = false;
    }

    if (isNaN(pulgadas)) {
      alert("Faltan datos del televisor.");
      return;
    }

    oElectrodomestico = new Televisor(nombre, precio, pulgadas, fullHD);

  } else { //si es lavadora ...
    let carga = parseInt(document.getElementById("txtCarga").value.trim());

    if (isNaN(carga)) {
      alert("Faltan datos de la lavadora.")
      return;
    }

    oElectrodomestico = new Lavadora(nombre, precio, carga);
  }

  if (oAlmacen.altaCatalogo(oElectrodomestico)) {
    alert("Electrodoméstico dado de alta con éxito.");

    //reiniciamos el formulario y lo ocultamos
    document.getElementById("frmAltaCatalogo").reset();
    ocultarTodosLosFormularios();
  } else {
    alert("Este electrodoméstico ya existe.")
  }
}

function aceptarEntradaStock() {
  let nombre = document.querySelector("form[name='frmEntradaStock']").querySelector("input[name='txtNombre']").value.trim();
  //podría usar getElementByID pero como el html no se puede cambiar pues lo he intentado hacer como se pide.

  let unidades = parseInt(document.querySelector("form[name='frmEntradaStock']").querySelector("input[name='txtUnidades']").value.trim());

  if (!nombre || isNaN(unidades)) {
    alert("Faltan datos por rellenar.");
    return;
  }

  let msg = oAlmacen.entradaStock(nombre, unidades);
  alert(msg);

  //reiniciamos y ocultamos formularios
  document.getElementById("frmEntradaStock").reset();
  ocultarTodosLosFormularios();
}

function aceptarSalidaStock() {
  let nombre = document.querySelector("form[name='frmSalidaStock']").querySelector("input[name='txtNombre']").value.trim();
  //podría usar getElementByID pero como el html no se puede cambiar pues lo he intentado hacer como se pide.

  let unidades = parseInt(document.querySelector("form[name='frmSalidaStock']").querySelector("input[name='txtUnidades']").value.trim());

  if (!nombre || isNaN(unidades)) {
    alert("Faltan datos por rellenar.");
    return;
  }
  
  let msg = oAlmacen.salidaStock(nombre, unidades);
  alert(msg);

  //reiniciamos y ocultamos formularios
  document.getElementById("frmEntradaStock").reset();
  ocultarTodosLosFormularios();
}

function mostrarListadoCatalogo() {
  let listado = oAlmacen.listadoCatalogo();

  let oVentana = open("", "_blank", "");
  oVentana.document.open();
  oVentana.document.write("<h1>Listado de catálogo</h1>");
  oVentana.document.write(listado);
  oVentana.document.close();
  oVentana.document.title = "Listado de catálogo";

  ocultarTodosLosFormularios();
}

function mostrarListadoStock() {
  let listado = oAlmacen.listadoStock();

  let oVentana = open("", "_blank", "");
  oVentana.document.open();
  oVentana.document.write("<h1>Listado de catálogo</h1>");
  oVentana.document.write(listado);
  oVentana.document.close();
  oVentana.document.title = "Listado de catálogo";

  ocultarTodosLosFormularios();
}

function mostrarTotales() {
  if (typeof oAlmacen !== "undefined" && oAlmacen) {

    alert("Total TVs en stock: " + oAlmacen.numTelevisoresStock())

    alert("Total Lavadoras en stock: " + oAlmacen.numLavadorasStock())

    alert("Valor total del stock: " + oAlmacen.importeTotalStock() + " €");
  } else {
      alert("El sistema aún no está inicializado.");
  }
}