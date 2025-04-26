"use client"; // 🚨 IMPORTANT: this must be first in /app routes when using hooks

import dynamic from 'next/dynamic';
import { useContractWrite, useAccount } from 'wagmi';
import { useState } from 'react';

// Dynamically load the ConnectButton component from RainbowKit
const ConnectButton = dynamic(
  () => import('@rainbow-me/rainbowkit').then(mod => mod.ConnectButton),
  { ssr: false }
);

// Contract address from environment variables
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

if (!contractAddress) {
  throw new Error('Contract address is not defined in environment variables.');
}

// Contract ABI
const contractAbi = [
  {
    name: 'mint',
    type: 'function',
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const; // 👈 safer typing for wagmi

export default function MintPage() {
  const { address: walletAddress } = useAccount(); // Get the connected wallet address
  const [mintAmount, setMintAmount] = useState<number>(1); // Explicit typing

  const { write, error, isLoading } = useContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'mint',
    args: [mintAmount],
  });

  const handleMint = () => {
    if (!write) {
      console.error('Write function is not available. Ensure the contract is configured correctly.');
      return;
    }
    write();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Mint Museily</h1>

      <ConnectButton />

      {walletAddress ? (
        <div className="mt-6 flex flex-col items-center space-y-4">
          <input
            type="number"
            value={mintAmount}
            min={1}
            onChange={(e) => setMintAmount(Number(e.target.value))}
            disabled={isLoading}
            className="border p-2 rounded"
          />
          <button
            onClick={handleMint}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? 'Minting...' : 'Mint'}
          </button>

          {error && <p className="text-red-500">Error: {error.message}</p>}
        </div>
      ) : (
        <p className="mt-4 text-gray-600">Please connect your wallet to mint.</p>
      )}
    </div>
  );
}
