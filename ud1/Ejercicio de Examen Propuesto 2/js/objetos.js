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

    //getters y setters
    get codigo() {
        return this.#codigo;
    }

    set codigo(codigo) {
        this.#codigo = codigo;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(nombre) {
        this.#nombre = nombre;
    }

    get precio() {
        return this.#precio;
    }

    set precio(precio) {
        this.#precio = precio;
    }

    get stock() {
        return this.#stock;
    }

    set stock(stock) {
        this.#stock = stock;
    }

    //mostrar como fila HTML
    toHTMLRow() {
        return `<tr>
            <td>${this.#codigo}</td>
            <td>${this.#nombre}</td>
            <td>${this.#precio} €</td>
            <td>${this.#stock}</td>
        `;
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

    //getters y setters
    get pulgadas() {
        return this.#pulgadas;
    }

    set pulgadas(pulgadas) {
        this.#pulgadas = pulgadas;
    }

    get resolucion() {
        return this.#resolucion;
    }

    set resolucion(resolucion) {
        this.#resolucion = resolucion;
    }

    toHTMLRow() {
        return (
            super.toHTMLRow() +
            `<td>${this.#pulgadas}"</td>
            <td>${this.#resolucion}</td>
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

    //getters y setters
    get ram() {
        return this.#ram;
    }

    set ram(ram) {
        this.#ram = ram;
    }

    get procesador() {
        return this.#procesador;
    }

    set procesador(procesador) {
        this.#procesador = procesador;
    }

    toHTMLRow() {
        return (
            super.toHTMLRow() +
            `<td>${this.#ram}"</td>
            <td>${this.#procesador}</td>
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

    //alta de producto
    altaProducto(oProducto) {
        let existe = this.#productos.some((p) => p.codigo === oProducto.codigo);
        
        if (existe) return false;

        this.#productos.push(oProducto);
        return true;
    }

    //buscar producto por codigo
    buscarProducto(codigo) {
        return this.#productos.find((p) => p.codigo === codigo);
    }

    //actualizar precio de producto
    actualizarPrecio(codigo, nuevoPrecio) {
        let prod = this.buscarProducto(codigo);
        if (!prod) return "Producto no encontrado.";
        prod.precio = nuevoPrecio;
        return "Precio actualizado correctamente.";
    }

    //listar televisiones 4k o superior
    listarTelevisores4K() {
        let lista = this.#productos.filter((p) => p instanceof Televisor && (p.resolucion === "4K" || p.resolucion === "8K"));

        if (lista.length === 0) return "<p>No hay televisores 4K/8K registrados.</p>";

        let tabla = `<table border='1'>
        <thead>
            <tr><th>Codigo</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Pulgadas</th><th>Resolucion</th></tr>
        </thead><tbody>`;

        for (let tv of lista) {
            tabla += tv.toHTMLRow();
        }

        tabla += "</tbody></table>";
        return tabla;
    }

    listarPortatilesRAM(minRAM) {
        let lista = this.#productos.filter((p) => p instanceof Portatil && p.ram >= minRAM);

        if (lista.length === 0) return "<p>No hay portatiles con esa RAM o superior.</p>";

        let tabla = `<table border='1'>
        <thead>
            <tr><th>Codigo</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>RAM</th><th>Procesador</th></tr>
        </thead><tbody>`;

        for (let port of lista) {
            tabla += port.toHTMLRow();
        }

        tabla += "</tbody></table>";
        return tabla;
    }

    //valor total stock
    valorTotalStock() {
        let total = 0;
        for (let p of this.#productos) {
            total += p.precio * p.stock;
        }
        return total.toFixed(2);
    }
}
