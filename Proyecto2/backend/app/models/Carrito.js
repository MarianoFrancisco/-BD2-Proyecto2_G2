/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import mongoose from 'mongoose';

const { Schema } = mongoose;

const carritoSchema = new Schema({
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

const Carrito = mongoose.model('Carrito', carritoSchema);

export default Carrito;
