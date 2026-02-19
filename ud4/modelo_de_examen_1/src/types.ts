// src/types.ts

export interface Product {
  id: string;
  name: string;
  quantity: number;
  category: string;
  price: number;
}

// ¡Asegúrate de que este 'export' esté aquí!
export type Category = 'Electrónica' | 'Hogar' | 'Alimentos' | 'Otros';