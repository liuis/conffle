const reformat = require("./reformat");

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

    getTxParams: function(methodABI, args) {
        const constructor = this;

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

    getNonce: async function() {
        const constructor = this;
        const web3 = constructor.web3;
        const add = web3.cfx.accounts.wallet[0].address;
        const nonceValue = await web3.cfx.getTransactionCount(add);

        return nonceValue;
    },

    wait_local_block: function(txHash) {
        const constructor = this;
        const web3 = constructor.web3;
        for (var i = 0, len = 5; i < len; i++) {
            client.request('generateoneblock', [1, 300000], function(err, error, result) {
                if (err) throw err; //console.log("generateoneblock : " + result);

            });

        }
        return web3.cfx.getTransactionReceipt(txHash).then((receipt) => { //console.log("Note that it might take some sceonds for the block to propagate befor it's visible in conflux"
            if (receipt !== null) { //console.log("receipt:", receipt.stateRoot);
                //console.log("Your account has been receiver some cfx coin");

                contractAddress = receipt["contractCreated"];
                console.log("Your contract has been deployed at :" + contractAddress);
            } else {
                return localhost_waitBlock(txHash)
            }
        })
    },

    signTransaction: async function(constructor, txParams) {
        const web3 = constructor.web3;
        console.log("constructor xxxxxxxx: " + constructor.web3)
        let gas = await web3.cfx.estimateGas(txParams);
        console.log("gas : ", gas) 
        txParams.gas = gas;
        txParams.from = 0;
        web3.cfx.signTransaction(txParams)
            .then((encodedTransaction) => {
                const {
                    rawTransaction
                } = encodedTransaction;
                console.log('raw transaction: ', rawTransaction);
                return web3.cfx.sendSignedTransaction(rawTransaction).then((transactionHash) => {
                    console.log('transaction hash from RPC: ', transactionHash);
                    execute.wait_local_block(transactionHash)
                });
            }).catch(console.error);

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
                    result = reformat.numbers.call(
                        constructor,
                        result,
                        methodABI.outputs
                    );
                    return result;
                })

        };
    },

    send: function(fn, methodABI, address) {
        const constructor = this;
        const web3 = constructor.web3;
        console.log("send fun : ", constructor.web3)
        return function() {
            let deferred;

            execute
                .prepareCall(constructor, methodABI, arguments)
                .then(async({
                    args,
                    params
                }) => {
                    params.to = address;
                    params.data = fn ? fn(...args).encodeABI() : params.data;
                    console.log("params:", params)
                    execute.signTransaction(constructor, params);
                    

                })

        };
    },



};



module.exports = execute;
