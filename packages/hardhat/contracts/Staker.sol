pragma solidity >=0.6.0 <0.7.0;

import "hardhat/console.sol";
import "./ExampleExternalContract.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract Staker {
    ExampleExternalContract public exampleExternalContract;

    uint256 public constant threshold = 3000000000000000000;
    uint256 public immutable DEADLINE;
    bool hasBeenExecuted = false;

    event Stake(address sender, uint256 amount);

    constructor(address exampleExternalContractAddress) public {
        exampleExternalContract = ExampleExternalContract(
            exampleExternalContractAddress
        );
        DEADLINE = block.timestamp + 6000;
    }

    modifier passedDeadline() {
        require(now > DEADLINE, "NOT PASSED DEADLINE");
        _;
    }

    // modifier notCompleted() {
    //     require(exampleExternalContract.completed, "NOT COMPLETED");
    //     _;
    // }

    mapping(address => uint256) public balances;

    // Collect funds in a payable `stake()` function and track individual `balances` with a mapping:
    //  ( make sure to add a `Stake(address,uint256)` event and emit it for the frontend <List/> display )

    function stake() public payable {
        balances[msg.sender] += msg.value;
        emit Stake(msg.sender, msg.value);
        require(!hasBeenExecuted, "STAKING WINDOW HAS CLOSED");
    }

    // After some `deadline` allow anyone to call an `execute()` function
    //  It should either call `exampleExternalContract.complete{value: address(this).balance}()` to send all the value

    function execute() public passedDeadline {
        require(
            address(this).balance >= threshold,
            "THRESHOLD NOT MET. STAKERS MAY WITHDRAW THEIR FUNDS"
        );
        exampleExternalContract.complete{value: address(this).balance}();
        hasBeenExecuted = true;
    }

    // if the `threshold` was not met, allow everyone to call a `withdraw()` function

    function withdraw() public passedDeadline {
        require(hasBeenExecuted, "CAN'T WITHDRAW FUNDS YET");
        (bool sent, bytes memory _) = payable(msg.sender).call{
            value: balances[msg.sender]
        }("");
        require(sent, "NO FUNDS TO WITHDRAW");
        balances[msg.sender] = 0;
    }

    // Add a `timeLeft()` view function that returns the time left before the deadline for the frontend
    function timeLeft() public view returns (uint256) {
        if (DEADLINE >= now) {
            return DEADLINE - now;
        } else {
            return 0;
        }
    }
}
