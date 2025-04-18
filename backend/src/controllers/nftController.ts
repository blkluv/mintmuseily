import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { generateAudio } from '../services/barkservice'
import { uploadToIPFS } from '../utils/ipfs'

export const generateAndMintNFT = async (req: Request, res: Response) => {
  const { prompt, walletAddress, length } = req.body
  if (
    typeof prompt !== 'string' || 
    typeof walletAddress !== 'string' || 
    typeof length !== 'number'
  ) {
    return res.status(400).json({ error: 'Invalid input types. "prompt" and "walletAddress" must be strings, and "length" must be a number.' })
  }

  try {
    const outputName = `bark_output_${Date.now()}.wav`
    const outputPath = path.resolve(__dirname, `../../tmp/${outputName}`)

    // Step 1: Generate Audio
    await generateAudio(prompt, outputPath)

    // Step 2: Upload to IPFS
    const ipfsCid = await uploadToIPFS(outputPath, outputName)
    const audioUrl = `https://ipfs.io/ipfs/${ipfsCid}`
    
// Step 3: Mint NFT using ethers
import ABI from '../../contracts/abi/MintMuseilyNFT.json'
import { Contract, Wallet, JsonRpcProvider } from 'ethers'

// These should come from .env
const provider = new JsonRpcProvider(process.env.RPC_URL!)
const wallet = new Wallet(process.env.PRIVATE_KEY!, provider)
const contract = new Contract(process.env.CONTRACT_ADDRESS!, ABI.abi, wallet)

const mintTx = await contract.mint(walletAddress, audioUrl)
await mintTx.wait()

    fs.unlinkSync(outputPath) // Cleanup
    return res.status(200).json({ success: true, audioUrl, ipfsCid })
  } catch (err) {
    return res.status(500).json({ error: 'Audio generation or upload failed', details: err })
  }
}
