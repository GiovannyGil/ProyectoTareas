export const Habilidades = conexion.define('Habilidades', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    NombreHabilidad: {
        type: DataTypes.STRING,
        length: 50,
        allowNull: false
    },
    Descripcion: {
        type: DataTypes.STRING,
        length: 50,
        allowNull: false
    },
    nivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 5
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