import { ethers } from "hardhat";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Counter} from "../typechain-types";
import { AbiCoder, defaultAbiCoder } from "ethers/lib/utils";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("Counter", () => {
  beforeEach(async () => {
    // // 1
    // const signers = await ethers.getSigners();

    // // 2
    // const delegateFactory = (await ethers.getContractFactory(
    //   "Delegate",
    //   signers[0]
    // )) as Delegate__factory;

    // delegate = await delegateFactory.deploy("0x00");
    // await delegate.deployed();

    // const delegationFactory = (await ethers.getContractFactory(
    //   "Delegation",
    //   signers[0]
    // )) as Delegation__factory;

    // delegation = await delegationFactory.deploy("0x00");
    // await delegation.deployed();
  });

  it.only("should change owner", async () => {
    let ABI = [
      "function pwn()"
    ];
    let iface = new ethers.utils.Interface(ABI);
    let result = iface.encodeFunctionData("pwn", [])
    console.log(result);
    
  });
});
