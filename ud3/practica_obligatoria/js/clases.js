// Definición de clases para la práctica

class Producto {
    constructor(idProducto, nombreProducto, precioUnidad, idCategoria) {
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.precioUnidad = precioUnidad;
        this.idCategoria = idCategoria;
    }
}

class Catalogo {
    constructor() {
        this.productos = [];
    }

    addProducto(idProducto, nombreProducto, precioUnidad, idCategoria) {
        const p = new Producto(idProducto, nombreProducto, precioUnidad, idCategoria);
        this.productos.push(p);
    }

    getProductosByCategoria(idCategoria) {
        return this.productos.filter((p) => p.idCategoria === idCategoria);
    }

    getProductoById(idProducto) {
        return this.productos.find((p) => p.idProducto === idProducto) || null;
    }
}

class LineaPedido {
    constructor(unidades, idProducto) {
        this.unidades = unidades; // entero
        this.idProducto = idProducto; // entero referenciando producto
    }
}

class Cliente {
    constructor(nombre) {
        this.nombre = nombre;
        this.cuentaAbierta = false; // booleano
    }
}

class Gestor {
    constructor() {
        // Se asume que las variables globales comerciales, clientes y categorias existen
        this.categorias = typeof categorias !== "undefined" ? categorias : [];
        this.comerciales = typeof comerciales !== "undefined" ? comerciales : [];
        // clientes es una matriz de nombres; aquí convertimos a objetos Cliente
        this.clientes = [];
        if (typeof clientes !== "undefined") {
            for (let i = 0; i < clientes.length; i++) {
                this.clientes[i] = [];
                for (let j = 0; j < clientes[i].length; j++) {
                    this.clientes[i].push(new Cliente(clientes[i][j]));
                }
            }
        }
        // comercial y cliente seleccionados por defecto al inicio
        this.comercialActual = 0;
        this.clienteActual = 0;

        // pedidos: 3 dimensiones [comercial][cliente] -> array de LineaPedido
        this.pedidos = [];
        for (let i = 0; i < this.comerciales.length; i++) {
            this.pedidos[i] = [];
            for (let j = 0; j < (this.clientes[i] ? this.clientes[i].length : 0); j++) {
                this.pedidos[i][j] = []; // array vacío de LineaPedido
            }
        }
    }

    setComercialActual(idx) {
        if (idx >= 0 && idx < this.comerciales.length) {
            this.comercialActual = idx;
            // al cambiar comercial, si el clienteActual no existe para ese comercial, ajustarlo a 0
            if (!this.clientes[idx] || this.clientes[idx].length === 0) {
                this.clienteActual = 0;
            } else {
                this.clienteActual = Math.min(this.clienteActual, this.clientes[idx].length - 1);
            }
        }
    }

    setClienteActual(idx) {
        if (this.clientes[this.comercialActual] && idx >= 0 && idx < this.clientes[this.comercialActual].length) {
            this.clienteActual = idx;
        }
    }

    getClienteActual() {
        return this.clientes[this.comercialActual][this.clienteActual];
    }

    getPedidoActual() {
        // garantiza que la estructura existe
        if (!this.pedidos[this.comercialActual]) this.pedidos[this.comercialActual] = [];
        if (!this.pedidos[this.comercialActual][this.clienteActual]) this.pedidos[this.comercialActual][this.clienteActual] = [];
        return this.pedidos[this.comercialActual][this.clienteActual];
    }

    buscarLinea(productId) {
        const pedido = this.getPedidoActual();
        return pedido.find((l) => l.idProducto === productId) || null;
    }

    addLineaPedido(idProducto, unidades) {
        // unidades debe ser entero entre 1 y 9 por la acción del teclado
        unidades = Math.max(1, Math.min(9, Math.floor(unidades)));
        const pedido = this.getPedidoActual();

        // si ya existe línea -> no permitir añadir; sugerir usar modificar unidades
        if (pedido.some((l) => l.idProducto === idProducto)) {
            return { ok: false, reason: "existe" };
        }

        // añadir nueva línea
        const linea = new LineaPedido(unidades, idProducto);
        pedido.push(linea);
        // marcar cuenta abierta
        const cliente = this.getClienteActual();
        if (cliente) cliente.cuentaAbierta = true;
        return { ok: true, linea };
    }

    incrementarUnidades(idProducto, cantidad = 1) {
        const linea = this.buscarLinea(idProducto);
        if (!linea) return false;
        linea.unidades += cantidad;
        // no limitar por arriba (la interfaz solo añade 1..9 inicialmente, pero puede incrementarse)
        return true;
    }

    decrementarUnidades(idProducto, cantidad = 1) {
        const pedido = this.getPedidoActual();
        const idx = pedido.findIndex((l) => l.idProducto === idProducto);
        if (idx === -1) return { ok: false, reason: "noencontrada" };
        pedido[idx].unidades -= cantidad;
        if (pedido[idx].unidades > 0) {
            return { ok: true, eliminado: false };
        } else {
            // unidades <= 0 -> quitar la línea
            pedido.splice(idx, 1);
            // si ya no hay líneas, cerrar cuenta
            if (pedido.length === 0) {
                const cliente = this.getClienteActual();
                if (cliente) cliente.cuentaAbierta = false;
            }
            return { ok: true, eliminado: true };
        }
    }

    totalPedidoActual() {
        const pedido = this.getPedidoActual();
        let total = 0;
        for (const linea of pedido) {
            const prod = catalogo.getProductoById(linea.idProducto);
            if (prod) total += linea.unidades * prod.precioUnidad;
        }
        return total;
    }

    finalizarPedidoActual() {
        // vaciar las líneas del pedido y marcar cliente como pagado (cuentaAbierta = false)
        if (this.pedidos[this.comercialActual] && this.pedidos[this.comercialActual][this.clienteActual]) {
            this.pedidos[this.comercialActual][this.clienteActual] = [];
        }
        const cliente = this.getClienteActual();
        if (cliente) cliente.cuentaAbierta = false;
    }
}