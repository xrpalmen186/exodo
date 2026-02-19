const estado = { loading: true, error: null, data: [45,53,23] };

const nuevoEstado = {
  ...estado,
  loading: false,
};

console.log(estado.loading); // true (intacto)
console.log(nuevoEstado.loading); // false
console.log(estado);
console.log(nuevoEstado);
