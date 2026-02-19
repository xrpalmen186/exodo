// --- 1. REFERENCIAS AL DOM ---
const cartList = document.getElementById("cart-list");
const cartCounter = document.getElementById("cart-counter");
const debugContent = document.getElementById("debug-content");
const clearBtn = document.getElementById("clear-btn");

// Clave constante para evitar erratas ("magic strings")
const CART_KEY = "shopping_cart";

// --- 2. FUNCIÓN DE RENDERIZADO (VISUALIZACIÓN) ---
// Esta función se encarga de pintar el array en pantalla.
const renderCart = (cartArray) => {
  // A. Actualizamos el contador rojo
  cartCounter.textContent = cartArray.length;

  // B. Actualizamos el Panel de Debug (Didáctico)
  // Esto muestra a los alumnos cómo se ve el texto real en la memoria
  debugContent.textContent = JSON.stringify(cartArray, null, 2);

  // C. Limpiamos la lista actual para repintarla
  cartList.innerHTML = "";

  // D. Si está vacío, mostramos mensaje
  if (cartArray.length === 0) {
    cartList.innerHTML =
      '<li style="color: #999; text-align: center;">Carrito vacío</li>';
    return;
  }

  // E. Generamos el HTML para cada producto
  cartArray.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
                <span style="font-weight:500">${item.name}</span> 
                <span style="color:#e74c3c">${item.price}€</span>
            `;
    cartList.append(li);
  });
};

// --- 3. LÓGICA DE LOCALSTORAGE (SOLUCIÓN) ---

// [LECTURA] Recuperar datos
const getCart = () => {
  try {
    // 1. Leemos la cadena de texto
    const storedData = localStorage.getItem(CART_KEY);

    // 2. Si es null (no existe), devolvemos array vacío
    if (storedData === null) {
      return [];
    }

    // 3. Si existe, convertimos Texto -> Objeto (Array)
    return JSON.parse(storedData);
  } catch (error) {
    // Si el JSON está corrupto (alguien lo editó a mano mal), evitamos que la web se rompa
    console.error("Error al leer localStorage:", error);
    return [];
  }
};

// [ESCRITURA] Añadir producto
const addToCart = (product) => {
  // 1. Obtenemos el estado actual (lo que ya había)
  const currentCart = getCart();

  // 2. Modificamos el array añadiendo el nuevo producto
  currentCart.push(product);

  // 3. Guardamos: Array -> Texto
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(currentCart));

    // 4. Importante: Actualizamos la vista inmediatamente
    renderCart(currentCart);

    console.log(`Añadido: ${product.name}`);
  } catch (error) {
    if (error.name === "QuotaExceededError") {
      alert("¡Memoria llena! No se puede guardar más.");
    } else {
      console.error("Error al guardar:", error);
    }
  }
};

// [LIMPIEZA] Vaciar carrito
clearBtn.addEventListener("click", () => {
  // 1. Borramos la clave del navegador
  localStorage.removeItem(CART_KEY);

  // 2. Actualizamos la vista con un array vacío
  renderCart([]);

  console.log("Carrito vaciado.");
});

// --- 4. INICIALIZACIÓN ---
// Al abrir la página, leemos lo que hay y lo pintamos
const initialCart = getCart();
renderCart(initialCart);
