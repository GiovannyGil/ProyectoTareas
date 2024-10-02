import { DataSource } from "typeorm";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "TareasProyecto1",
    synchronize: true, // para que se creen las tablas automaticamente -> solo en desarrollo
    logging: true, // para ver las consultas que se hacen
    entities: [
        __dirname + "/../**/models/entity/*.ts"
    ]
})