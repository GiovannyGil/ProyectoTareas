import app from './src/main.js'

// configuracion del puerto y servidor
app.listen(app.get('port'))

// mensaje de inicio
console.log(`\x1b[36mServidor corriendo en el puerto ${app.get('port')} y servidor local http://localhost:${app.get('port')}`)
