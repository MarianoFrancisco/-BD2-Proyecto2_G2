/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const Usuario = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    direccion: { type: String, required: true },
    fecha_registro: {
        type: Date,
        default: Date.now,
        get: function() {
            return this._fecha_registro.toISOString().slice(0, 10);
        }
    },
    contrasenia: { type: String, required: true },
    compras: [{ type: Schema.Types.ObjectId, ref: 'Pedido' }],
    rol: { type: String, enum: ['Administrador', 'Cliente'], required: true }
}, {
    collection: 'Usuario',
    versionKey: false
});

Usuario.pre('save', async function(next) {
    if (!this.isModified('contrasenia')) return next();
    const salt = await bcrypt.genSalt(10);
    this.contrasenia = await bcrypt.hash(this.contrasenia, salt);
    next();
});

Usuario.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.contrasenia);
};

module.exports = mongoose.model('Usuario', Usuario);

