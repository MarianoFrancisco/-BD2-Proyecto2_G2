/*
* Autores
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRouter from './app/routes/auth.routes.js';
import userRouter from './app/routes/user.routes.js';
import authorRouter from './app/routes/author.routes.js';
import bookRouter from './app/routes/book.routes.js';
import orderRouter from './app/routes/order.routes.js';
import reviewRouter from './app/routes/review.routes.js';
import genreRouter from './app/routes/genre.routes.js';

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: '15mb' }));
app.use(cors());

const api = '/api';
const auth = api + '/auth';
const user = api + '/user';
const author = api + '/author';
const book = api + '/book';
const order = api + '/order';
const review = api + '/review';
const genre = api + '/genre';

app.use(auth, authRouter);
app.use(user, userRouter);
app.use(author, authorRouter);
app.use(book, bookRouter);
app.use(order, orderRouter);
app.use(review, reviewRouter);
app.use(genre, genreRouter);

export default app;