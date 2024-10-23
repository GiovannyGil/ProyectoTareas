import Express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { limpiarTokensExpirados } from './modules/auth/middlewares/verify.token.js'

// configurar variables de entorno
dotenv.config();

// inicair express
const app = Express()

//midleware
app.use(morgan('dev')) // para que express pueda entender las peticiones
app.use(Express.json()) // para que express pueda entender json
app.use(Express.urlencoded({ extended: true })) // para que express pueda entender formularios
app.use(cors()) // para que cualquier dominio lea o haga peticiones


// rutas
import ruta from "./routes.js"
app.use('/api', ruta)
// condiciones de la ruta equivocada -> dar info de cual es la ruta correcta
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada, la ruta a la que debe ingresar es: http://localhost:3000/api' })
})    

// Ejecutar limpieza de tokens cada 24 horas
setInterval(limpiarTokensExpirados, 24 * 60 * 60 * 1000);



// definir puerto
const PORT = 3000
app.set('port', PORT)

// conexion base de datos
import { initializeDatabase } from './database/conexion.js'
initializeDatabase()

// exportar app
export default app