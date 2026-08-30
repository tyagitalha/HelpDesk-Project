import { Router } from "express";
import { createTicket, getAllTicket, getOneTicket, updateTicket } from "../controller/ticket.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/createTicket").post(verifyJWT, createTicket)
router.route("/getAllTicket").get(verifyJWT, getAllTicket)
router.route("/getTicket").get(verifyJWT, getOneTicket)
router.route("/update/:ticketId").patch(verifyJWT, updateTicket)

export default router