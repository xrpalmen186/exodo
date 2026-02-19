const usuario = { nombre: "Luisa", avatar: "img.jpg" };

const tarjeta = `
    <div class="card">
        <img src="${usuario.avatar}" alt="${usuario.nombre}" />
        <h2>${usuario.nombre}</h2>
    </div>
`;
console.log(tarjeta);
