import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import { clerkMiddleware } from '@clerk/express'
import clearkWebhooks from "./controllers/clerkWebhooks.js"
import userRouter from "./routes/userRoute.js"
import propertyRouter from "./routes/propertyRoute.js"
import bookingRouter from "./routes/bookingRoute.js"
import agencyRouter from "./routes/agencyRoute.js"
import connectCloudinary from "./config/cloudinary.js"

// Initialize app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

// API Routes
app.use("/api/clerk", clearkWebhooks)
app.use('/api/user', userRouter)
app.use('/api/agencies', agencyRouter)
app.use('/api/properties', propertyRouter)
app.use('/api/bookings', bookingRouter)

// Health check
app.get('/', (req, res)=>{
    res.send('API Successfully Running')
})

// Initialize connections and start server
const startServer = async () => {
    try {
        await connectDB()
        await connectCloudinary()
        
        const port = process.env.PORT || 4000
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

// For Vercel serverless
export default app

// For local development
if (process.env.NODE_ENV !== 'production') {
    startServer()
}