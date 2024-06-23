/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await Usuario.findById(decoded.id).select('-contrasenia');
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, invalid token' });
    }
};

export default protect;