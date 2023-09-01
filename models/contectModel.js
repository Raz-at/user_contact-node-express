import mongoose from "mongoose"

const contactSchema = mongoose.Schema({
    user_id:
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    name:
    {
        type: String,
        
    },
    email:
    {
        type: String,
       
    },
    phone:
    {
        type: String,
        
    },
},
{
timestamps:true,
})

export default mongoose.model("contacts",contactSchema)