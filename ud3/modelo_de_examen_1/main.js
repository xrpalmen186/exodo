// Instanciamos el Gestor
const gestor = new Gestor();

// --- Referencias al DOM ---
const selectCursos = document.getElementById("select-cursos");
const selectDepto = document.getElementById("select-dept");
const selectAsignatura = document.getElementById("select-asignatura");
const inputBuscador = document.getElementById("buscador");
const contenedorFichas = document.getElementById("contenedor-fichas");
const panelBoletin = document.getElementById("panel-boletin");
const teclado = document.getElementById("teclado");

// --- Inicialización ---
function init() {
    cargarSelects();
    renderAlumnos(); // Pinta alumnos iniciales
    actualizarAsignaturas(); // Carga asignaturas del depto 0
}

function cargarSelects() {
    // 1. Cargar Cursos
    cursos.forEach((nombre, index) => {
        const op = document.createElement("option");
        op.value = index;
        op.textContent = nombre;
        selectCursos.appendChild(op);
    });

    // 2. Cargar Departamentos
    departamentos.forEach((nombre, index) => {
        const op = document.createElement("option");
        op.value = index;
        op.textContent = nombre;
        selectDepto.appendChild(op);
    });
}

// --- Lógica del DOM y Regex ---

/**
 * Pinta los alumnos. Recibe un filtro de texto opcional.
 * AQUÍ ESTÁ EL PUNTO CLAVE DE TU EXAMEN DE REGEX.
 */
function renderAlumnos(filtroTexto = "") {
    contenedorFichas.innerHTML = ""; // Limpiar panel
    
    // Obtenemos los alumnos del curso actual
    const listaAlumnos = gestor.alumnos[gestor.cursoActual];

    // 1. CREAMOS LA EXPRESIÓN REGULAR
    // 'i' = case insensitive (ignora mayúsculas/minúsculas)
    // Si filtroTexto es "", la regex encaja con todo.
    const regex = new RegExp(filtroTexto, 'i'); 

    listaAlumnos.forEach((alumno, index) => {
        // 2. TESTEAMOS LA REGEX
        // Si el nombre no cumple el patrón, saltamos esta iteración (no lo pintamos)
        if (!regex.test(alumno.nombre)) {
            return;
        }

        // Crear la ficha (DOM)
        const div = document.createElement("div");
        div.className = "ficha-alumno";
        
        // Asignar color (Verde/Rojo)
        if (alumno.tieneSuspensos()) {
            div.classList.add("suspenso");
        } else {
            div.classList.add("aprobado");
        }

        // Marcar visualmente si es el seleccionado
        if (gestor.alumnoActual === alumno) {
            div.classList.add("seleccionado");
        }

        div.textContent = alumno.nombre;
        div.dataset.index = index; // Guardamos su índice original para recuperarlo al clickar

        // Evento Click en la ficha
        div.addEventListener("click", () => {
            gestor.alumnoActual = alumno;
            renderAlumnos(inputBuscador.value); // Re-render para actualizar borde seleccionado manteniendo filtro
            renderBoletin();
        });

        contenedorFichas.appendChild(div);
    });
}

function actualizarAsignaturas() {
    selectAsignatura.innerHTML = "";
    const idDepto = parseInt(selectDepto.value);
    
    // Filtrar asignaturas del catálogo que coincidan con el depto seleccionado
    const asignaturasFiltradas = gestor.asignaturas.filter(a => a.idDepto === idDepto);

    asignaturasFiltradas.forEach(asig => {
        const op = document.createElement("option");
        op.value = asig.id;
        op.textContent = asig.nombre;
        selectAsignatura.appendChild(op);
    });
}

function renderBoletin() {
    panelBoletin.innerHTML = "<h2>Boletín de Notas</h2>";

    if (!gestor.alumnoActual) {
        panelBoletin.innerHTML += "<p>Selecciona un alumno para ver sus notas.</p>";
        return;
    }

    const alumno = gestor.alumnoActual;
    panelBoletin.innerHTML += `<h3>${alumno.nombre}</h3>`;

    if (alumno.notas.length === 0) {
        panelBoletin.innerHTML += "<p>Sin notas registradas.</p>";
    } else {
        // Crear Tabla (DOM)
        const tabla = document.createElement("table");
        let htmlTabla = `<thead><tr><th>Asignatura</th><th>Nota</th></tr></thead><tbody>`;
        
        alumno.notas.forEach(nota => {
            const nombreAsig = gestor.getNombreAsignatura(nota.idAsignatura);
            // Pintar nota en rojo si es suspenso, normal si no (opcional de estilo)
            const estiloNota = nota.valor < 5 ? 'style="color:red; font-weight:bold"' : '';
            htmlTabla += `<tr>
                            <td>${nombreAsig}</td>
                            <td ${estiloNota}>${nota.valor}</td>
                          </tr>`;
        });

        htmlTabla += `</tbody>`;
        tabla.innerHTML = htmlTabla;
        panelBoletin.appendChild(tabla);

        // Mostrar Media
        const mediaDiv = document.createElement("h3");
        mediaDiv.textContent = `Nota Media: ${alumno.getMedia()}`;
        panelBoletin.appendChild(mediaDiv);
    }
}

// --- Event Listeners Globales ---

// 1. Cambio de Curso
selectCursos.addEventListener("change", (e) => {
    gestor.cursoActual = parseInt(e.target.value);
    gestor.alumnoActual = null; // Reseteamos selección
    inputBuscador.value = ""; // Reseteamos buscador
    renderAlumnos();
    renderBoletin();
});

// 2. Cambio de Departamento -> Actualiza Asignaturas
selectDepto.addEventListener("change", actualizarAsignaturas);

// 3. BUSCADOR CON REGEX (Evento 'input' para tiempo real)
inputBuscador.addEventListener("input", (e) => {
    const textoUsuario = e.target.value;
    renderAlumnos(textoUsuario); // Pasamos el texto para crear la Regex dentro
});

// 4. Teclado (Delegación de eventos)
teclado.addEventListener("click", (e) => {
    // Verificamos si pulsó un botón con clase 'tecla'
    if (e.target.classList.contains("tecla")) {
        if (!gestor.alumnoActual) {
            alert("Primero selecciona un alumno");
            return;
        }
        
        const nota = parseInt(e.target.textContent);
        const idAsignatura = parseInt(selectAsignatura.value);

        // Añadir nota al modelo
        gestor.alumnoActual.addNota(idAsignatura, nota);

        // Actualizar interfaz
        renderAlumnos(inputBuscador.value); // Actualiza colores (verde/rojo)
        renderBoletin(); // Actualiza la tabla
    }
});

// Arrancamos
init();