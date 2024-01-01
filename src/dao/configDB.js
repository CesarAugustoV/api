import mongoose from 'mongoose';
import config from '../config.js';


const URI = process.env.MONGO_URI;

mongoose
    .connect(URI)
    .then(() => console.log('Conectado a la DB'))
    .catch(error => console.error(error));