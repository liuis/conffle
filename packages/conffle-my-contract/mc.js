// Require the package that was previosly saved by truffle-artifactor
const ConfluxWeb = require('conflux-web');
var provider = new ConfluxWeb.providers.HttpProvider("http://0.0.0.0:12537");
var contractTr = require("./index.js");
var MC = require("./MetaCoin_final.json");
const util = require('util');

const ad = "0xe1680683be13895b59c94eaf61818975a0d105dd";
const pk = "0x91594bd85fec9695a26ed630f536195b5f8c448560f46d68512e2efcd837d0ac";

var MetaCoin = contractTr({
    contractName: "MetaCoin",
    abi: MC.abi,
    bytecode: MC.unlinked_binary,
    address: MC.address, // optional
    // many more
});
MetaCoin.setProvider(provider);
//async function waitWallet(address, privateKeys) {
//    await MetaCoin.cfx.accounts.wallet.add({
//        privateKey: privateKeys,
//        address: address
//    });
//}
//waitWallet(ad, pk);

if (typeof MetaCoin.currentProvider.sendAsync !== "function") {
    MetaCoin.currentProvider.sendAsync = function() {
        return MetaCoin.currentProvider.send.apply(
            MetaCoin.currentProvider,
            arguments
        );
    };
}


var contract_address = "0x3a69dd57facd0e1751b85182b225a3b74ae7f0e3"
var coin;

//console.log(MetaCoin);
console.log("1--------------------------------")
console.log("2--------------------------------")
console.log("3--------------------------------")
MetaCoin.at(contract_address).then(function(instance) {
    coin = instance;
    console.log("--------------------------------")
    coin.constructor.web3.cfx.accounts.wallet.add({
        privateKey: pk,
        address: ad
    })
    //console.log("xxxx:", coin.constructor.web3.cfx.accounts.wallet);
    console.log(util.inspect(coin.getBalance("0xe1680683be13895b59c94eaf61818975a0d105dd"), {
        showHidden: false,
        depth: null
    }));
})





















/*

    .then(function(result) {
  // This code block will not be executed until truffle-contract has verified
  // the transaction has been processed and it is included in a mined block.
  // truffle-contract will error if the transaction hasn't been processed in 120 seconds.
    console.log("result_@at:" + result);
  // Since we're using promises, we can return a promise for a call that will
  // check account two's balance.
  return coin.methods.balances.call(account_two);
}).then(function(balance_of_account_two) {
  console.log("Balance of account two is " + balance_of_account_two + "!"); // => 3

  // But maybe too much was sent. Let's send some back.
  // Like before, will create a transaction that returns a promise, where
  // the callback won't be executed until the transaction has been processed.
  return coin.sendCoin(account_one, 1.5, {from: account_two});
}).then(function(result) {
  // Again, get the balance of account two
  return coin.balances.call(account_two)
}).then(function(balance_of_account_two) {
  console.log("Balance of account two is " + balance_of_account_two + "!") // => 1.5
}).catch(function(err) {
  // Easily catch all errors along the whole execution.
  console.log("ERROR! " + err.message);
});

////var deployed;
////
//console.log(util.inspect(coin, {showHidden: false, depth: null}));
//})

MetaCoin.new().then(function(instance) {
  deployed = instance;
  console.log(util.inspect(deployed, {showHidden: false, depth: null}));
})
MetaCoin.deployed().then(function(instance) {
  deployed = instance;
  console.log(util.inspect(deployed, {showHidden: false, depth: null}));
})
console.log("5--------------------------------")
//console.log(util.inspect(coin, {showHidden: false, depth: null}));
console.log("6--------------------------------")

*/
