import "./App.css";

function App() {
  // TODO 1: Inicializar estado o usar el custom hook useInventory
  // TODO 2: Crear estado para la notificación temporal

  return (
    <div className="app-container">
      <h1>📦 Tech Inventory</h1>

      {/* TODO: Mostrar notificación si existe */}

      <div className="layout">
        <aside>
          <h2>Añadir Nuevo Material</h2>
          {/* TODO: Renderizar AddItemForm */}
        </aside>

        <main>
          <h2>Listado de Inventario</h2>
          <div className="grid">
            {/* TODO: Mapear los items y renderizar InventoryCard por cada uno */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
