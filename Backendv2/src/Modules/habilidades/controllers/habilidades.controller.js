import { Router } from 'express'
import { VerificarToken } from '../../auth/middlewares/verify.token.js'
import * as Habilidades from '../services/habilidades.services.js'

// importar middleware, validaciones, etc

const router = Router()

// definir rutas ->
router.post('/', VerificarToken, Habilidades.crearHabilidad)
router.get('/', VerificarToken, Habilidades.obtenerHabilidades)
router.get('/:id', VerificarToken, Habilidades.obtenerHabilidadPorId)
router.get('/habilidad/:nombreHabilidad', VerificarToken, Habilidades.obtenerHabilidadPorNombre)
router.put('/:id', VerificarToken, Habilidades.actualizarHabilidad) // put o patch
router.delete('/:id', VerificarToken, Habilidades.eliminarHabilidad)

export default router