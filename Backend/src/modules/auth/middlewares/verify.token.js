import jwt from 'jsonwebtoken';
import { dataSource } from '../../../database/conexion.js'
import { Tokens } from '../models/auth.model.js';

const tokenRepository = dataSource.getRepository(Tokens)

// Método para verificar token (middleware para proteger rutas)
export const VerificarToken = (req, res, next) => {
    const token = req.header('x-auth-token') || req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'palabrasecreta');
        req.usuario = decoded; // Decodifica y añade la información del usuario al request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};