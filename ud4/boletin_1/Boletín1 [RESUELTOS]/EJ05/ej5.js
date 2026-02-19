const user = { nombre: "Pedro", email: "pedro@email.com" };

const mostrarPerfil = ({ nombre, email, rol = "invitado" }) => {
  console.log(`Usuario: ${nombre}, Email: ${email}, Rol: ${rol}`);
};

mostrarPerfil(user);
