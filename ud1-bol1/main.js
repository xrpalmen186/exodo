const buttonsContainer = document.getElementById("buttons-container");
const formulario = document.getElementById("form-container");
const output = document.getElementById("output");
const clearFormBtn = document.getElementById("clear-form-btn");

clearFormBtn.addEventListener("click", () => {
    formulario.style.opacity = 0;
    formulario.style.transform = "translateY(-20px)";
    setTimeout(() => {
        formulario.style.display = "none"; //ocultamos el contenedor
        formulario.innerHTML = ""; //limpiamos el formulario
        output.innerHTML = ""; //limpiamos la salida
    }, 50);
});


//Lista de ejercicios pendientes INTERESANTES propuestos por el profesor
const pendientes = [];
//ejercicios ya terminados
const terminados = [1, 2, 12, 26, 38, 39, 47]

//Generación de botones para los ejercicios
for (let i = 1; i <= 49; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;

  //solo cambiará el estilo si el ejercicio está en la lista de propuestos
  if (pendientes.includes(i)) {
    btn.style.backgroundColor = "#F09C3C";
  }
  if (terminados.includes(i)) {
    btn.style.backgroundColor = "#39CC29";
  }

  btn.addEventListener("click", () => ejecutarEjercicio(i));
  buttonsContainer.appendChild(btn);
}


//Función principal que llama a cada ejercicio
function ejecutarEjercicio(num) {
  output.innerHTML = `<strong>Se ejecutó el ejercicio ${num}...</strong><br><hr><br>`;

  try {
    switch (num) {
      case 1:
        ejercicio1();
        break;
      case 2:
        ejercicio2();
        break;
      case 3:
        ejercicio3();
        break;
      case 4:
        ejercicio4();
        break;
      case 5:
        ejercicio5();
        break;
      case 6:
        ejercicio6();
        break;
      case 7:
        ejercicio7();
        break;
      case 8:
        ejercicio8();
        break;
      case 9:
        ejercicio9();
        break;
      case 10:
        ejercicio10();
        break;
      case 11:
        ejercicio11();
        break;
      case 12:
        ejercicio12();
        break;
      case 13:
        ejercicio13();
        break;
      case 14:
        ejercicio14();
        break;
      case 15:
        ejercicio15();
        break;
      case 16:
        ejercicio16();
        break;
      case 17:
        ejercicio17();
        break;
      case 18:
        ejercicio18();
        break;
      case 19:
        ejercicio19();
        break;
      case 20:
        ejercicio20();
        break;
      case 21:
        ejercicio21();
        break;
      case 22:
        ejercicio22();
        break;
      case 23:
        ejercicio23();
        break;
      case 24:
        ejercicio24();
        break;
      case 25:
        ejercicio25();
        break;
      case 26:
        ejercicio26();
        break;
      case 27:
        ejercicio27();
        break;
      case 28:
        ejercicio28();
        break;
      case 29:
        ejercicio29();
        break;
      case 30:
        ejercicio30();
        break;
      case 31:
        ejercicio31();
        break;
      case 32:
        ejercicio32();
        break;
      case 33:
        ejercicio33();
        break;
      case 34:
        ejercicio34();
        break;
      case 35:
        ejercicio35();
        break;
      case 36:
        ejercicio36();
        break;
      case 37:
        ejercicio37();
        break;
      case 38:
        ejercicio38();
        break;
      case 39:
        ejercicio39();
        break;
      case 40:
        ejercicio40();
        break;
      case 41:
        ejercicio41();
        break;
      case 42:
        ejercicio42();
        break;
      case 43:
        ejercicio43();
        break;
      case 44:
        ejercicio44();
        break;
      case 45:
        ejercicio45();
        break;
      case 46:
        ejercicio46();
        break;
      case 47:
        ejercicio47();
        break;
      case 48:
        ejercicio48();
        break;
      case 49:
        ejercicio49();
        break;
      default:
        output.innerHTML += '<strong style="color: red;">[X]</strong> Ejercicio no hecho todavía.';
    } 
  } catch (e) {
    output.innerHTML += '<strong style="color: red;">[X]</strong> Ejercicio no hecho todavía.';
  }
}

/* 
   ========================
   Definición de ejercicios
   ========================
*/


// Ej.1 Cree un programa que almacene en variables el valor de la edad, el nombre y el estado civil de una persona y a continuación lo muestre por pantalla.

function ejercicio1() {
  let edad = parseInt(prompt("Introduzca su edad: ")); //al pasar un string a int, si no se introdujo ningun valor, se convertirá en "NaN"
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

// Ej.2 Confeccione un programa en JavaScript que declare e inicialice una variable real donde almacenar el sueldo de un operario y otra de tipo cadena de caracteres donde almacenaremos el nombre. Imprimir cada variable en una línea distinta en pantalla.

function ejercicio2() {
  let sueldo = 1000.50;
  let nombre = "Ray Palma";

  output.innerHTML += `Nombre: ${nombre}<br>`
  output.innerHTML += `Sueldo: ${sueldo}`
}

// Ej.12 Realizar un programa que lea por teclado dos números, si el primero es mayor al segundo informar su suma y diferencia, en caso contrario informar el producto y la división del primero respecto al segundo.

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

// Ej.26 Desarrollar un programa que permita la carga de 5 valores por teclado utilizando una única variable para dichos valores y nos muestre posteriormente la suma.

function ejercicio26() {
  let valor;
  let resultado = 0;

  for (let i = 1; i<=5; i++) {
    valor = parseFloat(prompt("Introduce el valor nº" + i + ": "));
    resultado = resultado + valor;
  }

  output.innerHTML += `El resultado de la suma es: ${resultado}`
}

// Ej.38 Realizar un programa que al introducir un número por teclado nos diga si es primo o no.

function ejercicio38() {
  let a = parseInt(prompt("Introduce un valor: "));

  //el número será `rimo si es un número entero mayor que 1 y solo tiene
  //dos divisores positivos, 1 y el mismo número.

  if (a < 2) {
    output.innerHTML += `El número ${a} no es primo.`;
  } else {
    let esPrimo = true; //asumimos que es primo

    //con Math.sqrt calculamos la raíz cuadrada,
    for (let i = 2; i <= Math.sqrt(a); i++) {
      if (a % i === 0) {
        esPrimo = false;
        break;
      }
    }

    if (esPrimo) {
      output.innerHTML += `El número ${a} sí es primo.`;
    } else {
      output.innerHTML += `El número ${a} no es primo.`;
    }
  }

}

// Ej.39 Realizar un programa que liste los 100 primeros números primos.
function ejercicio39() {
  let primos = [];
  let num = 2; //primer número primo
  const cantidad = 100;

  while (primos.length < cantidad) {
    let esPrimo = true;

    //comprobamos si num es primo igual que en el ejercicio 38 pero cambiando "a" por "num"
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        esPrimo = false;
        break;
      }
    }

    //si es primo lo agregamos al array
    if (esPrimo) primos.push(num);

    num++; //se pasa al siguiente número
  }

  output.innerHTML += `<strong>Los ${cantidad} primeros números primos son:</strong><br>`;
  output.innerHTML += primos.join(", ") + "."; //los separamos por comas y añadimos un punto final
}


// Ej. 47 Solicitar a través de un formulario dos horas de un día, el sistema deberá mostrar en una capa de salida del documento si la primera hora es anterior o posterior a la segunda, además del tiempo transcurrido entre ambas en formato de hh:mm. Ejemplo: el usuario introduce en la primera hora 18:40 y en la segunda 22:25 de la siguiente forma, h1=18 m1=40 h2=22 m2=25. La salida del sistema será “H1 es anterior a H2. Han pasado 3 horas y 45 minutos”. Si necesitara truncar un número puede usar la función Math.floor(num).

function ejercicio47() {
  formulario.innerHTML = ""; //limpiar contenido
  output.innerHTML += "";

  formulario.style.display = "block"; // hace visible el elemento
  setTimeout(() => {
      formulario.style.opacity = 1; // animación de fade
      formulario.style.transform = "translateY(0)"; // animación de movimiento
  }, 10); // pequeño retraso para que se aplique la transición


  const form = document.createElement("form");
  form.id = "form-ejercicio47";

  form.innerHTML = `
    <div style="display: flex;">
        <h3>Formulario ejercicio nº</h3>
        <h3 id="num-ejercicio-form">47</h3>
      </div>
      <fieldset>
        <legend>Primera hora (H1)</legend>
        <label for="h1">Horas:</label>
        <input type="number" id="h1" min="0" max="23" required>
        <label for="m1">Minutos:</label>
        <input type="number" id="m1" min="0" max="59" required>
      </fieldset>
      <fieldset>
        <legend>Segunda hora (H2)</legend>
        <label for="h2">Horas:</label>
        <input type="number" id="h2" min="0" max="23" required>
        <label for="m2">Minutos:</label>
        <input type="number" id="m2" min="0" max="59" required>
      </fieldset>
      <br>
      <button type="submit">Comparar Horas</button>
  `;

  formulario.appendChild(form);

  form.addEventListener("submit", function (e) {
    e.preventDefault(); //asi no recarga la página

    const h1 = parseInt(document.getElementById("h1").value);
    const m1 = parseInt(document.getElementById("m1").value);
    const h2 = parseInt(document.getElementById("h2").value);
    const m2 = parseInt(document.getElementById("m2").value);

    const totalMinutos1 = h1 * 60 + m1;
    const totalMinutos2 = h2 * 60 + m2;

    let msg = "";

    if (totalMinutos1 < totalMinutos2) {
      msg = "La primera hora es anterior a la segunda.";
    } else if (totalMinutos1 > totalMinutos2) {
      msg = "La primera hora es posterior a la segunda.";
    } else {
      msg = "Son la misma hora.";
    }

    //calculamos el tiempo transcurrido con la diferencia
    const diff = Math.abs(totalMinutos2 - totalMinutos1); //con abs obtenemos el valor absoluto para que sea siempre positivo.
    const horas = Math.floor(diff / 60);
    const minutos = diff % 60;

    msg += `<br><br>Han pasado ${horas} hora${horas !== 1 ? "s" : ""} y ${minutos} minuto${minutos !== 1 ? "s" : ""}.`;

    output.innerHTML = msg;
  });
}