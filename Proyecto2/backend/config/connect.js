/*
* @authors
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.BOOK_STORE_URI;

async function connectToMongoDB() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        throw err;
    }
}

export default connectToMongoDB;