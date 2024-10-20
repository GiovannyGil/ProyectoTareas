import Express from "express"

// inicair express
const ruta = Express()

// rutas
import UsuariosController from './modules/usuarios/controllers/Usuarios.Controller.js'
import TareasController from './modules/tareas/controllers/Tarea.Controller.js';
import HabilidadesController from './modules/habilidades/controllers/Habilidades.Controller.js';
import AuthController from './modules/auth/controllers/auth.controller.js'

// modulo auth
ruta.use('/auth', AuthController)
// modulo usuarios
ruta.use('/usuarios', UsuariosController)
// modulo tareas
ruta.use('/tareas', TareasController)
// modulo habilidades
ruta.use('/habilidades', HabilidadesController)
// url por defecto
ruta.get('/', (req, res) => {
    res.send(
        'Bienvenido!\n' + 
        'blas rutas para acceder a los datos son:\n' + 
        '/auth: logeo, regitrarse, logout\n' +
        '/usuarios: CRUD usuarios -> necesitas logearte\n' +
        '/tareas: CRUD tareas -> necesitas logearte\n' +
        '/habilidades: CRUD habilidades -> necesitas logearte\n'
    )
})

export default ruta