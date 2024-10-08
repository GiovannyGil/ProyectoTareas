import Express from "express"
import cors from "cors"
import morgan from "morgan"

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
import ruta from "./routes.js"
app.use('/api', ruta)

// conexion base de datos
import { initializeDatabase } from './database/conexion.js'
initializeDatabase()

// exportar app
export default app