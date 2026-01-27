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

await connectDB() // Establish connection to the mongodb
await connectCloudinary() //Setup cloudinary for image storage

const app = express() // Create an Express application
app.use(cors()) // Enable CORS for all routes

app.use(express.json()) //Enables JSOn request body parsing
app.use(clerkMiddleware())

// API to listen clerk webhooks
app.use("/api/clerk", clearkWebhooks)

// Defin API Routes
app.use('/api/user', userRouter)
app.use('/api/agencies', agencyRouter)
app.use('/api/properties', propertyRouter)
app.use('/api/bookings', bookingRouter)

//Route endpoint to check server status
app.get('/', (req, res)=>{
    res.send('API Successfully Running')
})

const port = process.env.PORT || 4000 // Use the PORT from environment variables or default to 4000
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})