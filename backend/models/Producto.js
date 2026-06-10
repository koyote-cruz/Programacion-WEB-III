import { DataTypes } from "sequelize";

import sequelize from "../config/db.js";

const Producto = sequelize.define(
  "Producto",
  {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    nombre: {
      type: DataTypes.STRING
    },

    categoria: {
      type: DataTypes.STRING
    },

    cantidad: {
      type: DataTypes.INTEGER
    },

    unidad: {
      type: DataTypes.STRING
    },

    precio: {
      type: DataTypes.FLOAT
    },

    fechaIngreso: {
      type: DataTypes.DATEONLY
    }

  },
  {
    tableName: "productos",

    timestamps: false
  }
);

export default Producto;