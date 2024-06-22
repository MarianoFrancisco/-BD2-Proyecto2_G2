/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Carrito = new Schema({
    usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    libros: [
        {
            libro_id: { type: Schema.Types.ObjectId, ref: 'Libro', required: true },
            cantidad: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true }
}, {
    collection: 'Carrito',
    versionKey: false
});

module.exports = mongoose.model('Carrito', Carrito);

