/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import Pedido from '../models/Pedido.js';
import Libro from '../models/Libro.js';
import mongoose from 'mongoose';

const getOrder = async (req, res) => {
    try {
        const pedidos = await Pedido.find().populate('usuario_id libros.libro_id');
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const searchOrder = async (req, res) => {
    try {
        let query = {};

        if (req.query.id) {
            query._id = req.query.id;
        }

        if (req.query.estado) {
            query.estado = req.query.estado;
        }

        const pedidos = await Pedido.find(query).populate('usuario_id libros.libro_id');
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addOrder = async (req, res) => {
    const { usuario_id, libros, direccion_envio, metodo_pago } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        for (const item of libros) {
            const libro = await Libro.findById(item.libro_id).session(session);
            if (!libro) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({ error: 'Book not found' });
            }
            if (libro.cantidad_stock < item.cantidad) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({ error: `Not enough stock for book ${libro.titulo}` });
            }
            libro.cantidad_stock -= item.cantidad;
            await libro.save({ session });
        }

        const newPedido = new Pedido({
            usuario_id,
            libros,
            direccion_envio,
            metodo_pago
        });

        const savedPedido = await newPedido.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ message: 'Order placed successfully', pedido: savedPedido });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    try {
        const pedido = await Pedido.findById(id);
        if (!pedido) {
            return res.status(404).json({ error: 'Order not found' });
        }

        if (!['En proceso', 'Enviado', 'Entregado'].includes(estado)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        pedido.estado = estado;
        if (estado === 'Enviado') {
            pedido.fecha_envio = new Date();
        } else if (estado === 'Entregado') {
            pedido.fecha_entrega = new Date();
        }

        await pedido.save();
        res.json({ message: 'Order status updated successfully', pedido });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export {
    addOrder,
    updateOrderStatus,
    searchOrder,
    getOrder
};