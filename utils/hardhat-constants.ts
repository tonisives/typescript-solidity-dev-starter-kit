import { ethers } from "ethers"

export const developmentChains = ["hardhat", "localhost"]
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6

let maxFeePerGas = ethers.BigNumber.from(60000000000) // gwei
let maxPriorityFeePerGas = ethers.BigNumber.from(60000000000) // gwei
let gasLimit: 4200000

export const getGasFee = async () => {
  return { maxFeePerGas, maxPriorityFeePerGas, gasLimit }
}