
import type { InventoryItem } from '../types';


interface Props {
    items: InventoryItem[];
    onDelete: (id: string) => void;
    onUpdateStock: (id: string, amount: number) => void;
}

const InventoryCard = ({ items, onDelete, onUpdateStock }: Props) => {

    if (items.length === 0) return <p>No hay productos en el inventario.</p>;

    return (
        items.map(i => (
            <div className={i.quantity <= 0 ? "out-of-stock card" : "card"} key={i.id}>
                <h3>{i.name} {i.isCritical ? <span className="badge critical">⚠️ Crítico</span> : ''}</h3>
                <p>{i.category}</p>

                <div className='quantity-controls' style={{ display: 'flex'}}>
                    <button onClick={() => onUpdateStock(i.id, -1)}>-</button>
                    <p style={{ margin: '0 10px', fontWeight: i.quantity < 5 ? 'bold' : 'normal', color: i.quantity < 5 ? 'red' : 'inherit' }}>
                        {i.quantity > 0 ? <span>Stock: {i.quantity}</span> : <span className='error'>Agotado</span>}
                    </p>
                    {/*sé que no se pide que tenga color rojo el número de cantidad si es menor a 5 pero aún así lo implementé */}
                    <button onClick={() => onUpdateStock(i.id, 1)}>+</button>
                </div>
                <button  style={{ marginTop: '20px'}} onClick={() => onDelete(i.id)}>Eliminar</button>
            </div>
        ))
    );
};

export default InventoryCard;