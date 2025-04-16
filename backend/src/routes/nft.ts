import { Router } from 'express'
import { generateSongAndMintNFT } from '../controllers/nftController'

const router = Router()

router.post('/generate', generateSongAndMintNFT)

export default router
