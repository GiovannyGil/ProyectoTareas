


// Método para verificar token (middleware para proteger rutas)
export const VerificarToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'No hay token, permiso denegado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        console.error('Token no válido');
        return res.status(401).json({ message: 'Token no válido' });
    }
};