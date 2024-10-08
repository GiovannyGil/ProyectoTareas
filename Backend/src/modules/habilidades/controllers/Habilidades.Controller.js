import { Router } from 'express'

import * as Habilidades from '../services/Habilidades.Services.js'

// importar middleware, validaciones, etc

const router = Router()

// definir rutas ->
router.post('/', Habilidades.CrearHabilidad)
router.get('/', Habilidades.ObtenerHabilidades)
router.get('/:id', Habilidades.ObtenerHabilidadPorId)
router.get('/habilidad/:nombreHabilidad', Habilidades.ObtenerHabilidadNombre)
router.put('/:id', Habilidades.ActualizarHabilidad) // put o patch
router.delete('/:id', Habilidades.EliminarHabilidad)

export default router