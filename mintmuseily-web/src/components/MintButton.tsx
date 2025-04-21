'use client'
import { useState } from 'react'

export function MintButton() {
  const [minted, setMinted] = useState(false)

  const handleMint = async () => {
    setMinted(true)
  }

  return (
    <>
      {minted ? (
        <p className="text-green-300 font-bold mt-6">✅ Minted successfully!</p>
      ) : (
        <button onClick={handleMint} className="mt-6 bg-green-500 px-6 py-3 rounded-full hover:bg-green-600 transition">
          🪙 Mint NFT
        </button>
      )}
    </>
  )
}