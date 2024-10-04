import { EntitySchema } from "typeorm"

export const Habilidades = new EntitySchema(
    {name: "Habilidad", tableName: "habilidades",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
            nullable: false,
        },
        nombre:{
            type: "varchar",
            length: 40,
            nullable: false,
        },
        descripcion:{
            type: "varchar",
            length: 100,
            nullable: false,
        },
        nivel:{
            type: "int",
            nullable: false,
            default: 0
        },
        createdAt: {
            type: "timestamp",
            createDate: true,
        },
            updatedAt: {
            type: "timestamp",
            updateDate: true,
        },
        deletedAt: {
            type: "timestamp",
            nullable: true,
        },
    },
    relations: {
        tareas: {
            target: "Tarea",
            type: "many-to-many",
            inverseSide: "habilidades"
        }
    }
})