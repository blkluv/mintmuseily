import { useState } from 'react'

export default function Dashboard() {
  const [genre, setGenre] = useState('')
  const [artist, setArtist] = useState('')
  const [videoStyle, setVideoStyle] = useState('')
  const [length, setLength] = useState(1)
  const [message, setMessage] = useState('')

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    const creditsCost = length * 5
    // Call backend API to verify credits, generate song, and mint NFT if applicable.
    setMessage(`Generating a ${length}-minute song in ${genre} style by ${artist}. (Cost: ${creditsCost} credits)`)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2 className="text-2xl font-bold mb-4">🎵 Generate Your Song</h2>
      <form className="space-y-4" onSubmit={handleGenerate}>
        <select
          className="w-full p-2 bg-zinc-800 rounded"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        >
          <option value="" disabled>Choose Genre</option>
          <option value="Hip-Hop">Hip-Hop</option>
          <option value="EDM">EDM</option>
          <option value="Classical">Classical</option>
          <option value="Rock">Rock</option>
        </select>
        <input
          className="w-full p-2 bg-zinc-800 rounded"
          placeholder="Artist style (e.g., Drake)"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />
        <select
          className="w-full p-2 bg-zinc-800 rounded"
          value={videoStyle}
          onChange={(e) => setVideoStyle(e.target.value)}
          required
        >
          <option value="" disabled>Choose Video Style</option>
          <option value="Neon Wave">Neon Wave</option>
          <option value="Retro Anime">Retro Anime</option>
          <option value="Modern Minimal">Modern Minimal</option>
        </select>
        <select
          className="w-full p-2 bg-zinc-800 rounded"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          required
        >
          <option value={1}>1 Minute (5 credits)</option>
          <option value={2}>2 Minutes (10 credits)</option>
          <option value={3}>3 Minutes (15 credits)</option>
        </select>
        <button type="submit" className="w-full bg-purple-700 py-2 rounded hover:bg-purple-600">
          Generate &amp; Mint
        </button>
      </form>
      {message && <p className="mt-4 text-green-400">{message}</p>}
    </div>
  )
}
