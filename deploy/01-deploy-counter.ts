import { DeployFunction, DeployResult } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import "hardhat-ethernal"
import { Counter } from "../typechain-types"
import { developmentChains, getGasFee, VERIFICATION_BLOCK_CONFIRMATIONS } from "../utils/hardhat-constants"
import verify from "../utils/verify"
import { ContractFactory } from "ethers"
import { parseEther } from "ethers/lib/utils"

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { deployments, getNamedAccounts, network, ethers } = hre

  const localChain = developmentChains.includes(network.name)
  const waitConfirmations = localChain ? 1 : VERIFICATION_BLOCK_CONFIRMATIONS

  const fees = await getGasFee()

  console.log(`--- deploying Counter`)

  const contractFactory: ContractFactory = await ethers.getContractFactory("Counter")
  // let contractFactory = KnowledgeToken.connect(ledger)
  let counter = (await contractFactory.deploy({ value: parseEther("0.0011") })) as Counter
  await counter.deployed()
  // await counter.deployTransaction.wait(waitBlockConfirmations)

  console.log("pwn");
  await counter.pwn(fees)

  /* if (!developmentChains.includes(network.name)) {
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
  } */

  console.log("---")
}

export default deploy
deploy.tags = ["Counter"]
