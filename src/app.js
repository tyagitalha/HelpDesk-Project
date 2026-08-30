import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import userRouter from "./routes/user.route.js"
import ticketRouter from "./routes/ticket.route.js"

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({ limit : "16kb"}))
app.use(express.urlencoded({limit : "16kb",extended : true}))
// app.use(express.),
app.use(cookieparser())

app.use("/api/v1/ticket",ticketRouter)
app.use("/api/v1/users",userRouter)

export default app