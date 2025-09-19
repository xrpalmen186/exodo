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
    case 12:
      ejercicio12();
      break;
    default:
      output.innerHTML += "Ejercicio no hecho todavía.";
  }
}

/* 
   ========================
   Definición de ejercicios
   ========================
*/

function ejercicio12() {
  let a = parseFloat(prompt("Introduce el primer número:"));
  let b = parseFloat(prompt("Introduce el segundo número:"));

  if (isNaN(a) || isNaN(b)) {
    output.innerHTML += "⚠️ Debes introducir números válidos.";
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

