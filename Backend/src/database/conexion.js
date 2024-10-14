import { DataSource } from 'typeorm'
import { Usuarios } from '../modules/usuarios/models/Usuarios.model.js'
import { Habilidades } from '../modules/habilidades/models/Habilidades.model.js';
import { Tareas } from '../modules/tareas/models/Tareas.model.js';
import { Tokens } from '../modules/auth/models/auth.model.js';
// configuracion base de datos
export const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'tareasproyectov1',
  synchronize: true,  // Sincroniza las entidades con la base de datos
  // logging: true,      // Habilita el logging para ver las consultas SQL por consola
  entities: [Usuarios, Habilidades, Tareas, Tokens],
})

// Función para inicializar la conexión
export const initializeDatabase = async () => {
  try {
    await dataSource.initialize();
    console.warn('Base de datos conectada exitosamente',);
  } catch (error) {
    console.error('Error conectando la base de datos:', error.message);
    throw error.message; // Lanza el error si quieres manejarlo en otro lugar
  }
};
