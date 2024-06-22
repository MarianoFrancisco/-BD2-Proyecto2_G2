/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reseña = new Schema({
    libro_id: { type: Schema.Types.ObjectId, ref: 'Libro', required: true },
    usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    comentario: { type: String, required: true },
    puntuacion: { type: Number, required: true },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reseña', Reseña);

