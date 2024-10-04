import Express from "express"
import cors from "cors"
import morgan from "morgan"

import UsuariosController from './modules/usuarios/controllers/Usuarios.Controller.js'
import TareasController from './modules/tareas/controllers/Tarea.Controller.js';
import HabilidadesController from './modules/habilidades/controllers/Habilidades.Controller.js';


// inicair express
const app = Express()

// definir puerto
const PORT = 3000
app.set('port', PORT)

//midleware
app.use(morgan('dev')) // para que express pueda entender las peticiones
app.use(Express.json()) // para que express pueda entender json
app.set(Express.urlencoded({ extended: true })) // para que express pueda entender formularios
app.use(cors()) // para que cualquier dominio lea o haga peticiones

// rutas
app.use('/api', UsuariosController)
app.use('/api', TareasController)
app.use('/api', HabilidadesController)
// url por defecto
app.get('/', (req, res) => {
    res.send('Hello World')
})

// conexion base de datos
import { initializeDatabase } from './database/conexion.js'
initializeDatabase()

// exportar app
export default app