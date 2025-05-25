import { EntitySchema } from "typeorm"

export const Usuarios = new EntitySchema(
    {name: "Usuario", tableName: "usuarios",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
            nullable: false,
        },
        uuid: {
            type: "varchar",
            length: 100,
            unique: true,
            nullable: false,
        },
        nombres: {
            type: "varchar",
            length: 40,
            nullable: false,
        },
        apellidos: {
            type: "varchar",
            length: 40,
            nullable: false,
        },
        nombreusuario: {
            type: "varchar",
            length: 40,
            nullable: false,
            unique: true,
        },
        edad: {
            type: "int",
            nullable: false,
        },
        correo: {
            type: "varchar",
            length: 40,
            nullable: false,
            unique: true,
        },
        clave: {
            type: "varchar",
            length: 200,
            nullable: false,
        },
        estado: {
            type: "int",
            nullable: true,
            default: 0, // 0 -> 1 -> 2 -> 3 -> 4 -> 5
        },
        createdAt: {
            type: "date",
            createDate: true,
        },
            updatedAt: {
                type: "date",
            updateDate: true,
        },
        deletedAt: {
            type: "date",
            nullable: true,
        },
    },
    relations: {
      tareas: {
        target: "Tarea",
        type: "one-to-many",
        inverseSide: "usuario",  // Relación inversa con Tarea
        cascade: true,
      }
    }
  });