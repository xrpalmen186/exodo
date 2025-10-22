let num = prompt("Introduce un número:");
let salida = "";

for (let i = 1; i <= 10; i++) {
  salida += num + " x " + i + " = " + num * i + "<br>";
}

document.getElementById("salida").innerHTML = salida;
