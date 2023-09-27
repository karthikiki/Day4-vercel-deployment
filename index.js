import express from "express"
import dotenv from "dotenv"
import { studentRouter } from "./Routers/students.js";
import { userRouter } from "./Routers/users.js";

dotenv.config();
const PORT = 6000

const app = express();
app.use(express.json());
app.use("/students",studentRouter)
app.use("/users",userRouter)

//Listrn to server
app.listen(PORT,()=>console.log(`server started in localhost:6000`))