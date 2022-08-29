import express from "express";
import mongoose from "mongoose";
import {} from "dotenv/config.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
const dbURI = process.env.DBURI;
const port = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");

mongoose.connect(
  dbURI,
  () =>
    app.listen(port, () => console.log(`Server is listening at port ${port}`)),
  (err) => console.log(err)
);

app.use(authRoutes);
