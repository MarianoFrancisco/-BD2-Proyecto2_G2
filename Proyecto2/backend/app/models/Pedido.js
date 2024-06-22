/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import mongoose from 'mongoose';

const { Schema } = mongoose;

const pedidoSchema = new Schema({
    usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    libros: [
        {
            libro_id: { type: Schema.Types.ObjectId, ref: 'Libro', required: true },
            cantidad: { type: Number, required: true }
        }
    ],
    direccion_envio: { type: String, required: true },
    metodo_pago: { type: String, required: true },
    estado: { type: String, enum: ['En proceso', 'Enviado', 'Entregado'], default: 'En proceso' },
    fecha_pedido: { type: Date, default: Date.now },
    fecha_envio: { type: Date },
    fecha_entrega: { type: Date }
}, {
    collection: 'Pedido',
    versionKey: false
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

export default Pedido;