// src/server.ts
import dotenv from 'dotenv'
dotenv.config()
// ...rest of your server initialization code

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import connectDB from './config/db'
import authRoutes from './routes/auth'
import userRoutes from './routes/user'
import nftRoutes from './routes/nft'

dotenv.config()
const app = express()

// Connect to MongoDB
connectDB()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/nft', nftRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
