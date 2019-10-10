const BN = require('bn.js');
const rlp = require('rlp');
const keccak = require('keccak');

const ConfluxWeb = require('conflux-web');
const confluxWeb = new ConfluxWeb('http://testnet-jsonrpc.conflux-chain.org:12537');

const mnemonicInfo = require("./mnemonic");


const {
    mnemonic,
    accounts,
    privateKeys
} = mnemonicInfo.getAccountsInfo(
    1
);

function generate_contract_address(nonce, sender) {

    var input_arr = [sender, nonce];
    var rlp_encoded = rlp.encode(input_arr);

    var contract_address_long = keccak('keccak256').update(rlp_encoded).digest('hex');

    var contract_address = contract_address_long.substring(24); //Trim the first 24 characters.
    //console.log("contract_address: " + contract_address);
    return contract_address;
}



var CircularJSON = require('circular-json');
var fs = require('fs');

//const Web3 = require('web3');
//var web3 = new Web3(new Web3.providers.HttpProvider("ropsten.infura.io/v3/67b02109f3174f32a4a5a19c0419f95b"))

//const addressList = CircularJSON.parse(CircularJSON.stringify(web3.eth.accounts.wallet.create(1)));
//const privateKey = '0x1b7a722b5f729995135560a46296e32444b80ce70948d16158c617187b797cb8';
//const privateKey = '0x759ce35c913683dc55c606fb4f3be99610002beb58768e9054605652814c4dcb';
//console.log(addressList)
//const privateKey = addressList[0].privateKey.toString();
//console.log("privateKey:", privateKey)
//const address = addressList[0].address;

//confluxWeb.cfx.accounts.wallet.add(privateKey);
confluxWeb.cfx.accounts.wallet.add(privateKeys[0]);

function deploy(argument) {
    confluxWeb.cfx.signTransaction(argument)
        .then((encodedTransaction) => {
            const {
                rawTransaction
            } = encodedTransaction;
            console.log('raw transaction: ', rawTransaction);
            return confluxWeb.cfx.sendSignedTransaction(rawTransaction).then((transactionHash) => {
                console.log('transaction hash from RPC: ', transactionHash);
                console.log("you can find the transaction details on : http://www.confluxscan.io/transactionsdetail/" + transactionHash)
                hexNonce = argument.nonce.toString(16);
                contractAdd = generate_contract_address(hexNonce, accounts[0]);
                console.log("Waiting a mined block to include your contract... contract address will be at:" + "0x" + contractAdd);
            })
        }).catch(console.error);
}



fs.readdir("./demo-test/build", (err, files) => {
    files.forEach(file => {
        console.log(file);
        const fd = require("./demo-test/build/" + file);
        console.log("bytecode:", "0x" + fd.bytecode)
        code = "0x" + fd.bytecode
        const txParams = {
            from: 0,
            nonce: 10, // make nonce appropriate
            gasPrice: 50000,
            gas: 10000000,
            value: 0,
            to: null,
            // byte code is the ballot contract from https://remix.ethereum.org/
            // Sol version: 0.5.0
            // With constructor(_numProposals = 10)
            data: code
        };

        deploy(txParams);
    });
})



/*
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function waitBlock(txHash) {
    while (true) {
        let receipt = confluxWeb.cfx.getTransactionReceipt(txHash);
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
*/
