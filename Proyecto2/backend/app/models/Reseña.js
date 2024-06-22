/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import mongoose from 'mongoose';

const { Schema } = mongoose;

const reseñaSchema = new Schema({
    libro_id: { type: Schema.Types.ObjectId, ref: 'Libro', required: true },
    usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    comentario: { type: String, required: true },
    puntuacion: { type: Number, required: true },
    fecha: { type: Date, default: Date.now }
}, {
    collection: 'Reseña',
    versionKey: false
});

const Reseña = mongoose.model('Reseña', reseñaSchema);

export default Reseña;