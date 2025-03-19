import pool from "../../../database/database.js";
import cron from 'node-cron';

export const crearHabilidad = async (req, res) => {
    try {
        // recibir los datos del body
        const { nombre, descripcion, nivel } = req.body;

        // validar los datos
        if (!nombre || !descripcion || !nivel) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // verificar si la habilidad ya existe
        const [habilidadExistente] = await pool.query("SELECT * FROM habilidades WHERE nombre = ? AND deletedAt IS NULL", [nombre]);

        if (habilidadExistente.length > 0) {
            return res.status(400).json({ message: 'La habilidad ya existe' });
        }

        const sql = "INSERT INTO habilidades (nombre, descripcion, nivel) VALUES (?, ?, ?)";
        const [result] = await pool.query(sql, [nombre, descripcion, nivel]);

        if (!result) {
            return res.status(400).json({ message: 'No se pudo crear la habilidad' });
        }

        return res.status(201).json({
            message: 'Habilidad creada correctamente',
            habilidadId: result.insertId
        });
    } catch (error) {
        console.error(`Error al crear la habilidad: ${error.message}`);
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

export const obtenerHabilidades = async (req, res) => {
    try {
        const sql = "SELECT * FROM habilidades WHERE deletedAt IS NULL";
        const [habilidades] = await pool.query(sql);

        if (habilidades.length === 0) {
            return res.status(404).json({ message: 'No hay habilidades registradas' });
        }

        return res.status(200).json({
            message: 'Habilidades obtenidas correctamente',
            habilidades: habilidades
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

export const obtenerHabilidadPorId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const sql = "SELECT * FROM habilidades WHERE id = ? AND deletedAt IS NULL";
        const [habilidades] = await pool.query(sql, [id]);

        if (habilidades.length === 0) {
            return res.status(404).json({ message: 'Habilidad no encontrada' });
        }

        // Obtener las tareas asociadas a esta habilidad
        const sqlTareas = `
            SELECT t.* FROM tareas t
            INNER JOIN tareas_habilidades th ON t.id = th.tareaId
            WHERE th.habilidadId = ? AND t.deletedAt IS NULL
        `;
        const [tareas] = await pool.query(sqlTareas, [id]);

        return res.status(200).json({
            message: 'Habilidad obtenida correctamente',
            habilidad: {
                ...habilidades[0],
                tareas: tareas
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

export const obtenerHabilidadPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        if (!nombre) {
            return res.status(400).json({ message: 'El nombre de la habilidad es obligatorio' });
        }

        const sql = "SELECT * FROM habilidades WHERE nombre = ? AND deletedAt IS NULL";
        const [habilidades] = await pool.query(sql, [nombre]);

        if (habilidades.length === 0) {
            return res.status(404).json({ message: 'Habilidad no encontrada' });
        }

        return res.status(200).json({
            message: 'Habilidad obtenida correctamente',
            habilidad: habilidades[0]
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

export const actualizarHabilidad = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        // Verificar si la habilidad existe
        const [habilidad] = await pool.query("SELECT * FROM habilidades WHERE id = ? AND deletedAt IS NULL", [id]);
        if (habilidad.length === 0) {
            return res.status(404).json({ message: 'Habilidad no encontrada' });
        }

        const { nombre, descripcion, nivel } = req.body;

        // Validar datos proporcionados
        const updateFields = [];
        const updateValues = [];

        if (nombre) {
            // Verificar que el nuevo nombre no exista ya (si es diferente al actual)
            if (nombre !== habilidad[0].nombre) {
                const [existeNombre] = await pool.query(
                    "SELECT * FROM habilidades WHERE nombre = ? AND id != ? AND deletedAt IS NULL",
                    [nombre, id]
                );

                if (existeNombre.length > 0) {
                    return res.status(400).json({ message: 'Ya existe una habilidad con ese nombre' });
                }
            }
            updateFields.push("nombre = ?");
            updateValues.push(nombre);
        }

        if (descripcion) {
            updateFields.push("descripcion = ?");
            updateValues.push(descripcion);
        }

        if (nivel) {
            updateFields.push("nivel = ?");
            updateValues.push(nivel);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ message: 'No se proporcionaron campos para actualizar' });
        }

        const sql = `UPDATE habilidades SET ${updateFields.join(", ")}, updatedAt = NOW() WHERE id = ? AND deletedAt IS NULL`;
        updateValues.push(id);

        const [result] = await pool.query(sql, updateValues);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Habilidad no encontrada' });
        }

        return res.status(200).json({ message: 'Habilidad actualizada correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

export const eliminarHabilidad = async (req, res) => {
    let connection;
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        // Verificar si la habilidad existe
        const [habilidad] = await pool.query("SELECT * FROM habilidades WHERE id = ? AND deletedAt IS NULL", [id]);
        if (habilidad.length === 0) {
            return res.status(404).json({ message: 'Habilidad no encontrada' });
        }

        // Iniciar transacción
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Verificar si existen relaciones con tareas
        const [relaciones] = await connection.query(
            "SELECT COUNT(*) as count FROM tareas_habilidades WHERE habilidadId = ?",
            [id]
        );

        if (relaciones[0].count > 0) {
            // Si existen relaciones, notificar al usuario cuántas tareas utilizan esta habilidad
            await connection.rollback();
            return res.status(400).json({
                message: `No se puede eliminar esta habilidad porque está siendo utilizada en ${relaciones[0].count} tareas`
            });
        }

        // Eliminar la habilidad
        const sql = "UPDATE habilidades SET deletedAt = NOW() WHERE id = ? AND deletedAt IS NULL";
        const [result] = await connection.query(sql, [id]);

        if (result.affectedRows === 0) {
            await connection.rollback();
            return res.status(404).json({ message: 'Habilidad no encontrada o ya eliminada' });
        }

        await connection.commit();
        return res.status(200).json({ message: 'Habilidad eliminada correctamente' });
    } catch (error) {
        if (connection) await connection.rollback();
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    } finally {
        if (connection) connection.release();
    }
};

const eliminarHabilidadesPermanente = async () => {
    let connection;
    try {
        // Iniciar transacción
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Primero eliminar relaciones en tareas_habilidades para habilidades a eliminar
        const sqlRelaciones = `
            DELETE th FROM tareas_habilidades th
            INNER JOIN habilidades h ON th.habilidadId = h.id
            WHERE h.deletedAt < NOW() - INTERVAL 30 DAY
        `;
        await connection.query(sqlRelaciones);

        // Luego eliminar las habilidades
        const sqlHabilidades = "DELETE FROM habilidades WHERE deletedAt < NOW() - INTERVAL 30 DAY";
        const [result] = await connection.query(sqlHabilidades);

        await connection.commit();

        if (result.affectedRows > 0) {
            console.log(`Habilidades eliminadas permanentemente: ${result.affectedRows}`);
        }
    } catch (error) {
        if (connection) await connection.rollback();
        console.error(`Error eliminando habilidades: ${error.message}`);
    } finally {
        if (connection) connection.release();
    }
};

// Programar un cron job que se ejecute diariamente
cron.schedule('0 0 * * *', eliminarHabilidadesPermanente);

// exportar todas las funciones
export default {
    crearHabilidad,
    obtenerHabilidades,
    obtenerHabilidadPorId,
    obtenerHabilidadPorNombre,
    actualizarHabilidad,
    eliminarHabilidad
}