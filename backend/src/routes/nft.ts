import { Router } from 'express'
import { generateAndMintNFT } from '../controllers/nftController'

const router = Router()

router.post('/mint', generateAndMintNFT)

export default router
