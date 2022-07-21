import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import "hardhat-ethernal"
import { Counter } from "../typechain-types"
import { developmentChains } from "../utils/hardhat-constants"
import verify from "../utils/verify"

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments, getNamedAccounts, network, ethers } = hre
  const chainId = network.config.chainId ?? 31337

  if (chainId !== 31337) return

  const { deployer } = await getNamedAccounts()
  const { deploy } = deployments

  console.log("--- deploying Counter")

  const counter = await deploy("Counter", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 1,
  })

  if (!developmentChains.includes(network.name)) {
    if (process.env.ETHERSCAN_API_KEY) {
      console.log("Verifying...")
      await verify(counter.address, [])
    }
  }
  else {
    // push to hh-ethernal
    await hre.ethernal.push({
      name: 'Counter',
      address: counter.address
    })
  }
  console.log("---")
}

export default deploy
deploy.tags = ["Counter"]
