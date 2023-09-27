import express from "express"
import{ addUsers, generateJwtToken, getUser }from "../controller/users.js";
import bcrypt from "bcrypt"

const router = express.Router();

router.post("/signup",async(req,res)=>{
    try {
        const  salt = await bcrypt.genSalt(10);
        const user = await getUser(req.body.email)
        if(!user){
          //logic
          const hashedPassword = await bcrypt.hash(req.body.password, salt);
          // const userInfo = req.body;
          // userInfo.password = hashedPassword
          const hashedUser = await {...req.body,password:hashedPassword}
          const result = await addUsers(hashedUser)
          return res.status(200).json({data:{
            // password : req.body.password,
            // hashedPassword : hashedPassword,
            // salt:salt
            // userInfo : hashedUser
            result,data:"Added Succesfully"
          }})
        }
        res.status(400).json({data: "Given Email already exit's"})
    } catch (error) {
        console.log(error)
        res.status(500).json({data:"Internal server Error"})
    }
})

router.post("/login",async(req,res)=>{
  try {
    //is user present 
    const user = await getUser(req.body.email)
    if(!user){
     return res.status(404).json({data:"Invalid Email"})
    }
    //password correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword){
      return   res.status(403).json({data:'Wrong Password'})
    }
    const token = generateJwtToken(user._id);

    res.status(200).json({data:{
      message:"success",
      token : token
    }})
  } catch (error) {
    console.log(error)
    res.status(500).json({data:"Internal server Error"})
  }
})
export const userRouter = router