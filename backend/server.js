import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import data from "./Data/data.js";
import Data from "./modals/dataSchema.js";
dotenv.config()
connectDB()
const app = express()
app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
 
const port = process.env.PORT || 8080;


app.get('/', (req,res) => {
    res.send("API is runing...")
})

app.get(
    "/api/data",
    asyncHandler(async (req, res) => {
      const data = await Data.find({});
      return res.json(data);
    })
  );

//add data to MongoDB only one time
// Data.insertMany(data)

app.listen(port , () => console.log(`Server is runing on port ${port}`))