import { Router } from 'express'

import * as Tareas from '../services/Tarea.Services.js'

// importar middleware, validaciones, etc

const router = Router()

// definir rutas ->
router.post('/tareas', Tareas.CrearTarea)
router.get('/tareas', Tareas.ObtenerTareas)
router.get('/tareas/:id', Tareas.ObtenerTareaPorId)
router.put('/tareas/:id', Tareas.ActualizarTarea) // put o patch
router.delete('/tareas/:id', Tareas.EliminarTarea)

export default router