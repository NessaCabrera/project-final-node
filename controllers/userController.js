// Importar el modelo de mongo
const User= require("../models/User");
const bcryptService=require("../services/bcryptService");
//Funcion para obtener todos los usuarios
function getAllUsers(req, res){
    //Utilizamos el metodo find() de mongoose para encontrar todos los usuarios 
    User.find()
    .then((users)=> res.status(200).json(users))//Enviamos todo los usuarios como respuesta
    .catch((err)=> {
        console.error(err)
        res.status(500).send("Error al obtener usuarios");//En caso de tener error envia mensaje al cliente
    });
}
//Funcion para crear un usuario
function createUser(req,res){
    //Extraemos toda la informacion del cuertpo de la solicitud.
    const{nombre, edad, email, contraseña} = req.body;

    //Creamos nuevo usuario con el metodo create() de mongoose.
    User.create({nombre, edad, email, contraseña})
    .then((newUser)=> res.status(201).json(newUser))//Enviamos el nuevo usuario como en formato Json.
    .catch((err)=>{
        console.error(err);
            res.status(500).send("Error al crea Usuario");//En caso de tener error envia mensaje al cliente
    });
}

//Funcion para actualizar usuario
function updateUser(req,res){
    //Obtenemos el id del usuario a actualizar
    const userId= req.params.id;
    //Obtenemos los datos actualizados del body de la req
    const updateUser=req.body;
    //Utilizamos el metodo findByIdAndUpdate() de mongoose para buscar y actualizar el usuario por ID
    User.findByIdAndUpdate(userId, updateUser, {new:true})// los tres parametros del metodo son = 1. usuario a actualizar, 2.los datos actualizar, 3.q sea actualizado como nuevo
    .then((user)=>res.status(200).json(user))
    .catch((err)=>{
        console.error(err);
        res.status(500).send("Error al actualizar el usuario");//En caso de tener error envia mensaje al cliente
    });
}

//Funcion para eliminar un usuario

function deleteUser(req,res){
     //Obtenemos el id del usuario a eliminar
     const userId= req.params.id;

     //Utilizamos el metodo findByIdAndDelete() de mongoose para buscar y eliminar el usuario por ID
     User.findByIdAndDelete(userId)
     .then(()=> res.status(204).send("Usuario eliminado correctamente"))//Enviamos una confirmacion al cliente que usuario se elimino correctamente
     .catch((err)=>{
         console.error(err);
         res.status(500).send("Error al eliminar el usuario");//En caso de tener error envia mensaje al cliente
     });
    
}

//Exportamos todas las funciones para su uso en otras partes
module.exports={
    createUser,
    deleteUser,
    getAllUsers,
    updateUser
}