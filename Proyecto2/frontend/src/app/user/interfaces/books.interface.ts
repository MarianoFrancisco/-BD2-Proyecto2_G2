export interface Libro {
    titulo: string;
    autor_id: string;
    descripcion: string;
    genero_id: string;
    fecha_publicacion: Date;
    disponibilidad: boolean;
    cantidad_stock: number;
    puntuacion_promedio: number;
    precio: number;
    imagen_url: string;
  }
  