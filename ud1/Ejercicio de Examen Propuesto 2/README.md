## Examen: Gestión de Productos “ElectroShop”

### 🏬 Contexto del ejercicio

La empresa **ElectroShop** (similar a MediaMarkt) necesita una pequeña aplicación web para gestionar su inventario de productos electrónicos.
El programa debe permitir **dar de alta nuevos productos**, **actualizar sus precios**, **listar productos según criterios**, y **mostrar el valor total del stock disponible**.

Tu tarea es **crear esta aplicación** siguiendo la estructura, las clases y la funcionalidad que se detallan a continuación.

---

## 📂 Estructura del proyecto

```
ElectroShop/
│
├─ index.html
├─ css/
│   └─ style.css
└─ js/
    ├─ objetos.js
    └─ codigo.js
```

---

## 🎯 Objetivos de aprendizaje

Este ejercicio está diseñado para evaluar tus conocimientos sobre:

* Creación de **clases e instancias**
* Uso de **herencia** entre clases
* Manipulación de **arrays de objetos**
* Uso de **métodos** y encapsulación
* **DOM y eventos** en formularios
* Generación de **listados HTML dinámicos**
* Buenas prácticas y legibilidad de código

---

## 📘 Enunciado general

Implementa una aplicación web que permita **gestionar los productos electrónicos** de la tienda **ElectroShop**.

Cada producto pertenece a **una de dos categorías principales**:

* 📺 **Televisor**
* 💻 **Portátil**

La aplicación deberá permitir:

1. **Dar de alta nuevos productos**
2. **Actualizar el precio de un producto**
3. **Listar los televisores** con resolución **4K o superior**
4. **Listar los portátiles** con memoria RAM **mayor o igual a un valor indicado**
5. **Mostrar el valor total del stock disponible**

---

## 🧱 Requisitos técnicos

### 📗 Clases a implementar (`objetos.js`)

1. **Clase base `Producto`**

   * Atributos:

     * `_codigo` (número)
     * `_nombre` (string)
     * `_precio` (número)
     * `_stock` (número)
   * Métodos:

     * Getters/Setters para todos los atributos
     * `toHTMLRow()` → devuelve una fila `<tr>` con sus datos

2. **Subclase `Televisor`**

   * Hereda de `Producto`
   * Atributos adicionales:

     * `_pulgadas` (número)
     * `_resolucion` (string: "HD", "Full HD", "4K", "8K")

3. **Subclase `Portatil`**

   * Hereda de `Producto`
   * Atributos adicionales:

     * `_ram` (número, en GB)
     * `_procesador` (string)

4. **Clase `Tienda`**

   * Atributo:

     * `_productos` (array)
   * Métodos:

     * `altaProducto(oProducto)`
       → Inserta el producto si no existe el mismo código (devuelve `true` o `false`)
     * `actualizarPrecio(codigo, nuevoPrecio)`
       → Busca el producto por código y actualiza su precio (devuelve mensaje)
     * `listarTelevisores4K()`
       → Devuelve listado HTML con televisores cuya resolución sea **4K o superior**
     * `listarPortatilesRAM(minRAM)`
       → Devuelve listado HTML con portátiles con **RAM ≥ minRAM**
     * `valorTotalStock()`
       → Devuelve la **suma total** del precio × stock de todos los productos

---

## 🧩 Archivo `codigo.js`

Debe gestionar toda la **interacción del usuario con el DOM**, incluyendo:

* Mostrar/ocultar formularios
* Validar campos
* Crear instancias (`new Televisor(...)`, `new Portatil(...)`)
* Llamar a los métodos de `Tienda`
* Mostrar resultados en alertas o ventanas nuevas (`window.open()`)

### Formularios requeridos (según IDs):

1. `frmAlta` → Alta de producto
2. `frmPrecio` → Actualizar precio
3. `frmListadoTV` → Listar televisores 4K
4. `frmListadoPortatiles` → Listar portátiles por RAM
5. Botón o enlace → Mostrar valor total del stock

---

## 🧮 Datos de ejemplo (iniciales)

En `codigo.js`, al cargar la página, deben inicializarse algunos productos en la tienda:

```js
let oTienda = new Tienda();

oTienda.altaProducto(new Televisor(1, "Samsung QLED", 900, 5, 55, "4K"));
oTienda.altaProducto(new Televisor(2, "LG NanoCell", 700, 3, 50, "Full HD"));
oTienda.altaProducto(new Portatil(3, "HP Envy", 1100, 4, 16, "Intel i7"));
oTienda.altaProducto(new Portatil(4, "Lenovo ThinkPad", 950, 2, 8, "AMD Ryzen 5"));
oTienda.altaProducto(new Televisor(5, "Sony Bravia", 1200, 1, 65, "8K"));
```

---

## 🧠 Funcionalidades esperadas

### 1️⃣ Alta de producto

* El usuario introduce:

  * Código, nombre, precio, stock
  * Tipo de producto (televisor o portátil)
  * Campos específicos según tipo
* Se crea el objeto correspondiente (`Televisor` o `Portatil`)
  y se añade a la tienda mediante `oTienda.altaProducto()`.
* Si el código ya existe → mostrar alerta de error.

### 2️⃣ Actualizar precio

* Se pide **código** y **nuevo precio**.
* Se busca el producto y se actualiza mediante `actualizarPrecio()`.
* Mostrar un mensaje con el resultado.

### 3️⃣ Listado televisores 4K

* Abre una ventana nueva con un listado en tabla HTML
  de todos los televisores cuya resolución sea **4K o 8K**.

### 4️⃣ Listado portátiles por RAM

* El usuario introduce una cantidad mínima de RAM.
* Se muestran en ventana nueva los portátiles que cumplan ese requisito.

### 5️⃣ Valor total del stock

* Muestra mediante `alert()` el valor total (precio × stock de todos los productos).

---

## 🖥️ Interfaz (`index.html`)

Debe contener:

* Un menú o barra de navegación con enlaces a:

  * Alta de producto
  * Actualizar precio
  * Listado televisores
  * Listado portátiles
  * Valor total del stock
* Formularios correspondientes a cada función.
* Un diseño **simple, limpio y funcional** con un `style.css` básico.

---

## 📋 Recomendaciones para el examen

* Usa **nombres claros** y consistentes (`oTienda`, `oProducto`, etc.)
* Valida los datos de los formularios.
* Aplica **buenas prácticas** de legibilidad y separación de responsabilidades:

  * `objetos.js` → solo clases y lógica de datos
  * `codigo.js` → interacción con el usuario y el DOM
* No uses librerías externas ni funciones de terceros.
* Puedes usar **ventanas emergentes (`window.open`)** para mostrar listados.

---

## 🧩 Bonus (opcional)

* Añadir método `buscarProducto(codigo)` en `Tienda`
* Añadir campo `marca` en los productos
* Mostrar los listados en tablas HTML con cabecera

---

## 🏁 Criterios de evaluación

| Concepto evaluado                    | Puntuación |
| ------------------------------------ | ---------- |
| Uso correcto de clases y herencia    | 2 pts      |
| Manipulación de arrays y objetos     | 2 pts      |
| Validación de formularios            | 1 pt       |
| Interacción DOM / alertas / ventanas | 2 pts      |
| Legibilidad y estructura del código  | 2 pts      |
| Funcionamiento completo              | 1 pt       |

**Total: 10 puntos**