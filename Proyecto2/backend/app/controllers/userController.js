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
    const { nombre, apellido, email, telefono, direccion, metodo_pago, fecha_nacimiento } = req.body;

    try {
        let user = await Usuario.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Solo actualiza los campos que están presentes en el body
        if (nombre) user.nombre = nombre;
        if (apellido) user.apellido = apellido;
        if (email) user.email = email;
        if (telefono) user.telefono = telefono;
        if (direccion) user.direccion = direccion;
        if (metodo_pago) user.metodo_pago = metodo_pago;
        if (fecha_nacimiento) user.fecha_nacimiento = fecha_nacimiento;

        await user.save();

        const userResponse = user.toObject();
        delete userResponse.contrasenia;

        res.json(userResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePassword = async (req, res) => {
    const id = req.id;
    const { contrasenia_actual, contrasenia } = req.body;

    try {
        let user = await Usuario.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verifica y actualiza la contraseña si se proporcionan ambas
        if (contrasenia_actual && contrasenia) {
            const isMatch = await user.matchPassword(contrasenia_actual); // Usando el mismo método de comparación
            if (!isMatch) {
                return res.status(401).json({ message: 'Contraseña actual incorrecta' });
            }
            user.contrasenia = contrasenia;
        } else {
            return res.status(400).json({ message: 'Faltan la contraseña actual o la nueva contraseña' });
        }

        // console.log(user);
        await user.save();
        // user.updateOne({})

        res.json({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    updateUser,
    getUser,
    updatePassword
};