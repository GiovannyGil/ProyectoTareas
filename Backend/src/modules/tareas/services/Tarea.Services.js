import { Tareas } from "../models/Tareas.model.js";
import { Usuarios } from "../../usuarios/models/Usuarios.model.js";
import { Habilidades } from "../../habilidades/models/Habilidades.model.js";

// metodo para crear tarea
export const CrearTarea = async (req, res) => {
    try {
        console.log(req.body);
        // recibir los datos del body
        const {titulo, descripcion, dificultad, usuarioId, habilidadesIds } = req.body;

        // verificar si los datos no estan vacios
        if (!nombre || !descripcion || !dificultad || !usuarioId || !habilidadesIds || habilidadesIds.length === 0) {
            console.error('LOS DATOS NO PUEDEN ESTAR VACÍOS');
            return res.status(400).json({ message: 'LOS DATOS NO PUEDEN ESTAR VACÍOS' });
        }

        // Buscar el usuario por ID
        const usuario = await Usuarios.findOne({ where: { id: usuarioId } });
        if (!usuario) {
            console.error('USUARIO NO ENCONTRADO');
            return res.status(404).json({ message: 'USUARIO NO ENCONTRADO' });
        }

        // Buscar las habilidades por sus IDs
        const habilidades = await Habilidades.findByIds(habilidadesIds);
        if (habilidades.length === 0) {
            console.error('HABILIDADES NO ENCONTRADAS');
            return res.status(404).json({ message: 'HABILIDADES NO ENCONTRADAS' });
        }


        // crear la tarea
        const tarea = await Tareas.create({
            titulo,
            descripcion,
            dificultad,
            usuario,
            habilidades
        });

        // guardar la tarea
        const guardarTarea = await tarea.save();

        // verificar si se guardo la tarea
        if(!guardarTarea){
            console.error(`NO SE PUDO CREAR LA TAREA ALGO SUCEDIÓ, ${error.message}`);
            return res.status(400).json({message: 'NO SE PUDO CREAR LA TAREA ALGO SUCEDIÓ'});
        }

        console.warn('Tarea creada correctamente');
        return res.status(201).json({
            message: 'Tarea creada correctamente',
            tarea: guardarTarea
        });
    } catch (error) {
        console.error(`NO SE PUDO CREAR LA TAREA: ${error.message}`);
    }
}

// metodo para obtener todas las tareas
export const ObtenerTareas = async (req, res) => {
    try {
        // obtener todas las tareas
        const tareas = await Tareas.find();

        // verificar si se obtuvieron las tareas
        if(!tareas){
            console.error(`NO SE PUDIERON OBTENER LAS TAREAS ALGO SUCEDIÓ, ${error.message}`);
            return res.status(400).json({message: 'NO SE PUDIERON OBTENER LAS TAREAS ALGO SUCEDIÓ'});
        }

        console.warn('Tareas obtenidas correctamente');
        return res.status(200).json({
            message: 'Tareas obtenidas correctamente',
            tareas
        });

    } catch (error) {
        console.error(`NO SE PUDIERON OBTENER LAS TAREAS: ${error.message}`);
    }
}

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
        const tarea = await Tareas.findOne(id);

        // verificar si la tarea existe
        if(!tarea){
            console.error(`NO SE PUDO OBTENER LA TAREA ALGO SUCEDIÓ, ${error.message}`);
            return res.status(400).json({message: 'NO SE PUDO OBTENER LA TAREA ALGO SUCEDIÓ'});
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

        // Si se proporciona un usuario, buscarlo por ID
        if (usuarioId) {
            const usuario = await Usuario.findOne({ where: { id: usuarioId } });
            if (!usuario) {
                console.error('USUARIO NO ENCONTRADO');
                return res.status(404).json({ message: 'USUARIO NO ENCONTRADO' });
            }
            tarea.usuario = usuario;
        }

        // Si se proporcionan habilidades, buscar por sus IDs
        if (habilidadesIds && habilidadesIds.length > 0) {
            const habilidades = await Habilidades.findByIds(habilidadesIds);
            if (habilidades.length === 0) {
                console.error('HABILIDADES NO ENCONTRADAS');
                return res.status(404).json({ message: 'HABILIDADES NO ENCONTRADAS' });
            }
            tarea.habilidades = habilidades;
        }

        // Actualizar los campos de la tarea
        tarea.nombre = nombre || tarea.nombre;
        tarea.descripcion = descripcion || tarea.descripcion;
        tarea.dificultad = dificultad || tarea.dificultad;

        // Guardar los cambios
        const tareaActualizada = await tarea.save();

        console.warn('Tarea actualizada correctamente');
        return res.status(200).json({
            message: 'Tarea actualizada correctamente',
            tarea: tareaActualizada
        });
    } catch (error) {
        console.error(`NO SE PUDO ACTUALIZAR LA TAREA: ${error.message}`);
    }
}

// metodo para eliminar una tarea
export const EliminarTarea = async (req, res) => {
    try {
        // obtener la tarea por id
        const tarea = await Tareas.findOne(req.params.id);

        // verificar si la tarea existe
        if(!tarea){
            console.error(`NO SE PUDO OBTENER LA TAREA ALGO SUCEDIÓ, ${error.message}`);
            return res.status(400).json({message: 'NO SE PUDO OBTENER LA TAREA ALGO SUCEDIÓ'});
        }

        // eliminar la tarea
        await Tareas.delete(tarea.id);

        // verficar si la tarea se eliminó
        if(!tarea){
            console.error(`NO SE PUDO ELIMINAR LA TAREA ALGO SUCEDIÓ, ${error.message}`);
            return res.status(400).json({message: 'NO SE PUDO ELIMINAR LA TAREA ALGO SUCEDIÓ'});
        }

        console.warn('Tarea eliminada correctamente');
        return res.status(200).json({
            message: 'Tarea eliminada correctamente',
            tarea
        })

    } catch (error) {
        console.error(`NO SE PUDO ELIMINAR LA TAREA: ${error.message}`);
    }
}