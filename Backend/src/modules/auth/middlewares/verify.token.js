import jwt from 'jsonwebtoken';
import { dataSource } from '../../../database/conexion.js'
import { Tokens } from '../models/auth.model.js';

const tokenRepository = dataSource.getRepository(Tokens)

// Método para verificar token (middleware para proteger rutas)
export const VerificarToken = async (req, res, next) => {

    // Obtener el token desde el encabezado `x-auth-token` o `Authorization`
    const token = req.header('x-auth-token') || req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No hay token, permiso denegado' });
    }

    try {
        const tokenRevocado = await tokenRepository.findOne({ where: { token } });
        if (tokenRevocado && tokenRevocado.revocado) {
            console.error('Token revocado');
            return res.status(401).json({ message: 'Token revocado' });
        }
        console.log('el token es revocado? 1: ',tokenRevocado);
        console.log('el token es revocado? 2: ',tokenRevocado.revoked);
        console.log('el token es revocado? 3: ',tokenRevocado.revocado);


        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'palabrasecreta');
        req.usuario = decoded;
        next();
    } catch (error) {
        console.error('Token no válido');
        // Mensaje de error específico si el token ha expirado
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'El token ha expirado' });
        }
        return res.status(401).json({ message: 'Token no válido' });
    }
};