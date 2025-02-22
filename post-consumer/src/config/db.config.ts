import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://priyanshugupta112002:samsung@cluster0.letxcsn.mongodb.net/").then(()=>{
        console.log("mongoDB connected");
    }).catch((error)=>{
        console.log("mongodb Not connected",error)
    })

}