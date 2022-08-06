import { ethers } from "ethers"

export const developmentChains = ["hardhat", "localhost"]
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6

export const isLocalChain = (networkName: string) => {
  return developmentChains.includes(networkName)
}

export const waitConfirmations = (networkName: string) => {
  return isLocalChain(networkName) ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS
}

let maxFeePerGas = ethers.BigNumber.from(60000000000) // gwei
let maxPriorityFeePerGas = ethers.BigNumber.from(60000000000) // gwei
let gasLimit: 4200000

export const getGasFee = async () => {
  return { maxFeePerGas, maxPriorityFeePerGas, gasLimit }
}