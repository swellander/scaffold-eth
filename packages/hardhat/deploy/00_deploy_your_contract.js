// deploy/00_deploy_your_contract.js

const { ethers } = require("hardhat");

const localChainId = "31337";

// const sleep = (ms) =>
//   new Promise((r) =>
//     setTimeout(() => {
//       console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
//       r();
//     }, ms)
//   );

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  const ownerAccts = [
    '0x7c8f8593049eE994E1fAEdf677F0F5a494545224',
    '0x7e3BB75E8f6dA85f3049758BCE20a31Ea2dc5a0e',
    '0xd9f96E9bDb294Fc0819e88fc51FE3C7907173493'
  ];

  await deploy("MultiSigWallet", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [ ownerAccts, 1 ],
    log: true,
    waitConfirmations: 5,
  });

  // Getting a previously deployed contract
  const MultiSigWallet = await ethers.getContract("MultiSigWallet", deployer);
  /*  await MultiSigWallet.setPurpose("Hello");
  
    To take ownership of MultiSigWallet using the ownable library uncomment next line and add the 
    address you want to be the owner. 
    // await MultiSigWallet.transferOwnership(YOUR_ADDRESS_HERE);

    //const MultiSigWallet = await ethers.getContractAt('MultiSigWallet', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const MultiSigWallet = await deploy("MultiSigWallet", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const MultiSigWallet = await deploy("MultiSigWallet", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

  // Verify from the command line by running `yarn verify`

  // You can also Verify your contracts with Etherscan here...
  // You don't want to verify on localhost
  // try {
  //   if (chainId !== localChainId) {
  //     await run("verify:verify", {
  //       address: MultiSigWallet.address,
  //       contract: "contracts/MultiSigWallet.sol:MultiSigWallet",
  //       contractArguments: [],
  //     });
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
};
module.exports.tags = ["MultiSigWallet"];
