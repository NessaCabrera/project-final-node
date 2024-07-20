//Importamos express y creamos un router

const express=require("express");
const router=express.Router();

// importamos el controlador de authRoutes

const authController = require("../controllers/authController");

//Importamos el middleware de Seguridad

const verifyToken=require("../middleware/verfyToken")

//Rutas para al Auth del User

router.post("/login", authController.login);

//Ruta para cerra sesion

router.post("/logout", verifyToken, authController.logout);

module.exports=router;
