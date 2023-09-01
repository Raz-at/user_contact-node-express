import mongoose from "mongoose"

const userScheme = mongoose.Schema({
    username:
    {
        type:String,
        requires:true
    },
    email:
    {
        type:String,
        required: [true , "This is always required"],
        unique:[true, "email is already taken"]
    },
    password:
    {
        type:String,
        required:true
    },
},
{
    timestamp:true,
})

export default mongoose.model("users",userScheme)