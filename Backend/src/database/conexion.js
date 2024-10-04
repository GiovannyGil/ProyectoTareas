import { DataSource } from 'typeorm'
import { Usuarios } from '../modules/usuarios/models/Usuarios.model.js'
import { Habilidades } from '../modules/habilidades/models/Habilidades.model.js';
import { Tareas } from '../modules/tareas/models/Tareas.model.js';

// configuracion base de datos
var dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'tareasproyectov1',
  synchronize: true,  // Sincroniza las entidades con la base de datos
  // logging: true,      // Habilita el logging para ver las consultas SQL por consola
  entities: [Usuarios, Habilidades, Tareas],
})

// Función para inicializar la conexión
export const initializeDatabase = async () => {
  try {
    await dataSource.initialize();
    console.log('Base de datos conectada exitosamente');
  } catch (error) {
    console.error('Error conectando la base de datos:', error);
    throw error; // Lanza el error si quieres manejarlo en otro lugar
  }
};


export default {dataSource, initializeDatabase};