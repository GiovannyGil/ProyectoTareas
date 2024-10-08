import { Router } from 'express'

import * as Tareas from '../services/Tarea.Services.js'

// importar middleware, validaciones, etc

const router = Router()

// definir rutas ->
router.post('/tareas', Tareas.CrearTarea)
router.get('/', Tareas.ObtenerTareas)
router.get('/:id', Tareas.ObtenerTareaPorId)
router.put('/:id', Tareas.ActualizarTarea) // put o patch
router.delete('/:id', Tareas.EliminarTarea)

export default router