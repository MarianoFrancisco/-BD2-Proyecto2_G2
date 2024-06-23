/*
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
const admin = (req, res, next) => {
    if (req.user && req.user.rol === 'Administrador') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied, not an administrator' });
    }
};

const client = (req, res, next) => {
    if (req.user && req.user.rol === 'Cliente') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied, not a client' });
    }
};

export { admin, client };