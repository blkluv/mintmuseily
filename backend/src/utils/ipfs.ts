import { NFTStorage, File } from 'nft.storage'
import fs from 'fs'

const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY! })

export const uploadToIPFS = async (filePath: string, fileName: string) => {
  const data = fs.readFileSync(filePath)
  const blob = new File([data], fileName, { type: 'audio/wav' })
  return await client.storeBlob(blob) // Returns CID
}
