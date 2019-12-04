//const ConfluxWeb = require('conflux-web');
//const confluxWeb = new ConfluxWeb('http://testnet-jsonrpc.conflux-chain.org:12537');
//const confluxWeb = new ConfluxWeb('http://0.0.0.0:12537');
//console.log(confluxWeb.cfx.getCode)
//const confluxWeb = new ConfluxWeb();
//console.log(confluxWeb);
//const confluxWeb = new ConfluxWeb('http://localhost:12345');
//console.log(confluxWeb)
//var jayson = require('jayson');
//var client = jayson.client.http('http://0.0.0.0:12537');

//confluxWeb.cfx.getCode("0x3a69dd57facd0e1751b85182b225a3b74ae7f0e3", "latest_state").then(console.log)
/*
async function get() {
    const reust = await confluxWeb.cfx.getBlock("latest_state");
    console.log(reust);
}
get()
*/
//confluxWeb.cfx.getCoinbase().then(console.log)
//client.request('generateoneblock', [1, 300000], function(err, error, result) {
//    if (err) throw err;
//    console.log("generateoneblock : " + result);
//});
//confluxWeb.cfx.getCode("0xe41d1e45b65fbdd9130e700ec7bb2de2667ea797").then(console.log)
////
//
//confluxWeb.cfx.getBlock("latest_state").then(console.log);
//client.request('getBalance', ["0x40dfc3098ffb06ca8768294b86802c3b3b808fdc"], function(err, error, result) {
//    if (err) throw err;
//    console.log("getBalance : " + result);
//});


//const TO_ACCOUNT = "0xaab1ae5497b3d48ba545c67718a26241c4f175cd";
//confluxWeb.cfx.getBalance(TO_ACCOUNT).then(console.log);
//var coinbase = confluxWeb.cfx.coinbase;
//console.log(coinbase);
//confluxWeb.cfx.getTransaction("0x8d826ecf3fc54b294766749c856b011ae678f53472f9f49bdb5d74c75b0f2313").then(console.log);
//client.request('generateoneblock', [100, 300000], function(err, error, result) {
//    if (err) throw err;
//    console.log("generateoneblock : " + result);
//    confluxWeb.cfx.getBlock(result).then(console.log);
//});
//confluxWeb.cfx.getBalance("0xfbe45681ac6c53d5a40475f7526bac1fe7590fb8").then(console.log);
//confluxWeb.cfx.getBalance("0x56d8ddbb2263f318ee7bf98f12058774b822c84b").then(console.log);
//confluxWeb.cfx.accounts.wallet.add({
//    privateKey: "0x9249b999321f9b43742a711af2883af41dfa9d5ea9d78d0bbcf3eecfc2c0b9c2",
//    address: "0x56D8Ddbb2263F318ee7Bf98F12058774B822C84b"
//})
//

//console.log(confluxWeb.cfx.accounts.wallet)
/*
const GENESIS_PRI_KEY = "0x46b9e861b63d3509c88b7817275a30d22d62c8cd8fa6486ddee35ef0d8e0495f";
const GENESIS_ADDRESS = "0xfbe45681ac6c53d5a40475f7526bac1fe7590fb8";
const TO_ACCOUNT = "0xcf72957656b60f4d4144cc93206b4112508a023e";
//const TO_PRI_KEY = "0x2d50c1be33d59f5627cb3e80f9baea6761b411221faafa3c48808f247db6c6c5";
//confluxWeb.cfx.getBalance(genesis_address).then(console.log)
//confluxWeb.cfx.getGasPrice().then(console.log)
//const balance = await confluxWeb.cfx.getBalance(genesis_address)
//const ethNum = confluxWeb.utils.fromDrip('5000000000000000000000000000000000', 'cfx')
    //console.log(balance);
    //console.log(ethNum);
//var jayson = require('jayson');
//var client = jayson.client.http('http://localhost:12537');



confluxWeb.cfx.accounts.wallet.add({
    privateKey: GENESIS_PRI_KEY,
    address: GENESIS_ADDRESS
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};


console.log("=========TO_ACCOUNT===start balance=======================")

confluxWeb.cfx.getBalance(TO_ACCOUNT).then(console.log);

console.log("=========TO_ACCOUNT===start balance====================")

sleep(4000);


confluxWeb.cfx.getTransactionCount(GENESIS_ADDRESS).then(nonceValue => {
    const txParms = {
        from: 0,
        to: TO_ACCOUNT,
        nonce: nonceValue,
        gas: 100000,
        gasPrice: 50,
        data: '0x00',
        value: 10
    };
    //confluxWeb.cfx.estimateGas(txParms).then(console.log);

    confluxWeb.cfx.signTransaction(txParms)
        .then((encodedTransaction) => {
            const {
                rawTransaction
            } = encodedTransaction;
            console.log('raw transaction: ', rawTransaction);
            return confluxWeb.cfx.sendSignedTransaction(rawTransaction).then((transactionHash) => {
                console.log('transaction hash from RPC: ', transactionHash);
                //hexNonce = argument.nonce.toString(16);
                //contractAdd = generate_contract_address(hexNonce +1, confluxWeb.cfx.accounts.wallet[0].address);
                //console.log("Waiting a mined block to include your contract... contract address will be at:" + "0x" + contractAdd);

                //waitBlock(transactionHash, abi)
            })
        }).catch(console.error);

});

console.log("=========TO_ACCOUNT===after balance====================");
confluxWeb.cfx.getBalance(TO_ACCOUNT).then(console.log);
console.log("=========TO_ACCOUNT===after balance====================");

sleep(1000);

client.request('generateoneblock', [1, 300000], function(err, error, result) {
    if (err) throw err;
    console.log("generateoneblock : " + result);
});



//confluxWeb.cfx.accounts.wallet.remove(GENESIS_ADDRESS);
//console.log(confluxWeb.cfx.accounts.wallet);
*/
