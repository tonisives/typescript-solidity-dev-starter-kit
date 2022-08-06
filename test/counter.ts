import { ethers } from "hardhat";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Counter__factory, Counter } from "../typechain-types";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("Counter", () => {
  let counter: Counter;

  beforeEach(async () => {
    const signers = await ethers.getSigners();

    const counterFactory = (await ethers.getContractFactory(
      "Counter",
      signers[0]
    )) as Counter__factory;
    counter = await counterFactory.deploy();
    await counter.deployed();
    const initialCount = await counter.getCount();

    expect(initialCount).to.eq(0);
    expect(counter.address).to.properAddress;
  });

  describe("count up", async () => {
    it("should count up", async () => {
      await counter.countUp();
      let count = await counter.getCount();
      expect(count).to.eq(1);
    });
  });

  describe("count down", async () => {
    it("should count down", async () => {
      await counter.countUp();

      await counter.countDown();
      const count = await counter.getCount();
      expect(count).to.eq(0);
    });
  });
});
