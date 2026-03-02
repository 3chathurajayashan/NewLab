import mongoose from "mongoose";


export const connectDB = async ()=>{
    const uri = "mongodb+srv://admin:admin@cluster0.afu07sh.mongodb.net/labTest?retryWrites=true&w=majority"
    await mongoose.connect(uri).then(()=>{
        console.log("database is ok!")
    })
}