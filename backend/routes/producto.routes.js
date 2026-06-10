import express from "express";
import {body,validationResult} from "express-validator";

import Producto from "../models/Producto.js";

const router = express.Router();



// OBTENER PRODUCTOS

router.get("/", async (req, res) => {

  try {

    const productos = await Producto.findAll();

    res.json(productos);

  } catch (error) {

    res.json({error: error.message});

  }

});



// AGREGAR PRODUCTO

router.post(

  "/",

  [

    body("nombre")
      .notEmpty()
      .withMessage("El nombre es obligatorio"),

    body("categoria")
      .notEmpty()
      .withMessage("La categoría es obligatoria"),

    body("cantidad")
      .isInt({ min: 0 })
      .withMessage("Cantidad inválida"),

    body("unidad")
      .notEmpty()
      .withMessage("La unidad es obligatoria"),

    body("precio")
      .isFloat({ min: 0 })
      .withMessage("Precio inválido"),

    body("fechaIngreso")
      .notEmpty()
      .withMessage("La fecha es obligatoria")

  ],

  async (req, res) => {

    // VALIDAR ERRORES
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.json({errors: errors.array()});

    }

    try {

      const {
        nombre,
        categoria,
        cantidad,
        unidad,
        precio,
        fechaIngreso
      } = req.body;

      const producto = await Producto.create({

        nombre,
        categoria,
        cantidad,
        unidad,
        precio,
        fechaIngreso

      });

      res.json({message: "Producto agregado",producto});

    } catch (error) {

      console.log(error);

      res.json({error: error.message});

    }

  }

);


// =====================================
// EDITAR PRODUCTO
// =====================================
router.put(

  "/:id",

  [

    body("nombre")
      .notEmpty()
      .withMessage("El nombre es obligatorio"),

    body("categoria")
      .notEmpty()
      .withMessage("La categoría es obligatoria"),

    body("cantidad")
      .isInt({ min: 0 })
      .withMessage("Cantidad inválida"),

    body("unidad")
      .notEmpty()
      .withMessage("La unidad es obligatoria"),

    body("precio")
      .isFloat({ min: 0 })
      .withMessage("Precio inválido")

  ],

  async (req, res) => {

    // VALIDAR ERRORES
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.json({errors: errors.array()});

    }

    try {

      const { id } = req.params;

      const producto = await Producto.findByPk(id);

      if (!producto) {

        return res.json({message: "Producto no existe"});

      }

      await producto.update(req.body);

      res.json({

        message: "Producto actualizado",producto});

    } catch (error) {

      console.log(error);

      res.json({error: error.message});

    }

  }

);



// ELIMINAR PRODUCTO

router.delete("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const producto = await Producto.findByPk(id);

    if (!producto) {

      return res.json({message: "Producto no existe"});

    }

    await producto.destroy();

    res.json({message: "Producto eliminado"});

  } catch (error) {

    res.json({error: error.message});

  }

});

export default router;