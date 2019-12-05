const reformat = require("./reformat");
var jayson = require('jayson');
const ad = "0xe1680683be13895b59c94eaf61818975a0d105dd";
//const pk = "0x91594bd85fec9695a26ed630f536195b5f8c448560f46d68512e2efcd837d0ac";
const Tx = require("./transaction.js");
const pk = Buffer.from(
    '91594bd85fec9695a26ed630f536195b5f8c448560f46d68512e2efcd837d0ac',
    'hex',
)
const util = require('util');
//const Tx = require('ethereumjs-tx').Transaction;
var client = jayson.client.http('http://localhost:12537');
const execute = {
    is_tx_params: function(val) {

        const allowed_fields = {
            from: true,
            to: true,
            gas: true,
            gasPrice: true,
            value: true,
            data: true,
            nonce: true
        };

        for (let field_name of Object.keys(val)) {
            if (allowed_fields[field_name]) return true;
        }

        return false;
    },

    getTxParams: async function(methodABI, args) {

        const constructor = this;
        const web3 = constructor.web3;
        const expected_arg_count = methodABI ? methodABI.inputs.length : 0;

        let tx_params = {};
        const last_arg = args[args.length - 1];

        if (
            args.length === expected_arg_count + 1 &&
            execute.is_tx_params(last_arg)
        ) {
            tx_params = args.pop();
        }

        return tx_params;
    },

    prepareCall: async function(constructor, methodABI, _arguments) {

        let args = Array.prototype.slice.call(_arguments);
        let params = execute.getTxParams.call(constructor, methodABI, args);
        return {
            args,
            params
        }
    },

    getNonce: async function(web3) {
        //const ad = web3.cfx.accounts.wallet[0].address;
        const nonceValue = await web3.cfx.getTransactionCount(ad);

        return nonceValue;
    },

    wait_local_block: function(constructor, txHash) {
        const web3 = constructor.web3;
        for (var i = 0, len = 5; i < len; i++) {
            client.request('generateoneblock', [100, 300000], function(err, res) {
                //console.log("pacakgeing:::::", res)
                if (err) throw err; //console.log("generateoneblock : " + result);

            });

        }
        //return web3.cfx.getTransactionReceipt(txHash).then((receipt) => { 
        client.request('cfx_getTransactionReceipt', [txHash], function(err, res) {
            //console.log("Note that it might take some sceonds for the block to propagate befor it's visible in conflux"
            console.log("getTransactionReceipt:::::::", res);
            if (res.result !== null) { //console.log("receipt:", receipt.stateRoot);
                //console.log("Your account has been receiver some cfx coin");

                //contractAddress = res.result["contractCreated"];
                //console.log("Your contract has been deployed at :" + contractAddress);
            } else {
                return execute.wait_local_block(constructor, txHash)
            }
        })
    },

    signTransaction: async function(constructor, txParams) {
        const web3 = constructor.web3;

        txParams.then(async function(res) {
            console.log("txParams gas::::::::::", res);
            let NonceValue = await web3.cfx.getTransactionCount(ad);
            console.log("txParams NonceValue::::::::::", NonceValue);
            var caluGas = {
                "from": ad,
                "gasPrice": 5000,
                "to": txParams.to,
                "value": 0,
                "data": txParams.data,
                "nonce": NonceValue
            };
            let gas = await web3.cfx.estimateGas(caluGas);
            console.log("txParams gas::::::::::", gas);
            var rawTx = {
                "gas": web3.extend.utils.toHex(gas),
                "gasPrice": web3.extend.utils.toHex(5000),
                "to": txParams.to,
                "value": "0x0",
                "data": txParams.data,
                "nonce": web3.extend.utils.toHex(NonceValue)
            };
            console.log("rawTX::::::::", rawTx);
            var rtx = new Tx(rawTx);
            delete rtx._common;
            rtx.sign(pk);
            const serializedTx = rtx.serialize().toString('hex');
            //console.log("rawTransaction", serializedTx);
            client.request('cfx_sendRawTransaction', [serializedTx], function(err, res) {
                if (err) throw err;
                //console.log('transaction hash from RPC:', res.result);
                execute.wait_local_block(constructor, res.result);

            });


        });
    },


    call: function(fn, methodABI, address) {
        const constructor = this;

        return function() {
            const args = Array.prototype.slice.call(arguments);

            execute
                .prepareCall(constructor, methodABI, args)
                .then(async({
                    args,
                    params
                }) => {
                    let result;

                    params.to = address;

                    result = await fn(...args).call(params);
                    console.log("isConstant:::::::== true:::", result)
                        //result = reformat.numbers.call(
                        //    constructor,
                        //    result,
                        //    methodABI.outputs
                        //);
                    return result;
                })

        };
    },

    send: function(fn, methodABI, address) {
        //console.log("fn:::args:::::", fn, methodABI, address)
        const constructor = this;
        const web3 = constructor.web3;
        //console.log("send fun : ", constructor.web3)
        return function() {
            execute
                .prepareCall(constructor, methodABI, arguments)
                .then(async({
                    args,
                    params
                }) => {
                    console.log("methodABI:::::::::xxxxxxxxxxxx:", args, params)
                    params.to = address;
                    params.data = fn ? fn(...args).encodeABI() : params.data;
                    console.log("send:::::::::", fn)
                    console.log(util.inspect(fn, {
                        showHidden: false,
                        depth: null
                    }));
                    execute.signTransaction(constructor, params);


                })

        };
    },



};



module.exports = execute;
