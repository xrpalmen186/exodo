// src/components/ProductList.tsx
import type { Product } from '../types';

interface Props {
    products: Product[];
    onDelete: (id: string) => void;
    onUpdateStock: (id: string, amount: number) => void;
}

const ProductList = ({ products, onDelete, onUpdateStock }: Props) => {
    if (products.length === 0) return <p>No hay productos en el inventario.</p>;

    return (
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {products.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #ddd' }}>
                        <td>{p.name}</td>
                        <td>{p.category}</td>
                        <td>{p.price}€</td>
                        <td>
                            <button onClick={() => onUpdateStock(p.id, -1)}>-</button>
                            <span style={{ margin: '0 10px', fontWeight: p.quantity < 5 ? 'bold' : 'normal', color: p.quantity < 5 ? 'red' : 'inherit' }}>
                                {p.quantity}
                            </span>
                            <button onClick={() => onUpdateStock(p.id, 1)}>+</button>
                        </td>
                        <td>
                            <button onClick={() => onDelete(p.id)} style={{ color: 'red' }}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductList;