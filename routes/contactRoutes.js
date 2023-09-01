import express from "express";
import contactController from "../controller/contactController.js";
import auth from "../middleware/validateToken.js"

const ContactController = new contactController()
const router = express.Router();


router.use(auth)
router.post("/addContact",ContactController.addContact)
router.get("/show",ContactController.showAll)
router.get("/:id",ContactController.getContact)
router.patch("/:id",ContactController.update)
router.delete("/:id",ContactController.delete)


export default router