let tabla = ["Pepe", "Gómez", 23, "C/ Larga nº23 Utrera"];
let persona = {
  nombre: "Juan",
  apellidos: "García",
  edad: 35,
  direccion: "Plaza Nueva 45 Dos Hermanas",
};

persona.altura = 1.7;

let salida = "";

console.log(persona);

for (let item in persona) {
  salida += persona[item] + " ";
}

document.getElementById("salida").innerHTML = salida;
