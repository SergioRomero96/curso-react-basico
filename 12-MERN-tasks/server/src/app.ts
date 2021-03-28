// Env files
import dotenv from 'dotenv';

dotenv.config({
    path: `${__dirname}/../environments/development.env`
});

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import connectDB from './config/database';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import projectRoutes from './routes/project.routes';

// crear el servidor
const app = express();

// conectar a la base de datos
connectDB();

// puerto de la app
const PORT = process.env.PORT || 5000;

// settings
app.set('port', PORT);

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Definir la página principal
app.get('/', (req, res) => {
    res.send(`Server is running on port: ${app.get('port')}`);
});

// importar rutas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes)

export default app;