import { Usuarios } from "../../usuarios/models/Usuarios.model.js";
import {ObtenerUsuarioNombre} from '../../usuarios/services/Usuarios.Services.js'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {randomUUID} from 'crypto'
import { Tokens } from "../models/auth.model.js";
import { dataSource } from '../../../database/conexion.js'


// Obtener el repositorio de usuarios
const usuarioRepository = dataSource.getRepository(Usuarios);
const tokenRepository = dataSource.getRepository(Tokens)

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
            uuid: randomUUID(),
            nombres,
            apellidos,
            nombreusuario,
            edad,
            correo,
            clave: claveEncriptada,
            estado
        });

        // Guardar el nuevo usuario
        await usuarioRepository.save(nuevoUsuario);
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
        // Verificar que req.body esté definido
        if (!req.body) {
            console.error('Cuerpo de la solicitud no proporcionado');
            return res.status(400).json({ message: 'Cuerpo de la solicitud no proporcionado' });
        }

        const { nombreusuario, clave } = req.body;

        // Verificar si los campos están vacíos
        if (!nombreusuario || !clave) {
            console.error('LOS DATOS NO PUEDEN ESTAR VACÍOS');
            return res.status(400).json({ message: 'LOS DATOS NO PUEDEN ESTAR VACÍOS' });
        }

        // Obtener el usuario por nombre
        // const usuario = await ObtenerUsuarioNombre(correo);
        const usuario = await usuarioRepository.findOne({ where: { nombreusuario } });
        if (!usuario) {
            console.error('USUARIO NO ENCONTRADO');
            return res.status(404).json({ message: 'USUARIO NO ENCONTRADO' });
        }

        // Verificar la contraseña
        const claveValida = await bcryptjs.compare(clave, usuario.clave);
        if (!claveValida) {
            console.error('CONTRASEÑA INCORRECTA');
            return res.status(400).json({ message: 'CONTRASEÑA INCORRECTA' });
        }

        // Generar el token JWT
        const token = jwt.sign(
            { id: usuario.id, nombreusuario: usuario.nombreusuario },
            process.env.JWT_SECRET || 'palabrasecreta',
            { expiresIn: '1h' }
        );

        // Verificar que el token fue generado
        if (!token) {
            console.error('NO SE PUDO GENERAR EL TOKEN');
            return res.status(500).json({ message: 'NO SE PUDO GENERAR EL TOKEN' });
        }

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
        // Obtener el token desde el encabezado `x-auth-token` o `Authorization`
        const token = req.header('x-auth-token') || req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return res.status(400).json({ message: 'Token no proporcionado' });
        }

        // Decodificar el token para obtener la fecha de expiración
        const decodedToken = jwt.decode(token);
        if (!decodedToken) {
            return res.status(400).json({ message: 'Token inválido' });
        }

        // Guardar el token como revocado en la base de datos
        const tokenRevocado = {
            token: token,
            expiracion: new Date(decodedToken.exp * 1000),  // Fecha de expiración del token
            revoked: true
        };

        await tokenRepository.save(tokenRevocado);

        return res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    } catch (error) {
        console.error(`Error al cerrar sesión: ${error.message}`);
        return res.status(500).json({ message: 'Error al cerrar sesión' });
    }
};


