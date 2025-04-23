'use client'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'
import { publicClient } from 'viem'

// Define your RPC URL
const SEPOLIA_RPC = process.env.NEXT_PUBLIC_RPC_URL!

const { chains, publicClient: wagmiPublicClient } = configureChains(
  [sepolia],
  [
    jsonRpcProvider({
      rpc: () => ({ http: SEPOLIA_RPC }),
    })
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'MintMuseily',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: wagmiPublicClient,
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
