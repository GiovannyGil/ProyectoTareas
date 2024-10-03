import { Usuario } from "../models/usuario.entity";
import { Request, Response } from 'express'
import { getRepository, IsNull } from 'typeorm';

// metodo para obtener todos los usuarios
export const ObtenerUsuarios = async (_req: Request, res: Response) => {
    try {
        const usuarioRepository = getRepository(Usuario); // Accede al repositorio de la entidad Usuario
        const usuarios = await usuarioRepository.find({ where: { deletedAt: IsNull() } });

        if (usuarios.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }

        return res.status(200).json(usuarios);
    } catch (error) {
        console.error(error); // Esto es útil para debug
        return res.status(500).json({ message: 'Error en el servidor' });
    }
}


// metodo para obtener un usuario por id
export const ObtenerUsuario = async (_req: Request, res: Response) => {
    console.log(_req.body);
    res.json()
}

// metodo para crear un usuario
export const CrearUsuario = async (_req: Request, res: Response) => {
    console.log(_req.body);
    res.json()
}

// metodo para actualizar un usuario
export const ActualizarUsuario = async (_req: Request, res: Response) => {
    console.log(_req.body);
    res.json()
}

// metodo para eliminar un usuario
export const EliminarUsuario = async (_req: Request, res: Response) => {
    console.log(_req.body);
    res.json()
}

