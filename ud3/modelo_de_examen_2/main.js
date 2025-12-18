const gimnasio = new Gimnasio();
let socioSeleccionado = null;

// --- REFERENCIAS DOM ---
const contenedorSocios = document.getElementById("contenedor-socios");
const inputBuscador = document.getElementById("buscador");
const panelFicha = document.getElementById("datos-socio");

// Referencias Formulario Registro
const inputNombre = document.getElementById("reg-nombre");
const inputDNI = document.getElementById("reg-dni");
const inputEmail = document.getElementById("reg-email");
const btnAlta = document.getElementById("btn-alta");
const errorDNI = document.getElementById("error-dni");
const errorEmail = document.getElementById("error-email");

// --- INICIO ---
function init() {
    renderSocios();
}

// --- 1. RENDERIZADO (DOM + Regex Buscador) ---
function renderSocios() {
    contenedorSocios.innerHTML = "";
    const filtro = inputBuscador.value;
    
    // Regex simple para el buscador (contiene texto, case insensitive)
    const regexBusqueda = new RegExp(filtro, 'i');

    gimnasio.socios.forEach((socio, index) => {
        // Aplicamos filtro
        if (!regexBusqueda.test(socio.nombre)) return;

        const div = document.createElement("div");
        div.className = `socio-card ${socio.cuotaPagada ? 'pagado' : 'pendiente'}`;
        div.textContent = socio.nombre;
        
        div.addEventListener("click", () => {
            socioSeleccionado = socio;
            mostrarFicha();
        });

        contenedorSocios.appendChild(div);
    });
}

// --- 2. FUNCIONES DE VALIDACIÓN (REGEX PURA) ---

/**
 * Valida formato DNI: 8 números seguidos de una letra (mayus o minus).
 * Explicación Regex:
 * ^      : Inicio de linea
 * [0-9]{8}: Exactamente 8 dígitos del 0 al 9
 * [A-Za-z]: Una letra (mayúscula o minúscula)
 * $      : Fin de linea
 */
function validarFormatoDNI(dni) {
    const patronDNI = /^[0-9]{8}[A-Za-z]$/;
    return patronDNI.test(dni);
}

/**
 * Valida formato Email estándar.
 * Explicación Regex:
 * ^[\w-\.]+   : Empieza con letras, numeros, guiones o puntos.
 * @           : Debe tener una arroba.
 * ([\w-]+\.)+ : El dominio (ej: gmail.), puede haber subdominios.
 * [\w-]{2,4}$ : La extensión (ej: com, es, net), de 2 a 4 caracteres.
 */
function validarFormatoEmail(email) {
    // Nota: \w equivale a [A-Za-z0-9_]
    const patronEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return patronEmail.test(email);
}

// --- 3. EVENTOS DEL FORMULARIO (VALIDACIÓN TIEMPO REAL) ---

// Validación DNI al perder el foco (blur)
inputDNI.addEventListener("blur", () => {
    const valor = inputDNI.value;
    if (validarFormatoDNI(valor)) {
        inputDNI.classList.remove("input-error");
        inputDNI.classList.add("input-ok");
        errorDNI.style.display = "none";
    } else {
        inputDNI.classList.remove("input-ok");
        inputDNI.classList.add("input-error");
        errorDNI.style.display = "block";
    }
});

// Validación Email al perder el foco (blur)
inputEmail.addEventListener("blur", () => {
    const valor = inputEmail.value;
    if (validarFormatoEmail(valor)) {
        inputEmail.classList.remove("input-error");
        inputEmail.classList.add("input-ok");
        errorEmail.style.display = "none";
    } else {
        inputEmail.classList.remove("input-ok");
        inputEmail.classList.add("input-error");
        errorEmail.style.display = "block";
    }
});

// Botón de ALTA
btnAlta.addEventListener("click", () => {
    const nombre = inputNombre.value;
    const dni = inputDNI.value;
    const email = inputEmail.value;

    // Doble comprobación antes de guardar
    if (nombre && validarFormatoDNI(dni) && validarFormatoEmail(email)) {
        gimnasio.agregarSocio(nombre, dni, email);
        renderSocios(); // Actualizar lista
        
        // Limpiar formulario
        inputNombre.value = "";
        inputDNI.value = "";
        inputEmail.value = "";
        inputDNI.classList.remove("input-ok");
        inputEmail.classList.remove("input-ok");
        alert("Socio registrado correctamente");
    } else {
        alert("Por favor, revisa los campos en rojo.");
    }
});

// Buscador
inputBuscador.addEventListener("input", renderSocios);

// --- 4. PANEL FICHA ---
function mostrarFicha() {
    if (!socioSeleccionado) return;

    panelFicha.innerHTML = `
        <h3>${socioSeleccionado.nombre}</h3>
        <p><strong>DNI:</strong> ${socioSeleccionado.dni.toUpperCase()}</p>
        <p><strong>Email:</strong> ${socioSeleccionado.email}</p>
        <p><strong>Estado:</strong> ${socioSeleccionado.cuotaPagada ? "AL CORRIENTE" : "PENDIENTE DE PAGO"}</p>
    `;

    // Si no ha pagado, mostramos botón
    if (!socioSeleccionado.cuotaPagada) {
        const btnPagar = document.createElement("button");
        btnPagar.className = "boton";
        btnPagar.textContent = "Cobrar Cuota";
        btnPagar.style.backgroundColor = "#2ecc71"; // Verde
        btnPagar.addEventListener("click", () => {
            socioSeleccionado.pagarCuota();
            mostrarFicha(); // Refrescar ficha
            renderSocios(); // Refrescar lista (para que se ponga verde)
        });
        panelFicha.appendChild(btnPagar);
    }
}

// Iniciar
init();