export interface LibroPedido {
    libro_id: string;
    titulo: string;
    autor_id: string;
    disponibilidad: boolean;
    cantidad_stock: number;
    precio: number;
    cantidad_pedido: number;
}
