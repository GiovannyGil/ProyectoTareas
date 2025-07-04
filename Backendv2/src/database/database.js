import dotenv from 'dotenv';
import { DataSource } from 'typeorm'
dotenv.config();

export const dataSource = new DataSource({
    type: 'sqlite',
    database: 'tareasproyectov1.sqlite',
    synchronize: true,  // Sincroniza las entidades con la base de datos
    // logging: true,      // Habilita el logging para ver las consultas SQL por consola
    entities: [],
})

// Función para inicializar la conexión
export const initializeDatabase = async () => {
    try {
        await dataSource.initialize();
        console.warn('\x1b[32m%s\x1b[0m', 'Base de datos conectada exitosamente',);

    } catch (error) {
        console.error('Error conectando la base de datos:', error.message);
        throw error.message; // Lanza el error si quieres manejarlo en otro lugar
    }
};
