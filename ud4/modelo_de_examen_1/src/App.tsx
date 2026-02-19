// src/App.tsx
import { useState, useEffect } from 'react';
import type { Product } from './types';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
  // 1. Inicializar estado desde LocalStorage (Lazy Initial State)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('inventory');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. useEffect para guardar cambios automáticamente
  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(products));
  }, [products]);

  // Funciones de gestión
  const addProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateStock = (id: string, amount: number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, quantity: Math.max(0, p.quantity + amount) } : p
    ));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>📦 StockMaster TS</h1>
      <ProductForm onAdd={addProduct} />
      <hr />
      <ProductList 
        products={products} 
        onDelete={deleteProduct} 
        onUpdateStock={updateStock} 
      />
    </div>
  );
}

export default App;