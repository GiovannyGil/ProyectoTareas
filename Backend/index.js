import app from './src/main.js'

// configuracion del puerto y servidor
app.listen(app.get('port'))

// mensaje de inicio
console.log(`Servidor corriendo en el puerto ${app.get('port')}`)