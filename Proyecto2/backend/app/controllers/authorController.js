/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import Autor from '../models/Autor.js';

const getAuthors = async (req, res) => {
    try {
        const authors = await Autor.find();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addAuthor = async (req, res) => {
    const { nombre, biografia, foto_url } = req.body;

    try {
        const newAuthor = new Autor({
            nombre,
            biografia,
            foto_url
        });

        await newAuthor.save();

        res.status(201).json({ message: 'Author added successfully', author: newAuthor });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteAuthor = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAuthor = await Autor.findByIdAndDelete(id);

        if (!deletedAuthor) {
            return res.status(404).json({ error: 'Author not found' });
        }

        res.json({ message: 'Author deleted successfully', author: deletedAuthor });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export {
    getAuthors,
    addAuthor,
    deleteAuthor
};