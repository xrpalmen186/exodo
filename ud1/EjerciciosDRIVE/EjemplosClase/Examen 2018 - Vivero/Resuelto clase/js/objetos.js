class Arbol {
  _codigo;
  _tallaje;
  _especie;
  constructor(codigo, tallaje, especie) {
    this._codigo = codigo;
    this._especie = especie;
    this._tallaje = tallaje;
  }
  get especie() {
    return this._especie;
  }
  set especie(value) {
    this._especie = value;
  }
  get tallaje() {
    return this._tallaje;
  }
  set tallaje(value) {
    this._tallaje = value;
  }
  get codigo() {
    return this._codigo;
  }
  set codigo(value) {
    this._codigo = value;
  }

  toHTMLRow() {
    let fila = "<tr>";
    /*fila +=
      "<tr><td>" +
      this.codigo +
      "</td><td>" +
      this.tallaje +
      "</td><td>" +
      this.especie +
      "</td></tr>";*/

    for (let atributo of Object.values(this)) {
      fila += "<td>" + atributo + "</td>";
    }
    return fila + "</tr>";
  }
}

class Perenne extends Arbol {
  _frutal;
  constructor(codigo, tallaje, especie, frutal) {
    super(codigo, tallaje, especie);
    this._frutal = frutal;
  }
  get frutal() {
    return this._frutal;
  }
  set frutal(value) {
    this._frutal = value;
  }
}

class Caduco extends Arbol {
  _mesFloracion;
  constructor(codigo, tallaje, especie, mesFloracion) {
    super(codigo, tallaje, especie);
    this._mesFloracion = mesFloracion;
  }
  get mesFloracion() {
    return this._mesFloracion;
  }
  set mesFloracion(value) {
    this._mesFloracion = value;
  }
}

class Vivero {
  _arboles;
  constructor() {
    this._arboles = [];
  }
  get arboles() {
    return this._arboles;
  }
  set arboles(value) {
    this._arboles = value;
  }

  altaArbol(oArbol) {
    let seRealizaLaInclusion = true;
    if (
      this.arboles.filter((elem) => elem.codigo == oArbol.codigo).length >= 1
    ) {
      seRealizaLaInclusion = false;
    } else {
      this.arboles.push(oArbol);
    }
    return seRealizaLaInclusion;
  }

  tallajeArbol(codigo, tallaje) {
    let indice = this.arboles.findIndex((elem) => elem.codigo == codigo);
    let salida = "";

    if (indice < 0) {
      salida += "Árbol no registrado";
    } else if (this.arboles[indice].tallaje > tallaje) {
      salida += "Tallaje inferior al registrado";
    } else {
      this.arboles[indice].tallaje = tallaje;
      salida += "Correcto, tallaje actualizado ";
      salida += this.arboles[indice] instanceof Caduco ? "Caduco" : "Perenne";
    }
    return salida;
  }

  listadoPerennes(minAltura) {
    let salida =
      "<table><thead><th>Código</th><th>Tallaje</th><th>Especie</th><th>Frutal</th></thead><tbody>";
    let arbolesListado = this.arboles.filter(
      (elem) => elem instanceof Perenne && elem.tallaje >= minAltura
    );
    arbolesListado.sort((a1, a2) => a2.tallaje - a1.tallaje);
    for (let arbol of arbolesListado) {
      salida += arbol.toHTMLRow();
    }
    salida += "</tbody></table>";
    return salida;
  }
  totalArbolesVenta() {
    let contador = 0;

    let resultado = this.arboles.filter(
      (arbol) =>
        (arbol instanceof Caduco && arbol.tallaje > 100) ||
        (arbol instanceof Perenne && arbol.frutal && arbol.tallaje > 80) ||
        (arbol instanceof Perenne && !arbol.frutal && arbol.tallaje > 120)
    ).length;

    alert("Hay " + resultado + " árboles en venta");

    /*for (let arbol of this.arboles) {
      if (arbol instanceof Caduco && arbol.tallaje > 100) {
        contador++;
      } else if (
        arbol instanceof Perenne &&
        arbol.frutal &&
        arbol.tallaje > 80
      ) {
        contador++;
      } else if (
        arbol instanceof Perenne &&
        !arbol.frutal &&
        arbol.tallaje > 120
      ) {
        contador++;
      }
    }

    alert("Hay " + contador + " árboles en venta");*/
  }
}
