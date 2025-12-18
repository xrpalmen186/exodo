// Nombres de los cursos (Equivalente a Comerciales)
const cursos = ["1º DAW", "2º DAW", "1º ASIR"];

// Alumnos por curso (Equivalente a Clientes)
// Nota: Solo son strings, tú debes convertirlos a Objetos en clases.js
const alumnosRaw = [
    ["Ana García", "Beatriz López", "Carlos Ruiz", "David Meca", "Elena Nito"], // 1º DAW
    ["Federico Rico", "Gema Huesca", "Hugo Boss", "Inés Perca"],                // 2º DAW
    ["Juan Palomo", "Kevin Costner"]                                            // 1º ASIR
];

// Departamentos (Categorías)
const departamentos = ["Informática", "Sistemas", "Fol"];

// Asignaturas se cargarán en el catálogo (Equivalente a Productos)
// Formato simulado de carga: id, nombre, idDepto
const asignaturasData = [
    { id: 1, nombre: "Programación", depto: 0 },
    { id: 2, nombre: "Bases de Datos", depto: 0 },
    { id: 3, nombre: "Entornos de Desarrollo", depto: 0 },
    { id: 4, nombre: "Sistemas Operativos", depto: 1 },
    { id: 5, nombre: "Redes", depto: 1 },
    { id: 6, nombre: "Formación y Orientación", depto: 2 },
    { id: 7, nombre: "Empresa e Iniciativa", depto: 2 },
    { id: 8, nombre: "Desarrollo Cliente (JS)", depto: 0 }
];