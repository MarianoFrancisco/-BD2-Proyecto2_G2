/*
* Autores
* Mariano Camposeco {@literal (mariano1941@outlook.es)}
*/
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRouter from './app/routes/auth.routes.js';
import userRouter from './app/routes/user.routes.js';

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: '15mb' }));
app.use(cors());

const api = '/api';
const auth = api + '/auth';
const user = api + '/user';

app.use(auth, authRouter);
app.use(user, userRouter);

export default app;