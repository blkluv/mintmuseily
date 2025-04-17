import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { generateAudio } from '../services/barkservice'
import { uploadToIPFS } from '../utils/ipfs'

export const generateAndMintNFT = async (req: Request, res: Response) => {
  const { prompt, walletAddress, length } = req.body
  if (!prompt || !walletAddress || !length) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const outputName = `bark_output_${Date.now()}.wav`
    const outputPath = path.resolve(__dirname, `../../tmp/${outputName}`)

    // Step 1: Generate Audio
    await generateAudio(prompt, outputPath)

    // Step 2: Upload to IPFS
    const ipfsCid = await uploadToIPFS(outputPath, outputName)
    const audioUrl = `https://ipfs.io/ipfs/${ipfsCid}`

    // TODO: Mint NFT with ethers.js here

    fs.unlinkSync(outputPath) // Cleanup
    return res.status(200).json({ success: true, audioUrl, ipfsCid })
  } catch (err) {
    return res.status(500).json({ error: 'Audio generation or upload failed', details: err })
  }
}
