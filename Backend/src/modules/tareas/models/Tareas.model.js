import { Usuarios } from "../../usuarios/models/Usuarios.model";

export const Tareas = conexion.define('Tareas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NombreTarea: {
        type: DataTypes.STRING,
        length: 50,
        allowNull: false
    },
    Descripcion: {
        type: DataTypes.STRING,
        length: 50,
        allowNull: false
    },
    dificultad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 5
        }
    },
    UsuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuarios,
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: false
})