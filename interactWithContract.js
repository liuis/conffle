const ConfluxWeb = require('conflux-web');

const confluxWeb = new ConfluxWeb('http://testnet-jsonrpc.conflux-chain.org:12537');

// generate an account and private key by conflux wallet: https://wallet.confluxscan.io
const privateKey = '0x1b7a722b5f729995135560a46296e32444b80ce70948d16158c617187b797cb8';
confluxWeb.cfx.accounts.wallet.add(privateKey);

// Get the ABI from https://remix.ethereum.org
const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "to",
        "type": "address"
      }
    ],
    "name": "delegate",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "toVoter",
        "type": "address"
      }
    ],
    "name": "giveRightToVote",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "toProposal",
        "type": "uint8"
      }
    ],
    "name": "vote",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_numProposals",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "winningProposal",
    "outputs": [
      {
        "name": "_winningProposal",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
// Get the contract Address from conflux-scan by txHash: http://www.confluxscan.io/transactionsdetail/0x811a48988aca9b3bc46e8b7cb0aed73907ba4fc6364decf2717dfe71cfea5dde
const contractAddress = '0x4dfe1758173fdc5ba91b4b11f58a307da67b0144';

// Construct contract object
const myContract = new confluxWeb.cfx.Contract(abi, contractAddress, {
  defaultGasPrice: '10' // default gas price
});

function winningProposal() {
  myContract.methods.winningProposal().call()
    .then((result) => {
      console.log(result);
    }).catch(console.error);
}

function vote(x) {
  const txParams = {
    from: 0,
    nonce: 2, // make nonce appropriate
    gasPrice: 10,
    gas: 10000000,
    value: 0,
    to: contractAddress,
    data: myContract.methods.vote(x).encodeABI(), // get data from ABI
  };
  confluxWeb.cfx.signTransaction(txParams)
    .then((encodedTransaction) => {
      const { rawTransaction } = encodedTransaction;
      console.log('raw transaction: ', rawTransaction);
      return confluxWeb.cfx.sendSignedTransaction(rawTransaction).then((transactionHash) => {
        console.log('transaction hash from RPC: ', transactionHash);
      });
    }).catch(console.error);
}

// Get the winning proposal
// winningProposal();

// Vote for candidate 5
// vote(5);
