"use strict";

/*
 * objetos.js
 * Clases ES6 solicitadas en el examen:
 * Cliente, Alojamiento (Habitacion, Apartamento), Reserva, Agencia (gestiona todo).
 */

/* --------------------------
   Clase Cliente
   - dniCliente
   - nombre
   - apellidos
   - usuario (generado)
   -------------------------- */
class Cliente {
    constructor(dniCliente, nombre, apellidos) {
        this.dniCliente = dniCliente;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.usuario = Cliente.generarUsuario(nombre, apellidos, dniCliente);
    }

    static generarUsuario(nombre, apellidos, dni) {
        // Inicial del nombre, 3 primeras letras de primer y segundo apellido, últimos 3 dígitos dni
        const inicial = (nombre || "").trim().charAt(0).toLowerCase() || "";
        const partes = (apellidos || "").trim().split(/\s+/);
        const ape1 = (partes[0] || "").toLowerCase().slice(0, 3).padEnd(3, "_");
        const ape2 = (partes[1] || "").toLowerCase().slice(0, 3).padEnd(3, "_");
        const ult3 = (dni || "").replace(/\D/g, "").slice(-3).padStart(3, "0");
        return `${inicial}${ape1}${ape2}${ult3}`;
    }
}

/* --------------------------
   Clase Alojamiento (base)
   - idAlojamiento
   - capacidad (nº personas)
   -------------------------- */
class Alojamiento {
    constructor(idAlojamiento, capacidad) {
        this.idAlojamiento = idAlojamiento;
        this.capacidad = capacidad;
    }
}

/* Habitacion de hotel: desayuno incluido? */
class Habitacion extends Alojamiento {
    constructor(idAlojamiento, capacidad, desayunoIncluido = false) {
        super(idAlojamiento, capacidad);
        this.desayunoIncluido = desayunoIncluido;
    }
}

/* Apartamento: aparcamiento (bool), nº dormitorios */
class Apartamento extends Alojamiento {
    constructor(idAlojamiento, capacidad, aparcamiento = false, dormitorios = 1) {
        super(idAlojamiento, capacidad);
        this.aparcamiento = aparcamiento;
        this.dormitorios = dormitorios;
    }
}

/* --------------------------
   Clase Reserva
   - idReserva (generado en Agencia)
   - idCliente (dni)
   - fechaInicio (Date)
   - fechaFin (Date)
   - listaAlojamientos (array de ids)
   -------------------------- */
class Reserva {
    constructor(
        idReserva,
        idCliente,
        fechaInicio,
        fechaFin,
        listaAlojamientos = []
    ) {
        this.idReserva = idReserva;
        this.idCliente = idCliente;
        this.fechaInicio = fechaInicio; // Date
        this.fechaFin = fechaFin; // Date
        this.listaAlojamientos = listaAlojamientos; // array de idAlojamiento
    }

    // Comprueba si esta reserva solapa con un intervalo dado
    solapaCon(fechaInicio, fechaFin) {
        // intervalo [a,b] solapa con [c,d] si a <= d && c <= b
        return this.fechaInicio <= fechaFin && fechaInicio <= this.fechaFin;
    }
}

/* --------------------------
   Clase Agencia (gestiona todo)
   - clientes []
   - alojamientos []
   - reservas []
   -------------------------- */
class Agencia {
    constructor() {
        this.clientes = []; // array de Cliente
        this.alojamientos = []; // array de Alojamiento/Habitacion/Apartamento
        this.reservas = []; // array de Reserva
        this._nextReservaId = 1;
    }

    /* CLIENTES */
    altaCliente(cliente) {
        // comprobar dni único
        if (this.clientes.some((c) => c.dniCliente === cliente.dniCliente))
            return false;
        this.clientes.push(cliente);
        return true;
    }

    listarClientes() {
        return this.clientes.slice(); // copia
    }

    /* ALOJAMIENTOS */
    altaAlojamiento(aloj) {
        // id único
        if (this.alojamientos.some((a) => a.idAlojamiento === aloj.idAlojamiento))
            return false;
        this.alojamientos.push(aloj);
        return true;
    }

    listarAlojamientos() {
        return this.alojamientos.slice();
    }

    buscarAlojamiento(id) {
        return this.alojamientos.find((a) => a.idAlojamiento === id) || null;
    }

    /* RESERVAS */
    siguienteIdReserva() {
        return this._nextReservaId++;
    }

    // Comprueba si un alojamiento está libre en el intervalo (no hay reservas que lo ocupen)
    alojamientoLibreEn(idAlojamiento, fechaInicio, fechaFin) {
        for (const r of this.reservas) {
            if (
                r.listaAlojamientos.includes(idAlojamiento) &&
                r.solapaCon(fechaInicio, fechaFin)
            ) {
                return false;
            }
        }
        return true;
    }

    // Crear reserva: recibe dni, fechas (Date) y array de ids de alojamientos
    crearReserva(idCliente, fechaInicio, fechaFin, listaAlojamientos) {
        // comprobar cliente existe
        if (!this.clientes.some((c) => c.dniCliente === idCliente)) {
            return { ok: false, msg: "Cliente no registrado." };
        }

        // comprobar fechas (inicio <= fin y >= hoy)
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        if (!(fechaInicio instanceof Date) || !(fechaFin instanceof Date)) {
            return { ok: false, msg: "Fechas inválidas." };
        }
        if (fechaInicio < hoy || fechaFin < hoy)
            return { ok: false, msg: "Fechas anteriores al día en curso." };
        if (fechaInicio > fechaFin)
            return { ok: false, msg: "Fecha inicio posterior a fecha fin." };

        // Validar cada alojamiento solicitado
        for (const idA of listaAlojamientos) {
            const aloj = this.buscarAlojamiento(idA);
            if (!aloj) return { ok: false, msg: `Alojamiento ${idA} no existe.` };

            if (!this.alojamientoLibreEn(idA, fechaInicio, fechaFin)) {
                return {
                    ok: false,
                    msg: `Alojamiento ${idA} ya reservado en esas fechas.`,
                };
            }
        }

        // Si todo OK, crear la reserva
        const idR = this.siguienteIdReserva();
        const r = new Reserva(
            idR,
            idCliente,
            fechaInicio,
            fechaFin,
            listaAlojamientos.slice()
        );
        this.reservas.push(r);
        return { ok: true, msg: `Reserva creada OK (id ${idR}).`, reserva: r };
    }

    // Listados de reservas de un cliente
    reservasPorCliente(dniCliente) {
        return this.reservas.filter((r) => r.idCliente === dniCliente);
    }

    // Listado reservas entre fechas (si la reserva tiene algún solapamiento con el intervalo)
    reservasEntreFechas(fechaInicio, fechaFin) {
        return this.reservas.filter((r) => r.solapaCon(fechaInicio, fechaFin));
    }

    // Listado de habitaciones con desayuno incluido, ordenado:
    // desc por capacidad; si empate, asc por idAlojamiento
    habitacionesConDesayunoOrdenadas() {
        const lista = this.alojamientos
            .filter((a) => a instanceof Habitacion && a.desayunoIncluido)
            .sort((a, b) => {
                if (b.capacidad !== a.capacidad) return b.capacidad - a.capacidad; // desc capacidad
                return a.idAlojamiento.localeCompare(b.idAlojamiento); // asc id
            });
        return lista;
    }
}

// Export global (para usar desde principal.js)
window.Agencia = Agencia;
window.Cliente = Cliente;
window.Habitacion = Habitacion;
window.Apartamento = Apartamento;
window.Reserva = Reserva;
