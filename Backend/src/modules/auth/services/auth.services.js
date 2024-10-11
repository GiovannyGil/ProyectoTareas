import { Usuarios } from "../models/Usuarios.model.js";
import {ObtenerUsuarioNombre} from '../../usuarios/services/Usuarios.Services.js'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Método para registrar un nuevo usuario
export const RegistrarUsuario = async (req, res) => {
    try {
        const { nombres, apellidos, nombreusuario, edad, correo, clave, estado } = req.body;

        // Verificar si los campos están vacíos
        if (!nombres || !apellidos || !nombreusuario || !edad || !correo || !clave || !estado) {
            console.error('LOS DATOS NO PUEDEN ESTAR VACÍOS');
            return res.status(400).json({ message: 'LOS DATOS NO PUEDEN ESTAR VACÍOS' });
        }

        // Verificar si el usuario ya existe
        // const usuarioExiste = await Usuarios.findOne({ where: { nombreusuario } });
        // if (usuarioExiste) {
        //     console.error('EL USUARIO YA EXISTE');
        //     return res.status(400).json({ message: 'EL USUARIO YA EXISTE' });
        // }
        const usuarioExistente = await ObtenerUsuarioNombre(nombreusuario)
        if (usuarioExistente) {
            console.error('EL USUARIO YA EXISTE');
            return res.status(400).json({ message: 'EL USUARIO YA EXISTE' });
        }

        // Encriptar la contraseña
        const salt = await bcryptjs.genSalt(10);
        const claveEncriptada = await bcryptjs.hash(clave, salt);

        // Crear un nuevo usuario
        const nuevoUsuario = await Usuarios.create({
            nombres,
            apellidos,
            nombreusuario,
            edad,
            correo,
            clave: claveEncriptada,
            estado
        });

        // Guardar el nuevo usuario
        await nuevoUsuario.save();
        console.warn('Usuario registrado correctamente');
        return res.status(201).json({
            message: 'Usuario registrado correctamente',
            usuario: nuevoUsuario
        });

    } catch (error) {
        console.error(`NO SE PUDO REGISTRAR EL USUARIO: ${error.message}`);
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

// Método para iniciar sesión
export const IniciarSesion = async (req, res) => {
    try {
        const { nombreusuario, clave } = req.body;

        // Verificar si los campos están vacíos
        if (!nombreusuario || !clave) {
            console.error('LOS DATOS NO PUEDEN ESTAR VACÍOS');
            return res.status(400).json({ message: 'LOS DATOS NO PUEDEN ESTAR VACÍOS' });
        }

        // Buscar el usuario en la base de datos
        // const usuario = await Usuarios.findOne({ where: { nombreusuario } });
        const usuario = await ObtenerUsuarioNombre(nombreusuario)
        if (!usuario) {
            console.error('USUARIO NO ENCONTRADO');
            return res.status(400).json({ message: 'USUARIO NO ENCONTRADO' });
        }

        // Verificar la contraseña
        const claveValida = await bcryptjs.compare(clave, usuario.clave);
        if (!claveValida) {
            console.error('CONTRASEÑA INCORRECTA');
            return res.status(400).json({ message: 'CONTRASEÑA INCORRECTA' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: usuario.id, nombreusuario: usuario.nombreusuario },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.warn('Inicio de sesión exitoso');
        return res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token
        });

    } catch (error) {
        console.error(`NO SE PUDO INICIAR SESIÓN: ${error.message}`);
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

// Método para cerrar sesión (revocar token)
export const CerrarSesion = async (req, res) => {
    try {
        // Obtener el token desde las cabeceras o el body (dependiendo de cómo se esté enviando)
        const token = req.headers['authorization']?.split(' ')[1] || req.body.token;

        if (!token) {
            console.error('Token no proporcionado');
            return res.status(400).json({ message: 'Token no proporcionado' });
        }

        // Verificar el token para obtener el payload (en caso de que sea necesario verificar quién está cerrando sesión)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verificar si el usuario existe (opcional, pero es buena práctica)
        // const usuario = await Usuarios.findOne({ where: { id: decoded.id } });
        const usuario = await ObtenerUsuarioNombre(nombreusuario)
        if (!usuario) {
            console.error('Usuario no encontrado');
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualizar la tabla de tokens para marcar el token como revocado
        const actualizarToken = await TokenModel.update(
            { revoked: true },
            { where: { token: token } } // Suponiendo que tienes la columna `token` en tu tabla
        );

        // Verificar si se actualizó correctamente
        if (!actualizarToken) {
            console.error('No se pudo revocar el token');
            return res.status(500).json({ message: 'No se pudo revocar el token' });
        }
        console.warn('Sesión cerrada y token revocado correctamente');
        return res.status(200).json({ message: 'Sesión cerrada y token revocado correctamente' });
    } catch (error) {
        console.error(`Error al cerrar sesión: ${error.message}`);
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};


// Método para obtener el perfil del usuario autenticado
export const ObtenerPerfil = async (req, res) => {
    try {
        const usuario = await Usuarios.findByPk(req.usuario.id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        console.warn('Perfil obtenido correctamente');
        return res.status(200).json({
            message: 'Perfil obtenido correctamente',
            usuario
        });
    } catch (error) {
        console.error(`NO SE PUDO OBTENER EL PERFIL: ${error.message}`);
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};
