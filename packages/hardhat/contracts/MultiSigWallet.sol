pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT


contract MultiSigWallet {
  event Deposit(uint amount, address from);

  uint public numConfirmationsRequired;
  mapping(address => bool) public isOwner;
  mapping(uint => mapping(address => bool)) isConfirmed;
  Transaction[] public transactions;

  struct Transaction {
    address to;
    bool executed;
    uint numConfirmations;
    uint value;
    bytes data;
  }

  receive() external payable {
    emit Deposit(msg.value, msg.sender);
  }

  modifier onlyOwner(address _address) {
    require(isOwner[_address], "Only wallet owners allowed");
    _;
  }

  modifier txConfirmedByOwner(uint txIndex, address _owner) {
    require(isConfirmed[txIndex][_owner]);
    _;
  }

  modifier txNotConfirmedByOwner(uint txIndex, address _owner) {
    require(!isConfirmed[txIndex][_owner]);
    _;
  }

  modifier txIsConfirmed(uint _txIndex) {
    require(transactions[_txIndex].numConfirmations >= numConfirmationsRequired, "Not enough confirmations");
    _;
  }

  constructor(address[] memory _owners, uint _numConfirmationsRequired) {
    numConfirmationsRequired = _numConfirmationsRequired;
    for (uint i = 0; i < _owners.length; i++) {
      isOwner[_owners[i]] = true;
    }
  }

  function submitTransaction (address _to, uint _value, bytes memory _data) onlyOwner(msg.sender) public {
    transactions.push(Transaction({
      to: _to,
      value: _value,
      numConfirmations: 0,
      executed: false,
      data: _data
    }));
  }

  function approveTransaction(uint _txIndex) onlyOwner(msg.sender) txNotConfirmedByOwner(_txIndex, msg.sender) public {
    Transaction storage transaction = transactions[_txIndex];
    transaction.numConfirmations += 1;
    isConfirmed[_txIndex][msg.sender] = true;
  }

  function denyTransaction(uint _txIndex) onlyOwner(msg.sender) txConfirmedByOwner(_txIndex, msg.sender) public {
    Transaction storage transaction = transactions[_txIndex];
    transaction.numConfirmations -= 1;
    isConfirmed[_txIndex][msg.sender] = false;
  }

  function executeTransaction(uint _txIndex) txIsConfirmed(_txIndex) public {
    Transaction storage transaction = transactions[_txIndex];
    require(!transaction.executed, "Transaction was already executed.");

    (bool success, bytes memory data) = transaction.to.call{value: transaction.value}("");
    require(success, "Transaction Failed...");

    transaction.executed = true;
  }
}
