import { client } from "../db.js";
import jwt from "jsonwebtoken";
export function addUsers(userInfo){
    return client
    .db("guvi")
    .collection("users")
    .insertOne(userInfo)
} 
export function getUser(userEmail){
    return client
    .db("guvi")
    .collection("users")
    .findOne({email:userEmail})
}
export function generateJwtToken(id){
    return jwt.sign({id},"secretkey",{expiresIn:"30d"})
}