export const Usuarios = conexion.define('Usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
    },
    Nombres: {
        type: DataTypes.STRING, // tipo
        length: 50, // longitud
        allowNull: false, // no nulo
    },
    Apellidos: {
        type: DataTypes.STRING, // tipo
        length: 50, // longitud
        allowNull: false, // no nulo
    },
    NombreUsuario: {
        type: DataTypes.STRING, // tipo
        length: 50, // longitud
        allowNull: false, // no nulo
        unique: true // unico
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        length: 3
    },
    correo: {
        type: DataTypes.STRING,
        length: 50,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    clave: {
        type: DataTypes.STRING,
        length: 50,
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING,
        length: 50,
        allowNull: false
    },
    habilidades: {
        type: DataTypes.STRING,
        length: 50,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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