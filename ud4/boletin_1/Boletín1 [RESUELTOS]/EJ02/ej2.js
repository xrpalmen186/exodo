// Retorno implícito de un objeto (paréntesis envolventes)
const ToogleButton = (texto) => ({
  type: "button",
  text: texto,
  className: "btn-primary",
});

console.log(ToogleButton("Click aquí"));
