import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-800 to-pink-500 text-white p-10">
      <h1 className="text-5xl font-bold mb-6">🎨 Welcome to MintMuseily</h1>
      <Link href="/mint">
        <button className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition">
          Go to Mint Page
        </button>
      </Link>
    </main>
  )
}