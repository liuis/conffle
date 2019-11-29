// Require the package that was previosly saved by truffle-artifactor
const ConfluxWeb = require('conflux-web');
var provider = new ConfluxWeb.providers.HttpProvider("http://localhost:12537");
var contractTr = require("./index.js");
var MC = require("./MetaCoin_final.json");
const util = require('util')

var MetaCoin = contractTr({
  contractName:"MetaCoin",
  abi: MC.abi,
  bytecode: MC.unlinked_binary,
  address: MC.address, // optional
  // many more
});

MetaCoin.setProvider(provider);

if (typeof MetaCoin.currentProvider.sendAsync !== "function") {
  MetaCoin.currentProvider.sendAsync = function() {
    return MetaCoin.currentProvider.send.apply(
      MetaCoin.currentProvider,
          arguments
    );
  };
}


var contract_address = "0xb3247fa6b8e674f86055a74dfa8b35c6c339ddf9";
var coin;

//console.log(MetaCoin);
console.log("1--------------------------------")
console.log("2--------------------------------")
console.log("3--------------------------------")
MetaCoin.at(contract_address).then(function(instance) {
  coin = instance;
  console.log("--------------------------------")
  console.log(util.inspect(coin, {showHidden: false, depth: null}));
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
  
