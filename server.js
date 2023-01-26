import "dotenv/config";
import express from "express";
import bookRouter from "./routes/BookRoutes.js";
import mongoose from "mongoose";
import createHttpError, { isHttpError } from "http-errors";
import userRouter from "./routes/UserRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/books", bookRouter);
app.use("/user", userRouter);

app.use("/", (req, res, next) => {
    return res.status(404).json({success: false, messsage: "This route does not exist."});
});

app.use((error, req, res, next) => {
    console.error(error);
    let errorMessage = "An unknown error occurred.";
    let statusCode = 500;
  
    if (isHttpError(error)) {
      statusCode = error.status;
      errorMessage = error.message;
    }
    return res.status(statusCode).json({ success: false, message: errorMessage });
  });

mongoose.connect(MONGO_URI, () => {
    console.log("mongoose connected");
    app.listen(PORT, ()=>{
        console.log(`server up on http://localhost:${PORT}/`);
    })
})