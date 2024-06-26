export interface Genero {
  _id: string;
  nombre: string;
}

export interface Libro {
  _id: string;
  titulo: string;
  descripcion: string;
  genero_id: Genero;
  fecha_publicacion: Date;
  cantidad_stock: number;
  puntuacion_promedio: number;
  precio: number;
  imagen_url: string;
}

export interface Autor {
  _id: string;
  nombre: string;
  biografia: string;
  foto_url: string;
  libros: Libro[];
}
