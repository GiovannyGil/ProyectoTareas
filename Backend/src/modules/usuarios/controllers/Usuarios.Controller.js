import { Router } from 'express'
import { VerificarToken } from '../../auth/middlewares/verify.token.js'
import * as Usuarios from '../services/Usuarios.Services.js'

// importar middleware, validaciones, etc

const router = Router()

// definir rutas ->
router.post('/', VerificarToken, Usuarios.CrearUsuario)
router.get('/', VerificarToken, Usuarios.ObtenerUsuarios)
router.get('/:id', VerificarToken, Usuarios.ObtenerUsuarioPorId)
router.get('/usuario/:nombreusuario', Usuarios.ObtenerUsuarioNombre)
router.get('/correo/:correo', VerificarToken, Usuarios.ObtenerUsuarioCorreo)
router.put('/:id', VerificarToken, Usuarios.ActualizarUsuario) // put o patch
router.delete('/:id', VerificarToken, Usuarios.EliminarUsuario)

export default router