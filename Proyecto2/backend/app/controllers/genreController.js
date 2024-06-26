import GeneroLibro from '../models/GeneroLibro.js';
import Libro from '../models/Libro.js';

export const getAllGenres = async (req, res) => {
    try {
        const genres = await GeneroLibro.find();
        res.json(genres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getGenreById = async (req, res) => {
    const { id } = req.params;
    try {
        const genre = await GeneroLibro.findById(id);
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.json(genre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createGenre = async (req, res) => {
    const { nombre } = req.body;
    try {
        const existingGenre = await GeneroLibro.findOne({ nombre });
        if (existingGenre) {
            return res.status(400).json({ message: 'Genre with this name already exists' });
        }

        const newGenre = new GeneroLibro({ nombre });
        await newGenre.save();
        res.status(201).json(newGenre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateGenre = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const genre = await GeneroLibro.findById(id);
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }

        if (nombre) genre.nombre = nombre;

        await genre.save();
        res.json(genre);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteGenre = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedGenre = await GeneroLibro.findByIdAndDelete(id);

        if (!deletedGenre) {
            return res.status(404).json({ error: 'Genre not found' });
        }

        res.json({ message: 'Genre deleted successfully', genre: deletedGenre });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getBooksByGenre = async (req, res) => {
    const { id } = req.params;
    try {
        const books = await Libro.find({ genero_id: id });
        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found for this genre' });
        }
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};