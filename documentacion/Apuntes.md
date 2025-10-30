
---

<div id="md-content">

# Documentación simple de **JavaScript moderno** (ES6+) — lectura y manipulación del DOM, clases, tablas, arrays y más

A continuación tienes una guía práctica con ejemplos listos para copiar/pegar. Está orientada a **clases modernas** (sin prototipos legacy) y a operaciones típicas con formularios y el DOM.

---

# 1 — Clases modernas (ES6+)

```js
// objetos.js
class Arbol {
  #codigo;    // campo privado
  #tallaje;   // campo privado
  #especie;   // campo privado

  constructor(codigo, tallaje, especie) {
    this.#codigo = codigo;
    this.#tallaje = tallaje;
    this.#especie = especie;
  }

  // getters / setters (encapsulan acceso)
  get codigo() { return this.#codigo; }
  get tallaje() { return this.#tallaje; }
  get especie() { return this.#especie; }

  set tallaje(nuevo) {
    const n = parseInt(nuevo, 10);
    if (!isNaN(n)) this.#tallaje = n;
    else console.warn("Tallaje inválido:", nuevo);
  }

  // método utilitario
  toRowHTML() {
    return `<tr>
      <td>${this.#codigo}</td>
      <td>${this.#especie}</td>
      <td>${this.#tallaje}</td>
    </tr>`;
  }
}

// Herencia
class Perenne extends Arbol {
  constructor(codigo, tallaje, especie, hojaPersistente = true) {
    super(codigo, tallaje, especie); // llama al constructor padre
    this.hojaPersistente = hojaPersistente;
  }
}

class Caduco extends Arbol {
  constructor(codigo, tallaje, especie, epocaCaida = "otoño") {
    super(codigo, tallaje, especie);
    this.epocaCaida = epocaCaida;
  }
}
```

**Puntos clave**

* Campos privados con `#nombre` sólo accesibles dentro de la clase.
* `get` y `set` permiten validar/encapsular.
* `extends` y `super()` para heredar.
* Instanciación: `new Perenne(...)`, `new Caduco(...)`.

---

# 2 — Instanciación y `instanceof`

```js
const a1 = new Perenne("P001", 150, "Pino");
const a2 = new Caduco("C001", 120, "Arce");

console.log(a1 instanceof Perenne); // true
console.log(a1 instanceof Arbol);   // true
console.log(a2 instanceof Caduco);  // true
```

`instanceof` sirve para distinguir tipos al ejecutar lógica condicional.

---

# 3 — Arrays: push, filter, sort, length, iteraciones

```js
const vivero = [];                  // array vacío
vivero.push(a1, a2);                // agregar

// filter + arrow function
const altos = vivero.filter(arbol => arbol.tallaje > 130);

// sort por tallaje (ascendente)
vivero.sort((x, y) => x.tallaje - y.tallaje);

// longitud
console.log(vivero.length);

// for...of (iterador moderno)
for (let arbol of vivero) {
  console.log(arbol.especie, arbol.tallaje);
}

// clásico for con índice
for (let i = 0; i < vivero.length; i++) {
  console.log(i, vivero[i].codigo);
}

// for...in para objetos (keys), NO para arrays cuando quieres valores directamente
const obj = {a: 1, b: 2};
for (let key in obj) {
  console.log(key, obj[key]);
}
```

**Nota:** usa `for...of` para recorrer arrays, `for...in` para propiedades de objetos.

---

# 4 — Arrow functions y callbacks

```js
const nombres = vivero.map(ar => ar.especie);
const filtrados = vivero.filter(ar => ar.especie.includes("Pin"));
```

Las arrow functions son útiles en `map`, `filter`, `sort`, `forEach`, etc.

---

# 5 — Conversión / validación numérica y strings

```js
const n = parseInt("123", 10);
if (isNaN(n)) alert("No es número");

const s = "  pino blanco  ";
console.log(s.trim());           // quita espacios
console.log(s.includes("pino")); // true
console.log(s.slice(2, 6));      // subcadena
```

**Comparaciones:** evita usar `==` si necesitas precisión; preferible `===` salvo casos intencionales.

---

# 6 — Object helpers

```js
// desde dentro de un método de instancia (por ejemplo):
// Object.values(this)  NO mostrará campos privados (#)
const data = {a:1, b:2};
console.log(Object.values(data));       // [1,2]
console.log(Object.entries(data));      // [['a',1], ['b',2]]
```

Los campos privados `#foo` **no** aparecen en `Object.values(this)`.

---

# 7 — DOM: lectura de formularios (ejemplo)

HTML mínimo del formulario:

```html
<form name="frmAltaArbol" id="frmAltaArbol">
  <input name="txtCodigo" id="txtCodigo" />
  <input name="txtTallaje" id="txtTallaje" />
  <input type="radio" name="rbtTipoArbol" value="perenne" checked> Perenne
  <input type="radio" name="rbtTipoArbol" value="caduco"> Caduco
  <button type="button" onclick="aceptarAltaArbol()">Añadir</button>
</form>
```

JavaScript (lectura):

```js
function aceptarAltaArbol() {
  const frm = document.forms["frmAltaArbol"]; // o document.getElementById("frmAltaArbol")
  const codigo = frm.txtCodigo.value.trim();
  const tallajeRaw = frm.txtTallaje.value.trim();
  const tallaje = parseInt(tallajeRaw, 10);
  const tipo = frm.rbtTipoArbol.value; // recupera el valor del radio seleccionado

  if (!codigo) { alert("Código obligatorio"); return; }
  if (isNaN(tallaje)) { alert("Tallaje inválido"); return; }

  // crear instancia
  const nuevo = (tipo === "perenne")
    ? new Perenne(codigo, tallaje, "Especie X")
    : new Caduco(codigo, tallaje, "Especie Y");

  vivero.push(nuevo);
  frm.reset(); // limpia formulario
  actualizarTablaDOM();
}
```

---

# 8 — DOM: crear/mostrar tablas con datos

**A — Construir HTML como string y usar innerHTML**

```js
function actualizarTablaDOM() {
  const cont = document.getElementById("tablaContainer");
  let html = `<table class="table"><thead><tr><th>Código</th><th>Especie</th><th>Tallaje</th></tr></thead><tbody>`;
  for (const a of vivero) {
    html += a.toRowHTML();
  }
  html += `</tbody></table>`;
  cont.innerHTML = html;
}
```

**B — Crear elementos DOM (más seguro, evita re-render completo con strings)**

```js
function crearTablaConCreateElements() {
  const cont = document.getElementById("tablaContainer");
  cont.innerHTML = ""; // limpiar
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  thead.innerHTML = "<tr><th>Código</th><th>Especie</th><th>Tallaje</th></tr>";
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  for (const a of vivero) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${a.codigo}</td><td>${a.especie}</td><td>${a.tallaje}</td>`;
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  cont.appendChild(table);
}
```

**C — Abrir nueva ventana y usar `document.write()`** (útil para impresión rápida)

```js
function abrirTablaEnVentanaNueva() {
  let html = "<html><head><title>Listado</title></head><body>";
  html += "<table border='1'><tr><th>Código</th><th>Especie</th><th>Tallaje</th></tr>";
  for (const a of vivero) html += a.toRowHTML();
  html += "</table></body></html>";

  const oVentana = window.open("", "_blank", "width=800,height=600");
  oVentana.document.open();
  oVentana.document.write(html);
  oVentana.document.close();
}
```

---

# 9 — Selección y manipulación del DOM

```js
// seleccionar formularios, inputs, etc.
const forms = document.querySelectorAll("form");
const primerForm = document.querySelector("#frmAltaArbol");

// mostrar/ocultar
const panel = document.getElementById("panel");
panel.style.display = "none"; // ocultar
panel.style.display = "block"; // mostrar

// agregar evento con addEventListener (recomendado frente a inline)
document.getElementById("btnMostrar").addEventListener("click", () => {
  panel.style.display = panel.style.display === "none" ? "block" : "none";
});
```

---

# 10 — Eventos inline vs addEventListener

Aunque puedes usar atributos HTML como `onclick="aceptarAltaArbol();"`, es mejor práctica usar `addEventListener` desde JavaScript para separar estructura y comportamiento.

---

# 11 — Debugging y alertas

```js
console.log("vivero:", vivero);
console.warn("Algo raro paso");
console.error("Error muerto");
alert("Operación realizada");
```

---

# 12 — Estructuras de control: if/switch/while

```js
if (cond) {
  //...
} else if (otra) {
  //...
} else {
  //...
}

switch (tipo) {
  case "perenne": /*...*/ break;
  case "caduco":  /*...*/ break;
  default: /*...*/
}

let i = 0;
while (i < 3) { i++; }
```

---

# 13 — Modularización básica (separar archivos)

**Estructura simple (no módulos ES):**

* `objetos.js` → define `class Arbol`, `Perenne`, `Caduco`.
* `codigo.js`  → usa las clases (incluye after objetos.js).
* `index.html` incluye:

```html
<script src="objetos.js"></script>
<script src="codigo.js"></script>
```

Asegúrate de que `objetos.js` se cargue **antes** de `codigo.js`.

**Opción moderna (ES Modules)**:

```html
<script type="module" src="codigo.js"></script>
```

y en `objetos.js` exportas:

```js
export class Arbol { ... }
export class Perenne extends Arbol { ... }
```

y en `codigo.js` importas:

```js
import { Perenne, Caduco } from './objetos.js';
```

---

# 14 — Buenas prácticas / consejos rápidos

* Usa `const`/`let` en lugar de `var`.
* Encapsula acceso con getters/setters; evita tocar campos privados `#` desde fuera.
* Prefiere `addEventListener` y `createElement` cuando puedas.
* Valida `parseInt(...,10)` y comprueba `isNaN`.
* Usa `for...of` para arrays y `for...in` para keys de objeto.
* Evita `document.write()` en la página actual; úsalo sólo en ventanas nuevas para imprimir/exportar.

---

# 15 — Ejemplo mínimo completo (index.html + objetos.js + codigo.js)

**index.html**

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Mini Vivero</title>
</head>
<body>
  <form id="frmAltaArbol" name="frmAltaArbol">
    <input id="txtCodigo" name="txtCodigo" placeholder="Código">
    <input id="txtTallaje" name="txtTallaje" placeholder="Tallaje">
    <label><input type="radio" name="rbtTipoArbol" value="perenne" checked> Perenne</label>
    <label><input type="radio" name="rbtTipoArbol" value="caduco"> Caduco</label>
    <button type="button" id="btnAgregar">Agregar</button>
  </form>

  <div id="tablaContainer"></div>
  <button id="btnAbrirNuevaVentana">Abrir en ventana nueva</button>

  <script src="objetos.js"></script>
  <script src="codigo.js"></script>
</body>
</html>
```

**codigo.js**

```js
const vivero = [];

document.getElementById("btnAgregar").addEventListener("click", aceptarAltaArbol);
document.getElementById("btnAbrirNuevaVentana").addEventListener("click", abrirTablaEnVentanaNueva);

function aceptarAltaArbol() {
  const frm = document.forms["frmAltaArbol"];
  const codigo = frm.txtCodigo.value.trim();
  const tall = parseInt(frm.txtTallaje.value.trim(), 10);
  const tipo = frm.rbtTipoArbol.value;

  if (!codigo || isNaN(tall)) { alert("Completa código y tallaje válido"); return; }

  const nuevo = tipo === "perenne" ? new Perenne(codigo, tall, "Especie") : new Caduco(codigo, tall, "Especie");
  vivero.push(nuevo);
  frm.reset();
  actualizarTablaDOM();
}

function actualizarTablaDOM() {
  const cont = document.getElementById("tablaContainer");
  cont.innerHTML = `<table border="1"><thead><tr><th>Código</th><th>Especie</th><th>Tallaje</th></tr></thead><tbody>
    ${vivero.map(a => a.toRowHTML()).join("")}
  </tbody></table>`;
}

function abrirTablaEnVentanaNueva() {
  let html = "<html><body><h1>Listado</h1><table border='1'><tr><th>Código</th><th>Especie</th><th>Tallaje</th></tr>";
  html += vivero.map(a => `<tr><td>${a.codigo}</td><td>${a.especie}</td><td>${a.tallaje}</td></tr>`).join("");
  html += "</table></body></html>";
  const w = window.open("", "_blank");
  w.document.open();
  w.document.write(html);
  w.document.close();
}
```

---

</div>
