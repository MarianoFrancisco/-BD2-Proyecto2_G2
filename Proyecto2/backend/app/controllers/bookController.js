/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import Libro from '../models/Libro.js';
import Autor from '../models/Autor.js';
import GeneroLibro from '../models/GeneroLibro.js';
import mongoose from 'mongoose';
import { uploadImageToS3 } from '../services/awsService.js';

const getBooks = async (req, res) => {
    const { id } = req.query;
    const rol = req.user.rol;
    try {
        if (id) {
            const libro = await Libro.findById(id)
                .populate('autor_id', 'nombre biografia foto_url')
                .populate('genero_id', 'nombre');

            if (!libro) {
                return res.status(404).json({ error: 'Book not found' });
            }

            res.json(libro);
        } else {
            let libros = [];
            if (rol === 'Administrador') {
                const librosSinFilterar = await Libro.find()
                    .populate({
                        path: 'autor_id',
                        select: 'nombre biografia foto_url',
                        match: { disponibilidad: true }
                    })
                    .populate('genero_id', 'nombre')
                    .exec();

                libros = librosSinFilterar.filter(libro => libro.autor_id !== null);
            } else {
                libros = await Libro.find({ disponibilidad: true })
                    .populate('autor_id', 'nombre biografia foto_url')
                    .populate('genero_id', 'nombre');
            }
            res.json(libros);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const searchBooks = async (req, res) => {
    try {
        let query = { disponibilidad: true };

        if (req.query.titulo) {
            query.titulo = { $regex: req.query.titulo, $options: 'i' };
        }

        if (req.query.autor) {
            const regexAutor = new RegExp(req.query.autor, 'i');
            const autores = await Autor.find({ nombre: regexAutor }).select('_id');

            if (autores.length > 0) {
                const autorIds = autores.map(autor => autor._id);
                query.autor_id = { $in: autorIds };
            } else {
                return res.json([]);
            }
        }

        if (req.query.genero) {
            const regexGenero = new RegExp(req.query.genero, 'i');
            const generos = await GeneroLibro.find({ nombre: regexGenero }).select('_id');

            if (generos.length > 0) {
                const generoIds = generos.map(genero => genero._id);
                query.genero_id = { $in: generoIds };
            } else {
                return res.json([]);
            }
        }

        if (req.query.minPrecio) {
            query.precio = { $gte: Number(req.query.minPrecio) };
        }

        if (req.query.maxPrecio) {
            if (query.precio) {
                query.precio.$lte = Number(req.query.maxPrecio);
            } else {
                query.precio = { $lte: Number(req.query.maxPrecio) };
            }
        }

        if (req.query.minPuntuacion) {
            query.puntuacion_promedio = { $gte: Number(req.query.minPuntuacion) };
        }

        const books = await Libro.find(query)
            .populate('autor_id', 'nombre biografia foto_url')
            .populate('genero_id', 'nombre');
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addBook = async (req, res) => {
    const {
        titulo,
        autor_id,
        descripcion,
        genero_id,
        fecha_publicacion,
        disponibilidad,
        cantidad_stock,
        precio
    } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let imagen_url = null;

        if (req.file) {
            // Subir la imagen a S3
            const data = await uploadImageToS3(req.file.buffer);
            imagen_url = data.Location;
        }

        const newBook = new Libro({
            titulo,
            autor_id,
            descripcion,
            genero_id,
            fecha_publicacion,
            disponibilidad,
            cantidad_stock,
            precio,
            imagen_url
        });

        const savedBook = await newBook.save({ session });

        const author = await Autor.findById(autor_id).session(session);

        if (!author) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Author not found' });
        }

        author.libros.push(savedBook._id);
        await author.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ message: 'Book added successfully', libro: savedBook });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        if (error.message.includes('File upload only supports the following filetypes')) {
            return res.status(400).json({ error: error.message });
        }
        res.status(400).json({ error: error.message });
    }
};

const updateBook = async (req, res) => {
    const { id } = req.params;
    const {
        titulo,
        autor_id,
        descripcion,
        genero_id,
        fecha_publicacion,
        disponibilidad,
        cantidad_stock,
        precio
    } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let libro = await Libro.findById(id).session(session);

        if (!libro) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ error: 'Book not found' });
        }

        if (req.file) {
            // Subir la imagen a S3
            const data = await uploadImageToS3(req.file.buffer);
            libro.imagen_url = data.Location;
        }

        // Actualizar solo los campos presentes en el body
        if (titulo) libro.titulo = titulo;
        if (autor_id) libro.autor_id = autor_id;
        if (descripcion) libro.descripcion = descripcion;
        if (genero_id) libro.genero_id = genero_id;
        if (fecha_publicacion) libro.fecha_publicacion = fecha_publicacion;
        if (disponibilidad !== undefined) libro.disponibilidad = disponibilidad;
        if (cantidad_stock !== undefined) libro.cantidad_stock = cantidad_stock;
        if (precio !== undefined) libro.precio = precio;

        await libro.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.json(libro);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedBook = await Libro.findByIdAndUpdate(
            id,
            { disponibilidad: false },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json({ message: 'Book marked as deleted successfully', book: updatedBook });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export {
    getBooks,
    addBook,
    updateBook,
    deleteBook,
    searchBooks
};