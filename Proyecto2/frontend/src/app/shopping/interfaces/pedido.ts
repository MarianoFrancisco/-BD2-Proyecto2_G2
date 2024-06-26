export interface Pedido {
    usuario_id: string;
    libros: libro[];
    direccion_envio: string;
    metodo_pago: string;
    estado: estadoPedido;
    fecha_pedido: Date;
    fecha_envio: Date;
    fecha_entrega: Date;
}

export interface libro {
    libro_id: string;
    cantidad: number;
}

export enum estadoPedido {
    'En proceso', 'Enviado', 'Entregado'
}
