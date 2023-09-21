import express from "express"
import dotenv from "dotenv"
import { studentRouter } from "./Routers/students.js";

dotenv.config();
const PORT =  process.env.PORT 

const app = express();
app.use(express.json());

app.use("/students",studentRouter)
//Listrn to server
app.listen(PORT,()=>console.log(`server started in localhost:6000`))