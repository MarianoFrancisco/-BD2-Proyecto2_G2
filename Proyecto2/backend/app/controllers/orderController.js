/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import Pedido from '../models/Pedido.js';
import Libro from '../models/Libro.js';
import Usuario from '../models/Usuario.js';
import mongoose from 'mongoose';

const getOrders = async (req, res) => {
    const { id } = req.query;

    try {
        if (id) {
            const pedido = await Pedido.findById(id)
                .populate({
                    path: 'libros.libro_id',
                    populate: { path: 'autor_id genero_id', select: 'nombre biografia foto_url' }
                })
                .populate({
                    path: 'usuario_id',
                    select: 'nombre apellido email telefono direccion'
                });

            if (!pedido) {
                return res.status(404).json({ error: 'Order not found' });
            }

            res.json(pedido);
        } else {
            const pedidos = await Pedido.find()
                .populate({
                    path: 'libros.libro_id',
                    populate: { path: 'autor_id genero_id', select: 'nombre biografia foto_url' }
                })
                .populate({
                    path: 'usuario_id',
                    select: 'nombre apellido email telefono direccion'
                });

            res.json(pedidos);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getTopBooks = async (req, res) => {
    try {
        const topBooks = await Pedido.aggregate([
            { $unwind: "$libros" },
            {
                $group: {
                    _id: "$libros.libro_id",
                    totalCantidad: { $sum: "$libros.cantidad" }
                }
            },
            { $sort: { totalCantidad: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "Libro",
                    localField: "_id",
                    foreignField: "_id",
                    as: "libro"
                }
            },
            { $unwind: "$libro" },
            {
                $lookup: {
                    from: "Autor",
                    localField: "libro.autor_id",
                    foreignField: "_id",
                    as: "autor"
                }
            },
            { $unwind: "$autor" },
            {
                $lookup: {
                    from: "GeneroLibro",
                    localField: "libro.genero_id",
                    foreignField: "_id",
                    as: "genero"
                }
            },
            { $unwind: "$genero" },
            {
                $project: {
                    _id: "$libro._id",
                    titulo: "$libro.titulo",
                    autor: "$autor.nombre",
                    descripcion: "$libro.descripcion",
                    genero: "$genero.nombre",
                    fecha_publicacion: "$libro.fecha_publicacion",
                    puntuacion_promedio: "$libro.puntuacion_promedio",
                    imagen_url: "$libro.imagen_url",
                    totalCantidad: 1
                }
            }
        ]);

        res.json(topBooks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const searchOrder = async (req, res) => {
    try {
        let query = {};

        if (req.query.id) {
            query.usuario_id = req.query.id;
        }

        if (req.query.estado) {
            query.estado = req.query.estado;
        }

        const pedidos = await Pedido.find(query)
            .populate({
                path: 'libros.libro_id',
                populate: { path: 'autor_id genero_id', select: 'nombre biografia foto_url' }
            })
            .populate({
                path: 'usuario_id',
                select: 'nombre apellido email telefono direccion'
            });

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

        const usuario = await Usuario.findById(usuario_id).session(session);
        if (!usuario) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ error: 'User not found' });
        }

        usuario.compras.push(savedPedido._id);
        await usuario.save({ session });

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
    getOrders,
    getTopBooks
};