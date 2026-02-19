// src/components/ProductForm.tsx
import { useState } from 'react';
import type { Product, Category } from '../types';

interface Props {
    onAdd: (product: Product) => void;
}

const ProductForm = ({ onAdd }: Props) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState<Category>('Otros');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || price <= 0) return alert("Datos inválidos");

        const newProduct: Product = {
            id: crypto.randomUUID(), // Genera ID único
            name,
            price,
            category,
            quantity: 0
        };

        onAdd(newProduct);
        setName(''); // Limpiar formulario
        setPrice(0);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input
                placeholder="Nombre producto"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Precio"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
                <option value="Electrónica">Electrónica</option>
                <option value="Hogar">Hogar</option>
                <option value="Alimentos">Alimentos</option>
                <option value="Otros">Otros</option>
            </select>
            <button type="submit">Añadir</button>
        </form>
    );
};

export default ProductForm;