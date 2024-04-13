import express from "express";
import mongoose from "mongoose";
import router from "./routes/index.js";
const app = express();

app.use(express.json());

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ASM");
    console.log(123);
  } catch (error) {
    console.log(error.message);
  }
};
connect();
app.use("/api", router);
app.listen(5000);
