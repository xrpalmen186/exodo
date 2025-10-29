"use strict";

/*
 principal.js
 Lógica de interacción, validaciones y llamadas a los métodos de Agencia.
*/

const agencia = new Agencia(); // instancia global
window.agencia = agencia; // para depuración si hace falta

/* -------------------------
   Helpers de UI (mensajes)
   ------------------------- */
function showMessage(text, type = "info", timeout = 3500) {
  const el = document.getElementById("message");
  el.className = `alert alert-${ type === "error" ? "danger" : (type === "warn" ? "warning" : "info") }`;
  el.textContent = text;
  el.style.display = "block";
  if (timeout > 0) setTimeout(() => hideMessage(), timeout);
}
function hideMessage() {
  const el = document.getElementById("message");
  el.style.display = "none";
}

/* -------------------------
   UI helpers
   ------------------------- */
function showForm(id) {
  document.querySelectorAll("#forms > *").forEach(f => f.classList.add("d-none"));
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove("d-none");
    window.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
  }
  hideMessage();
}
function hideAll() {
  document.querySelectorAll("#forms > *").forEach(f => f.classList.add("d-none"));
  hideMessage();
}

/* -------------------------
   toggle alojamiento campos
   ------------------------- */
function toggleAlojamientoCampos() {
  const tipo = document.getElementById("aljTipo").value;
  document.getElementById("camHab").classList.toggle("d-none", tipo !== "habitacion");
  document.getElementById("camApt").classList.toggle("d-none", tipo !== "apartamento");
}

/* -------------------------
   Alta cliente
   ------------------------- */
function altaCliente() {
  const dni = document.getElementById("cliDNI").value.trim();
  const nombre = document.getElementById("cliNombre").value.trim();
  const apellidos = document.getElementById("cliApellidos").value.trim();
  if (!dni || !nombre || !apellidos) { showMessage("Rellena todos los campos.", "warn"); return; }

  const cliente = new Cliente(dni, nombre, apellidos);
  const ok = agencia.altaCliente(cliente);
  if (ok) {
    showMessage(`Cliente registrado. Usuario: ${cliente.usuario}`, "info");
    document.getElementById("frmCliente").reset();
    hideAll();
  } else {
    showMessage("Ya existe un cliente con ese DNI.", "warn");
  }
}

/* -------------------------
   Alta alojamiento
   ------------------------- */
function altaAlojamiento() {
  const id = document.getElementById("aljID").value.trim();
  const cap = parseInt(document.getElementById("aljCapacidad").value);
  const tipo = document.getElementById("aljTipo").value;

  if (!id || isNaN(cap) || cap <= 0) { showMessage("ID y capacidad válidos obligatorios.", "warn"); return; }

  let aloj;
  if (tipo === "habitacion") {
    const desayuno = document.getElementById("habDesayuno").checked;
    aloj = new Habitacion(id, cap, desayuno);
  } else {
    const aparc = document.getElementById("aptAparcamiento").value === "true";
    const dorm = parseInt(document.getElementById("aptDorm").value);
    aloj = new Apartamento(id, cap, aparc, isNaN(dorm) ? 1 : dorm);
  }

  const ok = agencia.altaAlojamiento(aloj);
  if (ok) {
    showMessage("Alojamiento registrado correctamente.", "info");
    document.getElementById("frmAlojamiento").reset();
    hideAll();
  } else {
    showMessage("Ya existe un alojamiento con ese ID.", "warn");
  }
}

/* -------------------------
   Crear reserva
   ------------------------- */
function crearReserva() {
  const dni = document.getElementById("resDNI").value.trim();
  const inicioStr = document.getElementById("resInicio").value;
  const finStr = document.getElementById("resFin").value;
  const alojsRaw = document.getElementById("resAlojs").value.trim();

  if (!dni || !inicioStr || !finStr || !alojsRaw) { showMessage("Rellena todos los campos.", "warn"); return; }

  const fechaInicio = new Date(inicioStr);
  const fechaFin = new Date(finStr);
  // normalizar horario a medianoche para comparar fechas enteras
  fechaInicio.setHours(0,0,0,0);
  fechaFin.setHours(0,0,0,0);

  // parsear lista ids
  const ids = alojsRaw.split(",").map(s => s.trim()).filter(s => s.length > 0);

  const resp = agencia.crearReserva(dni, fechaInicio, fechaFin, ids);
  if (resp.ok) {
    showMessage(resp.msg, "info");
    document.getElementById("frmReserva").reset();
    hideAll();
  } else {
    showMessage(resp.msg, "error");
  }
}

/* -------------------------
   Listados (mostramos en ventana nueva)
   ------------------------- */
function listarClientes() {
  const lista = agencia.listarClientes();
  let html = `<h3>Listado de clientes (${lista.length})</h3>`;
  html += `<table border="1" cellpadding="6"><thead><tr><th>DNI</th><th>Nombre</th><th>Apellidos</th><th>Usuario</th></tr></thead><tbody>`;
  for (const c of lista) html += `<tr><td>${c.dniCliente}</td><td>${c.nombre}</td><td>${c.apellidos}</td><td>${c.usuario}</td></tr>`;
  html += "</tbody></table>";
  abrirVentanaConHTML(html, "Listado clientes");
}

function listarAlojamientos() {
  const lista = agencia.listarAlojamientos();
  let html = `<h3>Listado de alojamientos (${lista.length})</h3>`;
  html += `<table border="1" cellpadding="6"><thead><tr><th>ID</th><th>Capacidad</th><th>Tipo</th><th>Extras</th></tr></thead><tbody>`;
  for (const a of lista) {
    const tipo = (a instanceof Habitacion) ? "Habitación" : "Apartamento";
    const extras = (a instanceof Habitacion) ? `Desayuno: ${a.desayunoIncluido ? "Sí":"No"}` : `Aparcamiento: ${a.aparcamiento ? "Sí":"No"}, Dorms: ${a.dormitorios}`;
    html += `<tr><td>${a.idAlojamiento}</td><td>${a.capacidad}</td><td>${tipo}</td><td>${extras}</td></tr>`;
  }
  html += "</tbody></table>";
  abrirVentanaConHTML(html, "Listado alojamientos");
}

function listarReservasCliente() {
  const dni = document.getElementById("lstResDNI").value.trim();
  if (!dni) { showMessage("Introduce DNI de cliente.", "warn"); return; }
  const lista = agencia.reservasPorCliente(dni);
  let html = `<h3>Reservas de ${dni} (${lista.length})</h3>`;
  html += `<table border="1" cellpadding="6"><thead><tr><th>ID Reserva</th><th>DNI Cliente</th><th>Inicio</th><th>Fin</th><th>Alojamientos</th></tr></thead><tbody>`;
  for (const r of lista) {
    html += `<tr><td>${r.idReserva}</td><td>${r.idCliente}</td><td>${r.fechaInicio.toISOString().slice(0,10)}</td><td>${r.fechaFin.toISOString().slice(0,10)}</td><td>${r.listaAlojamientos.join(", ")}</td></tr>`;
  }
  html += "</tbody></table>";
  abrirVentanaConHTML(html, `Reservas cliente ${dni}`);
}

function listarReservasEntreFechas() {
  const inicioStr = document.getElementById("lstInicio").value;
  const finStr = document.getElementById("lstFin").value;
  if (!inicioStr || !finStr) { showMessage("Introduce ambas fechas.", "warn"); return; }

  const fi = new Date(inicioStr); fi.setHours(0,0,0,0);
  const ff = new Date(finStr); ff.setHours(0,0,0,0);
  const lista = agencia.reservasEntreFechas(fi, ff);
  let html = `<h3>Reservas entre ${inicioStr} y ${finStr} (${lista.length})</h3>`;
  html += `<table border="1" cellpadding="6"><thead><tr><th>ID Reserva</th><th>DNI</th><th>Nombre</th><th>Inicio</th><th>Fin</th><th>Alojamientos</th></tr></thead><tbody>`;
  for (const r of lista) {
    // obtener nombre del cliente
    const cliente = agencia.clientes.find(c => c.dniCliente === r.idCliente);
    const nombre = cliente ? `${cliente.nombre} ${cliente.apellidos}` : "(no registrado)";
    html += `<tr><td>${r.idReserva}</td><td>${r.idCliente}</td><td>${nombre}</td><td>${r.fechaInicio.toISOString().slice(0,10)}</td><td>${r.fechaFin.toISOString().slice(0,10)}</td><td>${r.listaAlojamientos.join(", ")}</td></tr>`;
  }
  html += "</tbody></table>";
  abrirVentanaConHTML(html, `Reservas entre fechas`);
}

function listarHabitacionesDesayuno() {
  const lista = agencia.habitacionesConDesayunoOrdenadas();
  let html = `<h3>Habitaciones con desayuno incluido (${lista.length})</h3>`;
  html += `<table border="1" cellpadding="6"><thead><tr><th>ID</th><th>Capacidad</th><th>Desayuno</th></tr></thead><tbody>`;
  for (const h of lista) html += `<tr><td>${h.idAlojamiento}</td><td>${h.capacidad}</td><td>${h.desayunoIncluido ? "Sí":"No"}</td></tr>`;
  html += "</tbody></table>";
  abrirVentanaConHTML(html, "Habitaciones con desayuno");
}

/* -------------------------
   Util: abrir ventana con HTML
   ------------------------- */
function abrirVentanaConHTML(html, title = "") {
  const w = window.open("", "_blank", "width=900,height=600");
  w.document.open();
  w.document.write('<meta charset="utf-8">');
  w.document.write(`<h2>${title}</h2>`);
  w.document.write(html);
  w.document.close();
}

/* -------------------------
   Inicialización: ejemplos básicos (para poder probar)
   ------------------------- */
(function initDemo() {
  // rellenar con algunos datos (opcional para pruebas)
  agencia.altaCliente(new Cliente("12345678A", "Ana", "Lopez Ruiz"));
  agencia.altaCliente(new Cliente("87654321B", "Pedro", "Martínez Soto"));

  agencia.altaAlojamiento(new Habitacion("H001", 2, true));
  agencia.altaAlojamiento(new Habitacion("H002", 3, false));
  agencia.altaAlojamiento(new Apartamento("A100", 4, true, 2));
})();
