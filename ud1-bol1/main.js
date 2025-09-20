const buttonsContainer = document.getElementById("buttons-container");
const output = document.getElementById("output");

//Generación de botones para los ejercicios
for (let i = 1; i <= 49; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.addEventListener("click", () => ejecutarEjercicio(i));
  buttonsContainer.appendChild(btn);
}

//Función principal que llama a cada ejercicio
function ejecutarEjercicio(num) {
  output.innerHTML = `<strong>Se ejecutó el ejercicio ${num}...</strong><br><hr><br>`;

  switch (num) {
    case 1:
      ejercicio1();
      break;
    case 12:
      ejercicio12();
      break;
    default:
      output.innerHTML += '<strong style="color: red;">[X]</strong> Ejercicio no hecho todavía.';
  }
}

/* 
   ========================
   Definición de ejercicios
   ========================
*/

function ejercicio1() {
  let edad = parseInt(prompt("Introduzca su edad: "));
  let nombre = prompt("Introduzca su nombre: ");
  let estadoCivil = prompt("Introduzca su estado civil (solter@, casad@, viud@, divorciad@): ");

  let opcionesValidas = ['soltero', 'soltera', 'casado', 'casada', 'viudo', 'viuda', 'divorciado', 'divorciada']

  if (isNaN(edad) || edad <= 0) {
    output.innerHTML += "[ERROR] Edad no válida.<br>";
  } else if (!nombre || nombre.trim() === "") { //con trim quitamos los espacios
    output.innerHTML += "[ERROR] Nombre no válido.<br>";
  } else if (!estadoCivil || !opcionesValidas.includes(estadoCivil.toLowerCase())) {
    output.innerHTML += "[ERROR] Estado civil no válido.<br>";
  } else {
    output.innerHTML += `Su nombre es ${nombre}, tiene ${edad} años y su estado civil es: ${estadoCivil}`;
  }
}

function ejercicio12() {
  let a = parseFloat(prompt("Introduce el primer número:"));
  let b = parseFloat(prompt("Introduce el segundo número:"));

  if (isNaN(a) || isNaN(b)) {
    output.innerHTML += "[ERROR] Debes introducir números válidos.";
    return;
  }

  if (a > b) {
    let suma = a + b;
    let resta = a - b;
    output.innerHTML += `El primer número (${a}) es mayor que el segundo (${b}).<br>`;
    output.innerHTML += `Suma: ${suma}<br>`;
    output.innerHTML += `Diferencia: ${resta}`;
  } else {
    let producto = a * b;
    let division = b !== 0 ? (a / b) : "No se puede dividir entre 0";
    output.innerHTML += `El primer número (${a}) NO es mayor que el segundo (${b}).<br>`;
    output.innerHTML += `Producto: ${producto}<br>`;
    output.innerHTML += `División: ${division}`;
  }


}


