import { Router } from 'express'
import { getMe } from '../controllers/AuthController'

const router = Router()

router.get('/me', getMe)

export default router
