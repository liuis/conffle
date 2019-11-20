// Require the package that was previosly saved by truffle-artifactor
const ConfluxWeb = require('conflux-web');
var provider = new ConfluxWeb.providers.HttpProvider("http://localhost:12537");
var contractTr = require("./index.js");
var MC = require("./MetaCoin.json");

// Remember to set the Web3 provider (see above).
var MetaCoin = contractTr({
  contractName:"MetaCoin",
  abi: MC.abi,
  unlinked_binary: MC.bytecode,
  address: "0x1c6da3c2e901e6aa282d5595fae05abbc3537fc9" // optional
  // many more
});
console.log(MetaCoin);
console.log("--------------------------------")
console.log("--------------------------------")
console.log("--------------------------------")
console.log("--------------------------------")
MetaCoin.setProvider(provider);

// In this scenario, two users will send MetaCoin back and forth, showing
// how truffle-contract allows for easy control flow.
var account_one = "0x3a46d8eb526937f8e42ebe59881532b90543b844";
//pr:0x7c0638586886be2a1c0ff2523bdebc8568fd8c9ce35b0a6600a529982c260c3e
var account_two = "0xd35f819a5af644f60e95db2b12dc309329de0c4b";
//pr:0x3a93863765db4f7d2b7b407994bb19279f094b3410ebbbe0b1e87cc32bcb3a89
//
//
//
// Note our MetaCoin contract exists at a specific address.
var contract_address = "0x1c6da3c2e901e6aa282d5595fae05abbc3537fc9";
var coin;

MetaCoin.at(contract_address).then(function(instance) {
  coin = instance;

  // Make a transaction that calls the function `sendCoin`, sending 3 MetaCoin
  // to the account listed as account_two.
  return coin.sendCoin(account_two, 3, {from: account_one});
}).then(function(result) {
  // This code block will not be executed until truffle-contract has verified
  // the transaction has been processed and it is included in a mined block.
  // truffle-contract will error if the transaction hasn't been processed in 120 seconds.

  // Since we're using promises, we can return a promise for a call that will
  // check account two's balance.
  return coin.balances.call(account_two);
}).then(function(balance_of_account_two) {
  alert("Balance of account two is " + balance_of_account_two + "!"); // => 3

  // But maybe too much was sent. Let's send some back.
  // Like before, will create a transaction that returns a promise, where
  // the callback won't be executed until the transaction has been processed.
  return coin.sendCoin(account_one, 1.5, {from: account_two});
}).then(function(result) {
  // Again, get the balance of account two
  return coin.balances.call(account_two)
}).then(function(balance_of_account_two) {
  alert("Balance of account two is " + balance_of_account_two + "!") // => 1.5
}).catch(function(err) {
  // Easily catch all errors along the whole execution.
  alert("ERROR! " + err.message);
});
