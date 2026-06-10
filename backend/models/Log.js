import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Log = sequelize.define(
  "Log",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    usuario: {
      type: DataTypes.STRING
    },

    ip: {
      type: DataTypes.STRING
    },

    evento: {
      type: DataTypes.STRING
    },

    browser: {
      type: DataTypes.STRING
    },

    fecha: {
      type: DataTypes.DATE
    }

  },
  {
    tableName: "logs",
    timestamps: false
  }
);

export default Log;