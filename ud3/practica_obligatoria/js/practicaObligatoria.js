// Datos y carga inicial (has proporcionado esto; lo mantenemos)
const comerciales = [
  "Carmen Gómez",
  "Lucía Gil",
  "Andrés Martínez",
  "Antonio Salinas",
];

const clientes = [
  [
    "Alimentación Daniel",
    "Cash El Puerto",
    "Ultramarinos Claudia",
    "Supermercado Nazareno",
    "Alimentación Guzmán",
    "Supermercado Superprecio",
    "Kiosko La Espera",
    "M&B Alimentación",
    "Ultramarinos Vistabella",
  ],
  [
    "Ultramarinos La Delicia",
    "Supermercado La Esquinita",
    "Alimentación Gómez",
    "Supermercado El Veloz",
    "Kiosko 24h Desavío",
    "Tienda La Manchega",
    "Ultramarinos Tajo",
    "Alimentación Víctor",
  ],
  [
    "Alimentación Millán",
    "Supermercado La Guinda",
    "Kiosko Callejón",
    "Tienda Cantero",
    "Ultramarinos Mérida",
    "Alimentación Moreno",
    "Cash El Hostelero",
  ],
  [
    "Kiosko La Lumbre",
    "Tienda Abad",
    "Ultramarinos Hernández",
    "Alimentación Cervantes",
    "Cash El Panal",
    "CyR Alimentación",
    "Supermercado Los Mosqueteros",
    "Alimentación Carpanta",
    "Supermercado El Percebe",
  ],
];
const categorias = ["Aceite", "Encurtidos", "Salsas"];

const catalogo = new Catalogo();
const gestor = new Gestor();

function cargaDatosIniciales() {
  catalogo.addProducto(1, "Aceite Oliva Virgen Extra 1l (Caja 20)", 178.15, 0);
  catalogo.addProducto(
    2,
    "Aceite Oliva Virgen Extra 700ml (Caja 30)",
    208.5,
    0
  );
  catalogo.addProducto(3, "Aceite Oliva Virgen Extra 5l (Caja 6)", 247.5, 0);
  catalogo.addProducto(4, "Aceite Oliva 1l (Caja 20)", 109.25, 0);
  catalogo.addProducto(5, "Aceituna Gordal 340gr (Caja de 50)", 180.75, 1);
  catalogo.addProducto(
    6,
    "Aceituna Gordal deshuesada 350gr (Caja de 50)",
    205.45,
    1
  );
  catalogo.addProducto(7, "Aceituna Manzanilla 250 gr (Caja de 50)", 124.85, 1);
  catalogo.addProducto(
    8,
    "Aceituna Manzanilla deshuesada 250 gr (Caja de 50)",
    141.35,
    1
  );
  catalogo.addProducto(9, "Aceituna Negra 350gr (Caja de 50)", 87.5, 1);
  catalogo.addProducto(
    10,
    "Aceituna Negra deshuesada 350gr (Caja de 50)",
    99.35,
    1
  );
  catalogo.addProducto(11, "Mayonesa 350gr (Caja de 50)", 124.45, 2);
  catalogo.addProducto(12, "Mayonesa 1Kg (Caja de 30)", 178.65, 2);
  catalogo.addProducto(13, "Salsa Cocktail 350gr (Caja de 50)", 99.65, 2);
  catalogo.addProducto(14, "Salsa Gaucha 350gr (Caja de 50)", 124.85, 2);
  catalogo.addProducto(15, "Salsa Alioli 350 gr (Caja de 50)", 113.75, 2);
  catalogo.addProducto(16, "Salsa Barbacoa 500gr (Caja de 30)", 67.5, 2);
}

// ---------- Código de interfaz y eventos ----------

/* Referencias DOM */
const selComerciales = document.querySelector("select[name='comerciales']");
const selCategorias = document.querySelector("select[name='categorias']");
const selProductos = document.querySelector("select[name='productos']");
const panelClientes = document.getElementById("clientes");
const panelPedido = document.getElementById("pedido");
const teclado = document.getElementById("teclado");

/* Inicialización */
function initApp() {
  cargaDatosIniciales();
  // Llenar comerciales
  comerciales.forEach((c, idx) => {
    const option = document.createElement("option");
    option.value = idx;
    option.textContent = c;
    selComerciales.appendChild(option);
  });
  selComerciales.selectedIndex = gestor.comercialActual;

  // Llenar categorias
  gestor.categorias.forEach((cat, idx) => {
    const option = document.createElement("option");
    option.value = idx;
    option.textContent = cat;
    selCategorias.appendChild(option);
  });
  selCategorias.selectedIndex = 0;

  // Rellenar productos para la categoría inicial
  rellenarProductosPorCategoria(parseInt(selCategorias.value, 10));

  // Render inicial de clientes y pedido
  renderClientes();
  renderPedido();

  // Event listeners
  selComerciales.addEventListener("change", (e) => {
    const idx = parseInt(e.target.value, 10);
    gestor.setComercialActual(idx);
    // al cambiar comercial, seleccionamos el primer cliente por defecto
    gestor.setClienteActual(0);
    renderClientes();
    renderPedido();
  });

  selCategorias.addEventListener("change", (e) => {
    const idCat = parseInt(e.target.value, 10);
    rellenarProductosPorCategoria(idCat);
  });

  // Delegación para clic en clientes
  panelClientes.addEventListener("click", (e) => {
    // si se hace click en un cliente (tiene data-index)
    const target = e.target.closest(".cliente");
    if (!target) return;
    const idxCliente = parseInt(target.dataset.index, 10);
    gestor.setClienteActual(idxCliente);
    renderClientes();
    renderPedido();
  });

  // Delegación para botones + / - en la tabla del pedido
  panelPedido.addEventListener("click", (e) => {
    const btnInc = e.target.closest(".inc-btn");
    const btnDec = e.target.closest(".dec-btn");
    const btnFinalizar = e.target.closest("#btnFinalizarPedido");

    if (btnInc) {
      const idProducto = parseInt(btnInc.dataset.producto, 10);
      gestor.incrementarUnidades(idProducto, 1);
      renderPedido();
    } else if (btnDec) {
      const idProducto = parseInt(btnDec.dataset.producto, 10);
      const linea = gestor.buscarLinea(idProducto);
      if (!linea) return;
      if (linea.unidades > 1) {
        gestor.decrementarUnidades(idProducto, 1);
        renderPedido();
      } else {
        // preguntar confirmación para eliminar última unidad
        const confirmar = confirm("¿Desea eliminar la última unidad y la línea del pedido?");
        if (confirmar) {
          gestor.decrementarUnidades(idProducto, 1);
          renderPedido();
        }
      }
    } else if (btnFinalizar) {
      const confirmar = confirm("¿Finalizar pedido? Esto lo marcará como enviado y cobrado.");
      if (confirmar) {
        gestor.finalizarPedidoActual();
        renderClientes();
        renderPedido();
      }
    }
  });

  // Teclado: añadir unidades (1..9) al producto seleccionado
  teclado.addEventListener("click", (e) => {
    const btn = e.target.closest("input.tecla");
    if (!btn) return;
    const valor = parseInt(btn.value, 10);
    if (isNaN(valor) || valor < 1 || valor > 9) return;

    // obtener producto seleccionado
    const prodOption = selProductos.options[selProductos.selectedIndex];
    if (!prodOption) {
      alert("Seleccione primero un producto.");
      return;
    }
    const idProducto = parseInt(prodOption.value, 10);
    // si el producto ya existe en el pedido -> informar y no añadir
    const existente = gestor.buscarLinea(idProducto);
    if (existente) {
      alert("Ya existe una línea para este producto en el pedido. Use los botones + / - para modificar unidades.");
      return;
    }

    // Añadir hasta 9 unidades por pulsación
    const unidades = Math.min(9, Math.max(1, valor));
    const res = gestor.addLineaPedido(idProducto, unidades);
    if (!res.ok) {
      if (res.reason === "existe") {
        alert("Ya existe una línea para este producto. Use los botones de la línea para modificar unidades.");
      } else {
        alert("No se pudo añadir la línea de pedido.");
      }
      return;
    }
    renderClientes();
    renderPedido();
  });
}

/* Funciones UI */

function rellenarProductosPorCategoria(idCategoria) {
  selProductos.innerHTML = "";
  const lista = catalogo.getProductosByCategoria(idCategoria);
  lista.forEach((p) => {
    const option = document.createElement("option");
    option.value = p.idProducto;
    option.textContent = `${p.nombreProducto} — ${p.precioUnidad.toFixed(2)} €`;
    selProductos.appendChild(option);
  });
  if (selProductos.options.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No hay productos";
    selProductos.appendChild(option);
  } else {
    selProductos.selectedIndex = 0;
  }
}

function renderClientes() {
  // el panelClientes contiene un h1 y el select; nosotros añadiremos la zona de visualización
  // Buscaremos o crearemos un contenedor interno para las fichas
  let cont = panelClientes.querySelector(".contenedor-fichas");
  if (!cont) {
    cont = document.createElement("div");
    cont.className = "contenedor-fichas";
    cont.style.display = "flex";
    cont.style.flexWrap = "wrap";
    cont.style.marginTop = "10px";
    panelClientes.appendChild(cont);
  }
  cont.innerHTML = "";

  const listaClientes = gestor.clientes[gestor.comercialActual] || [];
  listaClientes.forEach((clienteObj, idx) => {
    const div = document.createElement("div");
    div.className = "cliente " + (clienteObj.cuentaAbierta ? "pendiente" : "pagado");
    div.dataset.index = idx;
    div.style.cursor = "pointer";
    div.style.flexDirection = "column";
    div.style.textAlign = "center";

    // marcar cliente seleccionado con borde
    if (idx === gestor.clienteActual) {
      div.style.outline = "3px solid #444";
    } else {
      div.style.outline = "none";
    }

    const nombre = document.createElement("div");
    nombre.textContent = clienteObj.nombre;
    nombre.style.padding = "6px";
    nombre.style.width = "100%";
    nombre.style.wordBreak = "break-word";
    div.appendChild(nombre);

    // Si el cliente tiene pedido, añadimos un pequeño resumen (nº líneas / total)
    const pedido = gestor.pedidos[gestor.comercialActual] && gestor.pedidos[gestor.comercialActual][idx] ? gestor.pedidos[gestor.comercialActual][idx] : [];
    if (pedido && pedido.length > 0) {
      const resumen = document.createElement("div");
      resumen.style.fontSize = "12px";
      resumen.style.marginTop = "6px";
      const total = pedido.reduce((acc, l) => {
        const p = catalogo.getProductoById(l.idProducto);
        return acc + (p ? p.precioUnidad * l.unidades : 0);
      }, 0);
      resumen.textContent = `${pedido.length} líneas — ${total.toFixed(2)} €`;
      div.appendChild(resumen);
    }

    cont.appendChild(div);
  });

  // asegurar que el select de comerciales muestre el comercial actual
  selComerciales.selectedIndex = gestor.comercialActual;
}

function renderPedido() {
  panelPedido.innerHTML = ""; // limpiamos

  const cliente = gestor.getClienteActual();
  const pedido = gestor.getPedidoActual();

  const title = document.createElement("h1");
  title.textContent = "Pedido";
  panelPedido.appendChild(title);

  const clienteNombre = document.createElement("h3");
  clienteNombre.textContent = cliente ? cliente.nombre : "Cliente no seleccionado";
  panelPedido.appendChild(clienteNombre);

  if (!pedido || pedido.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.textContent = "Sin líneas en el pedido.";
    panelPedido.appendChild(mensaje);
  } else {
    // crear tabla con las líneas
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>Producto</th>
        <th>Unidades</th>
        <th>Precio u.</th>
        <th>Importe</th>
        <th>Acciones</th>
      </tr>
    `;
    table.appendChild(thead);
    const tbody = document.createElement("tbody");

    pedido.forEach((linea) => {
      const prod = catalogo.getProductoById(linea.idProducto);
      const tr = document.createElement("tr");
      const tdNombre = document.createElement("td");
      tdNombre.textContent = prod ? prod.nombreProducto : `Producto ${linea.idProducto}`;
      const tdUnidades = document.createElement("td");
      tdUnidades.textContent = linea.unidades;
      const tdPrecio = document.createElement("td");
      tdPrecio.textContent = prod ? prod.precioUnidad.toFixed(2) + " €" : "-";
      const tdImporte = document.createElement("td");
      tdImporte.textContent = prod ? (linea.unidades * prod.precioUnidad).toFixed(2) + " €" : "-";
      const tdAcc = document.createElement("td");

      // Botones + y -
      const btnInc = document.createElement("button");
      btnInc.className = "inc-btn boton";
      btnInc.textContent = "+";
      btnInc.dataset.producto = linea.idProducto;

      const btnDec = document.createElement("button");
      btnDec.className = "dec-btn boton";
      btnDec.textContent = "-";
      btnDec.dataset.producto = linea.idProducto;

      tdAcc.appendChild(btnInc);
      tdAcc.appendChild(btnDec);

      tr.appendChild(tdNombre);
      tr.appendChild(tdUnidades);
      tr.appendChild(tdPrecio);
      tr.appendChild(tdImporte);
      tr.appendChild(tdAcc);
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    panelPedido.appendChild(table);

    // Total
    const total = gestor.totalPedidoActual();
    const totalDiv = document.createElement("div");
    totalDiv.style.marginTop = "10px";
    totalDiv.innerHTML = `<strong>Total pedido:</strong> ${total.toFixed(2)} €`;
    panelPedido.appendChild(totalDiv);

    // Botón finalizar pedido
    const btnFinal = document.createElement("button");
    btnFinal.id = "btnFinalizarPedido";
    btnFinal.className = "boton";
    btnFinal.textContent = "PEDIDO ENVIADO Y COBRADO";
    btnFinal.style.display = "block";
    btnFinal.style.marginTop = "8px";
    panelPedido.appendChild(btnFinal);
  }
}

/* Arrancar aplicación cuando DOM esté listo */
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});