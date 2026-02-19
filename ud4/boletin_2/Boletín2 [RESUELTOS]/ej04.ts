interface Tarea {
  id: number;
  texto: String;
  completada: boolean;
}

const listaTareas: Tarea[] = [
  { id: 1, texto: "Aprender TS", completada: true },
  { id: 2, texto: "Aprender React", completada: false },
  { id: 3, texto: "Elaborar un proyecto en React", completada: false },
];

const buscarTarea = (id: number) => listaTareas.find((t) => t.id === id);

const tareaBuscada = buscarTarea(2);

if (tareaBuscada) {
  console.log(
    `Tarea ${tareaBuscada.id}: ${tareaBuscada.texto} - ${tareaBuscada.completada ? "Completada" : "Pendiente"}`,
  );
} else {
  console.log(`No existe la tarea`);
}
