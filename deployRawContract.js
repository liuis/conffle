const BN = require('bn.js');
const ConfluxWeb = require('conflux-web');

const confluxWeb = new ConfluxWeb('http://testnet-jsonrpc.conflux-chain.org:12537');
// generate an account and private key by conflux wallet: https://wallet.confluxscan.io

var CircularJSON = require('circular-json');
var fs = require('fs');

const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("ropsten.infura.io/v3/67b02109f3174f32a4a5a19c0419f95b"))

const addressList = CircularJSON.parse(CircularJSON.stringify(web3.eth.accounts.wallet.create(1)));
//const privateKey = '0x1b7a722b5f729995135560a46296e32444b80ce70948d16158c617187b797cb8';
//const privateKey = '0x759ce35c913683dc55c606fb4f3be99610002beb58768e9054605652814c4dcb';
console.log(addressList)
const privateKey = addressList[0].privateKey.toString();
console.log("privateKey:", privateKey)
const address = addressList[0].address;

//confluxWeb.cfx.accounts.wallet.add(privateKey);
confluxWeb.cfx.accounts.wallet.add('0x3afdd9b132fef52c7a7aed692c64622146965549b4f19052fde4e2ede1723b05');

function deploy(argument) {
    confluxWeb.cfx.signTransaction(argument)
        .then((encodedTransaction) => {
            const {
                rawTransaction
            } = encodedTransaction;
            console.log('raw transaction: ', rawTransaction);
            return confluxWeb.cfx.sendSignedTransaction(rawTransaction).then((transactionHash) => {
                console.log('transaction hash from RPC: ', transactionHash);
            });
        }).catch(console.error);
}

fs.readdir("./demo-test/build", (err, files) => {
    files.forEach(file => {
        console.log(file);
        const fd = require("./demo-test/build/" + file);
        console.log("bytecode:", "0x" + fd.bytecode)
        const txParams = {
            from: 0,
            nonce: 2, // make nonce appropriate
            gasPrice: 100,
            gas: 10000000,
            value: 0,
            to: null,
            // byte code is the ballot contract from https://remix.ethereum.org/
            // Sol version: 0.5.0
            // With constructor(_numProposals = 10)
            data: fd.bytecode
        };
    
       deploy(txParams);

    });
})
