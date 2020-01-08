const ConfluxWeb = require('conflux-web');
const BN = require('bn.js');
const confluxWeb = new ConfluxWeb('http://0.0.0.0:12537');

async function run(address) {
    try {
        await sendcfx(address);

    } catch (e) {
        console.error(e);
    }
}

const GENESIS_PRI_KEY = "0x46b9e861b63d3509c88b7817275a30d22d62c8cd8fa6486ddee35ef0d8e0495f";
const GENESIS_ADDRESS = "0xfbe45681ac6c53d5a40475f7526bac1fe7590fb8";

const cfxNum = new BN('30000000000000000000');

var jayson = require('jayson');
var client = jayson.client.http('http://localhost:12537');


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function sendcfx(address) {

    confluxWeb.cfx.accounts.wallet.add({
        privateKey: GENESIS_PRI_KEY,
        address: GENESIS_ADDRESS
    })


    var TO_ACCOUNT = address;

    confluxWeb.cfx.getTransactionCount(GENESIS_ADDRESS).then(async(nonceValue) => {
        //console.log("nonceValue:" + nonceValue)
        let gasPrice = await confluxWeb.cfx.getGasPrice();
        //console.log("gasPrice : " + gasPrice)
        let txParms = {
            from: GENESIS_ADDRESS,
            nonce: nonceValue,
            gasPrice: 100,
            data: "0x00",
            value: cfxNum,
            to: TO_ACCOUNT
        };
        let gas = await confluxWeb.cfx.estimateGas(txParms);
        txParms.gas = gas;
        txParms.from = 0;
        confluxWeb.cfx.signTransaction(txParms)
            .then((encodedTransaction) => {
                const {
                    rawTransaction
                } = encodedTransaction;
                return confluxWeb.cfx.sendSignedTransaction(rawTransaction).then((transactionHash) => {
                    waitBlock(transactionHash, TO_ACCOUNT)
                })
            }).catch(console.error);
    });
}



function waitBlock(txHash, TO_ACCOUNT) {
    for (var i = 0, len = 12; i < len; i++) {
        client.request('generateoneblock', [10, 300000], function(err, error, result) {
            if (err) throw err;
        });

    }
    return confluxWeb.cfx.getTransactionReceipt(txHash).then(
        (receipt) => {
            //console.log("Note that it might take some sceonds for the block to propagate befor it's visible in conflux");
            if (receipt !== null) {
                //console.log("receipt:", receipt);
                console.log("Your account has been receiver some cfx coin");
                confluxWeb.cfx.getBalance(TO_ACCOUNT).then(console.log)
                confluxWeb.cfx.accounts.wallet.remove(GENESIS_ADDRESS)
            } else {
                return waitBlock(txHash, TO_ACCOUNT)
            }
        })
}
module.exports = {
    run,
    sendcfx
}
