import { DataTypes } from "sequelize";

import sequelize from "../config/db.js";

const Venta = sequelize.define("venta", {

  usuario: {

    type: DataTypes.STRING,

    allowNull: false

  },

  total: {

    type: DataTypes.FLOAT,

    allowNull: false

  }

});

export default Venta;