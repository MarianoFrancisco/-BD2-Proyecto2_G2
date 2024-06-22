/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Autor = new Schema({
    nombre: { type: String, required: true },
    biografia: { type: String, required: true },
    foto_url: { type: String, required: true },
    libros: [{ type: Schema.Types.ObjectId, ref: 'Libro' }]
}, {
    collection: 'Autor',
    versionKey: false
});

module.exports = mongoose.model('Autor', Autor);
