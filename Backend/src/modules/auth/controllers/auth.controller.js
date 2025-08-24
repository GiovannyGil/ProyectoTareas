import { Router } from 'express'
import { VerificarToken } from '../middlewares/verify.token.js'
import * as Auth from '../services/auth.services.js'

const router = Router()

// definir rutas ->
router.get('/', (req, res) => {
    res.send(
        'Bienvenido!\n' + 
        'Para acceder a los datos necesitas logearte\n' +
        'Rutas:\n' + 
        '/login: logeo\n' +
        '/register: regitrarse\n'
    )
})
router.post('/login', Auth.IniciarSesion)
router.post('/register', Auth.RegistrarUsuario)
router.get('/logout', VerificarToken, Auth.CerrarSesion)
router.get("/me", VerificarToken, Auth.UsuarioActual);


export default router