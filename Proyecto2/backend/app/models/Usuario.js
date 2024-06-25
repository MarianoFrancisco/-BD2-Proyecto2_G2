/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const usuarioSchema = new Schema({
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
    fecha_nacimiento: { type: Date, required: true},
    contrasenia: { type: String, required: true },
    compras: [{ type: Schema.Types.ObjectId, ref: 'Pedido' }],
    rol: { type: String, enum: ['Administrador', 'Cliente'], required: true },
    metodo_pago: { type: String, enum: ['Efectivo'], default: 'Efectivo' }
}, {
    collection: 'Usuario',
    versionKey: false
});

usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('contrasenia')) return next();
    const salt = await bcrypt.genSalt(10);
    this.contrasenia = await bcrypt.hash(this.contrasenia, salt);
    next();
});

usuarioSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.contrasenia);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;