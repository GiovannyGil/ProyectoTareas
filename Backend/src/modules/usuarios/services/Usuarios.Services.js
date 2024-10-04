
// metodo para crar Usuario
export const CrearUsuario = async (req, res) => {
    try {
        console.warn('Usuario creado correctamente');
    } catch (error) {
        console.error(`NO SE PUDO CREAR EL USUARIO: ${error.message}`);
    }
}

// metodo para obtener todos los usuarios
export const ObtenerUsuarios = async (req, res) => {
    try {
        console.warn('Usuarios obtenidos correctamente');
    } catch (error) {
        console.error(`NO SE PUDIERON OBTENER LOS USUARIOS: ${error.message}`);
    }
}

// metodo para obtener un usuario por id
export const ObtenerUsuarioPorId = async (req, res) => {
    try {
        console.warn('Usuario obtenido correctamente');
    } catch (error) {
        console.error(`NO SE PUDO OBTENER EL USUARIO: ${error.message}`);
    }
}

// metodo para obtener un usuario por nombre de usuario
export const ObtenerUsuarioNombre= async (req, res) => {
    try {
        console.warn('Usuario obtenido correctamente');
    } catch (error) {
        console.error(`NO SE PUDO OBTENER EL USUARIO: ${error.message}`);
    }
}

// metodo para obtener un usuario por correo
export const ObtenerUsuarioCorreo = async (req, res) => {
    try {
        console.warn('Usuario obtenido correctamente');
    } catch (error) {
        console.error(`NO SE PUDO OBTENER EL USUARIO: ${error.message}`);
    }
}

// metodo para actualizar un usuario
export const ActualizarUsuario = async (req, res) => {
    try {
        console.warn('Usuario actualizado correctamente');
    } catch (error) {
        console.error(`NO SE PUDO ACTUALIZAR EL USUARIO: ${error.message}`);
    }
}

// metodo para eliminar un usuario
export const EliminarUsuario = async (req, res) => {
    try {
        console.warn('Usuario eliminado correctamente');
    } catch (error) {
        console.error(`NO SE PUDO ELIMINAR EL USUARIO: ${error.message}`);
    }
}