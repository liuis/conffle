/*
 * 
 * 
 * 
 *
 *
 *
 *
 *
 *
 *
//const BN = require('bn.js');
//var jayson = require('jayson');
//var client = jayson.client.http('http://localhost:12537');
//const ConfluxWeb = require('conflux-web');
//const cfxNum = new BN('3000000000000000000');
//var linker = require('solc/linker');
//const confluxWeb = new ConfluxWeb('http://0.0.0.0:12537');
//const mnemonicInfo = require("conffle-utils/mnemonic");
//var fs = require('fs');
//var request = require('request');
//
//
//
//const GENESIS_PRI_KEY = "46b9e861b63d3509c88b7817275a30d22d62c8cd8fa6486ddee35ef0d8e0495f";
//const GENESIS_ADDRESS = "0xfbe45681ac6c53d5a40475f7526bac1fe7590fb8";
//
//
//deployContract(address, privateKeys, name);
//
///**
// * check num is hex
// *
// * @name isHex
// * @function
// * @access public
// * @param {number} num hex string?
// * @returns {boolean} true or false
// */
//function isHex(num) {
//    return Boolean(num.match(/^0x[0-9a-f]+$/i))
//};
//
//
///**
// * check arg is a obj
// *
// * @name isEmptyObject
// * @function
// * @access public
// * @param {object} obj object maybe [], {x,x,x}
// * @returns {boolean} true is object
// */
//function isEmptyObject(obj) {
//    for (var key in obj) {
//        if (Object.prototype.hasOwnProperty.call(obj, key)) {
//            return false;
//        }
//    }
//    return true;
//};
//
///**
// * black the code sothing times
// *
// * @name sleep
// * @function
// * @access public
// * @param {number} ms int
// * @returns {promise}
// */
//function sleep(ms) {
//    return new Promise(resolve => setTimeout(resolve, ms));
//}
//
//
//function writeJsonto(key, solfile, newValues) {
//    var fs = require('fs');
//    var file = JSON.parse(fs.readFileSync("./build/" + solfile, 'utf8'));
//    file[key] = newValues;
//    fs.writeFile("./build/" + solfile, JSON.stringify(file, null, 4), function(err) {
//        if (err) return console.log(err);
//        console.log(JSON.stringify(file,null,4));
//    });
//
//}
//
//
//function deploy(argument, abi, solfile) {
//    confluxWeb.cfx.signTransaction(argument)
//        .then((encodedTransaction) => {
//            const {
//                rawTransaction
//            } = encodedTransaction;
//            console.log('raw transaction: ', rawTransaction);
//            return confluxWeb.cfx.sendSignedTransaction(rawTransaction).then((transactionHash) => {
//                console.log('transaction hash from RPC: ', transactionHash);
//                localhost_waitBlock(transactionHash, solfile)
//            })
//        }).catch(console.error);
//};
//
//async function deployContract(address, privateKeys, name) {
//
//
//    await confluxWeb.cfx.accounts.wallet.add({
//        privateKey: privateKeys,
//        address: address
//    });
//
//
//    let rawdata = fs.readFileSync("./build/" + name + ".sol.json");
//    let fd = JSON.parse(rawdata);
//    console.log("bytecode:", "0x" + fd.bytecode)
//    code = "0x" + fd.bytecode
//    abi = fd.abi
//    if (isHex(code)) {
//        const add = confluxWeb.cfx.accounts.wallet[0].address;
//        confluxWeb.cfx.getTransactionCount(confluxWeb.cfx.accounts.wallet[0].address).then(async(nonceValue) => {
//            console.log("nonceValue:", nonceValue)
//            const txParams = {
//                from: add,
//                nonce: nonceValue, // make nonce appropriate
//                gasPrice: 5000,
//                value: 0,
//                to: null,
//                data: code
//            };
//
//            let gas = await confluxWeb.cfx.estimateGas(txParams);
//            console.log("gas : ", gas)
//            txParams.gas = gas;
//            txParams.from = 0;
//            if (abi) {
//                deploy(txParams, abi, name + ".sol.json");
//            }
//        })
//    } else {
//        //link 
//        console.log("----------------------------------------------------")
//        console.log("\n")
//        console.log("The bytecode is not a hex, you may be a reference to other sol file, try to link!!!")
//
//        keys = Object.keys(fd.linkReferences)
//        var tempJson = {};
//        for (var i = 0; i < keys.length; i++) {
//            let solRawData = fs.readFileSync("./build/" + keys[i] + ".json");
//            let solFd = JSON.parse(solRawData);
//            cAdd = solFd.contractAddress;
//            keys2 = Object.keys(fd.linkReferences[keys[i]])
//            k = keys + ":" + keys2,
//            tempJson[k] = cAdd;
//        }
//        console.log("try to list the link reference object:", tempJson);
//        /* 
//         * example 
//        bytecode = linker.linkBytecode(mc.bytecode, {
//            'ConvertLib.sol:ConvertLib': '0xe4daa3e81a8c7c67d868fe21d0070ba29d61e5c9'
//        });
//        *
//        */
//        NewByteCode = linker.linkBytecode(fd.bytecode, tempJson);
//        writeJsonto("bytecode", name + ".sol.json", NewByteCode);
//        const add = confluxWeb.cfx.accounts.wallet[0].address;
//        confluxWeb.cfx.getTransactionCount(confluxWeb.cfx.accounts.wallet[0].address).then(async(nonceValue) => {
//            const txParams = {
//                from: add,
//                nonce: nonceValue, // make nonce appropriate
//                gasPrice: 5000,
//                value: 0,
//                to: null,
//                data: "0x" + NewByteCode
//            };
//
//            let gas = await confluxWeb.cfx.estimateGas(txParams);
//            txParams.gas = gas;
//            txParams.from = 0;
//            if (abi) {
//                deploy(txParams, abi, name + ".sol.json");
//            }
//        })
//
//    }
//}
//
//
//function localhost_waitBlock(txHash, solfile) {
//
//
//    for (var i = 0, len = 5; i < len; i++) {
//        client.request('generateoneblock', [1, 300000], function(err, error, result) {
//            if (err) throw err;
//            //console.log("generateoneblock : " + result);
//        });
//
//    }
//    return confluxWeb.cfx.getTransactionReceipt(txHash).then(
//        (receipt) => {
//            if (receipt !== null) {
//                cAddress = receipt["contractCreated"]
//                console.log("Your contract has been deployed at :" + cAddress);
//                writeJsonto("contractAddress", solfile, cAddress);
//                confluxWeb.cfx.accounts.wallet.remove(GENESIS_ADDRESS)
//            } else {
//                return localhost_waitBlock(txHash, solfile)
//            }
//        })
//}
//
//module.exports = {
//    deployContract
//}
