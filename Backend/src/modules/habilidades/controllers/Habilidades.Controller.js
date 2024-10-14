import { Router } from 'express'
import { VerificarToken } from '../../auth/middlewares/verify.token.js'
import * as Habilidades from '../services/Habilidades.Services.js'

// importar middleware, validaciones, etc

const router = Router()

// definir rutas ->
router.post('/', VerificarToken, Habilidades.CrearHabilidad)
router.get('/', VerificarToken, Habilidades.ObtenerHabilidades)
router.get('/:id', VerificarToken, Habilidades.ObtenerHabilidadPorId)
router.get('/habilidad/:nombreHabilidad', VerificarToken, Habilidades.ObtenerHabilidadNombre)
router.put('/:id', VerificarToken, Habilidades.ActualizarHabilidad) // put o patch
router.delete('/:id', VerificarToken, Habilidades.EliminarHabilidad)

export default router