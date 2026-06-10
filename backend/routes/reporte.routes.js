import express from "express";
import Producto from "../models/Producto.js";
import Venta from "../models/Venta.js";
import DetalleVenta from "../models/DetalleVenta.js";
import Usuario from "../models/Usuario.js";
import Log from "../models/Log.js";

const router = express.Router();

router.get("/completo", async (req, res) => {

  try {

    const productos = await Producto.findAll();
    const ventas = await Venta.findAll();
    const detalles = await DetalleVenta.findAll();
    const usuarios = await Usuario.findAll();
    const logs = await Log.findAll();

    res.json({
      productos,
      ventas,
      detalles,
      usuarios,
      logs
    });

  } catch (error) {
    res.json({ error: error.message });
  }

});

export default router;