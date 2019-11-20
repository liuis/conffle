//const Artifactor = require("truffle-conflux-artifactor");
//const mc = require("./FC.sol.json");
//const artifactor = new Artifactor(__dirname);
const ConfluxWeb = require('conflux-web');

var provider = new ConfluxWeb.providers.HttpProvider("http://localhost:12537");
//var contractTr = require("truffle-conflux-contract");
var contractTr = require("./index");

//var contract_data = {
//  contractName: "FC",
//  abi: mc.abi,              // Array; required.
//  unlinked_binary: mc.bytecode, // String; optional.
//  address: "0x3a69dd57facd0e1751b85182b225a3b74ae7f0e3"        // String; optional.
//};

var FC = require("./FC");

var MyContract = contractTr({
  contract_name: "FC",
  abi: FC.abi,
  bytecode: FC.bytecode,
  address: "0x3a69dd57facd0e1751b85182b225a3b74ae7f0e3" // optional
})
console.log("myContract:", MyContract.prototype)
//var MyContract = require("./FC");
MyContract.setProvider(provider);
//console.log(bool);
//console.log(MyContract.deployed());
var deployed;
MyContract.deployed().then(function(instance) {
  deployed = instance;
  cosnole.log(deployed); 
})

/*
*/


//MyContract.at("0x3a69dd57facd0e1751b85182b225a3b74ae7f0e3").then(function(instance) {
//  coin = instance;
//  return coin.name();
//}).then(function(result) {

//    console.log(result);
//})




//console.log(MyContract.deployed())

    //.then(function(result) {
  // Do something with the result or continue with more transactions.
  //  console.log(result)
//});
