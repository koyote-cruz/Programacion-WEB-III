import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import productoRoutes from "./routes/producto.routes.js";
import Venta from "./models/Venta.js";
import DetalleVenta from "./models/DetalleVenta.js";
import ventaRoutes from "./routes/venta.routes.js";
import reporteRoutes from "./routes/reporte.routes.js";
import dotenv from "dotenv";

//ADMIN: admin@gmail.com, admin123
//user: jair@gmail.com, jair1234
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/productos", productoRoutes);
app.use("/ventas", ventaRoutes);
app.use("/reportes", reporteRoutes);

app.get("/", (req, res) => {res.send("Backend funcionando");});


Venta.hasMany(DetalleVenta);
DetalleVenta.belongsTo(Venta);


sequelize.sync()
  .then(() => {
    console.log("Base de datos conectada");

    app.listen(process.env.PORT, () => {
      console.log("Servidor en puerto " + process.env.PORT);
    });
  })
  .catch(err => console.log(err));
  