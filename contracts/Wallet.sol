// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Wallet {
    //send payment
    //revice payment
    //check balance

    address public owner;

    constructor(address payable _owner) public {
        owner = _owner;
    }

    function deposite() public payable {}

    function sendTo(address payable _to, uint256 _amount) public {
        if (msg.sender == owner) {
            _to.transfer(_amount);
        }
        revert("Sender not allowed");
    }

    function checkBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
