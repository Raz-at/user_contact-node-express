import Contact from "../models/contectModel.js"

export default class contactController
{
    async showAll(req,res){
        try{
        const contacts  = await Contact.find({user_id:req.user.id});
        res.status(200).json({contacts})
        }
        catch (err)
        {
            throw "err"
        }

    }

    async getContact(req,res){
        const { id } = req.params
        try{
        
        const response = await Contact.findById({_id:id})
        res.status(200).json({response})
        }
        catch (err)
        {
            throw err
        }
    }

    async addContact(req,res)
    {
        const { name,email, phone } = req.body
       
            if(!name || !email || !phone)  {res.status(400).json({message:"All fields are required."})} ;
            const contacts = await Contact.create({name,email,phone,user_id:req.user.id})
            res.status(200).json({contacts})
        
    }

    async update(req,res){
        const { id } = req.params
        const { name,email, phone  } = req.body

        const contact = await Contact.findById({_id:id})
        try
        {
            if(contact.user_id.toString() !== req.user.id)
            {
                res.status(400).json({message:"unauthorized user"})
            }
                    
            const response = await Contact.updateOne({_id:id},{name,email,phone})
            res.status(200).json(response)

            
        }
        catch (err)
        {
            throw err
        }
    }

    async delete(req,res)
    {
        const { id } = req.params
        
        const contact = await Contact.findById({_id:id})
        try
        {
            if(contact.user_id.toString() !== req.user.id)
            {  res.status(400).json({message:"unauthorized user"}) }

            const response = await Contact.deleteOne({_id:id})
            res.status(200).json(response)
        }
        catch (err)
        {
            throw err
        }
    }



}