const BN = require('bn.js');
const ConfluxWeb = require('conflux-web');
const confluxWeb = new ConfluxWeb('http://testnet-jsonrpc.conflux-chain.org:12537');
var CircularJSON = require('circular-json');
var fs = require('fs');
const Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("ropsten.infura.io/v3/67b02109f3174f32a4a5a19c0419f95b"))

const addressList = CircularJSON.parse(CircularJSON.stringify(web3.eth.accounts.wallet.create(1)));
const privateKey = addressList[0].privateKey.toString();
const address = addressList[0].address;

confluxWeb.cfx.accounts.wallet.add(privateKey);

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

async function run() {

    try {
        await deployContract();

    } catch (e) {
        printError(e.message)
        console.error(e);
    }
}

function deployContract() {
    fs.readdir("./demo-test/build/contracts", (err, files) => {
        files.forEach(file => {
            console.log(file);
            const fd = require("./demo-test/build/contracts/" + file);
            console.log("bytecode:", "0x" + fd.bytecode)
            const txParams = {
                from: 0,
                nonce: 1, // make nonce appropriate
                gasPrice: 10,
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
}

module.exports = {
    run
}
