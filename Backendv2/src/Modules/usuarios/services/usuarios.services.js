// const pool = require("../database"); // Asegúrate de importar correctamente la conexión a la base de datos
import pool from "../../../database/database.js";


export const getAllUsers = async (req, res) => {
    try {
        const sql = "SELECT * FROM users WHERE deletedAt IS NULL";
        const [rows] = await pool.query(sql);

        if (!rows || rows.length === 0) {
            console.warn('No se encontraron usuarios en la base de datos');
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }

        console.warn('Usuarios obtenidos correctamente');
        return res.status(200).json({
            message: 'Usuarios obtenidos correctamente',
            usuarios: rows
        });
    } catch (error) {
        console.error(`No se pudieron obtener los usuarios: ${error.message}`);
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
}

export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const sql = "SELECT * FROM users WHERE id = ? AND deletedAt IS NULL";
        const [rows] = await pool.query(sql, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json({ message: 'Usuario obtenido correctamente', usuario: rows[0] });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
}

export const obtenerUsuarioPorNombre = async (req, res) => {
    try {
        const { nombreusuario } = req.params;
        if (!nombreusuario) {
            return res.status(400).json({ message: 'El nombre de usuario es obligatorio' });
        }

        const sql = "SELECT * FROM users WHERE nombreusuario = ? AND deletedAt IS NULL";
        const [rows] = await pool.query(sql, [nombreusuario]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json({ message: 'Usuario obtenido correctamente', usuario: rows[0] });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
}

export const obtenerUsuarioPorCorreo = async (req, res) => {
    try {
        const { correo } = req.params;
        if (!correo) {
            return res.status(400).json({ message: 'El correo es obligatorio' });
        }

        const sql = "SELECT * FROM users WHERE correo = ? AND deletedAt IS NULL";
        const [rows] = await pool.query(sql, [correo]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json({ message: 'Usuario obtenido correctamente', usuario: rows[0] });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
}

export const actualizarUsuario = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        // obtener el usuario por ID
        const usuario = await obtenerUsuarioPorId(id);
        if (!usuario) { return res.status(404).json({ message: 'Usuario no encontrado' }); }

        // recibir los datos del body
        const { nombres, apellidos, nombreusuario, edad, correo, estado } = req.body;
        if (!nombres || !apellidos || !nombreusuario || !edad || !correo || estado === undefined) {
            return res.status(400).json({ message: 'Los datos no pueden estar vacíos' });
        }

        const sqlUpdate = `
            UPDATE users SET nombres = ?, apellidos = ?, nombreusuario = ?, edad = ?, correo = ?, estado = ?
            WHERE id = ? AND deletedAt IS NULL
        `;
        const [result] = await pool.query(sqlUpdate, [nombres, apellidos, nombreusuario, edad, correo, estado, id]);

        if (result.affectedRows === 0 || !result) {
            return res.status(404).json({ message: 'No se pudo actualizar el usuario' });
        }

        return res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
}

export const eliminarUsuario = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) { return res.status(400).json({ message: 'ID inválido, debe ser un número' }); }

        const sqlDelete = "UPDATE users SET deletedAt = NOW() WHERE id = ? AND deletedAt IS NULL";
        const [result] = await pool.query(sqlDelete, [id]);

        if (result.affectedRows === 0) { return res.status(404).json({ message: 'Usuario no encontrado o ya eliminado' }); }

        return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
}

import cron from 'node-cron';

const eliminarUsuariosPermanente = async () => {
    try {
        const sql = "DELETE FROM users WHERE deletedAt < NOW() - INTERVAL 30 DAY";
        const [result] = await pool.query(sql);

        if (result.affectedRows > 0) {
            console.log(`Usuarios eliminados permanentemente: ${result.affectedRows}`);
        }
    } catch (error) {
        console.error(`Error eliminando usuarios: ${error.message}`);
    }
};

// Ejecuta la tarea todos los días a medianoche
cron.schedule('0 0 * * *', eliminarUsuariosPermanente);



module.exports = userService;
