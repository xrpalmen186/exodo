"use strict";

//clase electrodomestico (padre de Televisor y Lavadora)
class Electrodomestico {
    #nombre; //string
    #precio; //num real (float)

    constructor(nombre, precio) {
        this.#nombre = nombre;
        this.#precio = precio;
    }

    //getters y setters
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

    toHTMLRow() {
        return `<tr>
            <td>${this.#nombre}</td>
            <td>${this.#precio} €</td>
        `;
    }

    toString() {
        return this.#nombre;
    }
}

//subclase Televisor
class Televisor extends Electrodomestico {
    #pulgadas; //integer
    #fullHD; //booleano

    constructor(nombre, precio, pulgadas, fullHD) {
        super(nombre, precio);
        this.#pulgadas = pulgadas;
        this.#fullHD = fullHD;
    }

    //getters y setters
    get pulgadas() {
        return this.#pulgadas;
    }

    set pulgadas(pulgadas) {
        this.#pulgadas = pulgadas;
    }

    get fullHD() {
        return this.#fullHD;
    }

    set fullHD(fullHD) {
        this.#fullHD = fullHD;
    }

    toHTMLRow() {
        return (
            super.toHTMLRow() +
            `<td>${this.#pulgadas}"</td>
            <td>${this.#fullHD}</td>
            <td>-</td>
            <td>Televisor</td>
            </tr>`
        );
    }
}

//subclase Lavadora
class Lavadora extends Electrodomestico {
    #carga; //integer

    constructor(nombre, precio, carga) {
        super(nombre, precio);
        this.#carga = carga;
    }

    //getters y setters
    get carga() {
        return this.#carga;
    }

    set carga(carga) {
        this.#carga = carga;
    }

    toHTMLRow() {
        return (
            super.toHTMLRow() +
            `<td>-</td>
            <td>-</td>
            <td>${this.#carga} kg</td>
            <td>Lavadora</td>
            </tr>`
        );
    }
}

//clase stock
class StockProducto {
    #producto; //Objeto: Electrodoméstico
    #stock; //integer

    constructor(producto, stock) {
        this.#producto = producto;
        this.#stock = stock;
    }

    //getters y setters
    get producto() {
        return this.#producto;
    }

    set producto(producto) {
        this.#producto = producto;
    }

    get stock() {
        return this.#stock;
    }

    set stock(stock) {
        this.#stock = stock;
    }

    toHTMLRow() {
        return (
            `<tr>
                <td>${this.#producto.nombre}</td>
                <td>${this.#producto.precio}</td>
                <td>${(this.#producto.pulgadas == undefined) ? '-' : this.#producto.pulgadas}</td>
                <td>${(this.#producto.fullHD == undefined) ? '-' : this.#producto.fullHD}</td>
                <td>${(this.#producto.carga == undefined) ? '-' : this.#producto.carga}</td>
                <td>${this.#stock}</td>
                <td>${this.#stock * this.#producto.precio}</td>
            </tr>`
        );
    }
}

//clase principal Almacen
class Almacen {
    #catalogo; //array de Electrodomesticos
    #stock; //array de StockProducto

    constructor() {
        this.#catalogo = [];
        this.#stock = [];
    }

    //getters
    get catalogo() {
        return this.#catalogo;
    }

    get stock() {
        return this.#stock;
    }


    //métodos de Almacen

    //alta de electrodomesticos en catalogo
    altaCatalogo(oCatalogo) {
        let existe = this.#catalogo.some((e) => e.nombre === oCatalogo.nombre);

        if (existe) {
            return false;
        }

        this.#catalogo.push(oCatalogo);
        return true;
    }

    //función auxiliar para buscar electrodomesticos en base a su nombre (como vamos a usar este codigo más de una vez pues lo modularizo)
    buscarElectrodomestico(nombre) {

        //console.log(this.#catalogo.find((e) => e.nombre === nombre));

        return this.#catalogo.find((e) => e.nombre === nombre);
    }

    //entrada de stock
    entradaStock(nombre, unidades) {
        let elec = this.buscarElectrodomestico(nombre);

        let posicion = this.#catalogo.findIndex((e) => e.nombre === nombre);

        if (!elec || posicion === -1) {
            return "Producto no encontrado.";
        }

        if (isNaN(this.#stock[posicion])) {
            let oStockProducto = new StockProducto(elec, unidades);

            this.#stock[posicion] = oStockProducto;
        } else {
            let oStockProducto = new StockProducto(elec, unidades);

            //no he conseguido hacer que se sume y que no se reemplace con esta forma

            this.#stock[posicion] = oStockProducto;
        }

        console.log(this.#stock)
        return "Stock actualizado correctamente."
    }

    //salida de stock (forma incorrecta y no adaptada para usar Stock Producto)
    salidaStock(nombre, unidades) {
        let elec = this.buscarElectrodomestico(nombre);

        if (!elec || elec === -1) {
            return "Producto no encontrado.";
        }

        if (isNaN(this.#stock[elec])) {
            return "El stock no puede ser negativo."
        } else {
            if (this.#stock[elec] > 0) {
                if ((this.#stock[elec] - unidades) < 0) { //predecimos si la salida de stock llegará a ser negativa
                    return "El stock no puede ser negativo."
                } else {
                    this.#stock[elec] -= unidades;
                }
            } else {
                return "El stock no puede ser negativo."
            }
        }

        console.log(this.#stock)
        return "Stock actualizado correctamente."
    }


    // OTRA FORMA PERO INCORRECTA ya que así no usamos la c lase StockProducto, pero aquí si se suma el stock

    // buscarElectrodomestico(nombre) {

    // return this.#catalogo.findIndex((e) => e.nombre === nombre); //si no lo encuentra el valor será -1 siempre
    // }

    // //entrada de stock
    // entradaStock(nombre, unidades) {
    //     let elec = this.buscarElectrodomestico(nombre);

    //     if (!elec || elec === -1) {
    //         return "Producto no encontrado.";
    //     }

    //     if (isNaN(this.#stock[elec])) {
    //         this.#stock[elec] = unidades;
    //     } else {
    //         this.#stock[elec] += unidades;
    //     }

    //     console.log(this.#stock)
    //     return "Stock actualizado correctamente."
    // }


    //listado de catalogo
    listadoCatalogo() {
        let lista = this.#catalogo.filter((e) => e instanceof Electrodomestico);

        if (lista.length === 0) {
            return "<p>No hay electrodomésticos en el catálogo.</p>";
        }

        let tabla = `<table border='1'>
        <thead>
            <tr><th>Nombre</th><th>Precio</th><th>Pulgadas</th><th>Full HD</th><th>Carga</th><th>Tipo</th></tr>
        </thead>
        <tbody>`;

        for (let e of lista) {
            tabla += e.toHTMLRow();
        }

        tabla += "</tbody></table>";
        return tabla;
    }


    //listado de stock
    listadoStock() {
        let lista = this.#stock.filter((e) => e instanceof StockProducto);

        if (lista.length === 0) {
            return "<p>No hay electrodomésticos en stock.</p>";
        }

        let tabla = `<table border='1'>
        <thead>
            <tr><th>Nombre</th><th>Precio</th><th>Pulgadas</th><th>FullHD</th><th>Carga</th><th>Stock</th><th>Valor</th>
        </thead>
        <tbody>`;

        for (let e of lista) {
            tabla += e.toHTMLRow();
        }

        tabla += "</tbody></table>";
        return tabla;
    }


    //no terminado por falta de tiempo, el StockProducto me ha liado un poco y no he podido corregirlo y terminar la ultima funcion del examen, por lo demás todo bien.
    numTelevisoresStock() {
        return "No terminado."
    }

    numLavadorasStock() {
        return "No terminado."
    }

    importeTotalStock() {
        return "No terminado."
    }
}