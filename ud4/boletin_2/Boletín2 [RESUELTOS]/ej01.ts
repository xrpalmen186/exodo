interface Docente {
  nombre: string;
  modulo: string;
}

const saludar = ({ nombre, modulo }: Docente) => {
  console.log(`Hola ${nombre}. Preparado para el módulo ${modulo} `);
};

saludar({ nombre: "Pepe", modulo: "DWEC" });
