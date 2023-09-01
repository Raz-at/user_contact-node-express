import express from "express"
import "dotenv/config"
import contactRouter from "./routes/contactRoutes.js"
import userRouter from "./routes/userRoutes.js"
import errorHandle from "./middleware/errorHandle.js"
import "express-async-errors"
import connextDb from "./config/dbConfig.js"


connextDb();
const app = express()

app.use(express.json())
app.use("/api/contact",contactRouter)
app.use("/api/user",userRouter)
app.use(errorHandle)

app.listen(process.env.PORT,()=>{

    
    console.log("succefully created")
})
