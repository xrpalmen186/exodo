type EstadoCarga = "idle" | "loading" | "success" | "error";

interface Usuario {
  id: number;
  nombre: string;
}

interface RespuestaAPI {
  estado: EstadoCarga;
  data: Usuario | null;
}

const procesarRespuesta = (res: RespuestaAPI) => {
  if (res.estado === "loading") {
    console.log("Cargando...");
  } else if (res.estado === "error") {
    console.log("Ha ocurrido un error");
  } else if (res.estado === "success" && res.data) {
    // TS sabe que data puede ser null
    console.log(`Bienvenido ${res.data.nombre}`);
  }
};

// Prueba cambiándole el estado
procesarRespuesta({ estado: "success", data: { id: 1, nombre: "Pepe" } });
