pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
// import "@openzeppelin/contracts/access/Ownable.sol"; 
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract MultiSigWallet {
  address[] public owners;
  uint public numConfirmationsRequired;
  mapping(address => bool) public isOwner;
  mapping(uint => mapping(address => bool)) isConfirmed;
  Transaction[] public transactions;

  struct Transaction {
    address to;
    bool executed;
    uint numConfirmations;
    uint value;
  }

  receive() external payable {

  }

  modifier onlyOwner(address _address) {
    require(isOwner[_address], "Only wallet owners allowed");
    _;
  }

  modifier isntYetConfirmed(uint txIndex, address _owner) {
    require(!isConfirmed[txIndex][_owner]);
    _;
  }

  modifier txIsConfirmed(uint _txIndex) {
    require(transactions[_txIndex].numConfirmations >= numConfirmationsRequired, "Not enough confirmations");
    _;
  }

  constructor(address[] memory _owners, uint _numConfirmationsRequired) {
    owners = _owners;
    numConfirmationsRequired = _numConfirmationsRequired;
    for (uint i = 0; i < owners.length; i++) {
      isOwner[owners[i]] = true;
    }
  }

  // submitTransaction
  function submitTransaction (address _to, uint _value) onlyOwner(msg.sender) public {
    transactions.push(Transaction({
      to: _to,
      value: _value,
      numConfirmations: 0,
      executed: false
    }));
  }

  function approveTransaction(uint _txIndex) isntYetConfirmed(_txIndex, msg.sender) onlyOwner(msg.sender) public {
    Transaction storage transaction = transactions[_txIndex];
    transaction.numConfirmations += 1;
    isConfirmed[_txIndex][msg.sender] = true;
  }

  function denyTransaction(uint _txIndex) public {
    Transaction storage transaction = transactions[_txIndex];
    transaction.numConfirmations -= 1;
  }

  function executeTransaction(uint _txIndex) txIsConfirmed(_txIndex) public {
    Transaction storage transaction = transactions[_txIndex];
    require(!transaction.executed, "Transaction was already executed.");
    (bool success, bytes memory data) = transaction.to.call{value: transaction.value}("");
    console.log("To", transaction.to);
    console.log("Success", success);
    require(success, "Transaction Failed...");
    transaction.executed = true;
  }
}
