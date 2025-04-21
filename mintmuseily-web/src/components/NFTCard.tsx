import Image from 'next/image'

export default function NFTCard() {
  return (
    <div className="bg-white/10 p-6 rounded-lg shadow-lg">
      <Image src="/nft-preview.png" alt="NFT" width={300} height={300} className="rounded-lg" />
      <h2 className="text-white text-center mt-4 font-semibold">Muse #001: Neon Catwave</h2>
    </div>
  )
}