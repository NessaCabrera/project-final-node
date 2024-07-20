const jwt= require ("jsonwebtoken")

function verifyToken(req, res, next){
    return new Promise((resolve, reject)=>{
        const token=req.headers.authorization;

        if(!token){
            reject({
                status:401, 
                message: "Token de autenticacion no proporcionado",
            });
        }
    
        jwt.verify(
            token.split(" ")[ 1],
            "9680915e37738c89d7884094b8108b9095cb35c77bcf12636e75ea98ff9e2195",
            (error, decodedToken)=>{
                if (error){
                    reject({ status:401, message:"Token de autenticacion no valido"});
                }else{
                    req.userId=decodedToken.userId; //Agregamos añ ID de isiario decodificado para su posterior uso
                    resolve();
                 }
            }
        );
    })
    .then(()=> next ())//Continua el 
    .catch(error=>
        res.status(error.status||500).json({message:error.message})
    );
}

module.exports=verifyToken