import { Request, Response } from 'express'
import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'
import { NFTStorage, File } from 'nft.storage'
import { ethers } from 'ethers'

// NFT.Storage API key
const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY || 'your_api_key_here'
const storage = new NFTStorage({ token: NFT_STORAGE_KEY })

/**
 * Generates audio from text using the Python Bark model.
 * Then uploads to IPFS and mints NFT using ethers.js.
 */
export const generateAndMintNFT = async (req: Request, res: Response) => {
  const { prompt, walletAddress, lengthMinutes } = req.body

  if (!prompt || !walletAddress || !lengthMinutes) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const outputFileName = `bark_output_${Date.now()}.wav`
  const outputPath = path.resolve(__dirname, `../../tmp/${outputFileName}`)

  // Step 1: Generate audio using Python script
  const pythonCmd = `python3 ./scripts/generate_audio.py "${prompt}" "${outputPath}"`
  exec(pythonCmd, async (err, stdout, stderr) => {
    if (err) {
      console.error(stderr)
      return res.status(500).json({ error: 'Audio generation failed' })
    }

    try {
      // Step 2: Read file and upload to IPFS
      const audioFile = fs.readFileSync(outputPath)
      const ipfsAudio = await storage.storeBlob(new File([audioFile], outputFileName, { type: 'audio/wav' }))
      const audioUrl = `https://ipfs.io/ipfs/${ipfsAudio}`

      // Step 3: Mint NFT (simplified - assumes connected contract instance)
      // NOTE: You'd need a signer + contract ABI + contract address here
      // Example:
      // const tx = await contract.mint(walletAddress, audioUrl)
      // await tx.wait()

      // Step 4: Respond
      return res.status(200).json({
        message: 'NFT minted',
        ipfsAudio,
        audioUrl,
      })
    } catch (uploadError) {
      return res.status(500).json({ error: 'Failed to upload or mint NFT' })
    } finally {
      fs.unlinkSync(outputPath) // cleanup temp file
    }
  })
}
