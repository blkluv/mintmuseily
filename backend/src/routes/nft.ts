import { Router } from 'express'
import { generateAndMintNFT } from '../controllers/nftController'
import rateLimit from 'express-rate-limit'

const router = Router()

// Configure rate limiter: maximum of 100 requests per 15 minutes
const mintRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
})

router.post('/mint', mintRateLimiter, generateAndMintNFT)

export default router
