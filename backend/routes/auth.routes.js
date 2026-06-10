import express from "express";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import Log from "../models/Log.js";


const router = express.Router();

// REGISTER
router.post(

  "/register",

  // VALIDACIONES
  [
    body("nombre")
      .notEmpty()
      .withMessage("El nombre es obligatorio"),

    body("email")
      .isEmail()
      .withMessage("Correo inválido"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener mínimo 6 caracteres")
  ],

  async (req, res) => {

    // REVISAR ERRORES
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({errors: errors.array()});
    }

    try {

      const { nombre, email, password } = req.body;

      const existe = await Usuario.findOne({where: { email }});

      if (existe) {
        return res.json({message: "Usuario ya existe"});
      }

      // NIVEL PASSWORD
      let nivel_password = "debil";

      const tieneMayus = /[A-Z]/.test(password);
      const tieneNumero = /[0-9]/.test(password);
      const tieneSimbolo = /[^A-Za-z0-9]/.test(password);

      if (
        password.length >= 8 &&
        tieneMayus &&
        tieneNumero &&
        tieneSimbolo
      ) {
        nivel_password = "fuerte";
      }
      else if (
        password.length >= 6 &&
        tieneNumero
      ) {
        nivel_password = "medio";
      }

      const hash = await bcrypt.hash(password, 10);

      const user = await Usuario.create({
        nombre,
        email,
        password: hash,
        nivel_password,
        rol: "usuario"
      });

      res.json({message: "Usuario creado",user});

    } catch (error) {

      console.log(error);

      res.json({error: error.message});
    }

  }
);

// LOGIN
router.post(

  "/login",

  [
    body("email")
      .isEmail()
      .withMessage("Correo inválido"),

    body("password")
      .notEmpty()
      .withMessage("Ingrese contraseña")
  ],

  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({errors: errors.array()});
    }

    try {

      const { email, password } = req.body;

      const user = await Usuario.findOne({where: { email }});

      if (!user) {
        return res.json({message: "Usuario no existe"});
      }

      const valid = await bcrypt.compare(password,user.password);

      if (!valid) {
        return res.json({message: "Contraseña incorrecta"});
      }

      // ===== LOG INGRESO =====
      await Log.create({

        usuario: user.nombre,

        ip: req.ip,

        evento: "ingreso",

        browser: req.headers["user-agent"],

        fecha: new Date()

      });

      // ===== RESPUESTA =====

      res.json({
        message: "Login correcto",
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol
        }
      });

    } catch (error) {

      console.log(error);

      res.json({error: error.message});
    }

  }
);
// LOGOUT

router.post("/logout", async (req, res) => {

  try {

    const { usuario } = req.body;

    await Log.create({

      usuario,

      ip: req.ip,

      evento: "salida",

      browser: req.headers["user-agent"],

      fecha: new Date()

    });

    res.json({
      message: "Logout correcto"});

  } catch (error) {

    res.json({error: error.message});

  }

});

// VER USUARIOS

router.get("/usuarios", async (req, res) => {

  try {

    const usuarios = await Usuario.findAll();

    res.json(usuarios);

  } catch (error) {

    res.json({error: error.message});

  }

});

export default router;