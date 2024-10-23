import { EntitySchema } from "typeorm"

export const Tareas = new EntitySchema(
    {name: "Tarea", tableName: "tareas",
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
        dificultad: {
            type: "int",
            nullable: false,
            default: 0,
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
        habilidades: {
            target: "Habilidad",
            type: "many-to-many",
            joinTable: {
                name: "tareas_habilidades",
            },
            cascade: true,
            eager: true,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        usuario: {
            target: "Usuario",
            type: "many-to-one",
            joinColumn: true,
            eager: true,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }
    }
})

export default Tareas