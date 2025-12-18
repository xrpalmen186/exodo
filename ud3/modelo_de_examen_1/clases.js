class Asignatura {
    constructor(id, nombre, idDepto) {
        this.id = id;
        this.nombre = nombre;
        this.idDepto = idDepto;
    }
}

class Alumno {
    constructor(nombre, cursoIdx) {
        this.nombre = nombre;
        this.cursoIdx = cursoIdx;
        this.notas = []; // Array de objetos: { idAsignatura, valor }
    }

    addNota(idAsignatura, valor) {
        // Buscamos si ya tiene nota en esa asignatura
        const notaExistente = this.notas.find(n => n.idAsignatura == idAsignatura);
        
        if (notaExistente) {
            notaExistente.valor = valor; // Actualizamos
        } else {
            this.notas.push({ idAsignatura: idAsignatura, valor: valor }); // Añadimos nueva
        }
    }

    getMedia() {
        if (this.notas.length === 0) return 0;
        // Reduce suma todos los valores y luego dividimos por la longitud
        const suma = this.notas.reduce((acc, curr) => acc + curr.valor, 0);
        return (suma / this.notas.length).toFixed(2);
    }

    tieneSuspensos() {
        // Criterio: Está suspenso (Rojo) si no tiene notas O si alguna nota es < 5
        if (this.notas.length === 0) return true; 
        return this.notas.some(n => n.valor < 5);
    }
}

class Gestor {
    constructor() {
        this.cursoActual = 0;
        this.alumnoActual = null; // Guardaremos el objeto Alumno completo o su índice
        this.deptoActual = 0;

        // 1. Cargar Asignaturas (Catálogo)
        this.asignaturas = [];
        // 'asignaturasData' viene de datos.js
        if (typeof asignaturasData !== 'undefined') {
            asignaturasData.forEach(a => {
                this.asignaturas.push(new Asignatura(a.id, a.nombre, a.depto));
            });
        }

        // 2. Cargar Alumnos
        this.alumnos = []; // Array bidimensional [curso][alumno]
        // 'alumnosRaw' viene de datos.js (Array de strings)
        if (typeof alumnosRaw !== 'undefined') {
            for (let i = 0; i < alumnosRaw.length; i++) {
                this.alumnos[i] = [];
                for (let j = 0; j < alumnosRaw[i].length; j++) {
                    // Creamos el objeto Alumno
                    this.alumnos[i].push(new Alumno(alumnosRaw[i][j], i));
                }
            }
        }
    }
    
    // Método auxiliar para obtener el nombre de una asignatura por su ID
    getNombreAsignatura(id) {
        const asig = this.asignaturas.find(a => a.id == id);
        return asig ? asig.nombre : "Desconocida";
    }
}