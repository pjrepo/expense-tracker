import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import userRoute from "./routes/userRoute.js";
import transactionsRoute from "./routes/transactionsRoute.js";

const app = express();

dotenv.config();

const PORT = 5000;

const connect = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB successfully!!");
  } catch (error) {
    console.log(error.message);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

app.use(cors());
app.use(express.json());

app.use("/api/user/", userRoute);
app.use("/api/transactions/", transactionsRoute);

app.listen(PORT, () => {
  connect();
  console.log(`Server listening on port ${PORT}`);
});
