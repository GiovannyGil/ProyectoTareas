// metodo para crear habilidad
export const CrearHabilidad = async (req, res) => {
    try {
        console.warn('Habilidad creada correctamente');
    } catch (error) {
        console.error(`NO SE PUDO CREAR LA HABILIDAD: ${error.message}`);
    }
}

// metodo para obtener todas las habilidades
export const ObtenerHabilidades = async (req, res) => {
    try {
        console.warn('Habilidades obtenidas correctamente');
    } catch (error) {
        console.error(`NO SE PUDIERON OBTENER LAS HABILIDADES: ${error.message}`);
    }
}

// metodo para obtener una habilidad por id
export const ObtenerHabilidadPorId = async (req, res) => {
    try {
        console.warn('Habilidad obtenida correctamente');
    } catch (error) {
        console.error(`NO SE PUDO OBTENER LA HABILIDAD: ${error.message}`);
    }
}

// metodo para obtener una habilidad por nombre de habilidad
export const ObtenerHabilidadNombre = async (req, res) => {
    try {
        console.warn('Habilidad obtenida correctamente');
    } catch (error) {
        console.error(`NO SE PUDO OBTENER LA HABILIDAD: ${error.message}`);
    }
}

// metodo para actualizar una habilidad
export const ActualizarHabilidad = async (req, res) => {
    try {
        console.warn('Habilidad actualizada correctamente');
    } catch (error) {
        console.error(`NO SE PUDO ACTUALIZAR LA HABILIDAD: ${error.message}`);
    }
}

// metodo para eliminar una habilidad
export const EliminarHabilidad = async (req, res) => {
    try {
        console.warn('Habilidad eliminada correctamente');
    } catch (error) {
        console.error(`NO SE PUDO ELIMINAR LA HABILIDAD: ${error.message}`);
    }
}