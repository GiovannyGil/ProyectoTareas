import { Tareas } from "../models/Tareas.model.js";
import { Usuarios } from "../../usuarios/models/Usuarios.model.js";
import { Habilidades } from "../../habilidades/models/Habilidades.model.js";
import { dataSource } from '../../../database/conexion.js'
import cron from 'node-cron';
import { In, LessThan } from 'typeorm';

// Obtener los repositorios
const tareaRepository = dataSource.getRepository(Tareas);
const usuarioRepository = dataSource.getRepository(Usuarios);
const habilidadRepository = dataSource.getRepository(Habilidades);

// metodo para crear tarea
export const CrearTarea = async (req, res) => {
    try {
        const { nombre, descripcion, dificultad, usuarioId, habilidadesIds } = req.body;

        // Validar que el usuario existe
        const usuario = await usuarioRepository.findOneBy({ id: usuarioId });
        if (!usuario || usuario.deletedAt) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Validar que las habilidades existen
        const habilidades = await habilidadRepository.findBy({ id: In(habilidadesIds) });
        // Filtrar habilidades eliminadas -> deletedAt = null
        const habilidadesValidas = habilidades.filter(habilidad => !habilidad.deletedAt);
        if (habilidadesValidas.length !== habilidadesIds.length) {
            return res.status(400).json({ message: 'Una o más habilidades no son válidas' });
        }

        // Crear la nueva tarea
        const nuevaTarea = tareaRepository.create({
            nombre,
            descripcion,
            dificultad,
            usuario,  // Relación uno a muchos con Usuario
            habilidades: habilidadesValidas,  // Relación muchos a muchos con Habilidades
        });

        // Guardar la tarea en la base de datos
        await tareaRepository.save(nuevaTarea);

        // Responder con la tarea creada
        return res.status(201).json({ message: 'Tarea creada exitosamente', tarea: nuevaTarea });
    } catch (error) {
        console.error(`NO SE PUDO CREAR LA TAREA: ${error.message}`);
        return res.status(500).json({ message: 'Error al crear la tarea' });
    }
};


// metodo para obtener todas las tareas
export const ObtenerTareas = async (req, res) => {
    try {
        // obtener todas las tareas
        const tareas = await tareaRepository.find({ where: { deletedAt: null },
            relations: ['usuario', 'habilidades'],
        });

        // Filtrar tareas asociadas a usuarios o habilidades eliminados, es decitr, que no tengan deletedAt
        const tareasFiltradas = tareas.filter(tarea => 
            tarea.usuario.deletedAt === null && 
            tarea.habilidades.every(habilidad => habilidad.deletedAt === null)
        );

        // Verificar si se obtuvieron las tareas
        if (!tareasFiltradas.length) {
            console.error('NO SE PUDIERON OBTENER LAS TAREAS ALGO SUCEDIÓ');
            return res.status(404).json({ message: 'NO SE PUDIERON OBTENER LAS TAREAS ALGO SUCEDIÓ' });
        }

        // responder con las tareas
        console.warn('Tareas obtenidas correctamente');
        return res.status(200).json({
            message: 'Tareas obtenidas correctamente',
            tareas
        });
    } catch (error) {
        console.error(`NO SE PUDIERON OBTENER LAS TAREAS: ${error.message}`);
        return res.status(500).json({ message: `NO SE PUDIERON OBTENER LAS TAREAS: ${error.message}` });
    }
};

// metodo para obtener una tarea por id
export const ObtenerTareaPorId = async (req, res) => {
    try {
        const id = req.params.id;
        // verificar si el id es un numero
        if(isNaN(id)){
            console.error('EL ID DEBE SER UN NUMERO');
            return res.status(400).json({message: 'EL ID DEBE SER UN NUMERO'});
        }

        // obtener la tarea por id
        const tarea = await tareaRepository.findOne({ where: { id }, relations: ['usuario', 'habilidades'] });
        if (!tarea) {
            console.error('TAREA NO ENCONTRADA');
            return res.status(404).json({ message: 'TAREA NO ENCONTRADA' });
        }

        console.warn('Tarea obtenida correctamente');
        return res.status(200).json({
            message: 'Tarea obtenida correctamente',
            tarea
        });
    } catch (error) {
        console.error(`NO SE PUDO OBTENER LA TAREA: ${error.message}`);
    }
}

// metodo para actualizar una tarea
export const ActualizarTarea = async (req, res) => {
    try {
        // Obtener los datos de la tarea
        const id = req.params.id;
        const { nombre, descripcion, dificultad, usuarioId, habilidadesIds } = req.body;

        // Verificar si el ID es un número
        if (isNaN(id)) {
            console.error('EL ID DEBE SER UN NÚMERO');
            return res.status(400).json({ message: 'EL ID DEBE SER UN NÚMERO' });
        }

        // Buscar la tarea por ID
        const tarea = await Tareas.findOne({ where: { id }, relations: ['usuario', 'habilidades'] });
        if (!tarea) {
            console.error('TAREA NO ENCONTRADA');
            return res.status(404).json({ message: 'TAREA NO ENCONTRADA' });
        }

        // Validar que se haya proporcionado al menos una habilidad
        if (!habilidadesIds || habilidadesIds.length === 0) {
            return res.status(400).json({ message: 'Debe proporcionar al menos una habilidad' });
        }

        // Si se proporciona un usuario, buscarlo por ID
        if (usuarioId) {
            const usuario = await usuarioRepository.findOneBy({ id: usuarioId });
            if (!usuario || usuario.deletedAt) {
                console.error('USUARIO NO ENCONTRADO');
                return res.status(404).json({ message: 'USUARIO NO ENCONTRADO' });
            }
            tarea.usuario = usuario;
        }

        // Si se proporcionan habilidades, buscar por sus IDs
        if (habilidadesIds && habilidadesIds.length > 0) {
            const habilidades = await habilidadRepository.find({
                where: { id: In(habilidadesIds) }
            });
            const habilidadesValidas = habilidades.filter(habilidad => !habilidad.deletedAt);
            if (habilidadesValidas.length === 0) {
                console.error('HABILIDADES NO ENCONTRADAS O ELIMINADAS');
                return res.status(404).json({ message: 'HABILIDADES NO ENCONTRADAS O ELIMINADAS' });
            }
            tarea.habilidades = habilidadesValidas;
        }

        // Actualizar los campos de la tarea
        tarea.nombre = nombre || tarea.nombre;
        tarea.descripcion = descripcion || tarea.descripcion;
        tarea.dificultad = dificultad || tarea.dificultad;

        // Guardar los cambios
        const tareaActualizada = await tareaRepository.save(tarea);

        console.warn('Tarea actualizada correctamente');
        return res.status(200).json({
            message: 'Tarea actualizada correctamente',
            tarea: tareaActualizada
        });
    } catch (error) {
        console.error(`NO SE PUDO ACTUALIZAR LA TAREA: ${error.message}`);
    }
}

// metodo para eliminar una tarea -> soft delete
export const EliminarTarea = async (req, res) => {
    try {
        // obtener la tarea por id
        const id = parseInt(req.params.id);
        
        // Verificar si el ID es un número
        if (isNaN(id)) {
            console.error('EL ID DEBE SER UN NÚMERO');
            return res.status(400).json({ message: 'EL ID DEBE SER UN NÚMERO' });
        }
        
        // Buscar la tarea por ID
        const tarea = await tareaRepository.findOneBy({ id });

        // verificar si la tarea existe
        if(!tarea){
            console.error('TAREA NO ENCONTRADA');
            return res.status(404).json({message: 'NO SE PUDO OBTENER LA TAREA ALGO SUCEDIÓ'});
        }

        // Si la tarea ya está eliminada (tiene deletedAt)
        if (tarea.deletedAt) {
            return res.status(400).json({ message: 'La tarea ya ha sido eliminada' });
        }


        // Marcar la tarea como eliminada (soft delete)
        tarea.deletedAt = new Date();  // Marca la fecha y hora actual
        await tareaRepository.save(tarea);

        return res.status(200).json({ message: 'Tarea eliminada (soft delete)' });

    } catch (error) {
        console.error(`NO SE PUDO ELIMINAR LA TAREA: ${error.message}`);
        return res.status(500).json({ message: `NO SE PUDO ELIMINAR LA TAREA: ${error.message}` });
    }
}

// Programar un cron job que se ejecute diariamente
const eliminarTareasPermanente = async () => {
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - 30);

    const tareasParaEliminar = await tareaRepository.find({
        where: { deletedAt: LessThan(fechaLimite) }
    });

    if (tareasParaEliminar.length > 0) {
        await tareaRepository.delete({ deletedAt: LessThan(fechaLimite) });
        console.log(`Eliminadas permanentemente ${tareasParaEliminar.length} tareas.`);
    }
};

cron.schedule('0 0 * * *', eliminarTareasPermanente);