const t = [];
t.push(34);
t.push(12);
t.push(19);
t.push(23);
t.push(48);
t.push(5);
t.push(65);
t.push(3);

const ordenaDescendente = (a, b) => b - a;

document.getElementById("inicial").innerHTML = t.join("-");

t.sort(ordenaParImpar);

document.getElementById("ordenado").innerHTML = t.join("-");

function ordenaAscendente(a, b) {
  return a - b;
}

function ordenaParImpar(a, b) {
  if (a % 2 == 0 && b % 2 == 0) {
    return a - b;
  } else if (a % 2 == 0 && b % 2 > 0) {
    return -1;
  } else if (a % 2 > 0 && b % 2 == 0) {
    return 1;
  } else {
    return a - b;
  }
}
