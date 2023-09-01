import express from "express";
import userController from "../controller/userController.js";
// import validation from "../middleware/validateToken.js";
import auth from "../middleware/validateToken.js"

// const auth = require("../../middleware/auth");


const UserController = new userController()
const router = express.Router();


router.post("/register",UserController.register)
router.post("/login",UserController.login)

router.use(auth)
router.get("/current",UserController.current)


export default router