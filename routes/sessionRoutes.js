//Importamos expres y creamos un router
const express = require("express");
const router=express.Router();

//Importamos el controlador de usuarios.

const sessionController= require("../controllers/sessionController");
const verifyToken= require("../middleware/verfyToken");

//Ruta protegida para obtener informacion sobre el usuario que inicio sesion

router.get("/currentUser", verifyToken, sessionController.getCurrentUser);//Ruta protegida para obtener informacion del usuario que esta conectado actualmente 

module.exports=router;