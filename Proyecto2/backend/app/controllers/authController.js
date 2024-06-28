/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import Usuario from '../models/Usuario.js';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    const { nombre, apellido, email, telefono, direccion, fecha_nacimiento, contrasenia, metodo_pago, rol } = req.body;
    try {
        const user = new Usuario({
            nombre, apellido, email, telefono, direccion, fecha_nacimiento, contrasenia, metodo_pago, rol
        });
        await user.save();

        const dataToken = {
            id: user._id,
            nombre: user.nombre,
            apellido: user.apellido,
            rol: user.rol
        };

        const token = jwt.sign(dataToken, process.env.SECRET_KEY, { expiresIn: '5h' });

        res.status(201).json({ token });
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

        const dataToken = {
            id: user._id,
            nombre: user.nombre,
            apellido: user.apellido,
            rol: user.rol
        };

        const token = jwt.sign(dataToken, process.env.SECRET_KEY, { expiresIn: '5h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { register, login };