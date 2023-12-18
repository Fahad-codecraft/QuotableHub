import mongoose from "mongoose";
import 'dotenv/config';

export default function connectDB(){
  mongoose.connect(process.env.MONGODB_URL, {
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
}