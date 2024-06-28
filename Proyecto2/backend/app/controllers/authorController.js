/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import Autor from '../models/Autor.js';
import Libro from '../models/Libro.js';
import { uploadImageToS3 } from '../services/awsService.js';
import mongoose from 'mongoose';

const getAuthors = async (req, res) => {
    const { id } = req.query;

    try {
        if (id) {
            const autor = await Autor.findOne({ _id: id, disponibilidad: true })
                .populate({
                    path: 'libros',
                    match: { disponibilidad: true },
                    select: 'titulo descripcion fecha_publicacion cantidad_stock puntuacion_promedio precio imagen_url',
                    populate: { path: 'genero_id', select: 'nombre' }
                });

            if (!autor) {
                return res.status(404).json({ error: 'Author not found or not available' });
            }

            res.json(autor);
        } else {
            const autores = await Autor.find({ disponibilidad: true })
                .populate({
                    path: 'libros',
                    match: { disponibilidad: true },
                    select: 'titulo descripcion fecha_publicacion cantidad_stock puntuacion_promedio precio imagen_url',
                    populate: { path: 'genero_id', select: 'nombre' }
                });

            res.json(autores);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addAuthor = async (req, res) => {
    const { nombre, biografia } = req.body;

    try {
        let foto_url = null;

        if (req.file) {
            // Subir la imagen a S3
            const data = await uploadImageToS3(req.file.buffer);
            foto_url = data.Location;
        }

        const newAuthor = new Autor({
            nombre,
            biografia,
            foto_url
        });

        await newAuthor.save();

        res.status(201).json({ message: 'Author added successfully', author: newAuthor });
    } catch (error) {
        if (error.message.includes('File upload only supports the following filetypes')) {
            return res.status(400).json({ error: error.message });
        }
        res.status(400).json({ error: error.message });
    }
};

const deleteAuthor = async (req, res) => {
    const { id } = req.params;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const updatedAuthor = await Autor.findByIdAndUpdate(
            id,
            { disponibilidad: false },
            { new: true, session }
        );

        if (!updatedAuthor) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ error: 'Author not found' });
        }

        await Libro.updateMany(
            { autor_id: id },
            { disponibilidad: false },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        res.json({ message: 'Author marked as unavailable successfully', author: updatedAuthor });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        
        console.error('Error marking author as unavailable:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export {
    getAuthors,
    addAuthor,
    deleteAuthor
};