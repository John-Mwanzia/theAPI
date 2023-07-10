import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signIn } from './handlers/user';

const app = express();

app.use(cors());
app.use(morgan('dev'));// logs every request to the console
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // allows a client to add things like query string and params and it encodes and decodes it correctly for us

app.get('/', (req, res) => {
    // res.json({message: 'Hello from server'});
    throw new Error('Something went wrong');
});

app.use('/api',protect, router); // all routes will be prefixed with /api   // protect is a middleware that will run before the router

app.post('/user', createNewUser);
app.post('/signin', signIn);

//error handling middleware

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({error: 'Something went wrong'});
});
export default app;