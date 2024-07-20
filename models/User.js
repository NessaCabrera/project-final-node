//Importamos Mongoose para definir y temer el esquema de usuario y modelo
const mongoose=require("mongoose")
const bcryptService=require("../services/bcryptService")

//Definimos el esquema de usuario utilizando el constructor de mongo llamado eschema
const userSchema=new mongoose.Schema({
    nombre: {
        type:String,
        required: true
    },
    edad: {
        type:Number,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique:true //El correo electronico tiene que ser Unico
    },
    contraseña:{
        type:String,
        required:true
    }
})

//Antes de guardar un usuario vamos a hashear la contraseña

userSchema.pre("save", function(next) {
    if(!this.isModified("contraseña")){
        return next();
    }
    bcryptService
    .hashPassword(this.contraseña)
    .then((hashedPassword) => {
        this.contraseña=hashedPassword;
    })
    .catch((error)=>{
        console.error(error);
    });
});
//Crear el modelo user utilizando el esquema definido anteriormente
const User=mongoose.model("User", userSchema)
//Exportamos el modelo User para usarlo en cualquier parte
module.exports=User