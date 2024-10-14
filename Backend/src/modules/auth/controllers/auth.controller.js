import { Router } from 'express'
import { VerificarToken } from '../middlewares/verify.token.js'
import * as Auth from '../services/auth.services.js'

const router = Router()

// definir rutas ->
router.post('/login', Auth.IniciarSesion)
router.post('/register', Auth.RegistrarUsuario)
router.get('/logout', VerificarToken, Auth.CerrarSesion)
