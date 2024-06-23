import mongoose from 'mongoose';

const { Schema } = mongoose;

const generoLibroSchema = new Schema({
    nombre: { type: String, required: true, unique: true }
}, {
    collection: 'GeneroLibro',
    versionKey: false
});

const GeneroLibro = mongoose.model('GeneroLibro', generoLibroSchema);

export default GeneroLibro;