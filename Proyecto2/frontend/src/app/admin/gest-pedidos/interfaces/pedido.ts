import { PedidoLibros } from "./pedido-libros";
import { PedidoUsuario } from "./pedido-usuario";

export interface Pedido {
    _id: string;
    usuario_id: PedidoUsuario;
    libros: PedidoLibros[];
    direccion_envio: string;
    metodo_pago: string;
    estado: string;
    fecha_pedido: Date;
    fecha_envio: Date;
    fecha_entrega:Date;

}
