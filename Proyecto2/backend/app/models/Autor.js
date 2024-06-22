/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import mongoose from 'mongoose';

const { Schema } = mongoose;

const autorSchema = new Schema({
    nombre: { type: String, required: true },
    biografia: { type: String, required: true },
    foto_url: { type: String, required: true },
    libros: [{ type: Schema.Types.ObjectId, ref: 'Libro' }]
}, {
    collection: 'Autor',
    versionKey: false
});

const Autor = mongoose.model('Autor', autorSchema);

export default Autor;