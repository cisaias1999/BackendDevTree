import express from 'express'; //ES6

import router from './router'; //importar router
import 'dotenv/config'; //importar dotenv
import { connectDB } from './config/db'; //importar connectDB
const app = express();

connectDB(); //conectar a la base de datos

app.use(express.json()); //para que entienda json

app.use('/', router); //usar router dominio principal 


export default app; //exportar app