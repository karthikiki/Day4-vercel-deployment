import express from "express";
import { addStudentsData, deleteStudentsData, getAllStudents, getStudentsById, updateStudentData } from "../controller/student.js";

const router = express.Router();
router.get("/all", async (req,res)=>{
    try {
        if(req.query.experience){
            req.query.experience = +req.query.experience
        }
        if(req.query.taskCompletion){
            req.query.taskCompletion = +req.query.taskCompletion
        }
        const  students = await getAllStudents(req)
    
        if(students.length <= 0){
            res.status(400).json({data: "User Not Found"})
            return
        }
       res.status(200).json({data: students}) 
    } catch (error) {
        console.log(error)
        res.status(500).json({data:"Internal server Error"})
    }
})
// query params
router.get("/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const students = await getStudentsById(id)
        if(!students){
              res.status(400).json({data:"user not found"})
              return
            }
            res.status(200).json({data: students})
    } catch (error) {
        console.log(error)
        res.status(500).json({data:"Internal server Error"})
    }
})
router.post("/add", async(req,res)=>{
    try {
        const newStudent = req.body;
        if(!newStudent){
            return res.status(400).json({data:"No details provided"})
        }
        const result = await addStudentsData(newStudent)
        res.status(200).json({data:{result : result ,message: "Added Successfully"}})
    } catch (error) {
        console.log(error)
        res.status(500).json({data:"Internal server Error"})
    }
})
router.put("/edit/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const updatedData = req.body;
        if(!id || !updatedData){
            return res.status(400).json({data:"Wrong Request"})
        }
        const result = await updateStudentData(id,updatedData)
         res.status(200).json({data: {result : result,message:"Updated Succesfully"}})
    } catch (error) {
        console.log(error)
        res.status(500).json({data:"Internal server Error"})
    }
})
router.delete("/remove/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const result = await deleteStudentsData(id)
        if(!id){
            return res.status(400).json({data: "Wrong request"})
        }
        res.status(200).json({data:{result: result, message:"Deleted Succesfully"}})
    } catch (error) {
        console.log(error)
        res.status(500).json({data:"Internal server Error"})
        
    }
})

export const studentRouter = router