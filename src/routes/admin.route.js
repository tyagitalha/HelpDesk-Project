import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { allTicket, assignTicket, oneticket, updatePriority, updateStatus } from "../controller/admin.controller.js"


const router = Router()

router.route("/allTicket").get(verifyJWT, isAdmin, allTicket)
router.route("/oneTicket/:ticketId").get(verifyJWT, isAdmin, oneticket)
router.route("/updateStatus/:ticketId").patch(verifyJWT, isAdmin, updateStatus)
router.route("/updatePriority/:ticketId").patch(verifyJWT, isAdmin, updatePriority)
router.route("/assignTicket/:ticketId").patch(verifyJWT, isAdmin, assignTicket)

export default router