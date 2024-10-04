import { Router } from 'express'

import * as Habilidades from '../services/Habilidades.Services.js'

// importar middleware, validaciones, etc

const router = Router()

// definir rutas ->
router.post('/habilidades', Habilidades.CrearHabilidad)
router.get('/habilidades', Habilidades.ObtenerHabilidades)
router.get('/habilidades/:id', Habilidades.ObtenerHabilidadPorId)
router.get('/habilidades/habilidad/:nombreHabilidad', Habilidades.ObtenerHabilidadNombre)
router.put('/habilidades/:id', Habilidades.ActualizarHabilidad) // put o patch
router.delete('/habilidades/:id', Habilidades.EliminarHabilidad)

export default router