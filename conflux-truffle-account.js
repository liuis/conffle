//http://testnet-jsonrpc.conflux-chain.org:18082/dev/ask?address=0xfdf045e085d85734a17166c284fceedcde0bd89c
//web3.cfx.accounts.wallet.create(numberOfAccounts [, entropy]);
const Web3 = require('web3');
const rp = require('request-promise');
var request = require('request');
//const web3 = new Web3('http://testnet-jsonrpc.conflux-chain.org:12537');
var stringify = require('json-stringify');
//const addressList = web3.cfx.accounts.wallet.create(10);
var CircularJSON = require('circular-json');
var fs = require('fs');
var web3 = new Web3(new Web3.providers.HttpProvider("ropsten.infura.io/v3/67b02109f3174f32a4a5a19c0419f95b"))

function getRequestBody(url, callback) {
    request({
        url: url
    }, function(error, response, body) {
        if (error || response.statusCode !== 200) {
            return callback(error || {
                statusCode: response.statusCode
            });
        }
        callback(null, JSON.parse(body));
    });
}


function getPrivateKey() {
    const addressList = CircularJSON.parse(CircularJSON.stringify(web3.eth.accounts.wallet.create(10)));
    for (let i = 0; i < 10; i++) {
        address = addressList[i].address
        privateKey = addressList[i].privateKey
            //console.log("address:", address)
            //console.log("privateKey:", privateKey)
        url = "http://testnet-jsonrpc.conflux-chain.org:18082/dev/ask?address=" + address.toString().toLowerCase()
        request(url, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                }

            }
       
    ).pipe(fs.createWriteStream("./result.json", body))
    }
}

function reqData(address, privateKey, body) {
    var re = [];
    if (body["code"] == 0) {
        re['address'] = address
        re['privateKey'] = privateKey
        re['tx'] = body["message"]["tx"]
    }
    console.log(re) ;
}

function getTx(url, address, privateKey) {
    // returns a promise
    return rp(url).then(body => {
        // make the count be the resolved value of the promise
        let responseJSON = JSON.parse(body);
        if (body["code"] == 0) {
        var re = [];
        re['address'] = address
        re['privateKey'] = privateKey
        re['tx'] = responseJSON["message"]["tx"]
         
        return re;
        }
    });
}

function getPK() {
    const addressList = CircularJSON.parse(CircularJSON.stringify(web3.eth.accounts.wallet.create(10)));
    result = [];
    for (let i = 0; i < 10; i++) {
        address = addressList[i].address
        privateKey = addressList[i].privateKey
            //console.log("address:", address)
            //console.log("privateKey:", privateKey)
        url = "http://testnet-jsonrpc.conflux-chain.org:18082/dev/ask?address=" + address.toString().toLowerCase()
        resu = getTx(url, address, privateKey);
        console.log(resu);
        result.push(resu);
    }
}

getPrivateKey()
