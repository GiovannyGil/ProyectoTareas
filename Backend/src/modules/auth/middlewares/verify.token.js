import jwt from 'jsonwebtoken';
import { dataSource } from '../../../database/conexion.js'
import { Tokens } from '../models/auth.model.js';

const tokenRepository = dataSource.getRepository(Tokens)

// Método para verificar token (middleware para proteger rutas)
export const VerificarToken = async (req, res, next) => {
    try {
        // Leer token desde la cookie
        const token = req.cookies?.token;

        if (!token) {
            console.error("TOKEN NO PROPORCIONADO (cookie vacía)");
            return res.status(401).json({ message: "TOKEN NO PROPORCIONADO" });
        }

        // Verificar si está revocado
        const tokenRevocado = await tokenRepository.findOne({
            where: { token: token, revoked: true }
        });
        if (tokenRevocado) {
            console.error("TOKEN REVOCADO");
            return res.status(401).json({ message: "TOKEN REVOCADO - DEBE INICIAR SESIÓN NUEVAMENTE" });
        }

        // Validar el JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "palabrasecreta");

        // Guardar datos en la request
        req.usuario = decoded;
        req.token = token;

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            console.error("TOKEN EXPIRADO");
            return res.status(401).json({ message: "TOKEN EXPIRADO" });
        }
        console.error("TOKEN INVÁLIDO:", error.message);
        return res.status(401).json({ message: "TOKEN INVÁLIDO" });
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