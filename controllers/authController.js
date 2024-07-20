const authService = require("../services/authService");
const AuthToken=require("../models/AuthToken");
const bcryptService=require("../services/bcryptService");
const User = require ("../models/User");
const { json } = require("express");

//Cotrolador para poder manejar la autenticacion de usuarios
/*
function login(req,res){
    const{email, contraseña }=req.body;
    console.log (req);

    User.findOne({email})
    .then(user=>{
        if(!user){
            return res.status(401).json({message:"Credenciales invalidas"});
        }
        
        const match = contraseña;

        if (!match){
            return res.status(401).json ({message: "Credenciales invalidas"});
        }

        const token= authService.generateToken(user);
        res.json({token})
    })
    .catch(error=>{
        console.error(error);
        res.status(500).json({messaje:"Error al iniciar sesion"});
    });

}*/

function login(req, res){
    const{email, contraseña}=req.body
    
    User.findOne({email})
    .then((user)=> {
        if(!user){
            return res.status(401).json({message: "Credenciales Invalidas"})
        }
        
        // Comparar la contraseña ingresada por el usuario con la contraseña almacenada en la base de datos
        bcryptService
        .comparePassword(contraseña, user.contraseña)
        .then((match)=>{
            if(!match){
                return res.status(401).json({message:"Credenciales Invalidas"});
            }
            //Si las credenciales son validas es decir si la contraseña ingresada por el usuario es la misma que la contraseña almacenada en la base de deatos (es decir la contraseña con la cual se registro), vamos a crearle el token

            const token= authService.generateToken(user);
            
            //Guardar el token en la base de datos 

            AuthToken.create({userId: user._id, token})
            .then(()=> {
                res.json({token});
            })
            .catch((error)=>{
                console.error(error);
                res.status(500).json({message:"Error al iniciar sesion"});
            });
        })
        .catch((error)=>{
            console.error(error);
            res.status(500).json({message:"Error al iniciar sesion"});
        });
    })
    .catch((error)=>{
        console.error(error)
        res.status(500).json({message:"Error al iniciar sesion"});
    });
}

//controlador para cerrar la sesion

function logout(req, res){
    //res.status(200).json({message:"Sesion cerrada exitosamente"});
    const token = req.headers.authorization.split(" ")[1]
    //Buscamo el token en la base de datos y lo eliminamos
    AuthToken.findOneAndDelete({token})
    .then(()=>{
        res.status(200).json({message: "Sesion cerrada exitosamente"})
    })
    .catch((error)=>{
        console.error(error)
        res.status(500).json({message:"Error al iniciar sesion"})
    })
}

module.exports={
    login,
    logout,
};
