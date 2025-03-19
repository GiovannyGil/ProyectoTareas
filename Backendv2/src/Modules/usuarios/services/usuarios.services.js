import pool from "../../../database/database.js";
import cron from 'node-cron';
import bcrypt from 'bcryptjs';  // Recomiendo añadir esta dependencia para hash de contraseñas

export const crearUsuario = async (req, res) => {
    try {
        // Recibir los datos del body
        const { nombres, apellidos, nombreusuario, edad, correo, clave } = req.body;

        // Validar los datos
        if (!nombres || !apellidos || !nombreusuario || !edad || !correo || !clave) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Validar formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            return res.status(400).json({ message: 'Formato de correo electrónico inválido' });
        }

        // Verificar si el usuario ya existe
        const [usuarioExistente] = await pool.query(
            "SELECT * FROM usuarios WHERE nombreusuario = ? OR correo = ?",
            [nombreusuario, correo]
        );

        if (usuarioExistente.length > 0) {
            const campoExistente = usuarioExistente[0].nombreusuario === nombreusuario ? 'nombre de usuario' : 'correo';
            return res.status(400).json({ message: `Ya existe un usuario con ese ${campoExistente}` });
        }

        // Hash de la contraseña (es recomendable usar bcrypt)
        // const hashedPassword = await bcrypt.hash(clave, 10);

        const sql = "INSERT INTO usuarios (nombres, apellidos, nombreusuario, edad, correo, clave) VALUES (?, ?, ?, ?, ?, ?)";
        const [result] = await pool.query(sql, [nombres, apellidos, nombreusuario, edad, correo, clave]);

        if (!result) {
            return res.status(400).json({ message: 'No se pudo crear el usuario' });
        }

        return res.status(201).json({
            message: 'Usuario creado correctamente',
            usuarioId: result.insertId
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

export const obtenerUsuarios = async (req, res) => {
    try {
        const sql = "SELECT id, nombres, apellidos, nombreusuario, edad, correo, estado, createdAt, updatedAt FROM usuarios WHERE deletedAt IS NULL";
        const [usuarios] = await pool.query(sql);

        if (usuarios.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }

        return res.status(200).json({
            message: 'Usuarios obtenidos correctamente',
            usuarios: usuarios
        });
    } catch (error) {
        console.error(`No se pudieron obtener los usuarios: ${error.message}`);
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const sql = "SELECT id, nombres, apellidos, nombreusuario, edad, correo, estado, createdAt, updatedAt FROM usuarios WHERE id = ? AND deletedAt IS NULL";
        const [usuarios] = await pool.query(sql, [id]);

        if (usuarios.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Obtener las tareas asociadas al usuario
        const sqlTareas = "SELECT * FROM tareas WHERE usuarioId = ? AND deletedAt IS NULL";
        const [tareas] = await pool.query(sqlTareas, [id]);

        return res.status(200).json({
            message: 'Usuario obtenido correctamente',
            usuario: {
                ...usuarios[0],
                tareas: tareas
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

export const obtenerUsuarioPorNombre = async (req, res) => {
    try {
        const { nombreusuario } = req.params;
        if (!nombreusuario) {
            return res.status(400).json({ message: 'El nombre de usuario es obligatorio' });
        }

        const sql = "SELECT id, nombres, apellidos, nombreusuario, edad, correo, estado, createdAt, updatedAt FROM usuarios WHERE nombreusuario = ? AND deletedAt IS NULL";
        const [usuarios] = await pool.query(sql, [nombreusuario]);

        if (usuarios.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json({
            message: 'Usuario obtenido correctamente',
            usuario: usuarios[0]
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

export const obtenerUsuarioPorCorreo = async (req, res) => {
    try {
        const { correo } = req.params;
        if (!correo) {
            return res.status(400).json({ message: 'El correo es obligatorio' });
        }

        const sql = "SELECT id, nombres, apellidos, nombreusuario, edad, correo, estado, createdAt, updatedAt FROM usuarios WHERE correo = ? AND deletedAt IS NULL";
        const [usuarios] = await pool.query(sql, [correo]);

        if (usuarios.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json({
            message: 'Usuario obtenido correctamente',
            usuario: usuarios[0]
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

export const actualizarUsuario = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        // Verificar si el usuario existe
        const [usuario] = await pool.query(
            "SELECT * FROM usuarios WHERE id = ? AND deletedAt IS NULL",
            [id]
        );

        if (usuario.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Recibir los datos del body
        const { nombres, apellidos, nombreusuario, edad, correo, clave, estado } = req.body;

        // Preparar campos a actualizar
        const updateFields = [];
        const updateValues = [];

        if (nombres) {
            updateFields.push("nombres = ?");
            updateValues.push(nombres);
        }

        if (apellidos) {
            updateFields.push("apellidos = ?");
            updateValues.push(apellidos);
        }

        if (nombreusuario) {
            // Verificar que el nuevo nombre de usuario no exista (si es diferente al actual)
            if (nombreusuario !== usuario[0].nombreusuario) {
                const [existeNombre] = await pool.query(
                    "SELECT * FROM usuarios WHERE nombreusuario = ? AND id != ? AND deletedAt IS NULL",
                    [nombreusuario, id]
                );

                if (existeNombre.length > 0) {
                    return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
                }
            }
            updateFields.push("nombreusuario = ?");
            updateValues.push(nombreusuario);
        }

        if (edad) {
            updateFields.push("edad = ?");
            updateValues.push(edad);
        }

        if (correo) {
            // Validar formato de correo
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correo)) {
                return res.status(400).json({ message: 'Formato de correo electrónico inválido' });
            }

            // Verificar que el nuevo correo no exista (si es diferente al actual)
            if (correo !== usuario[0].correo) {
                const [existeCorreo] = await pool.query(
                    "SELECT * FROM usuarios WHERE correo = ? AND id != ? AND deletedAt IS NULL",
                    [correo, id]
                );

                if (existeCorreo.length > 0) {
                    return res.status(400).json({ message: 'El correo ya está en uso' });
                }
            }
            updateFields.push("correo = ?");
            updateValues.push(correo);
        }

        if (clave) {
            // Hash de la contraseña (es recomendable usar bcrypt)
            // const hashedPassword = await bcrypt.hash(clave, 10);
            updateFields.push("clave = ?");
            updateValues.push(clave);
        }

        if (estado !== undefined) {
            updateFields.push("estado = ?");
            updateValues.push(estado);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ message: 'No se proporcionaron campos para actualizar' });
        }

        // Añadir updatedAt
        updateFields.push("updatedAt = NOW()");

        const sqlUpdate = `UPDATE usuarios SET ${updateFields.join(", ")} WHERE id = ? AND deletedAt IS NULL`;
        updateValues.push(id);

        const [result] = await pool.query(sqlUpdate, updateValues);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No se pudo actualizar el usuario' });
        }

        return res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

export const eliminarUsuario = async (req, res) => {
    let connection;
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido, debe ser un número' });
        }

        // Verificar si el usuario existe
        const [usuario] = await pool.query(
            "SELECT * FROM usuarios WHERE id = ? AND deletedAt IS NULL",
            [id]
        );

        if (usuario.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Iniciar transacción
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Verificar si el usuario tiene tareas asociadas
        const [tareas] = await connection.query(
            "SELECT COUNT(*) as count FROM tareas WHERE usuarioId = ? AND deletedAt IS NULL",
            [id]
        );

        if (tareas[0].count > 0) {
            // Opción 1: Impedir la eliminación
            // await connection.rollback();
            // return res.status(400).json({ 
            //     message: `No se puede eliminar el usuario porque tiene ${tareas[0].count} tareas asociadas` 
            // });

            // Opción 2: Marcar también las tareas como eliminadas
            await connection.query(
                "UPDATE tareas SET deletedAt = NOW() WHERE usuarioId = ? AND deletedAt IS NULL",
                [id]
            );
        }

        // Eliminar usuario
        const sqlDelete = "UPDATE usuarios SET deletedAt = NOW() WHERE id = ? AND deletedAt IS NULL";
        const [result] = await connection.query(sqlDelete, [id]);

        if (result.affectedRows === 0) {
            await connection.rollback();
            return res.status(404).json({ message: 'Usuario no encontrado o ya eliminado' });
        }

        await connection.commit();
        return res.status(200).json({
            message: 'Usuario eliminado correctamente',
            tareasEliminadas: tareas[0].count > 0 ? tareas[0].count : 0
        });
    } catch (error) {
        if (connection) await connection.rollback();
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    } finally {
        if (connection) connection.release();
    }
};

const eliminarUsuariosPermanente = async () => {
    let connection;
    try {
        // Iniciar transacción
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Primero eliminar tareas relacionadas con usuarios eliminados
        const sqlTareas = `
            DELETE t FROM tareas t
            INNER JOIN usuarios u ON t.usuarioId = u.id
            WHERE u.deletedAt < NOW() - INTERVAL 30 DAY
        `;
        await connection.query(sqlTareas);

        // Luego eliminar relaciones en tareas_habilidades
        const sqlRelaciones = `
            DELETE th FROM tareas_habilidades th
            LEFT JOIN tareas t ON th.tareaId = t.id
            WHERE t.id IS NULL
        `;
        await connection.query(sqlRelaciones);

        // Finalmente eliminar usuarios
        const sqlUsuarios = "DELETE FROM usuarios WHERE deletedAt < NOW() - INTERVAL 30 DAY";
        const [result] = await connection.query(sqlUsuarios);

        await connection.commit();

        if (result.affectedRows > 0) {
            console.log(`Usuarios eliminados permanentemente: ${result.affectedRows}`);
        }
    } catch (error) {
        if (connection) await connection.rollback();
        console.error(`Error eliminando usuarios: ${error.message}`);
    } finally {
        if (connection) connection.release();
    }
};

// Ejecuta la tarea todos los días a medianoche
cron.schedule('0 0 * * *', eliminarUsuariosPermanente);

// Exportar todas las funciones
export default {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    obtenerUsuarioPorNombre,
    obtenerUsuarioPorCorreo,
    actualizarUsuario,
    eliminarUsuario
}