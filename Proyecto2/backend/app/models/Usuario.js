/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usuario = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    direccion: { type: String, required: true },
    fecha_registro: { type: Date, default: Date.now },
    contrasena: { type: String, required: true },
    compras: [{ type: Schema.Types.ObjectId, ref: 'Pedido' }],
    rol: { type: String, enum: ['Administrador', 'Cliente'], required: true }
});

module.exports = mongoose.model('Usuario', Usuario);

