import { Usuarios } from "../models/Usuarios.model.js";
import bcryptjs from 'bcryptjs';

// metodo para crar Usuario
export const CrearUsuario = async (req, res) => {
    try {
        console.log(req.body);

        // recibir los datos del body
        const { nombres, apellidos, nombreusuario, edad, correo, clave, estado } = req.body;

        // verificar si los datos no estan vacios
        if (!nombres || !apellidos || !nombreusuario || !edad || !correo || !clave || !estado) {
            console.error('LOS DATOS NO PUEDEN ESTAR VACIOS');
            return res.status(400).json({ message: 'LOS DATOS NO PUEDEN ESTAR VACIOS' });
        }

        // verificar si el usuario ya existe
        const usuarioExiste = await ObtenerUsuarioNombre(nombreusuario);
        if (usuarioExiste) {
            console.error('EL USUARIO YA EXISTE');
            return res.status(400).json({ message: 'EL USUARIO YA EXISTE' });
        }

        // encriptar la clave
        const salt = await bcryptjs.genSalt(10);
        const claveEncriptada = await bcryptjs.hash(clave, salt);


        // crear el usuario
        const usuario = await Usuarios.create({
            nombres,
            apellidos,
            nombreusuario,
            edad,
            correo,
            clave: claveEncriptada,
            estado
        });

        // guardar el usuario
        const guardarUsuario = await usuario.save();
        // verificar si se guardo el usuario
        if (guardarUsuario) {
            console.warn('Usuario creado correctamente');
            return res.status(201).json({
                message: 'Usuario creado correctamente',
                usuario: guardarUsuario
            });
        } else {
            console.error(`NO SE PUDO CREAR EL USUARIO ALGO SUCEDIÓ, ${error.message}`);
            return res.status(400).json({ message: 'NO SE PUDO CREAR EL USUARIO ALGO SUCEDIÓ' });
        }

    } catch (error) {
        console.error(`NO SE PUDO CREAR EL USUARIO: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}

// metodo para obtener todos los usuarios
export const ObtenerUsuarios = async (req, res) => {
    try {
        // obtener todos los usuarios
        const usuarios = await Usuarios.find();

        // verificar si se obtuvieron los usuarios
        if (usuarios) {
            console.warn('Usuarios obtenidos correctamente');
            return res.status(200).json({
                message: 'Usuarios obtenidos correctamente',
                usuarios
            });
        } else {
            console.error(`NO SE PUDIERON OBTENER LOS USUARIOS ALGO SUCEDIÓ, ${error.message}`);
            return res.status(400).json({ message: 'NO SE PUDIERON OBTENER LOS USUARIOS ALGO SUCEDIÓ' });
        }
    } catch (error) {
        console.error(`NO SE PUDIERON OBTENER LOS USUARIOS: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}

// metodo para obtener un usuario por id
export const ObtenerUsuarioPorId = async (req, res) => {
    try {
        // obtener el id
        const id = parseInt(req.params.id);
        // verificar si el id es un numero
        if (isNaN(id)) {
            console.error('ID inválido');
            return res.status(400).json({ message: 'ID inválido' });
        }
        // obtener el usuario por id
        const usuario = await Usuarios.findOne(id);

        // verificar si el usuario existe
        if (usuario) {
            console.warn('Usuario obtenido correctamente');
            return res.status(200).json({
                message: 'Usuario obtenido correctamente',
                usuario
            });
        } else {
            console.error(`NO SE PUDO OBTENER EL USUARIO ALGO SUCEDIÓ, ${error.message}`);
            return res.status(400).json({ message: 'NO SE PUDO OBTENER EL USUARIO ALGO SUCEDIÓ' });
        }
    } catch (error) {
        console.error(`NO SE PUDO OBTENER EL USUARIO: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}

// metodo para obtener un usuario por nombre de usuario
export const ObtenerUsuarioNombre= async (req, res) => {
    try {
        // verificar si el nombre de usuario no esta vacio
        if (!req.params.nombreUsuario) {
            return res.status(400).json({ message: 'El nombre de usuario es obligatorio' });
        }

        // obtener el usuario por nombre de usuario
        const usuario = await Usuarios.findOne({nombreusuario: req.params.nombreUsuario});

        // verificar si el usuario existe
        if (usuario) {
            console.warn('Usuario obtenido correctamente');
            return res.status(200).json({
                message: 'Usuario obtenido correctamente',
                usuario
            });
        } else {
            console.error(`NO SE PUDO OBTENER EL USUARIO ALGO SUCEDIÓ, ${error.message}`);
            return res.status(400).json({ message: 'NO SE PUDO OBTENER EL USUARIO ALGO SUCEDIÓ' });
        }
    } catch (error) {
        console.error(`NO SE PUDO OBTENER EL USUARIO: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}

// metodo para obtener un usuario por correo
export const ObtenerUsuarioCorreo = async (req, res) => {
    try {
        console.warn('Usuario obtenido correctamente');
    } catch (error) {
        console.error(`NO SE PUDO OBTENER EL USUARIO: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}

// metodo para actualizar un usuario
export const ActualizarUsuario = async (req, res) => {
    try {
        // obtener el usuario por id
        const usuario = await Usuarios.findOne(req.params.id);

        // verificar si el usuario existe
        if (usuario) {
            // recibir los datos del body
            const { nombres, apellidos, nombreusuario, edad, correo, clave, estado } = req.body;

            // verificar si los datos no estan vacios
            if (!nombres || !apellidos || !nombreusuario || !edad || !correo || !clave || estado === undefined) {
                console.error('LOS DATOS NO PUEDEN ESTAR VACIOS');
                return res.status(400).json({ message: 'LOS DATOS NO PUEDEN ESTAR VACIOS' });
            }

            // actualizar el usuario
            const ActualizarUsuario = await Usuarios.update(req.params.id, {
                nombres,
                apellidos,
                nombreusuario,
                edad,
                correo,
                clave,
                estado
            })

            // verificar si se actualizo el usuario
            if (ActualizarUsuario) {
                console.warn('Usuario actualizado correctamente');
                return res.status(200).json({
                    message: 'Usuario actualizado correctamente',
                    usuario: ActualizarUsuario
                });
            } else {
                console.error(`NO SE PUDO ACTUALIZAR EL USUARIO ALGO SUCEDIÓ, ${error.message}`);
                return res.status(400).json({ message: 'NO SE PUDO ACTUALIZAR EL USUARIO ALGO SUCEDIÓ' });
            }

        } else {
            console.error(`NO SE PUDO ACTUALIZAR EL USUARIO ALGO SUCEDIÓ, ${error.message}`);
            return res.status(400).json({ message: 'NO SE PUDO ACTUALIZAR EL USUARIO ALGO SUCEDIÓ' });
        }
    } catch (error) {
        console.error(`NO SE PUDO ACTUALIZAR EL USUARIO: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}

// metodo para eliminar un usuario
export const EliminarUsuario = async (req, res) => {
    try {
        // obtener el usuario por id
        const usuario = await Usuarios.findOne(req.params.id);
        // verificar si el usuario existe
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // eliminar el usuario
        const EliminarUsuario = await Usuarios.delete(req.params.id);

        // verificar si se elimino el usuario
        if (EliminarUsuario) {
            console.warn('Usuario eliminado correctamente');
            return res.status(200).json({
                message: 'Usuario eliminado correctamente',
                usuario
            });
        } else {
            console.error(`NO SE PUDO ELIMINAR EL USUARIO ALGO SUCEDIÓ, ${error.message}`);
            return res.status(400).json({ message: 'NO SE PUDO ELIMINAR EL USUARIO ALGO SUCEDIÓ' });
        }
    } catch (error) {
        console.error(`NO SE PUDO ELIMINAR EL USUARIO: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}