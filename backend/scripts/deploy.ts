import { ethers } from "ethers"

async function main() {
  const MintMuseilyNFT = await ethers.getContractFactory("MintMuseilyNFT")
  const contract = await MintMuseilyNFT.deploy()
  await contract.waitForDeployment()

  console.log(`✅ Contract deployed: ${(await contract.getAddress())}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
