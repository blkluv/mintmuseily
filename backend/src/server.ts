import express from 'express'
import cors from 'cors'
import nftRoutes from './routes/nft'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/nft', nftRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
