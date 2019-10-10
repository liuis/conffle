const fs = require('fs');
const BN = require('bn.js');
const ConfluxWeb = require('conflux-web');

const confluxWeb = new ConfluxWeb('http://testnet-jsonrpc.conflux-chain.org:12537');


let source = fs.readFileSync("./demo-test/build/SampleContract.sol.json");

const fd = require("./demo-test/build/SampleContract.sol.json");
let abi = fd.abi
let bytecode = fd.bytecode
console.log("abi:", abi)
console.log("bytecode:", bytecode)
let code =  "0x" + bytecode

// Create Contract proxy class
let SampleContract = new confluxWeb.cfx.Contract(abi);

console.log("Deploying the contract");
let contract = SampleContract.deploy({from: 0, gas: 1000000, data: code});

// Transaction has entered to geth memory pool
console.log("Your contract is being deployed in transaction at :" + contract.transactionHash);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// We need to wait until any miner has included the transaction
// in a block to get the address of the contract
async function waitBlock() {
  while (true) {
    let receipt = confluxWeb.cfx.getTransactionReceipt(contract.transactionHash);
    if (receipt && receipt.contractAddress) {
      console.log("Your contract has been deployed at :" + receipt.contractAddress);
      console.log("Note that it might take some sceonds for the block to propagate befor it's visible in etherscan.io");
      break;
    }
    EpochNumber = confluxWeb.cfx.getEpochNumber();
    //Tx =confluxWeb.cfx.getBlockByEpochNumber(EpochNumber);
    console.log("Waiting a mined block to include your contract... currently in epoch :" + EpochNumber.toString());
    await sleep(4000);
  }
}

waitBlock();
