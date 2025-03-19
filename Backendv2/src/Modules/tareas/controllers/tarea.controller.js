import { Router } from 'express'
import { VerificarToken } from '../../auth/middlewares/verify.token.js'
import * as Tareas from '../services/tarea.services.js'

// importar middleware, validaciones, etc

const router = Router()

// definir rutas ->
router.post('/', VerificarToken, Tareas.crearTarea)
router.get('/', VerificarToken, Tareas.obtenerTareas)
router.get('/:id', VerificarToken, Tareas.obtenerTareaPorId)
router.patch('/:id', VerificarToken, Tareas.actualizarTarea) // put o patch
router.delete('/:id', VerificarToken, Tareas.eliminarTarea)

export default router