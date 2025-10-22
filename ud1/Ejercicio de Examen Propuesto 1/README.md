# 🐾 Examen Guía JavaScript — “Gestor de Mascotas Feliz”

## 🎯 Objetivo general
Desarrollar una aplicación web en **JavaScript (ES6)** para gestionar las mascotas de una clínica veterinaria llamada **Mascotas Feliz**.  
El objetivo es practicar los fundamentos esenciales de JavaScript de forma guiada, sencilla y progresiva.

La aplicación permitirá:
- Registrar mascotas.
- Actualizar su peso.
- Listar perros por nivel de entrenamiento.
- Listar gatos por color de pelaje.
- Calcular cuántas mascotas están listas para adopción.

---

## 🧠 Fundamentos que aprenderás

- Cómo crear **clases** y **objetos** en JavaScript moderno (ES6).
- Cómo usar **herencia** con `extends` y `super()`.
- Cómo almacenar objetos en **arrays** y recorrerlos con `for`, `map`, `filter`, `find`, `sort`.
- Cómo capturar datos desde **formularios HTML** y validarlos.
- Cómo mostrar resultados dinámicos en **tablas HTML** o en **nuevas ventanas**.
- Cómo usar `alert()` y ventanas emergentes para comunicar resultados.

---

## 🐶 Historia del examen

El veterinario **Juan** necesita una aplicación web para organizar la información de las mascotas que atiende.  
Cada mascota se registra con sus datos básicos y, según el tipo (perro o gato), con información adicional.

---

## 🧩 Estructura de clases

### Clase base: `Mascota`
| Atributo | Tipo | Descripción |
|-----------|------|--------------|
| `_codigo` | number | Identificador único |
| `_nombre` | string | Nombre de la mascota |
| `_peso` | number | Peso en kg |

### Subclase: `Perro` (hereda de `Mascota`)
| Atributo | Tipo | Descripción |
|-----------|------|--------------|
| `_nivelEntrenamiento` | string | “Básico”, “Medio” o “Avanzado” |

### Subclase: `Gato` (hereda de `Mascota`)
| Atributo | Tipo | Descripción |
|-----------|------|--------------|
| `_colorPelaje` | string | Color del pelaje del gato |

### Clase principal: `TiendaMascotas`
Encargada de gestionar el conjunto de mascotas registradas.  
Debe incluir:
- `altaMascota(mascota)`
- `actualizarPeso(codigo, nuevoPeso)`
- `listadoPerrosAvanzados(pesoMinimo)`
- `listadoGatosColor(color)`
- `totalAdopcion()`

---

## 📦 Estructura del proyecto


```
MascotasFeliz/
│
├─ index.html
├─ js/
│ ├─ codigo.js
│ └─ objetos.js
└─ bootstrap/ (opcional, para estilos)
```

---

## ⚙️ Funcionalidades a implementar

### 1️⃣ Alta de mascota
- Se introducen los datos en un formulario HTML.
- Se valida que no falte ningún campo.
- Si el código ya existe → `alert("Mascota ya registrada")`
- Si todo es correcto → `alert("Mascota añadida con éxito")`

---

### 2️⃣ Actualización del peso
- Se introduce el código y el nuevo peso.
- Si el código no existe → `alert("Mascota no encontrada")`
- Si el nuevo peso es menor → `alert("Peso inferior al registrado")`
- Si es mayor → actualizar y mostrar:
  - `alert("Peso actualizado Perro")`
  - `alert("Peso actualizado Gato")`

---

### 3️⃣ Listado de perros con entrenamiento avanzado
- Se solicita un peso mínimo.
- Se abre una nueva ventana con una tabla mostrando los **Perros**:
  - Con `nivelEntrenamiento = "Avanzado"`
  - Con `peso >= pesoMinimo`
  - Ordenados por peso descendente.
- Columnas: Código | Nombre | Peso | Entrenamiento

---

### 4️⃣ Listado de gatos por color
- Se solicita un color de pelaje.
- Se abre una nueva ventana con una tabla mostrando los **Gatos** que coincidan con ese color.
- Columnas: Código | Nombre | Peso | Color

---

### 5️⃣ Total de mascotas listas para adopción
Mostrar en un `alert()` cuántas mascotas están listas para adopción:
- Perros con peso **> 20 kg**
- Gatos con peso **> 5 kg**

Ejemplo:  
> “Hay 7 mascotas listas para adopción”

---

## 🧱 Requisitos técnicos

- Usar **JavaScript ES6** (clases, herencia, arrays modernos, arrow functions si se desea).
- No usar frameworks externos (solo Bootstrap opcional para el estilo).
- No modificar el HTML salvo para conectar scripts o añadir eventos.
- Todo el código funcional debe estar en los archivos JS.

---

## 💯 Puntuación orientativa

| Parte | Puntos |
|-------|--------|
| Estructura de clases (`Mascota`, `Perro`, `Gato`, `TiendaMascotas`) | 2.5 |
| Alta de mascota | 2.0 |
| Listado de perros avanzados | 2.0 |
| Listado de gatos por color | 2.0 |
| Total de mascotas para adopción | 1.5 |

---

## 👶 Nivel del examen
**Principiante - Guía paso a paso**  
El objetivo no es solo programar, sino **entender** cada concepto.  
Cada clase y método incluirá comentarios y ejemplos explicativos.

---

## 🚀 Próximo paso
A continuación se implementará el archivo **`index.html`**, que contendrá:
- Un menú de navegación con opciones (Alta, Actualizar peso, Listado de perros, Listado de gatos, Total adopción).
- Formularios simples para cada acción.

Después, se desarrollarán los archivos **`objetos.js`** y **`codigo.js`**, con explicaciones detalladas de cómo se conectan las clases, los eventos y los formularios.

---

> 🧩 Este examen guiado es una versión simplificada y didáctica del examen “Viveros Naranjito”.  
> Su propósito es ayudar a dominar los conceptos de Programación Orientada a Objetos en JavaScript paso a paso.
