import app from "./src/main";

// configuracion del puerto y servidor
app.listen(app.get('port'))

// mensaje de inicio
console.log('Servidor en puerto', app.get('port'))