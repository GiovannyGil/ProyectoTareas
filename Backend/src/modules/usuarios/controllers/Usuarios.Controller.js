import { Router } from 'express'

import * as Usuarios from '../services/Usuarios.Services.js'

// importar middleware, validaciones, etc

const router = Router()

// definir rutas ->
router.post('/usuarios', Usuarios.CrearUsuario)
router.get('/usuarios', Usuarios.ObtenerUsuarios)
router.get('/usuarios/:id', Usuarios.ObtenerUsuarioPorId)
router.get('/usuarios/usuario/:nombreUsuario', Usuarios.ObtenerUsuarioNombre)
router.get('/usuarios/correo/:correo', Usuarios.ObtenerUsuarioCorreo)
router.put('/usuarios/:id', Usuarios.ActualizarUsuario) // put o patch
router.delete('/usuarios/:id', Usuarios.EliminarUsuario)

export default router