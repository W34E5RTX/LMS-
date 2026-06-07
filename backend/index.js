import express from "express"
import dotenv from "dotenv"
import connectDb, { sequelize } from "./configs/db.js"
import authRouter from "./routes/authRoute.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/userRoute.js"
import courseRouter from "./routes/courseRoute.js"
import paymentRouter from "./routes/paymentRoute.js"
import aiRouter from "./routes/aiRoute.js"
import reviewRouter from "./routes/reviewRoute.js"
// import './models/userModel.js'
// import './models/courseModel.js'
// import './models/lectureModel.js'
// import './models/orderModel.js'
// import './models/reviewModel.js'
dotenv.config()

const app = express()
app.set('trust proxy', 1)
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: true,
    credentials: true,
}))
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/course", courseRouter)
app.use("/api/payment", paymentRouter)
app.use("/api/ai", aiRouter)
app.use("/api/review", reviewRouter)

app.get("/", (req, res) => {
    res.send("Hello From Server")
})

const initApp = async () => {
    await connectDb()
    if (process.env.NODE_ENV !== "production") {
        await sequelize.sync()
    }
}

initApp().catch((error) => {
    console.error("App initialization failed:", error)
})

const port = process.env.PORT || 5000
if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    })
}

export default app

