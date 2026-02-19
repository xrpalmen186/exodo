const productos = [
    { id: 1, nombre: "Ratón", precio: 20 },
    { id: 2, nombre: "Teclado", precio: 50 }
];

const lista = productos.map(p => `Producto: ${p.nombre} - ${p.precio}€`);
const caros = productos.filter(p => p.precio > 30);
const raton = productos.find(p => p.nombre === "Ratón");

console.log(lista);
console.log(caros);
console.log(raton);
