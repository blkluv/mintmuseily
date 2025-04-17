import { Router } from 'express'
import { createCheckoutSession } from '../controllers/stripeController'

const router = Router()
router.post('/checkout', createCheckoutSession)

export default router
