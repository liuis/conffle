//http://testnet-jsonrpc.conflux-chain.org:18082/dev/ask?address=0xfdf045e085d85734a17166c284fceedcde0bd89c
//web3.cfx.accounts.wallet.create(numberOfAccounts [, entropy]);
const  Web3 = require('web3');
var request = require('request');
//const web3 = new Web3('http://testnet-jsonrpc.conflux-chain.org:12537');
var stringify = require('json-stringify');
//const addressList = web3.cfx.accounts.wallet.create(10);
var CircularJSON = require('circular-json');

var web3 = new Web3(new Web3.providers.HttpProvider("ropsten.infura.io/v3/67b02109f3174f32a4a5a19c0419f95b"))

const addressList = CircularJSON.parse(CircularJSON.stringify(web3.eth.accounts.wallet.create(10)));
//for (var key in addressList) {
//    console.log(key)
//}
for (let i = 0 ; i < 10 ; i++)
{
    address = addressList[i].address
    console.log(address)
    url = "http://testnet-jsonrpc.conflux-chain.org:18082/dev/ask?address=" + address.toString().toLowerCase()

    request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body) 
    }
    })
}
