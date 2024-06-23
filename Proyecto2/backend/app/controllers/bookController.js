/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import Libro from '../models/Libro.js';
import Autor from '../models/Autor.js';
import GeneroLibro from '../models/GeneroLibro.js';
import mongoose from 'mongoose';

const getBooks = async (req, res) => {
    try {
        const books = await Libro.find({ disponibilidad: true })
            .populate('autor_id', 'nombre biografia foto_url')
            .populate('genero_id', 'nombre');
        res.json(books);
    } catch (error) {
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
            const genero = await GeneroLibro.findOne({ nombre: regexGenero });

            if (genero) {
                query.genero_id = genero._id;
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
        precio,
        imagen_url
    } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
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
        precio,
        imagen_url
    } = req.body;

    try {
        let libro = await Libro.findById(id);

        if (!libro) {
            return res.status(404).json({ error: 'Book not found' });
        }

        libro.titulo = titulo;
        libro.autor_id = autor_id;
        libro.descripcion = descripcion;
        libro.genero_id = genero_id;
        libro.fecha_publicacion = fecha_publicacion;
        libro.disponibilidad = disponibilidad;
        libro.cantidad_stock = cantidad_stock;
        libro.precio = precio;
        libro.imagen_url = imagen_url;

        await libro.save();

        res.json(libro);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteBook = async (req, res) => {
    const { id } = req.params;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const deletedBook = await Libro.findByIdAndDelete(id).session(session);

        if (!deletedBook) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ error: 'Book not found' });
        }

        await Autor.updateOne(
            { _id: deletedBook.autor_id },
            { $pull: { libros: deletedBook._id } }
        ).session(session);

        await session.commitTransaction();
        session.endSession();

        res.json({ message: 'Book deleted successfully', book: deletedBook });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

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