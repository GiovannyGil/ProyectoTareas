import Express from "express"

// inicair express
const ruta = Express()

// rutas
import UsuariosController from './modules/usuarios/controllers/Usuarios.Controller.js'
import TareasController from './modules/tareas/controllers/Tarea.Controller.js';
import HabilidadesController from './modules/habilidades/controllers/Habilidades.Controller.js';

// modulo usuarios
ruta.use('/usuarios', UsuariosController)
// modulo tareas
ruta.use('/tareas', TareasController)
// modulo habilidades
ruta.use('/habilidades', HabilidadesController)
// url por defecto
ruta.get('/', (req, res) => {
    res.send('Hello World')
})

export default ruta