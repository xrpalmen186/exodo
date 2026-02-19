// ELEMENTOS DEL DOM
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// --- PARTE 1: RECUPERAR ESTADO AL CARGAR ---
// (El alumno debe implementar esto)
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️ Modo Claro";
}

// --- PARTE 2: ESCUCHAR EL CLICK Y GUARDAR ---
toggleBtn.addEventListener("click", () => {
  // 1. Alternar clase en el body
  body.classList.toggle("dark-mode");

  // 2. Verificar estado y guardar en localStorage
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️ Modo Claro";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙 Modo Oscuro";
  }
});
