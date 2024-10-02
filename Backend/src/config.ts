import {config} from 'dotenv'

config() // Carga las variables de entorno

// Definir configuración
export default {
    port: process.env.PORT || 4000
}