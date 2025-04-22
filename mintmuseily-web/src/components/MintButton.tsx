// src/components/MintButton.tsx
import { useAccount, useContractWrite } from 'wagmi'
import { useEffect, useState } from 'react'
import { parseEther } from 'viem'
import mintNFT from '@/utils/mintNFT'

export default function MintButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { address } = useAccount()

  const contractWrite = useContractWrite({
    contractInterface: [], // Your contract ABI
    functionName: 'mint',
    args: [process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`, address],
    value: parseEther('0.1'), // Example value
    onSuccess() {
      setIsSuccess(true)
      setIsLoading(false)
    },
    onError() {
      setIsLoading(false)
    },
  })

  const write = contractWrite.write

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => setIsSuccess(false), 3000)
    }
  }, [isSuccess])

  const handleMint = () => {
    setIsLoading(true)
    write?.()
  }

  return (
    <button
      onClick={handleMint}
      disabled={isLoading || !write}
      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg"
    >
      {isLoading ? 'Minting...' : isSuccess ? 'Success!' : 'Mint'}
    </button>
  )
}