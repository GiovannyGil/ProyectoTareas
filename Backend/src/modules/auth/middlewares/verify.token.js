import jwt from 'jsonwebtoken';
import { dataSource } from '../../../database/conexion.js'
import { Tokens } from '../models/auth.model.js';

const tokenRepository = dataSource.getRepository(Tokens)

// Método para verificar token (middleware para proteger rutas)
export const VerificarToken = async (req, res, next) => {
    try {
        // Obtener el token del header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.error('AuthHeader vacío');
            return res.status(401).json({ message: 'AuthHeader vacío' });
        }

        const token = authHeader.split(' ')[1]; // Separar "Bearer" del token
        if (!token) {
            console.error('TOKEN NO PROPORCIONADO');
            return res.status(401).json({ message: 'TOKEN NO PROPORCIONADO' });
        }

        // Verificar si el token está revocado
        const tokenRevocado = await tokenRepository.findOne({
            where: { 
                token: token,
                revoked: true
            }
        });

        if (tokenRevocado) {
            console.error('TOKEN REVOCADO');
            return res.status(401).json({ message: 'TOKEN REVOCADO - DEBE INICIAR SESIÓN NUEVAMENTE' });
        }

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'palabrasecreta');
        
        // Agregar datos del usuario decodificado a la request
        req.usuario = decoded;
        req.token = token;
        
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            console.error('TOKEN EXPIRADO');
            return res.status(401).json({ message: 'TOKEN EXPIRADO' });
        }
        console.error('TOKEN INVÁLIDO');
        return res.status(401).json({ message: 'TOKEN INVÁLIDO' });
    }
};

// Tarea programada para limpiar tokens expirados
export const limpiarTokensExpirados = async () => {
    try {
        const resultado = await tokenRepository
            .createQueryBuilder()
            .delete()
            .from(Tokens)
            .where('expiracion < :fecha', { fecha: new Date() })
            .execute();

        if (resultado.affected > 0) {
            console.warn(`${resultado.affected} tokens expirados eliminados`);
        }
    } catch (error) {
        console.error('Error al limpiar tokens expirados:', error.message);
    }
};

export default {VerificarToken, limpiarTokensExpirados}