/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import Usuario from '../models/Usuario.js';

const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, direccion, contrasenia } = req.body;

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
        if (contrasenia) {
            user.contrasenia = contrasenia;
        }

        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    updateUserById
};