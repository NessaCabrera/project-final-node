//importamos express y la conexion

const express= require("express")
const connectDb = require("./db/db")

// creamos instancia de express 

// Importamos las rutas 
const userRoutes= require("./routes/userRoutes")
const authRoutes=require("./routes/authRoutes")
const sessionRoutes=require("./routes/sessionRoutes")

const app =express()
const PORT=3010

//Middleware

app.use(express.json())  // Invocamos al middleware para que parsee los datos delm body de las solicitudes en formato json
//Rutas de autenticacion 

app.use("/api/auth", authRoutes)

//Rutas de usuarios

app.use("/api/users", userRoutes) //creamos las rutas de usuario en la ruta /api/users

//Rutas de usuario actual

app.use("/api/session", sessionRoutes)

// Iniciamos la db
connectDb()

// Inicializamos el servidor y lo ponemos en escucha en elpuerto superoir
app.listen(PORT, ()=>{
    console.log("Servidor corriendo en el puerto: "+ PORT)
})