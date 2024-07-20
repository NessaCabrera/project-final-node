// importamos mongoose para creas la conexion a la DB de mongo db
const mongoose= require("mongoose");
// conectamos la db utilizandoo metodo conect() de mongoose
const mongoDBURL= "mongodb+srv://vanessac:MUwmX$teVv-T2Ay@cluster0.9cm1xv3.mongodb.net/proyect"

function conectDB(){
    return new Promise((res, rej)=> {
        mongoose
        .connect(mongoDBURL)
        .then (()=> {
            console.log("conexion a la db establecida correctamente");
            res();
        })
        .catch((err)=>{
            console.error("Error al conectar a la BD", err);
            rej(err);
        });
    });
}

module.exports=conectDB;
