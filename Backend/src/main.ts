import Express from "express";
import config from "./config";

// iniciar express
const app = Express()

// definir puerto
app.set('port', process.env.PORT || 3000 || config.port)

// midlewares
app.use(Express.json()) // para entender datos en formato json
app.use(Express.urlencoded({extended: false})) // para entender datos de formularios


// rutas

export default app