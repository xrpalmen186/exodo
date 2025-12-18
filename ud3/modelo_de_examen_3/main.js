const hotel = new Hotel();
let habitacionSeleccionada = null; // Objeto Habitacion actual

// --- REFERENCIAS DOM ---
const gridHabitaciones = document.getElementById("grid-habitaciones");
const inputFiltro = document.getElementById("filtro-habitacion");

// Paneles
const panelRecepcionMsg = document.getElementById("mensaje-recepcion");
const formCheckin = document.getElementById("formulario-checkin");
const infoHabitacion = document.getElementById("info-habitacion");

// Inputs Formulario
const inputNombre = document.getElementById("input-nombre");
const inputPasaporte = document.getElementById("input-pasaporte");
const inputTarjeta = document.getElementById("input-tarjeta");
const inputNoches = document.getElementById("input-noches");
const msgPasaporte = document.getElementById("msg-pasaporte");
const msgTarjeta = document.getElementById("msg-tarjeta");

// Botones
const btnCheckin = document.getElementById("btn-checkin");
const btnCheckout = document.getElementById("btn-checkout");
const btnLimpieza = document.getElementById("btn-limpieza");

// --- INICIO ---
function init() {
    renderHabitaciones();
}

// --- 1. RENDERIZADO Y DOM ---
function renderHabitaciones() {
    gridHabitaciones.innerHTML = "";
    
    // REGEX 1: Filtro de búsqueda (Buscamos por número o tipo, ej: "101" o "SUI")
    const textoFiltro = inputFiltro.value; 
    const regexFiltro = new RegExp(textoFiltro, 'i');

    hotel.habitaciones.forEach(hab => {
        // Creamos un string identificador para buscar: "101 - STD"
        const codigoCompleto = `${hab.numero} - ${hab.tipo}`;
        
        if (!regexFiltro.test(codigoCompleto)) return; // Si no coincide, saltamos

        const div = document.createElement("div");
        div.className = `habitacion-card ${hab.estado}`;
        // Si es la seleccionada, añadimos borde especial
        if (habitacionSeleccionada === hab) div.classList.add("seleccionada");

        div.innerHTML = `<span>${hab.numero}</span><small>${hab.tipo}</small>`;
        
        div.addEventListener("click", () => {
            habitacionSeleccionada = hab;
            renderHabitaciones(); // Para actualizar el borde de selección
            actualizarPaneles();
        });

        gridHabitaciones.appendChild(div);
    });
}

function actualizarPaneles() {
    // Limpieza de paneles
    formCheckin.style.display = "none";
    panelRecepcionMsg.style.display = "block";
    btnCheckout.style.display = "none";
    btnLimpieza.style.display = "none";
    infoHabitacion.innerHTML = "";

    if (!habitacionSeleccionada) return;

    // Lógica según estado
    if (habitacionSeleccionada.estado === "libre") {
        // MOSTRAR FORMULARIO CHECK-IN
        panelRecepcionMsg.style.display = "none";
        formCheckin.style.display = "block";
        document.getElementById("titulo-form").textContent = `Check-In Habitación ${habitacionSeleccionada.numero}`;
        
        // Información derecha
        infoHabitacion.innerHTML = `<h3>Habitación ${habitacionSeleccionada.numero}</h3><p>Estado: Libre</p><p>Precio: ${habitacionSeleccionada.precioNoche}€/noche</p>`;
    
    } else if (habitacionSeleccionada.estado === "ocupada") {
        // MOSTRAR DETALLES Y CHECK-OUT
        const huesped = habitacionSeleccionada.huesped;
        infoHabitacion.innerHTML = `
            <h3>Habitación ${habitacionSeleccionada.numero}</h3>
            <p><strong>Huésped:</strong> ${huesped.nombre}</p>
            <p><strong>Pasaporte:</strong> ${huesped.pasaporte}</p>
            <p><strong>Noches:</strong> ${habitacionSeleccionada.noches}</p>
            <h2 style="color:blue">Total: ${habitacionSeleccionada.calcularFactura()}€</h2>
        `;
        btnCheckout.style.display = "block";
    
    } else if (habitacionSeleccionada.estado === "limpieza") {
        // MOSTRAR BOTÓN LIMPIEZA
        infoHabitacion.innerHTML = `<h3>Habitación ${habitacionSeleccionada.numero}</h3><p style="color:orange">Limpieza en curso...</p>`;
        btnLimpieza.style.display = "block";
    }
}

// --- 2. VALIDACIONES REGEX AVANZADAS ---

// Validación Pasaporte: 3 Letras Mayúsculas + 6 Números (Ej: ESP123456)
function validarPasaporte(str) {
    // ^ = inicio, [A-Z]{3} = 3 letras mayus, [0-9]{6} = 6 digitos, $ = fin
    const regex = /^[A-Z]{3}[0-9]{6}$/;
    return regex.test(str);
}

// Validación Tarjeta: 4 bloques de 4 números separados por guion (Ej: 1111-2222-3333-4444)
function validarTarjeta(str) {
    // \d es lo mismo que [0-9]
    // \d{4} = 4 dígitos
    // - = guion literal
    const regex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    return regex.test(str);
}

// Eventos de Validación en tiempo real (Input)
inputPasaporte.addEventListener("input", (e) => {
    if (validarPasaporte(e.target.value)) {
        inputPasaporte.className = "input-ok";
        msgPasaporte.style.display = "none";
    } else {
        inputPasaporte.className = "input-error";
        msgPasaporte.style.display = "inline";
    }
});

inputTarjeta.addEventListener("input", (e) => {
    if (validarTarjeta(e.target.value)) {
        inputTarjeta.className = "input-ok";
        msgTarjeta.style.display = "none";
    } else {
        inputTarjeta.className = "input-error";
        msgTarjeta.style.display = "inline";
    }
});

// Evento Buscador Habitaciones
inputFiltro.addEventListener("input", renderHabitaciones);

// --- 3. ACCIONES DE BOTONES ---

btnCheckin.addEventListener("click", () => {
    const nom = inputNombre.value;
    const pas = inputPasaporte.value;
    const tar = inputTarjeta.value;
    const noches = parseInt(inputNoches.value);

    // Validación final antes de guardar
    if (nom && validarPasaporte(pas) && validarTarjeta(tar) && noches > 0) {
        const nuevoHuesped = new Huesped(nom, pas, tar);
        habitacionSeleccionada.ocupar(nuevoHuesped, noches);
        
        // Limpiar form
        inputNombre.value = ""; inputPasaporte.value = ""; inputTarjeta.value = ""; inputNoches.value = "1";
        inputPasaporte.className = ""; inputTarjeta.className = ""; // Quitar colores
        
        alert("Check-In realizado con éxito");
        renderHabitaciones(); // Repintar (se pondrá roja)
        actualizarPaneles();
    } else {
        alert("Revisa los datos del formulario (campos en rojo).");
    }
});

btnCheckout.addEventListener("click", () => {
    const confirmar = confirm(`¿Cobrar ${habitacionSeleccionada.calcularFactura()}€ y liberar habitación?`);
    if (confirmar) {
        habitacionSeleccionada.liberar(); // Pasa a estado Limpieza (Naranja)
        renderHabitaciones();
        actualizarPaneles();
    }
});

btnLimpieza.addEventListener("click", () => {
    habitacionSeleccionada.terminarLimpieza(); // Pasa a estado Libre (Verde)
    renderHabitaciones();
    actualizarPaneles();
});

// Arrancar
init();