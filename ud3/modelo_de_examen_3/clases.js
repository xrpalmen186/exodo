class Huesped {
    constructor(nombre, pasaporte, tarjeta) {
        this.nombre = nombre;
        this.pasaporte = pasaporte;
        this.tarjeta = tarjeta;
    }
}

class Habitacion {
    constructor(numero, tipo) {
        this.numero = numero; // Ej: 101
        this.tipo = tipo;     // "STD" (Standard) o "SUI" (Suite)
        // Precio dinámico según tipo
        this.precioNoche = (tipo === "SUI") ? 150 : 60; 
        
        this.estado = "libre"; // Estados: "libre", "ocupada", "limpieza"
        this.huesped = null;   // Objeto Huesped
        this.noches = 0;
    }

    ocupar(huesped, noches) {
        this.estado = "ocupada";
        this.huesped = huesped;
        this.noches = noches;
    }

    liberar() {
        this.estado = "limpieza"; // Al salir, pasa a limpieza, no a libre directamente
        this.huesped = null;
        this.noches = 0;
    }

    terminarLimpieza() {
        this.estado = "libre";
    }

    calcularFactura() {
        return this.noches * this.precioNoche;
    }
}

class Hotel {
    constructor() {
        this.habitaciones = [];
        this.generarHabitaciones();
    }

    generarHabitaciones() {
        // Generamos 9 habitaciones: 6 Standard y 3 Suites
        for (let i = 1; i <= 9; i++) {
            const numero = 100 + i;
            const tipo = (i > 6) ? "SUI" : "STD"; // Las últimas 3 son Suites
            this.habitaciones.push(new Habitacion(numero, tipo));
        }
    }
}