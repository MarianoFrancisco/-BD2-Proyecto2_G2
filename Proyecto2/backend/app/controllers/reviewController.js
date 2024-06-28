/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import mongoose from 'mongoose';
import Reseña from '../models/Reseña.js';
import Libro from '../models/Libro.js';

const getReviewsByBookId = async (req, res) => {
    const { id } = req.query;

    try {
        const reviews = await Reseña.find({ libro_id: id })
            .populate({
                path: 'usuario_id',
                select: 'nombre apellido correo fecha_registro'
            })
            .select('-libro_id');

        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addReview = async (req, res) => {
    const { libro_id, comentario, puntuacion } = req.body;
    const usuario_id = req.id;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const existingReview = await Reseña.findOne({ libro_id, usuario_id }).session(session);
        if (existingReview) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ error: 'You have already reviewed this book' });
        }

        const newReview = new Reseña({
            libro_id,
            usuario_id,
            comentario,
            puntuacion
        });

        const savedReview = await newReview.save({ session });

        const reviews = await Reseña.find({ libro_id }).session(session);
        const totalReviews = reviews.length;

        let totalPuntuacion = 0;
        reviews.forEach(review => {
            totalPuntuacion += review.puntuacion;
        });

        const puntuacionPromedio = totalPuntuacion / totalReviews;

        await Libro.findByIdAndUpdate(libro_id, { puntuacion_promedio: puntuacionPromedio }, { new: true }).session(session);

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ message: 'Review successfully added', reseña: savedReview });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export {
    getReviewsByBookId,
    addReview
};