import mongoose from "mongoose";


export const connectDB = async () => {
    try {
     await mongoose.connect(process.env.MONGO_URI);
     console.log("Connected To mongo DB");   
    } catch (error) {
      console.error("Connection Failed", error);
    }
}

export default connectDB;