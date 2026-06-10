import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Usuario = sequelize.define("Usuario", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },


  nombre: DataTypes.STRING,


  email: {
    type: DataTypes.STRING,
    unique: true,
  },


  password: DataTypes.STRING,


  nivel_password: {
    type: DataTypes.STRING,
  },


  rol: {
    type: DataTypes.STRING,
    defaultValue: "usuario",
  },
  
}, {
  tableName: "usuarios",   //  ESTO ES LO IMPORTANTE
  timestamps: false         // opcional (createdAt, updatedAt)
});

export default Usuario;