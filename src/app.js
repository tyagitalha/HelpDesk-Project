import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import userRouter from "./routes/user.route.js"
import ticketRouter from "./routes/ticket.route.js"
import adminRouter from "./routes/admin.route.js"
import commentRouter from "./routes/comment.route.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ limit: "16kb", extended: true }))
// app.use(express.),
app.use(cookieparser())

app.use("/api/v1/ticket", ticketRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/admins", adminRouter)
app.use("/api/v1/comment", commentRouter)

export default app