// utils/mintNFT.ts
import { writeContract } from 'viem';
import { getAccount, getPublicClient } from 'wagmi';

export default async function mintNFT() {
  try {
    // Get the connected wallet address
    const { address } = getAccount();
    if (!address) {
      throw new Error('No wallet connected. Please connect your wallet.');
    }

    // Get the public client for interacting with the blockchain
    const publicClient = getPublicClient();

    // Ensure the contract address is defined
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
    if (!contractAddress) {
      throw new Error('Contract address is not defined in environment variables.');
    }

    // Define the contract ABI
    const contractAbi = [
      {
        name: 'mint',
        type: 'function',
        inputs: [
          {
            name: 'to',
            type: 'address',
          },
        ],
        outputs: [],
        stateMutability: 'payable',
      },
    ];

    // Call the contract's mint function
    const hash = await writeContract(publicClient, {
      address: contractAddress,
      abi: contractAbi,
      functionName: 'mint',
      args: [address],
      value: BigInt(100000000000000000), // Example value in wei (0.1 ETH)
    });

    console.log('Transaction hash:', hash);
    return hash;
  } catch (error) {
    console.error('Error minting NFT:', error);
    throw error;
  }
}