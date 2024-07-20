//Importamos expres y creamos un router
const express=require("express")
const router = express.Router()

// Importamos el controlador de usuarios
const userController=require("../controllers/userController")

//Definir las rutas prar el CRUD de usuarios
router.get("/", userController.getAllUsers)//ruta para obtener todos los usuarios
router.post("/", userController.createUser)// Ruta para crear un usuario
router.put("/:id", userController.updateUser)//Ruta para actualizar un usuario
router.delete("/:id", userController.deleteUser)//Ruta para eliminar un usuario
//Exportamos el router para su uso en otras partes
module.exports=router