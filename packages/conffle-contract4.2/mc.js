// Require the package that was previosly saved by truffle-artifactor
const ConfluxWeb = require('conflux-web');
var provider = new ConfluxWeb.providers.HttpProvider("http://localhost:12537");
var contractTr = require("./index.js");
var MC = require("./MetaCoin.sol.json");

// Remember to set the Web3 provider (see above).
var FC = contractTr({
  contractName:"FC",
  abi: FC.abi,
  unlinked_binary: FC.bytecode,
  address: "0xb3247fa6b8e674f86055a74dfa8b35c6c339ddf9" // optional
  // many more
});
FC.setProvider(provider);

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
var contract_address = "0xb3247fa6b8e674f86055a74dfa8b35c6c339ddf9";
var coin;

//console.log(MetaCoin);
//console.log("1--------------------------------")
//console.log("2--------------------------------")
//console.log("3--------------------------------")
//console.log(MetaCoin.at(contract_address))
FC.at(contract_address).then(function(instance) {
  coin = instance;

console.log("5--------------------------------")
    console.log("result_@at:" + coin);
console.log("6--------------------------------")
  // Make a transaction that calls the function `sendCoin`, sending 3 MetaCoin
  // to the account listed as account_two.
  return coin.sendCoin(account_two, 3, {from: account_one});
}).then(function(result) {
  // This code block will not be executed until truffle-contract has verified
  // the transaction has been processed and it is included in a mined block.
  // truffle-contract will error if the transaction hasn't been processed in 120 seconds.
    console.log("result_@at:" + result);
  // Since we're using promises, we can return a promise for a call that will
  // check account two's balance.
  return coin.balances.call(account_two);
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
