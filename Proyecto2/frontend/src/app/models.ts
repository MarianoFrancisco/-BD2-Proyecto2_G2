export interface Author {
    _id: string;
    nombre: string;
    biografia: string;
    foto_url: string;
  }
  
  export interface Genero {
    _id: string;
    nombre: string;
  }
  
  export interface Book {
    _id: string;
    titulo: string;
    autor_id: Author;
    descripcion: string;
    genero_id: Genero;
    fecha_publicacion: string;
    disponibilidad: boolean;
    cantidad_stock: number;
    puntuacion_promedio: number;
    precio: number;
    imagen_url: string;
  }
  
 
  export interface Usuario {
    _id: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
  }

  export interface Order {
    _id: string;
    usuario_id: Usuario;
    libros: {
      libro_id: Book;
      cantidad: number;
      _id: string;
    }[];
    direccion_envio: string;
    metodo_pago: string;
    estado: string;
    fecha_pedido: string;
    fecha_envio: string;
    fecha_entrega: string;
  }

  export interface Review {
    _id: string;
    usuario_id: {
      _id: string;
      nombre: string;
      apellido: string;
      fecha_registro: string;
    };
    comentario: string;
    puntuacion: number;
    fecha: string;
  }
  
  export interface AuthorWithBooks extends Author {
    libros: Book[];
  }