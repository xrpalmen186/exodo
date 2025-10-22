let num1 = Number(prompt("Número 1: "));
let num2 = Number(prompt("Número 2: "));
let mensaje;
if (num1 >= num2) {
  mensaje = `Suma: ${num1 + num2}\nDiferencia: ${num1 - num2}`;
} else {
  mensaje = `Producto: ${num1 * num2}\nDivisión: ${num1 / num2}`;
}
alert(mensaje);
