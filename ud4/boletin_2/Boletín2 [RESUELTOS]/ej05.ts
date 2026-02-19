/*function cajaSorpresa<T>(contenido: T) {
  return { datos: contenido, secreto: true };
}*/

const cajaSorpresa = <T>(contenido: T) => ({ datos: contenido, secreto: true });

const cajaNumero = cajaSorpresa(23);
const cajaTexto = cajaSorpresa("Hola Mundo");

console.log(cajaNumero);
console.log(cajaTexto.datos.toUpperCase());
//console.log(cajaNumero.datos.toUpperCase()); Error: datos es del tipo number
