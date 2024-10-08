import { Router } from 'express'

import * as Usuarios from '../services/Usuarios.Services.js'

// importar middleware, validaciones, etc

const router = Router()

// definir rutas ->
router.post('/', Usuarios.CrearUsuario)
router.get('/', Usuarios.ObtenerUsuarios)
router.get('/:id', Usuarios.ObtenerUsuarioPorId)
router.get('/usuario/:nombreUsuario', Usuarios.ObtenerUsuarioNombre)
router.get('/correo/:correo', Usuarios.ObtenerUsuarioCorreo)
router.put('/:id', Usuarios.ActualizarUsuario) // put o patch
router.delete('/:id', Usuarios.EliminarUsuario)

export default router