// utils/mintNFT.ts
import { writeContract } from 'viem'
import { useAccount, usePublicClient } from 'wagmi'

export default async function mintNFT() {
  const { address } = useAccount()
  const publicClient = usePublicClient()

  try {
    const hash = await writeContract(publicClient, {
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      abi: [], // Your contract ABI
      functionName: 'mint',
      args: [address],
      value: BigInt(100000000000000000), // Example value in wei
    })

    return hash
  } catch (error) {
    console.error('Error minting NFT:', error)
    throw error
  }
}