import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import "hardhat-ethernal"
import { Counter } from "../typechain-types"
import { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } from "../utils/hardhat-constants"
import { ContractFactory } from "ethers"
import { parseEther } from "ethers/lib/utils"

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments, getNamedAccounts, network, ethers } = hre

  const localChain = developmentChains.includes(network.name)
  const waitConfirmations = localChain ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS

  console.log(`--- deploying Counter`)

  const contractFactory: ContractFactory = await ethers.getContractFactory("Counter")
  let counter = (await contractFactory.deploy()) as Counter
  await counter.deployed()
  console.log(`deployed at ${counter.address}`);

  console.log("pwn")
  const result = await counter.pwn({ value: parseEther("0.001") })
  console.log("withdraw")

  await counter.withdrawAll()
  console.log("withdrawn")

  console.log("---")
}

export default deploy
deploy.tags = ["Counter"]
