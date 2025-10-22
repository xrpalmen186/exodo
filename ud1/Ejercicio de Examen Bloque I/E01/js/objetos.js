//FORMA MODERNA
"use strict";

// ====================================
// Clase base: Arbol
// ====================================
class Arbol {
    constructor(codigo, tallaje, especie) {
        this._codigo = codigo;
        this._tallaje = tallaje;
        this._especie = especie;
    }

    get codigo() { return this._codigo; }
    get tallaje() { return this._tallaje; }
    get especie() { return this._especie; }

    set tallaje(valor) { this._tallaje = valor; }
    set especie(valor) { this._especie = valor; }

    toHTMLRow() {
        return `
        <tr>
            <td>${this._codigo}</td>
            <td>${this._tallaje}</td>
            <td>${this._especie}</td>
        </tr>
        `;
    }
}

// ====================================
// Clase hija: Perenne
// ====================================
class Perenne extends Arbol {
    constructor(codigo, tallaje, especie, frutal) {
        super(codigo, tallaje, especie);
        this._frutal = frutal;
    }

    get frutal() { return this._frutal; }
    set frutal(valor) { this._frutal = valor; }

    toHTMLRow() {
        return `
        <tr>
            <td>${this._codigo}</td>
            <td>${this._tallaje}</td>
            <td>${this._especie}</td>
            <td>${this._frutal ? "Sí" : "No"}</td>
        </tr>
        `;
    }
}

// ====================================
// Clase hija: Caduco
// ====================================
class Caduco extends Arbol {
    constructor(codigo, tallaje, especie, mesFloracion) {
        super(codigo, tallaje, especie);
        this._mesFloracion = mesFloracion;
    }

    get mesFloracion() { return this._mesFloracion; }
    set mesFloracion(valor) { this._mesFloracion = valor; }

    toHTMLRow() {
        return `
        <tr>
            <td>${this._codigo}</td>
            <td>${this._tallaje}</td>
            <td>${this._especie}</td>
            <td>${this._mesFloracion}</td>
        </tr>
        `;
    }
}

// ====================================
// Clase principal: Vivero
// ====================================
class Vivero {
    constructor() {
        this._arboles = [];
    }

    // Alta de árbol
    altaArbol(oArbol) {
        if (this._arboles.find((a) => a.codigo === oArbol.codigo)) {
        return false;
        }
        this._arboles.push(oArbol);
        return true;
    }

    // Tallaje de árbol
    tallajeArbol(codigo, nuevoTallaje) {
        const arbol = this._arboles.find((a) => a.codigo === codigo);
        if (!arbol) return "Árbol no registrado";

        if (nuevoTallaje < arbol.tallaje)
        return "Tallaje inferior al registrado";

        arbol.tallaje = nuevoTallaje;

        if (arbol instanceof Perenne)
        return "Correcto, tallaje actualizado Perenne";
        else
        return "Correcto, tallaje actualizado Caduco";
    }

    // Listado de árboles perennes con altura mínima
    listadoPerennes(alturaMinima) {
        const perennes = this._arboles
        .filter((a) => a instanceof Perenne && a.tallaje >= alturaMinima)
        .sort((a, b) => b.tallaje - a.tallaje);

        if (perennes.length === 0)
        return "<p>No hay árboles perennes con esa altura mínima.</p>";

        let tabla = `
        <table border='1' cellspacing='0' cellpadding='5'>
            <tr><th>Código</th><th>Tallaje</th><th>Especie</th><th>Frutal</th></tr>
            ${perennes.map((p) => p.toHTMLRow()).join("")}
        </table>
        `;
        return tabla;
    }

  // Listado de árboles caducos por mes de floración
    listadoCaducos(mesFloracion) {
        const caducos = this._arboles.filter(
        (a) =>
            a instanceof Caduco &&
            a.mesFloracion.toLowerCase() === mesFloracion.toLowerCase()
        );

        if (caducos.length === 0)
        return "<p>No hay árboles caducos con ese mes de floración.</p>";

        let tabla = `
        <table border='1' cellspacing='0' cellpadding='5'>
            <tr><th>Código</th><th>Tallaje</th><th>Especie</th><th>Floración</th></tr>
            ${caducos.map((c) => c.toHTMLRow()).join("")}
        </table>
        `;
        return tabla;
    }

  // Total árboles en venta
    totalArbolesVenta() {
        let total = 0;
        for (const a of this._arboles) {
        if (a instanceof Caduco && a.tallaje > 100) total++;
        else if (a instanceof Perenne && a.frutal && a.tallaje > 80) total++;
        else if (a instanceof Perenne && !a.frutal && a.tallaje > 120) total++;
        }
        return total;
    }
}

//FORMA CLÁSICA

// "use strict";

// // ====================================
// // Clase Arbol (función clásica)
// // ====================================
// function Arbol(codigo, tallaje, especie) {
//   this._codigo = codigo;
//   this._tallaje = tallaje;
//   this._especie = especie;
// }

// Arbol.prototype.getCodigo = function() {
//   return this._codigo;
// };
// Arbol.prototype.getTallaje = function() {
//   return this._tallaje;
// };
// Arbol.prototype.getEspecie = function() {
//   return this._especie;
// };
// Arbol.prototype.setTallaje = function(valor) {
//   this._tallaje = valor;
// };

// Arbol.prototype.toHTMLRow = function() {
//   return `
//     <tr>
//       <td>${this._codigo}</td>
//       <td>${this._tallaje}</td>
//       <td>${this._especie}</td>
//     </tr>
//   `;
// };

// // ====================================
// // Clase Perenne (función clásica)
// // ====================================
// function Perenne(codigo, tallaje, especie, frutal) {
//   Arbol.call(this, codigo, tallaje, especie);
//   this._frutal = frutal;
// }
// Perenne.prototype = Object.create(Arbol.prototype);
// Perenne.prototype.constructor = Perenne;

// Perenne.prototype.toHTMLRow = function() {
//   return `
//     <tr>
//       <td>${this._codigo}</td>
//       <td>${this._tallaje}</td>
//       <td>${this._especie}</td>
//       <td>${this._frutal ? "Sí" : "No"}</td>
//     </tr>
//   `;
// };

// // ====================================
// // Clase Caduco (función clásica)
// // ====================================
// function Caduco(codigo, tallaje, especie, mesFloracion) {
//   Arbol.call(this, codigo, tallaje, especie);
//   this._mesFloracion = mesFloracion;
// }
// Caduco.prototype = Object.create(Arbol.prototype);
// Caduco.prototype.constructor = Caduco;

// Caduco.prototype.toHTMLRow = function() {
//   return `
//     <tr>
//       <td>${this._codigo}</td>
//       <td>${this._tallaje}</td>
//       <td>${this._especie}</td>
//       <td>${this._mesFloracion}</td>
//     </tr>
//   `;
// };

// // ====================================
// // Clase Vivero (ES6 MODERNA)
// // ====================================
// class Vivero {
//   constructor() {
//     this._arboles = [];
//   }

//   altaArbol(oArbol) {
//     if (this._arboles.find((a) => a._codigo == oArbol._codigo)) return false;
//     this._arboles.push(oArbol);
//     return true;
//   }

//   tallajeArbol(codigo, nuevoTallaje) {
//     let arbol = this._arboles.find((a) => a._codigo == codigo);
//     if (!arbol) return "Árbol no registrado";

//     if (nuevoTallaje < arbol._tallaje)
//       return "Tallaje inferior al registrado";

//     arbol._tallaje = nuevoTallaje;

//     if (arbol instanceof Perenne)
//       return "Correcto, tallaje actualizado Perenne";
//     else
//       return "Correcto, tallaje actualizado Caduco";
//   }

//   listadoPerennes(alturaMinima) {
//     let perennes = this._arboles
//       .filter((a) => a instanceof Perenne && a._tallaje >= alturaMinima)
//       .sort((a, b) => b._tallaje - a._tallaje);

//     if (perennes.length === 0)
//       return "<p>No hay árboles perennes con esa altura mínima.</p>";

//     let tabla = `
//       <table border='1' cellspacing='0' cellpadding='5'>
//         <tr><th>Código</th><th>Tallaje</th><th>Especie</th><th>Frutal</th></tr>
//         ${perennes.map(p => p.toHTMLRow()).join("")}
//       </table>
//     `;
//     return tabla;
//   }

//   listadoCaducos(mesFloracion) {
//     let caducos = this._arboles
//       .filter((a) => a instanceof Caduco && a._mesFloracion.toLowerCase() === mesFloracion.toLowerCase());

//     if (caducos.length === 0)
//       return "<p>No hay árboles caducos con ese mes de floración.</p>";

//     let tabla = `
//       <table border='1' cellspacing='0' cellpadding='5'>
//         <tr><th>Código</th><th>Tallaje</th><th>Especie</th><th>Floración</th></tr>
//         ${caducos.map(c => c.toHTMLRow()).join("")}
//       </table>
//     `;
//     return tabla;
//   }

//   totalArbolesVenta() {
//     let total = 0;
//     for (let a of this._arboles) {
//       if (a instanceof Caduco && a._tallaje > 100) total++;
//       else if (a instanceof Perenne && a._frutal && a._tallaje > 80) total++;
//       else if (a instanceof Perenne && !a._frutal && a._tallaje > 120) total++;
//     }
//     return total;
//   }
// }

// // ====================================
// // Funciones auxiliares (para index.html)
// // ====================================

// function aceptarAltaArbol() {
//   let codigo = parseInt(document.getElementById("txtCodigo").value);
//   let tallaje = parseInt(document.getElementById("txtTallaje").value);
//   let especie = document.getElementById("txtEspecie").value;
//   let tipo = document.querySelector("input[name='rbtTipoArbol']:checked").value;
//   let frutal = document.querySelector("input[name='rbtFrutal']:checked").value === "S";
//   let mesFloracion = document.getElementById("txtMesFloracion").value;

//   if (!codigo || !tallaje || !especie) {
//     alert("Faltan datos por rellenar");
//     return;
//   }

//   let oArbol;
//   if (tipo === "perenne")
//     oArbol = new Perenne(codigo, tallaje, especie, frutal);
//   else {
//     if (!mesFloracion) {
//       alert("Debe indicar el mes de floración");
//       return;
//     }
//     oArbol = new Caduco(codigo, tallaje, especie, mesFloracion);
//   }

//   if (oVivero.altaArbol(oArbol))
//     alert("Árbol registrado OK");
//   else
//     alert("Árbol registrado previamente");

//   frmAltaArbol.reset();
//   frmAltaArbol.style.display = "none";
// }

// function aceptarTallaje() {
//   let codigo = parseInt(document.getElementById("txtCodigoArbol").value);
//   let tallaje = parseInt(document.getElementById("txtTallajeArbol").value);
//   if (!codigo || !tallaje) {
//     alert("Debe introducir código y tallaje");
//     return;
//   }

//   let mensaje = oVivero.tallajeArbol(codigo, tallaje);
//   alert(mensaje);

//   if (mensaje.startsWith("Correcto")) {
//     frmTallaje.reset();
//     frmTallaje.style.display = "none";
//   }
// }

// function aceptarListadoPerennes() {
//   let iAlturaMinima = parseInt(document.getElementById("txtAlturaMinima").value);
//   if (!iAlturaMinima) {
//     alert("Debe introducir una altura mínima");
//     return;
//   }

//   let listado = oVivero.listadoPerennes(iAlturaMinima);

//   let oVentana = open("", "_blank", "");
//   oVentana.document.open();
//   oVentana.document.write("<h1>Listado de árboles perennes</h1>");
//   oVentana.document.write(listado);
//   oVentana.document.close();
//   oVentana.document.title = "Listado perennes";

//   frmListadoPerennes.reset();
//   frmListadoPerennes.style.display = "none";
// }

// function aceptarListadoCaducos() {
//   let sMesFloracion = document.getElementById("txtMesListado").value.trim();
//   if (!sMesFloracion) {
//     alert("Debe introducir el mes de floración");
//     return;
//   }

//   let listado = oVivero.listadoCaducos(sMesFloracion);

//   let oVentana = open("", "_blank", "");
//   oVentana.document.open();
//   oVentana.document.write(
//     `<h1>Listado de árboles caducos con floración el mes: ${sMesFloracion}</h1>`
//   );
//   oVentana.document.write(listado);
//   oVentana.document.close();
//   oVentana.document.title = "Listado caducos";

//   frmListadoCaducos.reset();
//   frmListadoCaducos.style.display = "none";
// }
