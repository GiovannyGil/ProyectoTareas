import { Router } from 'express'
import { VerificarToken } from '../../auth/middlewares/verify.token.js'
import * as Tareas from '../services/Tarea.Services.js'

// importar middleware, validaciones, etc

const router = Router()

// definir rutas ->
router.post('/', VerificarToken, Tareas.CrearTarea)
router.get('/', VerificarToken, Tareas.ObtenerTareas)
router.get('/:id', VerificarToken, Tareas.ObtenerTareaPorId)
router.put('/:id', VerificarToken, Tareas.ActualizarTarea) // put o patch
router.delete('/:id', VerificarToken, Tareas.EliminarTarea)

export default router