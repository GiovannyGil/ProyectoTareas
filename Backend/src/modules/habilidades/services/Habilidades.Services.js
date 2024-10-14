import { Habilidades } from "../models/Habilidades.model.js";
import { dataSource } from '../../../database/conexion.js'

// metodo para crear habilidad
export const CrearHabilidad = async (req, res) => {
    try {
        console.log(req.body);
        // recibir los datos del body
        const {nombre, descripcion, nivel} = req.body;
        // validar que los datos no esten vacios
        if(!nombre || !descripcion || !nivel){
            return res.status(400).json({message: 'Los campos no pueden estar vacios'});
        }
        // validar que el nivel sea un numero y positivo o cero
        if(isNaN(nivel) || nivel < 0 || nivel.isString){
            return res.status(400).json({message: 'El nivel debe ser un numero mayor o igual a 0'});
        }

        // Obtener el repositorio de Habilidades
        const habilidadesRepository = dataSource.getRepository(Habilidades);

        // crear la habilidad
        const nuevaHabilidad = habilidadesRepository.create({
            nombre,
            descripcion,
            nivel
        })

        // guardar la habilidad
        const guardarHabilidad = await habilidadesRepository.save(nuevaHabilidad);

        // verificar si se guardo la habilidad
        if(!guardarHabilidad){
            console.error('No se pudo crear la habilidad');
            return res.status(400).json({message: 'No se pudo crear la habilidad'});
        }

        console.warn('Habilidad creada correctamente');
        return res.status(201).json({
            message: 'Habilidad creada correctamente',
            habilidad: guardarHabilidad
        });

    } catch (error) {
        console.error(`NO SE PUDO CREAR LA HABILIDAD: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}

// metodo para obtener todas las habilidades
export const ObtenerHabilidades = async (req, res) => {
    try {
        // Obtener el repositorio de Habilidades
        const habilidadesRepository = dataSource.getRepository(Habilidades);
        
        // obtener todas las habilidades
        const habilidades = await habilidadesRepository.find();


        // verificar si se obtuvieron las habilidades
        if (!habilidades) {
            console.error(`NO SE PUDIERON OBTENER LAS HABILIDADES ALGO SUCEDIÓ`);
            return res.status(404).json({ message: 'NO SE PUDIERON OBTENER LAS HABILIDADES ALGO SUCEDIÓ' });
        }

        console.warn('Habilidades obtenidas correctamente');
        return res.status(200).json({
            message: 'Habilidades obtenidas correctamente',
            habilidades
        });
    } catch (error) {
        console.error(`NO SE PUDIERON OBTENER LAS HABILIDADES: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}

// metodo para obtener una habilidad por id
export const ObtenerHabilidadPorId = async (req, res) => {
    try {
        // optener el id
        const id  = req.params.id

        // Verificar si el id es un numero
        if (isNaN(id)) {
            console.error(`EL ID DEBE SER UN NUMERO`);
            return res.status(400).json({ message: 'EL ID DEBE SER UN NUMERO' });
        }

        // Obtener el repositorio de Habilidades
        const habilidadesRepository = dataSource.getRepository(Habilidades);
        
        // obtener la habilidad por id
        const habilidad = await habilidadesRepository.findOneBy({ id });

        // verificar si la habilidad existe
        if (!habilidad) {
            console.error(`NO SE PUDO OBTENER LA HABILIDAD ALGO SUCEDIÓ`);
            return res.status(404).json({ message: 'NO SE PUDO OBTENER LA HABILIDAD ALGO SUCEDIÓ' });
        }

        console.warn('Habilidad obtenida correctamente');
        return res.status(200).json({
            message: 'Habilidad obtenida correctamente',
            habilidad
        });
    } catch (error) {
        console.error(`NO SE PUDO OBTENER LA HABILIDAD: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}

// metodo para obtener una habilidad por nombre de habilidad
export const ObtenerHabilidadNombre = async (req, res) => {
    try {
        // obtener la habilidad por nombre
        const nombre = req.params.nombre;

        // obtener la habilidad por nombre
        const habilidad = await habilidadesRepository.findOneBy({nombre: nombre});

        // verficar si la habilidad existe
        if (!habilidad) {
            console.error(`NO SE PUDO OBTENER LA HABILIDAD ALGO SUCEDIÓ`);
            return res.status(404).json({ message: 'NO SE PUDO OBTENER LA HABILIDAD ALGO SUCEDIÓ' });
        }

        console.warn('Habilidad obtenida correctamente');
        return res.status(200).json({
            message: 'Habilidad obtenida correctamente',
            habilidad
        });
    } catch (error) {
        console.error(`NO SE PUDO OBTENER LA HABILIDAD: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}

// metodo para actualizar una habilidad
export const ActualizarHabilidad = async (req, res) => {
    try {
        // optener el id
        const id  = req.params.id

        // Verificar si el id es un numero
        if (isNaN(id)) {
            console.error(`EL ID DEBE SER UN NUMERO`);
            return res.status(400).json({ message: 'EL ID DEBE SER UN NUMERO' });
        }

        // obtener la habilidad por id
        const habilidad = await habilidadesRepository.findOneBy(id);

        // verificar si la habilidad existe
        if(!habilidad){
            console.error(`No se pudo obtener la habilidad`);
            return res.status(404).json({message: 'No se pudo obtener la habilidad'});
        }

        // recibir los datos del body
        const {nombre, descripcion, nivel} = req.body;
        // validar que los datos no esten vacios
        if(!nombre || !descripcion || !nivel){
            return res.status(400).json({message: 'Los campos no pueden estar vacios'});
        }
        // validar que el nivel sea un numero y positivo o cero
        if(isNaN(nivel) || nivel < 0 || nivel.isString){
            return res.status(400).json({message: 'El nivel debe ser un numero mayor o igual a 0'});
        }

        // actualizar la habilidad
        habilidad.nombre = nombre;
        habilidad.descripcion = descripcion;
        habilidad.nivel = nivel;
        const actualizarHabilidad = await habilidadesRepository.save(habilidad);

        if(!actualizarHabilidad){
            console.error(`NO SE PUDO ACTUALIZAR LA HABILIDAD ALGO SUCEDIÓ`);
            return res.status(400).json({message: 'NO SE PUDO ACTUALIZAR LA HABILIDAD ALGO SUCEDIÓ'});
        }
        
        console.warn('Habilidad actualizada correctamente');
        return res.status(200).json({
            message: 'Habilidad actualizada correctamente',
            habilidad
        });
    } catch (error) {
        console.error(`NO SE PUDO ACTUALIZAR LA HABILIDAD: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}

// metodo para eliminar una habilidad
export const EliminarHabilidad = async (req, res) => {
    try {
        // optener el id
        const id  = req.params.id

        // Verificar si el id es un numero
        if (isNaN(id)) {
            console.error(`EL ID DEBE SER UN NUMERO`);
            return res.status(400).json({ message: 'EL ID DEBE SER UN NUMERO' });
        }
        // obtenber la habilidad por id
        const habilidad = await Habilidades.findOneBy(id);

        // verificar si la habilidad se eliminó
        if(!habilidad){
            console.error('No se pudo obtener la habilidad');
            return res.status(404).json({message: 'No se pudo obtener la habilidad'});
        }

        // eliminar la habilidad
        await habilidadesRepository.remove(habilidad);

        console.warn('Habilidad eliminada correctamente');
        return res.status(200).json({
            message: 'Habilidad eliminada correctamente',
            habilidad
        });
    } catch (error) {
        console.error(`NO SE PUDO ELIMINAR LA HABILIDAD: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}