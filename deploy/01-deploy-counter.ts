import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments, getNamedAccounts, network } = hre
  const chainId = network.config.chainId ?? 31337

  if (chainId !== 31337) return

  const { deployer } = await getNamedAccounts()
  const { deploy } = deployments

  console.log("--- deploying Counter")
  await deploy("Counter", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 1,
  })
  console.log("---")
}

export default deploy
deploy.tags = ["Counter"]
