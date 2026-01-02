import express from "express";
import noteRouters from "./routes/noteRoutes.js"
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimit from "./middleware/ratelimit.js";
import cors from "cors"

dotenv.config();

const app = express();



//middleware
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use(rateLimit);

app.use("/api/notes", noteRouters)



connectDB().then(() => {
    app.listen(5001, () => console.log("Server is up on 5001"));
})









