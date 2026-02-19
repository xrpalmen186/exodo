const sumar = (...numeros) => {
    return numeros.reduce((num, suma) => num + suma, 0);
};

console.log(sumar(1, 2, 3, 4, 10));