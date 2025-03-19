import pool from "../../../database/database.js";
import cron from 'node-cron';

export const crearTarea = async (req, res) => {
    let connection;
    try {
        // recibir los datos del body
        const { nombre, descripcion, dificultad, usuarioId, habilidadesIds } = req.body;

        // validar los datos
        if (!nombre || !descripcion || !dificultad || !usuarioId || !habilidadesIds) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // verificar si el usuario existe
        const [usuario] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [usuarioId]);

        if (usuario.length === 0) {
            return res.status(400).json({ message: 'El usuario no existe' });
        }

        // verificar si las habilidades existen
        for (const habilidadId of habilidadesIds) {
            const [habilidad] = await pool.query("SELECT * FROM habilidades WHERE id = ?", [habilidadId]);

            if (habilidad.length === 0) {
                return res.status(400).json({ message: 'La habilidad no existe' });
            }
        }

        // Iniciar transacción
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const sql = "INSERT INTO tareas (nombre, descripcion, dificultad, usuarioId) VALUES (?, ?, ?, ?)";
        const [result] = await connection.query(sql, [nombre, descripcion, dificultad, usuarioId]);

        if (!result) {
            await connection.rollback();
            return res.status(400).json({ message: 'No se pudo crear la tarea' });
        }

        const tareaId = result.insertId;

        for (const habilidadId of habilidadesIds) {
            const sql = "INSERT INTO tareas_habilidades (tareaId, habilidadId) VALUES (?, ?)";
            await connection.query(sql, [tareaId, habilidadId]);
        }

        await connection.commit();
        return res.status(201).json({
            message: 'Tarea creada correctamente',
            tareaId: tareaId
        });

    } catch (error) {
        if (connection) await connection.rollback();
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export const obtenerTareas = async (req, res) => {
    try {
        const sql = "SELECT * FROM tareas WHERE deletedAt IS NULL";
        const [tareas] = await pool.query(sql);

        if (tareas.length === 0) {
            return res.status(404).json({ message: 'No hay tareas registradas' });
        }

        return res.status(200).json({
            message: 'Tareas obtenidas correctamente',
            tareas: tareas
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
}

export const obtenerTareaPorId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const sql = "SELECT * FROM tareas WHERE id = ? AND deletedAt IS NULL";
        const [tareas] = await pool.query(sql, [id]);

        if (tareas.length === 0) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        // Obtener las habilidades asociadas a la tarea
        const sqlHabilidades = `
            SELECT h.* FROM habilidades h
            INNER JOIN tareas_habilidades th ON h.id = th.habilidadId
            WHERE th.tareaId = ?
        `;
        const [habilidades] = await pool.query(sqlHabilidades, [id]);

        return res.status(200).json({
            message: 'Tarea obtenida correctamente',
            tarea: {
                ...tareas[0],
                habilidades: habilidades
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
}

export const actualizarTarea = async (req, res) => {
    let connection;
    try {
        const id = parseInt(req.params.id);
        const { nombre, descripcion, dificultad, habilidadesIds } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        // Verificar si la tarea existe
        const [tarea] = await pool.query("SELECT * FROM tareas WHERE id = ? AND deletedAt IS NULL", [id]);
        if (tarea.length === 0) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        // Validar habilidades si se proporcionan
        if (habilidadesIds && Array.isArray(habilidadesIds)) {
            for (const habilidadId of habilidadesIds) {
                const [habilidad] = await pool.query("SELECT * FROM habilidades WHERE id = ?", [habilidadId]);
                if (habilidad.length === 0) {
                    return res.status(400).json({ message: 'Una de las habilidades no existe' });
                }
            }
        }

        // Iniciar transacción
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Actualizar tarea
        const updateFields = [];
        const updateValues = [];

        if (nombre) {
            updateFields.push("nombre = ?");
            updateValues.push(nombre);
        }
        if (descripcion) {
            updateFields.push("descripcion = ?");
            updateValues.push(descripcion);
        }
        if (dificultad) {
            updateFields.push("dificultad = ?");
            updateValues.push(dificultad);
        }

        if (updateFields.length > 0) {
            const sqlUpdate = `UPDATE tareas SET ${updateFields.join(", ")}, updatedAt = NOW() WHERE id = ?`;
            updateValues.push(id);
            await connection.query(sqlUpdate, updateValues);
        }

        // Actualizar habilidades si se proporcionan
        if (habilidadesIds && Array.isArray(habilidadesIds)) {
            // Eliminar relaciones existentes
            await connection.query("DELETE FROM tareas_habilidades WHERE tareaId = ?", [id]);

            // Agregar nuevas relaciones
            for (const habilidadId of habilidadesIds) {
                await connection.query("INSERT INTO tareas_habilidades (tareaId, habilidadId) VALUES (?, ?)", [id, habilidadId]);
            }
        }

        await connection.commit();
        return res.status(200).json({ message: 'Tarea actualizada correctamente' });
    } catch (error) {
        if (connection) await connection.rollback();
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    } finally {
        if (connection) connection.release();
    }
}

export const eliminarTarea = async (req, res) => {
    let connection;
    try {
        const id = parseInt(req.params.id);

        // verificar si el id es un número
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        // verificar si la tarea existe
        const [tareas] = await pool.query("SELECT * FROM tareas WHERE id = ? AND deletedAt IS NULL", [id]);
        if (tareas.length === 0) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        // Iniciar transacción
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Marcar la tarea como eliminada
        const sql = "UPDATE tareas SET deletedAt = NOW() WHERE id = ? AND deletedAt IS NULL";
        await connection.query(sql, [id]);

        await connection.commit();
        return res.status(200).json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        if (connection) await connection.rollback();
        console.error(`No se pudo eliminar la tarea: ${error.message}`);
        return res.status(500).json({ message: `No se pudo eliminar la tarea: ${error.message}` });
    } finally {
        if (connection) connection.release();
    }
}

const eliminarTareasPermanente = async () => {
    try {
        // Primero eliminar relaciones en tareas_habilidades
        const sqlRelaciones = `
            DELETE th FROM tareas_habilidades th
            INNER JOIN tareas t ON th.tareaId = t.id
            WHERE t.deletedAt < NOW() - INTERVAL 30 DAY
        `;
        await pool.query(sqlRelaciones);

        // Luego eliminar las tareas
        const sqlTareas = "DELETE FROM tareas WHERE deletedAt < NOW() - INTERVAL 30 DAY";
        const [result] = await pool.query(sqlTareas);

        if (result.affectedRows > 0) {
            console.log(`Tareas eliminadas permanentemente: ${result.affectedRows}`);
        }
    } catch (error) {
        console.error(`Error eliminando tareas: ${error.message}`);
    }
}

cron.schedule('0 0 * * *', eliminarTareasPermanente); // se ejecuta todos los días a las 00:00

export default {
    crearTarea,
    obtenerTareas,
    obtenerTareaPorId,
    actualizarTarea,
    eliminarTarea
}