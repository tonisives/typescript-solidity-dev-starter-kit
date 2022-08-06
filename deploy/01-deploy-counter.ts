import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { Counter } from "../typechain-types"
import { developmentChains, waitConfirmations } from "../utils/hardhat-constants"
import verify from "../utils/verify"
import "@nomiclabs/hardhat-waffle"
import "hardhat-deploy"

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network, ethers } = hre

  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  console.log(`--- deploying Counter`)

  const result = await deploy("Counter", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: waitConfirmations(network.name),
  })

  const counter = new ethers.Contract(result.address, result.abi) as Counter

  if (!developmentChains.includes(network.name)) {
    if (process.env.ETHERSCAN_API_KEY) {
      console.log("Verifying...")
      await verify(counter.address, [])
    }
  }

  console.log("---")
}

export default deploy
deploy.tags = ["counter"]
