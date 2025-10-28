"use strict";

// ================================
// Clase base: Producto
// ================================
class Producto {
    #codigo;
    #nombre;
    #precio;
    #stock;

    constructor(codigo, nombre, precio, stock) {
        this.#codigo = codigo;
        this.#nombre = nombre;
        this.#precio = precio;
        this.#stock = stock;
    }

    // Getters y Setters
    get codigo() {
        return this.#codigo;
    }
    set codigo(valor) {
        this.#codigo = valor;
    }

    get nombre() {
        return this.#nombre;
    }
    set nombre(valor) {
        this.#nombre = valor;
    }

    get precio() {
        return this.#precio;
    }
    set precio(valor) {
        this.#precio = valor;
    }

    get stock() {
        return this.#stock;
    }
    set stock(valor) {
        this.#stock = valor;
    }

    // Devuelve una fila HTML con sus datos
    toHTMLRow() {
        return `<tr>
      <td>${this.codigo}</td>
      <td>${this.nombre}</td>
      <td>${this.precio} €</td>
      <td>${this.stock}</td>`;
    }
}

// ================================
// Subclase: Televisor
// ================================
class Televisor extends Producto {
    #pulgadas;
    #resolucion;

    constructor(codigo, nombre, precio, stock, pulgadas, resolucion) {
        super(codigo, nombre, precio, stock);
        this.#pulgadas = pulgadas;
        this.#resolucion = resolucion;
    }

    get pulgadas() {
        return this.#pulgadas;
    }
    set pulgadas(valor) {
        this.#pulgadas = valor;
    }

    get resolucion() {
        return this.#resolucion;
    }
    set resolucion(valor) {
        this.#resolucion = valor;
    }

    toHTMLRow() {
        return (
            super.toHTMLRow() +
            `<td>${this.pulgadas}"</td>
       <td>${this.resolucion}</td>
       </tr>`
        );
    }
}

// ================================
// Subclase: Portatil
// ================================
class Portatil extends Producto {
    #ram;
    #procesador;

    constructor(codigo, nombre, precio, stock, ram, procesador) {
        super(codigo, nombre, precio, stock);
        this.#ram = ram;
        this.#procesador = procesador;
    }

    get ram() {
        return this.#ram;
    }
    set ram(valor) {
        this.#ram = valor;
    }

    get procesador() {
        return this.#procesador;
    }
    set procesador(valor) {
        this.#procesador = valor;
    }

    toHTMLRow() {
        return (
            super.toHTMLRow() +
            `<td>${this.ram} GB</td>
       <td>${this.procesador}</td>
       </tr>`
        );
    }
}

// ================================
// Clase principal: Tienda
// ================================
class Tienda {
    #productos;

    constructor() {
        this.#productos = [];
    }

    get productos() {
        return this.#productos;
    }

    // Alta de producto
    altaProducto(oProducto) {
        let existe = this.#productos.some((p) => p.codigo === oProducto.codigo);
        if (existe) return false;
        this.#productos.push(oProducto);
        return true;
    }

    // Buscar producto por código
    buscarProducto(codigo) {
        return this.#productos.find((p) => p.codigo === codigo);
    }

    // Actualizar precio
    actualizarPrecio(codigo, nuevoPrecio) {
        let prod = this.buscarProducto(codigo);
        if (!prod) return "❌ Producto no encontrado.";
        prod.precio = nuevoPrecio;
        return "✅ Precio actualizado correctamente.";
    }

    //sobre el instanceof: “Incluye este producto p en la lista solo si es un objeto creado a partir de la clase Televisor (o hereda de ella)”.

    //No seleccionará otros tipos de productos que puedan estar en this.#productos, aunque tengan propiedades similares.

    // Listado televisores 4K o superior
    listarTelevisores4K() {
        let lista = this.#productos.filter(
            (p) =>
                p instanceof Televisor &&
                (p.resolucion === "4K" || p.resolucion === "8K")
        );

        if (lista.length === 0)
            return "<p>No hay televisores 4K/8K registrados.</p>";

        let tabla = `<table border='1'>
      <thead>
        <tr><th>Código</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Pulgadas</th><th>Resolución</th></tr>
      </thead><tbody>`;

        for (let tv of lista) tabla += tv.toHTMLRow();
        tabla += "</tbody></table>";
        return tabla;
    }

    // Listado portátiles por RAM mínima
    listarPortatilesRAM(minRAM) {
        let lista = this.#productos.filter(
            (p) => p instanceof Portatil && p.ram >= minRAM
        );

        if (lista.length === 0)
            return "<p>No hay portátiles con esa RAM o superior.</p>";

        let tabla = `<table border='1'>
      <thead>
        <tr><th>Código</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>RAM</th><th>Procesador</th></tr>
      </thead><tbody>`;

        for (let port of lista) tabla += port.toHTMLRow();
        tabla += "</tbody></table>";
        return tabla;
    }

    // Valor total del stock
    valorTotalStock() {
        let total = 0;
        for (let p of this.#productos) {
            total += p.precio * p.stock;
        }
        return total.toFixed(2);
    }
}
