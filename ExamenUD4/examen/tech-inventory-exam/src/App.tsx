import "./App.css";
import AddItemForm from "./components/AddItemForm";
import InventoryCard from "./components/InventoryCard";
import type { InventoryItem } from "./types";
import { useState, useEffect } from 'react'

function App() {
  // Raimundo Palma Méndez 2ºDAW

  // TODO 1: Inicializar estado o usar el custom hook useInventory
  // TODO 2: Crear estado para la notificación temporal
  
  const [notification, setNotification] = useState('');

  //voy a guardar los productos en local para no perderlos y así probar todo más rápido de esta manera, prefiero usar esto en vez de renderizar los productos de prueba (pero igualmente lo implemento pero comentado en AddItemForm.tsx)
  
  const [items, setItems] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('inventory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(items));
  }, [items]);  

  //funciones de gestión
  const addItem = (newItem: InventoryItem) => {
    setItems([...items, newItem]);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const updateStock = (id: string, amount: number) => {
    setItems(items.map(i => 
      i.id === id ? { ...i, quantity: Math.max(0, i.quantity + amount) } : i
    ));
  };

  const mostrarNotificacion = (notifications: string) => {
    setNotification(notifications);

    //a los tres segundos quitamos la notificacion
    setTimeout(() => {
      setNotification('');
    }, 3000)
  }

  return (
    <div className="app-container">
      <h1>📦 Tech Inventory</h1>

      {notification ?
        <div className="notification">
          {notification}
        </div>
        :
        <div></div>
      }

      <div className="layout">
        <aside>
          <h2>Añadir Nuevo Material</h2>
          <AddItemForm 
            onAdd={addItem}
            notify={mostrarNotificacion}
          />
        </aside>

        <main>
          <h2>Listado de Inventario</h2>
          <div className="grid">
            <InventoryCard
              items={items} 
              onDelete={deleteItem} 
              onUpdateStock={updateStock}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
