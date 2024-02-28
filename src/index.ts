import  {app}  from "./app";
import dotenv from "dotenv";
import { dbConnect } from "./db";

dotenv.config()

dbConnect()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is Running at PORT :${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("MongoDB connection failed !!",error)
})

