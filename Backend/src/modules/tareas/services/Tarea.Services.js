// metodo para crear tarea
export const CrearTarea = async (req, res) => {
    try {
        console.warn('Tarea creada correctamente');
    } catch (error) {
        console.error(`NO SE PUDO CREAR LA TAREA: ${error.message}`);
    }
}

// metodo para obtener todas las tareas
export const ObtenerTareas = async (req, res) => {
    try {
        console.warn('Tareas obtenidas correctamente');
    } catch (error) {
        console.error(`NO SE PUDIERON OBTENER LAS TAREAS: ${error.message}`);
    }
}

// metodo para obtener una tarea por id
export const ObtenerTareaPorId = async (req, res) => {
    try {
        console.warn('Tarea obtenida correctamente');
    } catch (error) {
        console.error(`NO SE PUDO OBTENER LA TAREA: ${error.message}`);
    }
}

// metodo para actualizar una tarea
export const ActualizarTarea = async (req, res) => {
    try {
        console.warn('Tarea actualizada correctamente');
    } catch (error) {
        console.error(`NO SE PUDO ACTUALIZAR LA TAREA: ${error.message}`);
    }
}

// metodo para eliminar una tarea
export const EliminarTarea = async (req, res) => {
    try {
        console.warn('Tarea eliminada correctamente');
    } catch (error) {
        console.error(`NO SE PUDO ELIMINAR LA TAREA: ${error.message}`);
    }
}