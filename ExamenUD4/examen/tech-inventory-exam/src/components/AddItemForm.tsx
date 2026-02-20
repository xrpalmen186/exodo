// src/components/ProductForm.tsx
import { useEffect, useState } from 'react';
import type { InventoryItem } from '../types';
import { items } from '../hooks/useInventory';

interface Props {
    onAdd: (items: InventoryItem) => void;
    notify: (notifications: string) => void;
}

const AddItemForm = ({ onAdd, notify }: Props) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [category, setCategory] = useState('Otro');
    const [isCritical, setCritical] = useState(false);

    //esto se ejecutará la primera vez que se renderice la app, pero como voy a guardar los productos en el localstorage no voy a introducir los datos de prueba.

    // const testItems = items;

    // useEffect(() => {
    //     onAdd(testItems[0]);
    // }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || quantity < 0) return alert("Datos inválidos");

        //creo el item
        const newItem: InventoryItem = {
            id: crypto.randomUUID(),
            name,
            category,
            quantity,
            isCritical
        };  

        //añado el item
        onAdd(newItem);

        notify("¡Nuevo item añadido!");

        //limpia el formulario
        setName(''); 
        setQuantity(0);
        setCritical(false);
        setCategory('Otro');
    };

    return (
        <form onSubmit={handleSubmit} className='form' style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input
                placeholder="Nombre producto"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Portátil">Portátil</option>
                <option value="Monitor">Monitor</option>
                <option value="Periférico">Periférico</option>
                <option value="Otro">Otro</option>
            </select>
            <input
                placeholder="Cantidad"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            />

            <div>
                <input 
                    type='checkbox'
                    checked={isCritical}
                    onChange={(e) => setCritical(Boolean(e.target.value))}
                />
                <span>Material Crítico</span>
            </div>
            
            <button type="submit">Añadir</button>
        </form>
    );
};

export default AddItemForm;