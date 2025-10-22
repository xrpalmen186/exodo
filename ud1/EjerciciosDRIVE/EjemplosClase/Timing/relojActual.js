function imprimeFecha() {
  const d = new Date();
  document.getElementById("reloj").innerHTML = d.toLocaleTimeString();
}

setInterval(imprimeFecha, 1000);
