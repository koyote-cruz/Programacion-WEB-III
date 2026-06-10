import express from "express";

import Venta from "../models/Venta.js";
import DetalleVenta from "../models/DetalleVenta.js";
import Producto from "../models/Producto.js";

const router = express.Router();


// =====================================
// CREAR VENTA
// =====================================

router.post("/", async (req, res) => {

  try {

    const { usuario, carrito } = req.body;

    // VALIDAR
    if (!carrito || carrito.length === 0) {

      return res.json({
        message: "Carrito vacío"
      });

    }

    // CALCULAR TOTAL
    let total = 0;

  carrito.forEach(item => {
  total += item.precio * item.cantidad;
  });
  
    // CREAR VENTA
    const venta = await Venta.create({

      usuario,

      total

    });

    // RECORRER CARRITO
    for (const item of carrito) {

      // BUSCAR PRODUCTO
      const producto =
        await Producto.findByPk(item.id);

      if (!producto) {
        continue;
      }
      if (producto.cantidad < item.cantidad) {
        return res.json({
          message: `No hay stock suficiente de ${producto.nombre}`
        });
        }

      // VALIDAR STOCK
      if (producto.cantidad <= 0) {
        continue;
      }

      // GUARDAR DETALLE
      await DetalleVenta.create({

        producto: producto.nombre,

        cantidad: item.cantidad,
        precio: producto.precio,
        subtotal: producto.precio * item.cantidad,

        ventumId: venta.id

      });

      // DESCONTAR STOCK
      producto.cantidad = producto.cantidad - item.cantidad;

      await producto.save();

    }

    res.json({

      message: "Compra realizada",

      venta

    });


  } catch (error) {

    console.log(error);

    res.json({

      error: error.message

    });

  }

});
//TABLA TIENDA
router.get("/detalles", async (req, res) => {

      try {

        const detalles = await DetalleVenta.findAll();

        res.json(detalles);

        } catch (error) {

          res.json({error: error.message});

        }

      });

export default router;