import dynamic from 'next/dynamic';
import { useContractWrite, useAccount } from 'wagmi';
import { useState } from 'react';

// Dynamically load the ConnectButton component from RainbowKit
const ConnectButton = dynamic(() => import('@rainbow-me/rainbowkit').then(mod => mod.ConnectButton), { ssr: false });

// Replace with your actual contract address
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

if (!contractAddress) {
  throw new Error('Contract address is not defined in environment variables.');
}

// Replace with your actual contract ABI
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
];

export default function MintPage() {
  const { address: walletAddress } = useAccount(); // Get the connected wallet address
  const [mintAmount, setMintAmount] = useState(1); // State for the mint amount

  // Hook to write to the contract
  const { write, error, isLoading } = useContractWrite({
    address: contractAddress, // Corrected property name
    abi: contractAbi,
    functionName: 'mint',
    args: [mintAmount],
  });

  // Handle the mint button click
  const handleMint = () => {
    if (!write) {
      console.error('Write function is not available. Ensure the contract is configured correctly.');
      return;
    }
    write(); // Call the write function to interact with the contract
  };

  return (
    <div>
      <h1>Mint Museily</h1>
      <ConnectButton />
      {walletAddress ? (
        <div>
          <input
            type="number"
            value={mintAmount}
            min={1}
            onChange={(e) => setMintAmount(Number(e.target.value))}
            disabled={isLoading} // Disable input while minting
          />
          <button onClick={handleMint} disabled={isLoading}>
            {isLoading ? 'Minting...' : 'Mint'}
          </button>
          {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        </div>
      ) : (
        <p>Please connect your wallet to mint.</p>
      )}
    </div>
  );
}