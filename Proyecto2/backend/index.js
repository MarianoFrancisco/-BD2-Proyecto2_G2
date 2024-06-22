/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import app from './app.js';
import connectToMongoDB from './config/connect.js';

const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
connectToMongoDB();

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});