import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'

type AuthMode = 'login' | 'signup'

export default function AuthPage() {
  const navigate = useNavigate()
  const [authMode, setAuthMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEmailAuth = async () => {
    setIsLoading(true)
    setError(null)
    const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/signup'
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Authentication failed')
      if (authMode === 'signup') {
        navigate('/onboarding')
      } else {
        navigate('/dashboard')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleWalletLogin = async () => {
    try {
      if (!window.ethereum) return setError('MetaMask not found')
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      const message = `Login to Mint Museily - ${new Date().toISOString()}`
      const signature = await signer.signMessage(message)

      const res = await fetch('/api/auth/wallet-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, signature, message })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Wallet error')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white px-4">
      <div className="mb-8">
        {/* Logo goes here */}
        <img src="/src/assets/logo.png" alt="Mint Museily Logo" className="h-16 mx-auto" />
      </div>
      <h1 className="text-3xl font-bold mb-6">🎶 Mint Museily</h1>
      <div className="w-full max-w-sm space-y-6">
        <div>
          <label>Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded bg-zinc-800 text-white mt-1"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded bg-zinc-800 text-white mt-1"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button
          onClick={handleEmailAuth}
          disabled={isLoading}
          className="w-full py-3 bg-purple-600 rounded hover:bg-purple-700 transition"
        >
          {isLoading ? 'Processing...' : authMode === 'login' ? 'Login' : 'Sign Up'}
        </button>
        <button
          onClick={handleWalletLogin}
          className="w-full py-3 bg-green-600 rounded hover:bg-green-700 transition"
        >
          Login with Wallet
        </button>
        <p className="text-center text-sm">
          {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            className="underline text-purple-400"
            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
          >
            {authMode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
        {error && <p className="text-center text-red-400 text-sm">{error}</p>}
      </div>
    </div>
  )
}
