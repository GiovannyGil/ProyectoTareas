import { Habilidades } from "../models/Habilidades.model.js";

// metodo para crear habilidad
export const CrearHabilidad = async (req, res) => {
    try {
        console.log(req.body);
        // recibir los datos del body
        const {nombre, descripcion, nivel} = req.body;
        // validar que los datos no esten vacios
        if(nombre == '' || descripcion == '' || nivel == ''){
            return res.status(400).json({message: 'Los campos no pueden estar vacios'});
        }
        // validar que el nivel sea un numero y positivo o cero
        if(isNaN(nivel) || nivel <= 0 || nivel.isString){
            return res.status(400).json({message: 'El nivel debe ser un numero mayor o igual a 0'});
        }

        // crear la habilidad
        const nuevaHabilidad = new Habilidades({
            nombre,
            descripcion,
            nivel
        })

        // guardar la habilidad
        const guardarHabilidad = await nuevaHabilidad.save();
        // verificar si se guardo la habilidad
        if(guardarHabilidad){
            console.warn('Habilidad creada correctamente');
            return res.status(201).json({
                message: 'Habilidad creada correctamente',
                habilidad: guardarHabilidad
            });
        } else {
            console.error(`NO SE PUDO CREAR LA HABILIDAD ALGO SUCEDIÓ, ${error.message}`);
            return res.status(400).json({message: 'NO SE PUDO CREAR LA HABILIDAD ALGO SUCEDIÓ'});
        }

    } catch (error) {
        console.error(`NO SE PUDO CREAR LA HABILIDAD: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}

// metodo para obtener todas las habilidades
export const ObtenerHabilidades = async (req, res) => {
    try {
        // obtener todas las habilidades
        const habilidades = await Habilidades.find();

        // verificar si se obtuvieron las habilidades
        if(habilidades){
            console.warn('Habilidades obtenidas correctamente');
            return res.status(200).json({
                message: 'Habilidades obtenidas correctamente',
                habilidades
            });
        } else {
            console.error(`NO SE PUDIERON OBTENER LAS HABILIDADES ALGO SUCEDIÓ, ${error.message}`);
            return res.status(400).json({message: 'NO SE PUDIERON OBTENER LAS HABILIDADES ALGO SUCEDIÓ'});
        }
    } catch (error) {
        console.error(`NO SE PUDIERON OBTENER LAS HABILIDADES: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}

// metodo para obtener una habilidad por id
export const ObtenerHabilidadPorId = async (req, res) => {
    try {
        // obtener la habilidad por id
        const habilidad = await Habilidades.findOne(req.params.id);

        // verificar si la habilidad existe
        if(habilidad){
            console.warn('Habilidad obtenida correctamente');
            return res.status(200).json({
                message: 'Habilidad obtenida correctamente',
                habilidad
            });
        } else {
            console.error(`NO SE PUDO OBTENER LA HABILIDAD ALGO SUCEDIÓ, ${error.message}`);
            return res.status(400).json({message: 'NO SE PUDO OBTENER LA HABILIDAD ALGO SUCEDIÓ'});
        }
    } catch (error) {
        console.error(`NO SE PUDO OBTENER LA HABILIDAD: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}

// metodo para obtener una habilidad por nombre de habilidad
export const ObtenerHabilidadNombre = async (req, res) => {
    try {
        const habilidad = await Habilidades.findOne({nombre: req.params.nombre});

        // verficar si la habilidad existe
        if(habilidad){
            console.warn('Habilidad obtenida correctamente');
            return res.status(200).json({
                message: 'Habilidad obtenida correctamente',
                habilidad
            });
        } else {
            console.error(`NO SE PUDO OBTENER LA HABILIDAD ALGO SUCEDIÓ, ${error.message}`);
            return res.status(400).json({message: 'NO SE PUDO OBTENER LA HABILIDAD ALGO SUCEDIÓ'});
        }
    } catch (error) {
        console.error(`NO SE PUDO OBTENER LA HABILIDAD: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}

// metodo para actualizar una habilidad
export const ActualizarHabilidad = async (req, res) => {
    try {
        // obtener la habilidad por id
        const habilidad = await Habilidades.findOne(req.params.id);

        // verificar si la habilidad existe
        if(habilidad){
            // recibir los datos del body
            const {nombre, descripcion, nivel} = req.body;
            // validar que los datos no esten vacios
            if(nombre == '' || descripcion == '' || nivel == ''){
                return res.status(400).json({message: 'Los campos no pueden estar vacios'});
            }
            // validar que el nivel sea un numero y positivo o cero
            if(isNaN(nivel) || nivel <= 0 || nivel.isString){
                return res.status(400).json({message: 'El nivel debe ser un numero mayor o igual a 0'});
            }

            // actualizar la habilidad
            const actualizarHabilidad = await Habilidades.update(habilidad.id, {
                nombre,
                descripcion,
                nivel
            });

            if(actualizarHabilidad){
                console.warn('Habilidad actualizada correctamente');
                return res.status(200).json({
                    message: 'Habilidad actualizada correctamente',
                    habilidad
                });
            } else {
                console.error(`NO SE PUDO ACTUALIZAR LA HABILIDAD ALGO SUCEDIÓ, ${error.message}`);
                return res.status(400).json({message: 'NO SE PUDO ACTUALIZAR LA HABILIDAD ALGO SUCEDIÓ'});
            }
        } else {
            console.error(`NO SE PUDO ACTUALIZAR LA HABILIDAD ALGO SUCEDIÓ, ${error.message}`);
            return res.status(400).json({message: 'NO SE PUDO ACTUALIZAR LA HABILIDAD ALGO SUCEDIÓ'});
        }
    } catch (error) {
        console.error(`NO SE PUDO ACTUALIZAR LA HABILIDAD: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}

// metodo para eliminar una habilidad
export const EliminarHabilidad = async (req, res) => {
    try {
        // obtenber la habilidad por id
        const habilidad = await Habilidades.findByIdAndDelete(req.params.id);

        // verificar si la habilidad se eliminó
        if(habilidad){
            console.warn('Habilidad eliminada correctamente');
            return res.status(200).json({
                message: 'Habilidad eliminada correctamente',
                habilidad
            });
        } else {
            console.error(`NO SE PUDO ELIMINAR LA HABILIDAD ALGO SUCEDIÓ, ${error.message}`);
            return res.status(400).json({message: 'NO SE PUDO ELIMINAR LA HABILIDAD ALGO SUCEDIÓ'});
        }
    } catch (error) {
        console.error(`NO SE PUDO ELIMINAR LA HABILIDAD: ${error.message}`);
        return res.status(500).json({message: 'Error del servidor', error: error.message});
    }
}