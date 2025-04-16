import { useNavigate } from 'react-router-dom'

export default function Onboarding() {
  const navigate = useNavigate()

  const handleSelect = (plan: 'free' | 'monthly' | 'yearly') => {
    // Save plan and update user credits via backend API call (to be implemented)
    console.log(`Plan selected: ${plan}`)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center px-4">
      <h2 className="text-3xl font-bold mb-6">Choose Your Plan</h2>
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="bg-zinc-800 p-6 rounded">
          <h3 className="text-xl font-semibold mb-2">🎧 Free</h3>
          <p>25 credits/week<br />No NFT minting<br />Output owned by Museily</p>
          <button className="mt-4 w-full bg-purple-600 px-4 py-2 rounded hover:bg-purple-700" onClick={() => handleSelect('free')}>
            Select
          </button>
        </div>
        <div className="bg-zinc-800 p-6 rounded">
          <h3 className="text-xl font-semibold mb-2">🔥 Monthly - $15</h3>
          <p>300 credits/month<br />NFT minting enabled<br />You own your output</p>
          <button className="mt-4 w-full bg-green-600 px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSelect('monthly')}>
            Subscribe
          </button>
        </div>
        <div className="bg-zinc-800 p-6 rounded">
          <h3 className="text-xl font-semibold mb-2">💎 Yearly - $150</h3>
          <p>Up to 6000 credits/year<br />Full NFT rights<br />Exclusive ownership</p>
          <button className="mt-4 w-full bg-blue-600 px-4 py-2 rounded hover:bg-blue-700" onClick={() => handleSelect('yearly')}>
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}
