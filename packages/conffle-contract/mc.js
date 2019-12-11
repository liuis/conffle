const ConfluxWeb = require('conflux-web');
var provider = new ConfluxWeb.providers.HttpProvider("http://0.0.0.0:12537");
var contractTr = require("./index.js");
var MC = require("/Users/liping/about_CFX_Work/about_conffle_test/demo-test/build/MetaCoin.sol.json");
const util = require('util');

const ad = "0xe1680683be13895b59c94eaf61818975a0d105dd";
const pk = "0x91594bd85fec9695a26ed630f536195b5f8c448560f46d68512e2efcd837d0ac";

var MetaCoin = contractTr({
    contractName: "MetaCoin",
    abi: MC.abi,
    bytecode: MC.bytecode,
    address: "0x3a69dd57facd0e1751b85182b225a3b74ae7f0e3", // optional
});

MetaCoin.setProvider(provider);

var account_one = "0xe1680683be13895b59c94eaf61818975a0d105dd";
var account_two = "0x3ba790a9dcf7dd081f6167bc76a1e8279cb7da17";
var account_three = "0x49a583998b1921eded4f2ade09255648db7672d3";


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

//coin.constructor.web3.cfx.accounts.wallet.add({
//    privateKey: pk,
//    address: ad
//});
MetaCoin.at(contract_address).then(async function(instance) {
    coin = instance;

    //console.log(util.inspect(coin.getBalance("0xe1680683be13895b59c94eaf61818975a0d105dd"), {
    //    showHidden: true,
    //    depth: 7
    //}));
    //console.log("xvfsdfsdfsdfsdfsdfsffsdfsfsdfsds:",coin.getBalance("0xe1680683be13895b59c94eaf61818975a0d105dd"));
    coin.getBalance("0xe1680683be13895b59c94eaf61818975a0d105dd").then(function(result) {

        console.log("account_one balance is :", result)
        console.log("--------------------------------")
        coin.sendCoin(account_two, 3).then(function(res) {
                console.log("xxxxxvxvxvcxvcxxvcxv:", res)
            })
            //console.log(coin.getBalance(account_two));
            //await coin.sendCoin(account_two, 3);
            //console.log(coin.getBalance(account_one));
            //console.log(coin.getBalance(account_two));
            //console.log("--------------------------------")
    });
})
