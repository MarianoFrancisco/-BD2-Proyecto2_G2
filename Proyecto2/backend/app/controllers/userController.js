/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import Usuario from '../models/Usuario.js';

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        let user = await Usuario.findById(id).select('-contrasenia');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, direccion, contrasenia, metodo_pago } = req.body;

    try {
        let user = await Usuario.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.nombre = nombre;
        user.apellido = apellido;
        user.email = email;
        user.telefono = telefono;
        user.direccion = direccion;
        user.metodo_pago = metodo_pago;
        if (contrasenia) {
            user.contrasenia = contrasenia;
        }

        await user.save();

        const userResponse = user.toObject();
        delete userResponse.contrasenia;

        res.json(userResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    updateUserById,
    getUserById
};