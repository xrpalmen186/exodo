"use strict";
// Variables globales
let oVivero = new Vivero();

datosIniciales();

function datosIniciales() {
  oVivero.altaArbol(new Perenne(1, 100, "Olivo", true));
  oVivero.altaArbol(new Caduco(2, 78, "Melocotonero", "abril"));
  oVivero.altaArbol(new Perenne(3, 50, "Ciprés", false));
  oVivero.altaArbol(new Perenne(4, 75, "Pino piñonero", true));
  oVivero.altaArbol(new Caduco(5, 81, "Melocotonero", "abril"));
  oVivero.altaArbol(new Caduco(6, 110, "Manzano", "mayo"));
  oVivero.altaArbol(new Perenne(7, 80, "Cedro", false));
  oVivero.altaArbol(new Caduco(8, 67, "Naranjo", "marzo"));
  oVivero.altaArbol(new Perenne(9, 90, "Alcornoque", true));
  oVivero.altaArbol(new Caduco(10, 70, "Peral", "marzo"));
}

// Gestión de formularios
function gestionFormularios(sFormularioVisible) {
  ocultarTodosLosFormularios();

  // Hacemos visible el formulario que llega como parámetro
  switch (sFormularioVisible) {
    case "frmAltaArbol":
      frmAltaArbol.style.display = "block";
      break;
    case "frmTallaje":
      frmTallaje.style.display = "block";
      break;
    case "frmListadoPerennes":
      frmListadoPerennes.style.display = "block";
      break;
    case "frmListadoCaducos":
      frmListadoCaducos.style.display = "block";
      break;
    case "TotalArboles":
      alert("Hay " + oVivero.totalArbolesVenta() + " árboles a la venta");
      break;
  }
}

function mostrarAltaArbol() {
  ocultarTodosLosFormularios();

  // Hacemos visible el formulario
  frmAltaArbol.style.display = "block";
}

function ocultarTodosLosFormularios() {
  let oFormularios = document.querySelectorAll("form");

  for (let i = 0; i < oFormularios.length; i++) {
    oFormularios[i].style.display = "none";
  }
}



//CÓDIGO QUE HAY QUE HACER


// ===============================
// Funciones auxiliares llamadas desde codigo.js
// ===============================

// ---- Alta de árbol ----
function aceptarAltaArbol() {
    let codigo = parseInt(document.getElementById("txtCodigo").value);
    let tallaje = parseInt(document.getElementById("txtTallaje").value);
    let especie = document.getElementById("txtEspecie").value;
    let tipo = document.querySelector("input[name='rbtTipoArbol']:checked").value;
    let frutal = document.querySelector("input[name='rbtFrutal']:checked").value === "S";
    let mesFloracion = document.getElementById("txtMesFloracion").value;

  // Validación
    if (
        !codigo ||
        !tallaje ||
        !especie ||
        (tipo === "perenne" && frutal === "") ||
        (tipo === "caduco" && mesFloracion === "")
    ) {
        alert("Faltan datos por rellenar");
        return;
    }

    let oArbol;
    if (tipo === "perenne")
        oArbol = new Perenne(codigo, tallaje, especie, frutal);
    else
        oArbol = new Caduco(codigo, tallaje, especie, mesFloracion);

    if (oVivero.altaArbol(oArbol))
        alert("Árbol registrado OK");
    else
        alert("Árbol registrado previamente");

    frmAltaArbol.reset();
    frmAltaArbol.style.display = "none";
}

// ---- Tallaje ----
function aceptarTallaje() {
    let codigo = parseInt(document.getElementById("txtCodigoArbol").value);
    let tallaje = parseInt(document.getElementById("txtTallajeArbol").value);

    if (!codigo || !tallaje) {
        alert("Debe introducir código y tallaje");
        return;
    }

    let mensaje = oVivero.tallajeArbol(codigo, tallaje);
    alert(mensaje);

    if (mensaje.startsWith("Correcto")) {
        frmTallaje.reset();
        frmTallaje.style.display = "none";
    }
}

// ---- Listado perennes ----
function aceptarListadoPerennes() {
    let iAlturaMinima = parseInt(document.getElementById("txtAlturaMinima").value);
    if (!iAlturaMinima) {
        alert("Debe introducir una altura mínima");
        return;
    }

    let listado = oVivero.listadoPerennes(iAlturaMinima);

    let oVentana = open("", "_blank", "");
    oVentana.document.open();
    oVentana.document.write("<h1>Listado de árboles perennes</h1>");
    oVentana.document.write(listado);
    oVentana.document.close();
    oVentana.document.title = "Listado perennes";

    frmListadoPerennes.reset();
    frmListadoPerennes.style.display = "none";
}

// ---- Listado caducos ----
function aceptarListadoCaducos() {
    let sMesFloracion = document.getElementById("txtMesListado").value.trim();
    if (!sMesFloracion) {
        alert("Debe introducir el mes de floración");
        return;
    }

    let listado = oVivero.listadoCaducos(sMesFloracion);

    let oVentana = open("", "_blank", "");
    oVentana.document.open();
    oVentana.document.write(
        `<h1>Listado de árboles caducos con floración el mes: ${sMesFloracion}</h1>`
    );
    oVentana.document.write(listado);
    oVentana.document.close();
    oVentana.document.title = "Listado caducos";

    frmListadoCaducos.reset();
    frmListadoCaducos.style.display = "none";
}




// CÓDIGO QUE YA ESTABA

// function aceptarAltaArbol() {
//   // Insertar el nuevo árbol
//   if (oVivero.altaArbol(oArbol)) {
//     alert("Arbol registrado OK");
//     frmAltaArbol.reset(); // Vaciamos los campos del formulario
//     frmAltaArbol.style.display = "none";
//   } else {
//     alert("Arbol registrado previamente");
//   }
// }

// function aceptarTallaje() {
//   let sRespuesta =
//     /*Llamada a tallajeArbol*/

//     alert(sRespuesta);

//   if (sRespuesta.includes("Correcto") > 0) {
//     frmTallaje.reset();
//     frmTallaje.style.display = "none";
//   }
// }

// function aceptarListadoPerennes() {
//   //Crear el listado

//   let oVentana = open("", "_blank", "");

//   oVentana.document.open();
//   oVentana.document.write(
//     "<h1>Listado de árboles perennes de altura mínima: " + iAlturaMinima + " cm</h1>"
//   );
//   oVentana.document.write(/*Listado a mostrar*/);
//   oVentana.document.close();
//   oVentana.document.title = "Listado perennes";

//   // Reseteamos y ocultamos el formulario
//   frmListadoPerennes.reset();
//   frmListadoPerennes.style.display = "none";
// }

// function aceptarListadoCaducos() {
//   //Crear el listado

//   let oVentana = open("", "_blank", "");

//   oVentana.document.open();
//   oVentana.document.write(
//     "<h1>Listado de árboles caducos con floración el mes: " + sMesFloracion + "</h1>"
//   );
//   oVentana.document.write(/*listado a mostrar*/);
//   oVentana.document.close();
//   oVentana.document.title = "Listado caducos";

//   // Reseteamos y ocultamos el formulario
//   frmListadoCaducos.reset();
//   frmListadoCaducos.style.display = "none";
// }
