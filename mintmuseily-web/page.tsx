'use client'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import NFTCard from '@/components/NFTCard'
import { MintButton } from '@/components/MintButton'

export default function MintPage() {
  const { address, isConnected } = useAccount()

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-800 to-pink-500 text-white flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold mb-6">🎨 MintMuseily</h1>
      <ConnectButton />
      {isConnected && (
        <>
          <NFTCard />
          <MintButton />
        </>
      )}
    </main>
  )
}