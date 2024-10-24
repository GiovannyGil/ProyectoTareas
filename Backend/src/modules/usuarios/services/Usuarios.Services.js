import { Usuarios } from "../models/Usuarios.model.js";
import { dataSource } from '../../../database/conexion.js'
import bcryptjs from 'bcryptjs';
import { randomUUID } from 'crypto'
import cron from 'node-cron';
import { LessThan } from 'typeorm';

// metodo para crar Usuario
export const CrearUsuario = async (req, res) => {
    try {
        // Obtener el repositorio de la entidad Usuarios
        const UsuariosRepository = dataSource.getRepository(Usuarios);

        // Recibir los datos del body
        const { nombres, apellidos, nombreusuario, edad, correo, clave, estado } = req.body;

        // Verificar si los datos no están vacíos
        if (!nombres || !apellidos || !nombreusuario || !edad || !correo || !clave || estado === undefined) {
            console.error('LOS DATOS NO PUEDEN ESTAR VACÍOS');
            return res.status(400).json({ message: 'LOS DATOS NO PUEDEN ESTAR VACÍOS' });
        }

        // Verificar si el usuario ya existe
        const usuarioExiste = await UsuariosRepository.findOne({ where: { nombreusuario } });
        if (usuarioExiste) {
            console.error('EL USUARIO YA EXISTE');
            return res.status(400).json({ message: 'EL USUARIO YA EXISTE' });
        }

        // Encriptar la clave
        const salt = await bcryptjs.genSalt(10);
        const claveEncriptada = await bcryptjs.hash(clave, salt);

        // Crear el usuario
        const usuario = UsuariosRepository.create({
            uuid: randomUUID(),
            nombres,
            apellidos,
            nombreusuario,
            edad,
            correo,
            clave: claveEncriptada,
            estado
        });

        // Guardar el usuario
        const guardarUsuario = await UsuariosRepository.save(usuario);

        // Verificar si se guardó el usuario
        console.warn('Usuario creado correctamente');
        return res.status(201).json({
            message: 'Usuario creado correctamente',
            usuario: guardarUsuario
        });

    } catch (error) {
        console.error(`NO SE PUDO CREAR EL USUARIO: ${error.message}`);
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

// Método para obtener todos los usuarios
export const ObtenerUsuarios = async (req, res) => {
    try {
        // Obtener el repositorio de la entidad Usuarios
        const UsuariosRepository = dataSource.getRepository(Usuarios);

        // Obtener todos los usuarios
        const usuarios = await UsuariosRepository.find();

        // Verificar si no hay usuarios
        if (!usuarios || usuarios.length === 0) {
            console.warn('No se encontraron usuarios en la base de datos');
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }

        console.warn('Usuarios obtenidos correctamente');
        return res.status(200).json({
            message: 'Usuarios obtenidos correctamente',
            usuarios
        });
    } catch (error) {
        console.error(`No se pudieron obtener los usuarios: ${error.message}`);
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

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
        const UsuariosRepository = dataSource.getRepository(Usuarios);
        const usuario = await UsuariosRepository.findOneBy({ id, deletedAt: null });

        if(usuario.deletedAt != null){
            console.error(`Usuario eliminado`);
            return res.status(404).json({ message: 'Usuario eliminado' });
        }

        // verificar si no existe el usuario
        if (!usuario) {
            console.error(`Usuario no encontrado`);
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        console.warn('Usuario obtenido correctamente');
        return res.status(200).json({
            message: 'Usuario obtenido correctamente',
            usuario
        });
    } catch (error) {
        console.error(`NO SE PUDO OBTENER EL USUARIO: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}

// metodo para obtener un usuario por nombre de usuario
export const ObtenerUsuarioNombre= async (req, res) => {
    try {
        // obtener el nombre de usuario
        const { nombreusuario } = req.params;

        // verificar si el nombre de usuario no esta vacio
        if (!nombreusuario) {
            return res.status(400).json({ message: 'El nombre de usuario es obligatorio' });
        }

        // obtener el usuario por nombre de usuario
        const UsuariosRepository = dataSource.getRepository(Usuarios);
        const usuario = await UsuariosRepository.findOneBy({nombreusuario: nombreusuario});

        // verificar si el usuario existe
        if (!usuario) {
            console.error('no se encontro el usuario');
            return res.status(404).json({ message: 'No se encontró el usuario' });
        }

        console.warn('Usuario obtenido correctamente');
        return res.status(200).json({
            message: 'Usuario obtenido correctamente',
            usuario
        });
    } catch (error) {
        console.error(`NO SE PUDO OBTENER EL USUARIO: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}

// metodo para obtener un usuario por correo
export const ObtenerUsuarioCorreo = async (req, res) => {
    try {
        // obtener el correo
        const { correo } = req.params;

        // verificar si el correo no esta vacio
        if (!correo) {
            return res.status(400).json({ message: 'El correo es obligatorio' });
        }

        // obtener el usuario por correo
        const UsuariosRepository = dataSource.getRepository(Usuarios);
        const usuario = await UsuariosRepository.findOneBy({correo: correo});

        // verificar si el usuario existe
        if (!usuario) {
            console.error('No se encontro el usuario');
            return res.status(404).json({ message: 'no se encontro el usuario' });
        }

        console.warn('Usuario obtenido correctamente');
        return res.status(200).json({
            message: 'Usuario obtenido correctamente',
            usuario
        });
    } catch (error) {
        console.error(`NO SE PUDO OBTENER EL USUARIO: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}

// metodo para actualizar un usuario
export const ActualizarUsuario = async (req, res) => {
    try {
        // obtener el id del usuarui a actualizar
        const id = parseInt(req.params.id);
        // verificar si el id es un numero
        if (isNaN(id)) {
            console.error('ID inválido');
            return res.status(400).json({ message: 'ID inválido' });
        }

        const UsuariosRepository = dataSource.getRepository(Usuarios);
        // obtener el usuario por id
        const usuario = await UsuariosRepository.findOneBy(id);

        // verificar si el usuario existe
        if (!usuario) {
            console.error('No se encontro el usuario');
            return res.status(404).json({ message: 'No se encontro el usuario' });
        }
        
        // recibir los datos del body
        const { nombres, apellidos, nombreusuario, edad, correo, clave, estado } = req.body;

        // verificar si los datos no estan vacios
        if (!nombres || !apellidos || !nombreusuario || !edad || !correo || !clave || estado === undefined) {
            console.error('Los datos no pueden estar vacios');
            return res.status(400).json({ message: 'Los datos no pueden estar vacios' });
        }

        // actualizar el usuario
        const ActualizarUsuario = await UsuariosRepository.update(req.params.id, {
            nombres,
            apellidos,
            nombreusuario,
            edad,
            correo,
            clave,
            estado
        })

        // verificar si se actualizo el usuario
        if (!ActualizarUsuario) {
            console.error('no se pudo actualizar el usuario algo sucedió');
            return res.status(400).json({ message: 'no se pudo actualizar el usuario' });
        }

        // obtener el usuario actualizado
        const usuarioActualizado = await UsuariosRepository.findOneBy({ id });
        console.warn('Usuario actualizado correctamente');
        return res.status(200).json({
            message: 'Usuario actualizado correctamente',
            usuario: usuarioActualizado,
        });
    } catch (error) {
        console.error(`NO SE PUDO ACTUALIZAR EL USUARIO: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}

// metodo para eliminar un usuario
export const EliminarUsuario = async (req, res) => {
    try {
        // obtener el id del usuario a eliminar
        const id = parseInt(req.params.id);

        // verificar si el id es un numero
        if (isNaN(id)) {
            console.error('ID inválido, debe ser un número');
            return res.status(400).json({ message: 'ID inválido, debe ser un número' });
        }

        // obtener el usuario por id
        const UsuariosRepository = dataSource.getRepository(Usuarios);
        // encontrar el usuario por id
        const usuario = await UsuariosRepository.findOneBy({ id });

        // verificar si el usuario existe
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // eliminar el usuario (soft delete)
        usuario.deletedAt = new Date(); // Marca el usuario como eliminado
        await UsuariosRepository.save(usuario);

        console.warn('Usuario eliminado correctamente');
        return res.status(200).json({
            message: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        console.error(`NO SE PUDO ELIMINAR EL USUARIO: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}



// Función para eliminar usuarios permanentes cada 30 días
const eliminarUsuariosPermanente = async () => {
    // optener la fecha limite
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - 30);

    // obtener el repositorio de la entidad Usuarios
    const usuarioRepository = dataSource.getRepository(Usuarios);
    // obtener los usuarios a eliminar
    const usuariosParaEliminar = await usuarioRepository.find({
        where: { deletedAt: LessThan(fechaLimite) }
    });

    // eliminar los usuarios permanentemente
    if (usuariosParaEliminar.length > 0) {
        await usuarioRepository.delete({ deletedAt: LessThan(fechaLimite) });
        console.log(`Eliminados permanentemente ${usuariosParaEliminar.length} usuarios.`);
    }
};

// Programar un cron job que se ejecute diariamente
cron.schedule('0 0 * * *', eliminarUsuariosPermanente);
