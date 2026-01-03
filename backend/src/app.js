import express from "express";
import noteRouters from "./routes/noteRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimit from "./middleware/ratelimit.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();

//middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}


app.use(express.json());
app.use(rateLimit);

app.use("/api/notes", noteRouters);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/thinkboard/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/thinkboard/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(5001, () => console.log("Server is up on 5001"));
});
