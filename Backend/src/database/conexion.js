import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const conexion = new Sequelize( process.env.DB_NAME || 'TareasProyectoV1', process.env.DB_USER || 'root',  process.env.DB_PASS || '', {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || '3306',
})

// Diferentes opciones de sync:
// await conexion.sync(); // Normal sync
// await conexion.sync({ force: true }); // Borra y recrea tablas
// await conexion.sync({ alter: true }); // Modifica tablas existentes


// FUNCION TEST -> Conexión a la base de datos para verificar si se conecta correctamente
async function testConexion() {
    try {
        console.warn('Conexion a la base de datos exitosa');
    } catch (error) {
        console.error(`NO SE PUDO CONECTAR A LA BASE DE DATOS: ${error.message}`);
    }
}


// Sincronizar la base de datos
async function syncDatabase() {
    try {
      // force: true borrará y recreará las tablas cada vez que inicies la aplicación
      // En producción, deberías usar force: false
      await conexion.sync({ force: true }); 
      console.log('Base de datos sincronizada');
    } catch (error) {
      console.error('Error al sincronizar la base de datos:', error);
    }
  }

export { conexion, testConexion, syncDatabase };