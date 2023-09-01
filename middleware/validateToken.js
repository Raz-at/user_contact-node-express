import jwt from "jsonwebtoken"

const validation = async(req,res,next)=>{
    let token
    let authHeader = req.headers.Authorization || req.headers.authorization
    if(authHeader && authHeader.startsWith("Bearer"))
    {
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
            try
            {
                console.log(decoded);
                req.user = decoded.user
                next();
            }
            catch (err)
            {
                res.status(400).json({message:"Unauthorzed or token is missing"})
                throw "err"
                
            }
            
        })
        if(!token)
        {
            res.status(400).json({message:"Unauthorzed or token is missing"})
        }
    }

}

export default validation