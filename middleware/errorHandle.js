const errorHandle = (err,req,res,next)=>{
    if (err)
    {
        if (err.message)
        {
            res.status(400).json({
                status: "failed",
                error: err.message,
              });
            
        }
        res.status(400).json({
            status: "failed",
            error: err,
          });

    }
    else
    {
        next();
    }

}

export default errorHandle
