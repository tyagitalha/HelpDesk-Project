import { Router } from "express";
// import { verify } from "jsonwebtoken";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createComment, getAllComment } from "../controller/comment.controller.js";


const router = Router()

router.route("/createComment/:ticketId").post(verifyJWT, createComment)
router.route("/getAllComment/:ticketId").get(verifyJWT, getAllComment)

export default router