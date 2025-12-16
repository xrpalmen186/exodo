document.getElementById("btnCrearTablas").addEventListener("click", crearTablas);
document.getElementById("btnBorrarTablas").addEventListener("click", borrarTablas);
const alumnos = document.querySelectorAll("ul > li > ul > li");
for (let alumno of alumnos) {
  alumno.addEventListener("click", procesarAlumno);
}

function procesarAlumno(event) {
  const destino = document.querySelector("input:checked").value;
  const ubicacion = document.getElementById("combo").value;
  let listaDestino;

  if (destino == "aprob") {
    listaDestino = document.getElementById("aprobados");
  } else if (destino == "recup") {
    listaDestino = document.getElementById("recuperacion");
  } else if (destino == "repet") {
    listaDestino = document.getElementById("repetir");
  }

  if (ubicacion == "primero") {
    listaDestino.prepend(event.target);
  } else if (ubicacion == "ultimo") {
    listaDestino.append(event.target);
  }
}

function crearTablas() {
  // Primero borramos la capa de tablas
  borrarTablas();

  const listaAprobados = document.getElementById("aprobados").children;
  const listaRecuperacion = document.getElementById("recuperacion").children;
  const listaRepeticion = document.getElementById("repetir").children;
  const capaTablas = document.getElementById("tablas");

  capaTablas.append(generarTabla(listaAprobados));
  capaTablas.append(generarTabla(listaRecuperacion));
  capaTablas.append(generarTabla(listaRepeticion));
}

function generarTabla(lista) {
  const tabla = document.createElement("table");
  tabla.setAttribute("border", "1");
  tabla.style.marginBottom = "10px";
  for (let alumno of lista) {
    let fila = tabla.insertRow();
    fila.insertCell().append(document.createTextNode(alumno.textContent));
  }
  return tabla;
}

function borrarTablas() {
  document.getElementById("tablas").innerHTML = "";
}
