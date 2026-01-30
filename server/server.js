import express from "express"
import cors from "cors"
import "dotenv/config"
import { clerkMiddleware } from "@clerk/express"

import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"

import clearkWebhooks from "./controllers/clerkWebhooks.js"
import userRouter from "./routes/userRoute.js"
import propertyRouter from "./routes/propertyRoute.js"
import bookingRouter from "./routes/bookingRoute.js"
import agencyRouter from "./routes/agencyRoute.js"

// Initialize app
const app = express()

// 🔹 Connect DB & Cloudinary (safe for Vercel)
await connectDB()
await connectCloudinary()

// Middleware
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

// Routes
app.use("/api/clerk", clearkWebhooks)
app.use("/api/user", userRouter)
app.use("/api/agencies", agencyRouter)
app.use("/api/properties", propertyRouter)
app.use("/api/bookings", bookingRouter)

// Health check
app.get("/", (req, res) => {
  res.send("API Successfully Running 🚀")
})

// ✅ REQUIRED for Vercel
export default app
