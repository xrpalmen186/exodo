document
  .getElementById("captcha")
  .addEventListener("mouseover", muestraCaptcha);
document.getElementById("captcha").addEventListener("mouseout", ocultaCaptcha);
formulario.addEventListener("submit", validarFormulario);

function muestraCaptcha() {
  const number = random(1000, 9999);
  const code = document.getElementById("code");
  const nodoCaptchaNuevo = document.createTextNode(number);
  code.style.visibility = "visible";
  code.childNodes[0].replaceWith(nodoCaptchaNuevo); //Es childNodes[0] porque sustituimos el nodo hoja (texto)
}

function ocultaCaptcha() {
  document.getElementById("code").style.visibility = "hidden";
}

function validarFormulario(event) {
  const captchaUsuario = document.getElementById("verify").value;
  const captchaCorrecto = document.getElementById("code").textContent;
  const aciertoCaptcha = captchaCorrecto === captchaUsuario;
  if (!aciertoCaptcha) {
    alert("Captcha Incorrecto");
    event.preventDefault();
  }
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
