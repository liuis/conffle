//http://testnet-jsonrpc.conflux-chain.org:18082/dev/ask?address=0xfdf045e085d85734a17166c284fceedcde0bd89c
//web3.cfx.accounts.wallet.create(numberOfAccounts [, entropy]);
const  Web3 = require('conflux-web');
const web3 = new Web3('http://testnet-jsonrpc.conflux-chain.org:12537');

const addressList = web3.cfx.accounts.wallet.create(10);
console.log(addressList.Wallet);
