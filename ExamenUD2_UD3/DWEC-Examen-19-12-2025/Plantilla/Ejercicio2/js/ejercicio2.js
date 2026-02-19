// Funcionalidad de reinicio
document
  .getElementById("btnRestaurar")
  .addEventListener("click", () => location.reload());


window.addEventListener("DOMContentLoaded", () => {
  const btnMover = document.getElementById("btnMover");

  btnMover.addEventListener("click", () => {

    const checkboxes = document.querySelectorAll("#origen .check-prod:checked");
    if (checkboxes.length === 0) {
      alert("Selecciona al menos un producto en el PALÉ DE CARGA");
      return;
    }

    const destinoSeleccionado = document.querySelector('input[name="destino"]:checked');
    if (!destinoSeleccionado) {
      alert("Selecciona una ESTANTERÍA destino");
      return;
    }

    const idEstanteria = destinoSeleccionado.value;
    const estanteria = document.querySelector(`#${idEstanteria}`);
    const contenido = estanteria.querySelector(".contenido-estante");

    const metodo = document.querySelector('input[name="metodo"]:checked').value;

    const clonar = document.querySelector('input[name="clonar"]:checked').value === "si";

    checkboxes.forEach(chk => {
      const itemProducto = chk.parentNode;  // div.item-producto completo

      let itemAInsertar = itemProducto;
      if (clonar) {
        itemAInsertar = itemProducto.cloneNode(true);
        itemAInsertar.querySelector(".check-prod").checked = false;
      }

      switch (metodo) {
        case "append":
          contenido.appendChild(itemAInsertar);
          break;

        case "prepend":
          contenido.prepend(itemAInsertar);
          break;

        case "before":
          estanteria.insertAdjacentElement("beforebegin", itemAInsertar);
          break;

        case "after":
          estanteria.insertAdjacentElement("afterend", itemAInsertar);
          break;
      }

      if (!clonar) itemProducto.remove();
      else chk.checked = false;
    });
  });
});
