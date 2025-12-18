class Socio {
    constructor(nombre, dni, email) {
        this.nombre = nombre;
        this.dni = dni;
        this.email = email;
        this.cuotaPagada = false; // Por defecto no ha pagado
    }

    pagarCuota() {
        this.cuotaPagada = true;
    }
}

class Gimnasio {
    constructor() {
        this.socios = [];
        this.cargarDatosIniciales();
    }

    agregarSocio(nombre, dni, email) {
        const nuevoSocio = new Socio(nombre, dni, email);
        this.socios.push(nuevoSocio);
    }

    cargarDatosIniciales() {
        // Un par de datos de prueba
        this.agregarSocio("Carlos Fitness", "12345678A", "carlos@gym.com");
        this.socios[0].pagarCuota(); // El primero ha pagado
        this.agregarSocio("Laura Gym", "87654321B", "laura@test.es");
    }
}