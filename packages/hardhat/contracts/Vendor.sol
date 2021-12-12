pragma solidity >=0.6.0 <0.7.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./YourToken.sol";

contract Vendor is Ownable {
  event BuyTokens(address buyer, uint256 amountETH, uint256 amountTokens);
  event SellTokens(address seller, uint256 amountETH, uint256 amountTokens);
  uint public constant tokensPerEth = 100;

  YourToken yourToken;

  constructor(address tokenAddress) public {
    yourToken = YourToken(tokenAddress);
  }

  function buyTokens() payable public {
    uint256 numTokens = msg.value * tokensPerEth;
    yourToken.transfer(msg.sender, numTokens);
    emit BuyTokens(msg.sender, msg.value, numTokens);
  }

  function withdraw() public {
    msg.sender.call{value: address(this).balance}("");
  }

  function sellTokens(uint256 amount) public {
    yourToken.transferFrom(msg.sender, address(this), amount);
    uint256 amountEth = (amount * 10 ** 18) / tokensPerEth;
    msg.sender.call{value: amountEth}("");
  }

}
