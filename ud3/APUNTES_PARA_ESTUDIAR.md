# Apuntes de Repaso Final - JavaScript (DOM + Regex)

## 1. Expresiones Regulares

Para el examen, céntrate en **validar** (¿es correcto?) y **filtrar** (buscador).

### Sintaxis Básica

* **Literal (Estática):** Cuando el patrón NO cambia.
```javascript
const regexDNI = /^[0-9]{8}[A-Z]$/;

```


* **Objeto (Dinámica):** Cuando el patrón viene de un **input** (Buscador).
```javascript
// 'i' es para ignorar mayúsculas/minúsculas
const regex = new RegExp(inputUsuario.value, 'i');

```



### El Método de Oro

* `.test(string)`: Devuelve `true` o `false`. **Úsalo siempre para `if**`.
```javascript
if (regexDNI.test(miDNI)) { ... }

```



### La "Chuleta" de Símbolos

| Símbolo | Significado | Ejemplo |
| --- | --- | --- |
| `^` | **Inicio** de línea (Obligatorio en validaciones estrictas). | `^Hola` (Empieza por Hola) |
| `$` | **Fin** de línea (Obligatorio en validaciones estrictas). | `fin$` (Acaba en fin) |
| `.` | Cualquier carácter (excepto salto de línea). | `A.B` (A-B, A@B, A9B...) |
| `[abc]` | Cualquiera de esos caracteres. | `[A-Z]` (Cualquier mayúscula) |
| `[0-9]` | Cualquier dígito (Igual a `\d`). | `[0-9]` |
| ` | ` | O (Alternativa). |

### Cuantificadores (¿Cuántas veces?)

| Símbolo | Cantidad |
| --- | --- |
| `*` | 0 o más veces. |
| `+` | 1 o más veces (Muy usado). |
| `?` | 0 o 1 vez (Opcional). |
| `{n}` | Exactamente **n** veces. |
| `{n,m}` | Entre **n** y **m** veces. |

### 🏆 Patrones "Salvavidas" para el Examen

* **DNI (8 números + Letra):** `/^[0-9]{8}[A-Z]$/` (o `[A-Za-z]` para minusculas).
* **Email Sencillo:** `/^\w+@\w+\.\w+$/` (Recuerda: `\w` es letras/números).
* **Código de Producto (Ej: ABC-1234):** `/^[A-Z]{3}-\d{4}$/`
* **Buscador Flexible:** `new RegExp(variable, 'i')`

---

## 2. Manipulación del DOM

### Selección de Elementos

```javascript
const contenedor = document.getElementById("contenedor");
const input = document.querySelector("#miFormulario input[name='nombre']");

```

### Crear y Renderizar (El ciclo sagrado)

Siempre sigue estos pasos en tu función `render()`:

1. **Limpiar:** `contenedor.innerHTML = "";`
2. **Recorrer datos:** `array.forEach(...)`
3. **Crear elementos:** `document.createElement("div")`
4. **Rellenar:** `.textContent` o `.innerHTML`.
5. **Configurar clases/ID:** `.className` o `.classList`.
6. **Vincular Datos:** `dataset` (¡Importante!).
7. **Insertar:** `contenedor.appendChild(elemento)`.

### Clases CSS (Truco visual)

* **Reemplazar todo:** `div.className = "ficha activa";`
* **Añadir/Quitar (Más seguro):**
```javascript
div.classList.add("error");
div.classList.remove("oculto");
div.classList.toggle("seleccionado"); // Si está la quita, si no, la pone

```



### Vincular DOM con tus Objetos (`dataset`)

Cuando crees una ficha de alumno/habitación, guárdate su índice o ID dentro del HTML para saber cuál es al hacer click.

```javascript
div.dataset.id = alumno.id; 
// Luego lo recuperas con: e.target.dataset.id

```

---

## 3. Eventos

### Los 3 más importantes

1. **`click`**: Para botones y selección de elementos.
2. **`change`**: Para `<select>` (se dispara al terminar de elegir).
3. **`input`**: Para validación en tiempo real y buscadores (se dispara en cada tecla).

### Delegación de Eventos (Nivel Pro)

En lugar de poner 100 eventos a 100 botones, pon uno al contenedor padre.

```javascript
contenedorPadre.addEventListener("click", (e) => {
    // ¿He pulsado en un botón con clase 'btn-borrar'?
    if (e.target.classList.contains("btn-borrar")) {
        // Lógica borrar
    }
    // O busca el elemento padre más cercano (útil si el botón tiene iconos dentro)
    const ficha = e.target.closest(".ficha-alumno");
    if (ficha) {
        // Lógica seleccionar ficha
    }
});

```

---

## 4. Estrategia de Examen (Paso a Paso)

Si te bloqueas, respira y sigue este orden lógico. Es el que hemos usado en los simulacros:

1. **Clases (Modelo):** Define tus clases (`Alumno`, `Habitacion`) en `clases.js`. Asegúrate de que tienen propiedades para guardar el estado (`this.pagado`, `this.notas`).
2. **Inicialización:** Crea los objetos iniciales y llena los `<select>` del HTML.
3. **Renderizado Base:** Haz que se pinten los datos (aunque sea feo). Si ves los datos, te calmas.
4. **Eventos Simples:** Haz que al hacer click se seleccione (log en consola) o que funcionen los botones simples.
5. **Validación (Regex):** Añade la capa de Regex en los inputs o en el buscador. **No empieces por aquí**, hazlo cuando ya pintes datos.
6. **Refresco:** Asegúrate de que cada vez que modificas un dato, llamas a `render()` para actualizar la vista.

## ⚠️ Errores Tontos a Evitar

* Olvidar el `.value` al leer inputs (`inputNombre.value`).
* Olvidar convertir a número (`parseInt(inputEdad.value)`). El HTML siempre devuelve texto.
* No limpiar el contenedor (`innerHTML = ""`) antes de repintar (se duplican los datos).
* Intentar usar `forEach` en algo que no es un array.