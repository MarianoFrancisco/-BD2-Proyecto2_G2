/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { nombre, apellido, email, telefono, direccion, contrasenia, rol } = req.body;
    try {   
        const user = new Usuario({
            nombre, apellido, email, telefono, direccion, contrasenia, rol
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, contrasenia } = req.body;
    try {
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.matchPassword(contrasenia);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, nombre: user.nombre, rol: user.rol } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Usuario.findById(decoded.id).select('-contrasenia');
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, invalid token' });
    }
};

module.exports = {
    register,
    login,
    protect
};