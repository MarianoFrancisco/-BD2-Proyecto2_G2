/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import Usuario from '../models/Usuario.js';

const getUser = async (req, res) => {
    const id = req.id;

    try {
        let user = await Usuario.findById(id)
            .select('-contrasenia')
            .populate({
                path: 'compras',
                model: 'Pedido',
                select: 'direccion_envio metodo_pago estado fecha_pedido fecha_envio fecha_entrega libros',
                populate: {
                    path: 'libros.libro_id',
                    select: 'titulo descripcion fecha_publicacion puntuacion_promedio imagen_url autor_id genero_id',
                    populate: [
                        {
                            path: 'autor_id',
                            select: 'nombre biografia foto_url'
                        },
                        {
                            path: 'genero_id',
                            select: 'nombre'
                        }
                    ]
                }
            });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    const id = req.id;
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
    updateUser,
    getUser
};