import mongoose from "mongoose"

const connect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{});
        console.log("database connected") ;
    } catch (error) {
        
        console.log("Error connecting Database",error);
        process.exit(1);
    }
}



export default connect;