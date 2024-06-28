/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import mongoose from 'mongoose';

const { Schema } = mongoose;

const libroSchema = new Schema({
    titulo: { type: String, required: true },
    autor_id: { type: Schema.Types.ObjectId, ref: 'Autor', required: true },
    descripcion: { type: String, required: true },
    genero_id: { type: Schema.Types.ObjectId, ref: 'GeneroLibro', required: true },
    fecha_publicacion: { type: Date, required: true },
    disponibilidad: { type: Boolean, required: true },
    cantidad_stock: { type: Number, required: true },
    puntuacion_promedio: { type: Number, default: 0 },
    precio: { type: Number, required: true },
    imagen_url: { type: String, required: true }
}, {
    collection: 'Libro',
    versionKey: false
});

const Libro = mongoose.model('Libro', libroSchema);

export default Libro;