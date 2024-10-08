import { EntitySchema } from "typeorm";

export const Tokens = new EntitySchema(
    {name: "Token", tableName: "tokens",
        columns: {
            id: {
                primary: true,
                type: "int",
                generated: true,
                nullable: false,
            },
            token: {
                type: "varchar",
                length: 200,
                nullable: false,
            },
            expiracion: {
                type: "timestamp",
            },
            revoked: {
                type: "boolean",
                default: false,
            },
        },
        relations: {
            usuario: {
                target: "Usuario",
                type: "many-to-one",
                joinColumn: {name: "usuarioId"}
            },
        }
    }
)