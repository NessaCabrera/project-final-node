const jwt=require("jsonwebtoken")

//Almacenamos nuetra clave secreta

const JWT_SECRET="9680915e37738c89d7884094b8108b9095cb35c77bcf12636e75ea98ff9e2195"

//creamos una funcion para crear un token JWT

function generateToken(user){
    const payload={
        userId: user._id,
        email: user.email
    };

    const token= jwt.sign(payload, JWT_SECRET, {expiresIn:"1h"});
    return token
}

module.exports= {
    generateToken
}