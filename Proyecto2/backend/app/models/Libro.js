/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Libro = new Schema({
    titulo: { type: String, required: true },
    autor_id: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    descripcion: { type: String, required: true },
    genero: { type: String, required: true },
    fecha_publicacion: { type: Date, required: true },
    disponibilidad: { type: Boolean, required: true },
    cantidad_stock: { type: Number, required: true },
    puntuacion_promedio: { type: Number, default: 0 },
    precio: { type: Number, required: true },
    imagen_url: { type: String, required: true }
});

module.exports = mongoose.model('Libro', Libro);
