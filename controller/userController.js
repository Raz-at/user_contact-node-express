import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"

export default class userController
{
    async register(req,res){
        const { username , email , password} = req.body
        try
        {
            if (! username || !email || !password)
            {
                console.log("all fields is necessary to fill")
                res.json({status:false,message:"This is mandotary"})
            }
            const userAvailable = await userModel.findOne({email:email})
            if(userAvailable)
            {
                res.status(500).json({message:"user is already registered"})
            }
            else
            {
                const hashPassword = await bcrypt.hash(password , 10)
                const response = await userModel.create({username, email , password:hashPassword})
                if(response)
                {
                    res.json({_id:response.id,email:response.email})
                }
                

            }

            
        }
        catch (err)
        {
            throw err
        }

    }

    async login(req,res){
        const { email , password} = req.body
        const user = await userModel.findOne({email})
        if(user && (await bcrypt.compare(password , user.password)))
        {
            const accessToken = jwt.sign({
                user:{
                    username: user.username,
                    email:user.email,
                    id:user.id
                },                
            },
            process.env.ACCESS_TOKEN,{expiresIn:"10m"}
            )
            res.json({accessToken})
        }
        else
        {
            res.status(400).json({message:"email or password is incorrect"})
        }
    }


    async current(req,res){
        res.json(req.user)
    }

}