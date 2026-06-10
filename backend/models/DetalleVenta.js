import { DataTypes } from "sequelize";

import sequelize from "../config/db.js";

const DetalleVenta = sequelize.define("detalle_venta", {

  producto: {

    type: DataTypes.STRING,

    allowNull: false

  },

  cantidad: {

    type: DataTypes.INTEGER,

    allowNull: false

  },

  precio: {

    type: DataTypes.FLOAT,

    allowNull: false

  },

  subtotal: {

    type: DataTypes.FLOAT,

    allowNull: false

  }

});

export default DetalleVenta;