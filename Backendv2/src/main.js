import Express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from 'dotenv';
import "./database/database.js"; 

// configurar variables de entorno
dotenv.config();

const app = Express();
//midleware
app.use(morgan('dev')) // para que express pueda entender las peticiones
app.use(Express.json()) // para que express pueda entender json
app.use(Express.urlencoded({ extended: true })) // para que express pueda entender formularios
app.use(cors()) // para que cualquier dominio lea o haga peticiones

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});
// condiciones de la ruta equivocada -> dar info de cual es la ruta correcta
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada, la ruta a la que debe ingresar es: http://localhost:3000/api' })
})


// Configurar puerto
const PORT = process.env.PORT || 5000;
app.set("port", PORT);


export default app;
