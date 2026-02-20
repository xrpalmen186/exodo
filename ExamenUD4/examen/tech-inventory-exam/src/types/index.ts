export interface InventoryItem {
    id: string;
    name: string;
    category: string;
    quantity: number;
    isCritical?: boolean;
}