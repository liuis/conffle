const BN = require('bn.js');
const rlp = require('rlp');
const keccak = require('keccak');
var jayson = require('jayson');
var client = jayson.client.http('http://localhost:12537');
const ConfluxWeb = require('conflux-web');
const cfxNum = new BN('3000000000000000000');
var linker = require('solc/linker');

// use the testnet 
//const confluxWeb = new ConfluxWeb('http://testnet-jsonrpc.conflux-chain.org:12537');
// use the local node
const confluxWeb = new ConfluxWeb('http://0.0.0.0:12537');

const mnemonicInfo = require("conffle-utils/mnemonic");

var CircularJSON = require('circular-json');
var fs = require('fs');
var request = require('request');

const GENESIS_PRI_KEY = "46b9e861b63d3509c88b7817275a30d22d62c8cd8fa6486ddee35ef0d8e0495f";
const GENESIS_ADDRESS = "0xfbe45681ac6c53d5a40475f7526bac1fe7590fb8";

async function run(address, privateKeys, name) {

    try {
        console.log("address:" + address, "privateKeys:" + privateKeys)


        deployContract(address, privateKeys, name);

    } catch (e) {
        console.error(e);
    }
}


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
//confluxWeb.cfx.accounts.wallet.add(privateKeys[0]);
function deploy(argument, abi, solfile) {
    confluxWeb.cfx.signTransaction(argument)
        .then((encodedTransaction) => {
            const {
                rawTransaction
            } = encodedTransaction;
            console.log('raw transaction: ', rawTransaction);
            return confluxWeb.cfx.sendSignedTransaction(rawTransaction).then((transactionHash) => {
                console.log('transaction hash from RPC: ', transactionHash);
                //console.log("you can find the transaction details on : http://www.confluxscan.io/transactionsdetail/" + transactionHash)
                //hexNonce = argument.nonce.toString(16);
                //contractAdd = generate_contract_address(hexNonce +1, confluxWeb.cfx.accounts.wallet[0].address);
                //console.log("Waiting a mined block to include your contract... contract address will be at:" + "0x" + contractAdd);
                //waitBlock(transactionHash, abi)
                localhost_waitBlock(transactionHash, solfile)
            })
        }).catch(console.error);
};

function isHex(num) {
    return Boolean(num.match(/^0x[0-9a-f]+$/i))
};

async function deployContract(address, privateKeys, name) {


    await confluxWeb.cfx.accounts.wallet.add({
        privateKey: privateKeys,
        address: address
    });


    let rawdata = fs.readFileSync("./build/" + name + ".sol.json");
    let fd = JSON.parse(rawdata);
    console.log("bytecode:", "0x" + fd.bytecode)
    code = "0x" + fd.bytecode
    abi = fd.abi
    if (isHex(code)) {
        const add = confluxWeb.cfx.accounts.wallet[0].address;
        confluxWeb.cfx.getTransactionCount(confluxWeb.cfx.accounts.wallet[0].address).then(async(nonceValue) => {
            console.log("nonceValue:", nonceValue)
            const txParams = {
                from: add,
                nonce: nonceValue, // make nonce appropriate
                gasPrice: 5000,
                value: 0,
                to: null,
                data: code
            };

            let gas = await confluxWeb.cfx.estimateGas(txParams);
            console.log("gas : ", gas)
            txParams.gas = gas;
            txParams.from = 0;
            if (abi) {
                deploy(txParams, abi, name + ".sol.json");
            }
        })
    } else {
        //link 
        console.log("----------------------------------------------------")
        console.log("\n")
        console.log("The bytecode is not a hex, you may be a reference to other sol file, try to link!!!")
        linkRe = fd.linkReferences;

        contractAdd = fd.contractAddress;
        if (contractAdd == "") {
            cnsole.log("")
        }
        //此处我们要挨个获取它的以来的reference, 
        keys = Object.keys(obj.linkReferences)
        console.log(keys)
        var tempJson = {};
        for (var i = 0; i < keys.length; i++) {
            //获取sol deployed的contract address
            console.log(keys[i]);
            let solRawData = fs.readFileSync("./build/" + keys[i] + ".json");
            let solFd = JSON.parse(solRawData);
            cAdd = "0x" + solFd.contractAddress;
            keys2 = Object.keys(obj.linkReferences[keys[i]])
            k = keys + ":" + keys2,
            tempJson[k] = cAdd;
        }
        console.log("try to list the link reference object:", tempJson);
        /* 
         * example 
        bytecode = linker.linkBytecode(mc.bytecode, {
            'ConvertLib.sol:ConvertLib': '0xe4daa3e81a8c7c67d868fe21d0070ba29d61e5c9'
        });
        *
        */
        NewByteCode = linker.linkBytecode(fd.bytecode, tempJson);
        writeJsonto(bytecode, name + "sol.json", NewByteCode);
        const add = confluxWeb.cfx.accounts.wallet[0].address;
        confluxWeb.cfx.getTransactionCount(confluxWeb.cfx.accounts.wallet[0].address).then(async(nonceValue) => {
            console.log("nonceValue:", nonceValue)
            const txParams = {
                from: add,
                nonce: nonceValue, // make nonce appropriate
                gasPrice: 5000,
                value: 0,
                to: null,
                data: "0x" + NewByteCode
            };

            let gas = await confluxWeb.cfx.estimateGas(txParams);
            console.log("gas : ", gas)
            txParams.gas = gas;
            txParams.from = 0;
            if (abi) {
                deploy(txParams, abi, name + ".sol.json");
            }
        })

    }
}

//-------------------------------------------------------------------------------------------------
// waitBlock || wait_local_block  
// Utils function
//  
//-------------------------------------------------------------------------------------------------


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function waitBlock(txHash, abi) {

    return confluxWeb.cfx.getTransactionReceipt(txHash).then(
        (receipt) => {
            console.log("Note that it might take some sceonds for the block to propagate befor it's visible in conflux chain");
            if (receipt !== null) {
                contractAddress = receipt["contractCreated"]
                console.log("Your contract has been deployed at :" + contractAddress);
            } else {
                sleep(4000);
                return waitBlock(txHash, abi)
            }
        })

}

function localhost_waitBlock(txHash, solfile) {


    for (var i = 0, len = 5; i < len; i++) {
        client.request('generateoneblock', [1, 300000], function(err, error, result) {
            if (err) throw err;
            //console.log("generateoneblock : " + result);
        });

    }


    return confluxWeb.cfx.getTransactionReceipt(txHash).then(
        (receipt) => {
            //console.log("Note that it might take some sceonds for the block to propagate befor it's visible in conflux");
            if (receipt !== null) {
                //console.log("receipt:", receipt.stateRoot);
                //console.log("Your account has been receiver some cfx coin");
                cAddress = receipt["contractCreated"]
                console.log("Your contract has been deployed at :" + contractAddress);
                writeJsonto(contractAddress, solfile, cAddress);
                confluxWeb.cfx.accounts.wallet.remove(GENESIS_ADDRESS)
            } else {
                return localhost_waitBlock(txHash, solfile)
            }
        })
}

function writeJsonto(key, solfile, newValues) {
    var fs = require('fs');
    var file = require("./build/" + solfile);

    file.key = newValues;

    fs.writeFile("./build/" + solfile, JSON.stringify(file, null, 4), function(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(file));
        console.log('writing to ' + fileName);
    });

}



//-------------------------------------------------------------------------------------------------
// generateoneblock 
// Utils function
//  
//-------------------------------------------------------------------------------------------------

function generate_contract_address(nonce, sender) {

    var input_arr = [sender, nonce];
    var rlp_encoded = rlp.encode(input_arr);

    var contract_address_long = keccak('keccak256').update(rlp_encoded).digest('hex');

    var contract_address = contract_address_long.substring(24); //Trim the first 24 characters.
    //console.log("contract_address: " + contract_address);
    return contract_address;
}

//-------------------------------------------------------------------------------------------------
// sendBalance testnet or localhost
// Utils function
//  
//-------------------------------------------------------------------------------------------------

async function sendBalance_testnet(address) {

    url = "http://testnet-jsonrpc.conflux-chain.org:18082/dev/ask?address=" + address
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Has been sent to your account a CFX coin!!!")
            confluxWeb.cfx.getBalance(address).then((res) => console.log("Your address balance is :" + String(res)));

        }
    });


}


async function sendBalance_localhost(account) {
    const TO_ACCOUNT = account;

    confluxWeb.cfx.accounts.wallet.add({
        privateKey: GENESIS_PRI_KEY,
        address: GENESIS_ADDRESS
    })
    confluxWeb.cfx.getTransactionCount(GENESIS_ADDRESS).then(async(nonceValue) => {
        console.log("nonceValue:" + nonceValue)
        let gasPrice = await confluxWeb.cfx.getGasPrice();
        console.log("gasPrice : " + gasPrice)
        let txParms = {
            from: GENESIS_ADDRESS,
            nonce: nonceValue,
            gasPrice: 100,
            data: "0x00",
            value: cfxNum,
            to: TO_ACCOUNT
        };
        let gas = await confluxWeb.cfx.estimateGas(txParms);
        console.log("gas : ", gas)
        txParms.gas = gas;
        txParms.from = 0;
        confluxWeb.cfx.signTransaction(txParms)
            .then((encodedTransaction) => {
                const {
                    rawTransaction
                } = encodedTransaction;
                //console.log('raw transaction: ', rawTransaction);
                return confluxWeb.cfx.sendSignedTransaction(rawTransaction).then((transactionHash) => {
                    console.log('transaction hash from RPC: ', transactionHash);
                    //hexNonce = argument.nonce.toString(16);
                    //contractAdd = generate_contract_address(hexNonce +1, confluxWeb.cfx.accounts.wallet[0].address);
                    //console.log("Waiting a mined block to include your contract... contract address will be at:" + "0x" + contractAdd);

                    localhost_waitBlock(transactionHash)
                })
            }).catch(console.error);
    });
}



function isEmptyObject(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {¦
            return false;
        }
    }
    return true;
};


module.exports = {
    run
}
