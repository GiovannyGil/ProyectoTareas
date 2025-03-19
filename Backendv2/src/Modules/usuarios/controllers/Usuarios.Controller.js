import { Router } from 'express'
import { VerificarToken } from '../../auth/middlewares/verify.token.js'
import * as Usuarios from '../services/usuarios.services.js'

// importar middleware, validaciones, etc

const router = Router()

// definir rutas ->
router.post('/', VerificarToken, Usuarios.CrearUsuario)
router.get('/', VerificarToken, Usuarios.ObtenerUsuarios)
router.get('/:id', VerificarToken, Usuarios.obtenerUsuarioPorId)
router.get('/usuario/:nombreusuario', VerificarToken, Usuarios.ObtenerUsuarioNombre)
router.get('/correo/:correo', VerificarToken, Usuarios.obtenerUsuarioPorCorreo)
router.patch('/:id', VerificarToken, Usuarios.actualizarUsuario) // put o patch
router.delete('/:id', VerificarToken, Usuarios.eliminarUsuario)

export default router