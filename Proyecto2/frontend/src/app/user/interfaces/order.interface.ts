export enum Status {
    entregado = 'Entregado',
    enviado = 'Enviado',
    en_proceso = 'En proceso'
}

export interface Order {
    _id:             string;
    usuario_id:      UsuarioID;
    libros:          Libro[];
    direccion_envio: string;
    metodo_pago:     string;
    estado:          Status;
    fecha_pedido:    Date;
    fecha_envio?:    Date;
    fecha_entrega?:  Date;
}

export interface Libro {
    libro_id: LibroID;
    cantidad: number;
    _id:      string;
}

export interface LibroID {
    _id:                 string;
    titulo:              string;
    autor_id:            AutorID;
    descripcion:         string;
    genero_id:           GeneroID;
    fecha_publicacion:   Date;
    disponibilidad:      boolean;
    cantidad_stock:      number;
    puntuacion_promedio: number;
    precio:              number;
    imagen_url:          string;
}

export interface AutorID {
    _id:       string;
    nombre:    string;
    biografia: string;
    foto_url:  string;
}

export interface GeneroID {
    _id:    string;
    nombre: string;
}

export interface UsuarioID {
    _id:       string;
    nombre:    string;
    apellido:  string;
    email:     string;
    telefono:  string;
    direccion: string;
}
