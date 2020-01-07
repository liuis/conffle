Table of Contents
=================

   * [conffle](#conffle)
      * [Installing](#installing)
      * [Documentation](#documentation)
         * [start a  local node](#start-a--local-node)
         * [use docker-compose](#use-docker-compose)
         * [conffle commander:](#conffle-use)
            * [Step1. conffle init](#step1-conffle-init)
            * [Step2. conffle account](#step2-conffle-account)
            * [Step3. conffle compile](#step3-conffle-compile)
            * [Step4. conffle sendbalance](#step4-conffle-sendbalance)
            * [Step5. conffle  deploy](#step5-conffle--deploy)
            * [Step6. conffle  console](#step6-conffle--console)
      * [Interacting with your contract](#interacting-with-your-contract)
         * [Use a contract at a specific address](#use-a-contract-at-a-specific-address)
# conffle

![Build Status](https://api.travis-ci.org/liuis/conflux-dapp-js.svg?branch=refactor) [![npm](https://img.shields.io/npm/dm/conffle.svg)](https://www.npmjs.com/package/conffle) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![npm version](https://badge.fury.io/js/conffle.svg)](https://badge.fury.io/js/conffle)

[![Docker Pulls](https://img.shields.io/docker/pulls/liqiazero/conflux-chain.svg)](https://hub.docker.com/r/liqiazero/conflux-chain/)
[![Docker Stars](https://img.shields.io/docker/stars/liqiazero/conflux-chain.svg)](https://hub.docker.com/r/liqiazero/conflux-chain/)



**conffle** is an conflux framework which helps with Initialize a dapp project.
The framework makes the development of smart contracts in the conflux network pretty easy. It provides commands for    compilation, deployment of smart contracts, running a local node, local compiler and unit testing the contracts.

conffle consists of 5 separated packages. There are two main packages.
- **conffle** - This package is responsible for reading **Conffle** commands from the command line
- **conffle-contract** - installing this package will give you access to the Deployer, which gives you the ability to deploy    compiled contracts.
- **conffle-logger** - Using this package will give you the ability to print your historical deployments on the console.   
- **conffle-config** - This package is used as helper where all the necessary configuration files are included.
- **conffle-utils** - Similarly to config this package helps with functions like **ReadFile**  & **keyToHex**, etc.



## Installing

```javascript
npm i -g conffle
```
-----------------

## Documentation
###  **warning** 

All tests are run on mac, because of the case-sensitive nature of Linux, so you can't run it on Linux for the time being.

### start a  local node
Before you start you must locally run a our conflux chain node. https://github.com/liuis/conflux-local-network

```bash
docker pull liqiazero/conflux-chain:v0.1.10


docker run --name conflux-chain  -p 12537:12537 -p 32323:32323 -p 32323:32323/udp -p 14629:14629 -p 12539:12539  -d liqiazero/conflux-chain:v0.1.10


```
***if u want use docker-compose, just following:***

-----------------

### use docker-compose

To start the network:

```bash
docker-compose up -d
```

To destroy the network:

```bash
docker-compose down
```

To cleanup the associated docker volumes, `-v` option could be used:

```bash
docker-compose down -v
```

### conffle commander:

#### Step1. conffle init

```javascript
conffle init
```

Put your own contract under the current directory

#### Step2. conffle account

```javascript
conffle account
```
Generate account and private key . 


You can find the generated **wallet.json** file in the current directory. All address, privatekey, publishkey will be written to this file.

The following content :

```javascript
{
  "wallet": [
    {
      "time": "2019-12-13 11:49:43",
      "mnemonic": "accuse erosion version giant surprise hour course devote frozen cabbage birth fog",
      "accounts": [
        {
          "address": "0xa7b4e98db3d570bd6cf01141dfc69a58b0eba3d7",
          "publicKey": "0x3f2b115a74c0cecf197b8608d71890f3801c3ddc54bb5e50c2c83be9169b5c0224a70f5381a8c3ae2ea8065c476498c774b39f4093ecd6b687912d5ebd83452e",
          "privateKey": "0x4270f5706de09280ff78cc91d3e02ce7a209538ce4fcf9b21d55196d5c89ac01"
        },
        {
          "address": "0xd886f98626094a77d831a91ed15e2b0e2d463416",
          "publicKey": "0xa3029052cd227709e2cdaefec0088a0248f00934bfe70022ec24c8b7f6bdd8c9de85b16a21632b536ca22f917eb3798c5b20644720667cd9bffe3fd7c12a5ec1",
          "privateKey": "0xe5a0ddb5bae3cd7649981a5735c4eef3680969aa9e1852e0946e5313117f29d4"
        },
        {
          "address": "0x297d58cc2f7bb0fd14c65e1b040d7c7d30f4db69",
          "publicKey": "0x44c861480c5a0d45a8c56bbe95dac6ab933956d60e997c8acb866654a9584a4c47b77bc0f85ff031dfdce3df32318ad509ff5a1fbe71982e9a3030a1cea3b8aa",
          "privateKey": "0x09a2975c885f4c9861c7cb4f9912b12c476fef35b9415e551d162143adfcc799"
        },
        {
          "address": "0xd5ac5b46d4a1e18e41082e6e87939d38258dcd10",
          "publicKey": "0x235a3e11267bf73dd652af3eea95eb7a757a535945a296a9f0c5c362f851f2335cec8beddaf51fd10c2ce88c760b2be1d2fd78537914b3fa473b6cd105fd4803",
          "privateKey": "0xaa7197c6cac1950dd1ccef2f6af2372e4e66ea14f7b47f53ba25d7daa2f8d211"
        },
        {
          "address": "0x93dccd823eb68f7739ab67990afeaf1b25729773",
          "publicKey": "0x4610b40ada45976ae58d191ca8a7e0b088aa5148437bb1cb89c20d1c53587159721fd5301192bf44c6101e23d2b816f0c5c6ec7318933bf79d693b435310c461",
          "privateKey": "0xfe4db093fecafb026396731e0489ce7d2263fb0958d7487c124985eabe173b5d"
        },
        {
          "address": "0x5d38e928f2ed257a444a03fbc0fbf8e3eeb09fde",
          "publicKey": "0x8a677fae9f146340641cf6d69b2ad7f474f4451ed41a1062c339eba4bf488f6ddf16bf663777ad4aadff592e9c062a0a2221d4fbc75349c5ab21ca02ffd72700",
          "privateKey": "0xea337ea5dfca6f1e113f5cb0837987c88c089daa522234bea55d1dc77fd54eff"
        },
        {
          "address": "0x1ecc9404876f127e422e06ad1ff4cd9d2a282ee4",
          "publicKey": "0x205e612bf30e206f1509f93571a675c2d10a2d1330de4c85996edeafcaccb3d77aabe20c36c564eb32f7f39d66e60c7006c213f87ce26d17407f206a0925bdee",
          "privateKey": "0xfbede3f6f97b625a692b45ef5bdc3ac03cdfe88ca00eb340b69f06e7aaa54904"
        },
        {
          "address": "0x71fd598723355d0d3a25aed255a6075e5fa5394c",
          "publicKey": "0x8a7599e25d4f073a99cc5f65bfb118c767d33be465da85af4b1087a3680286b30c4aa806abf491bb4c60f9ec051258feb57995be66a4ed8c50c21bda671be90c",
          "privateKey": "0x4117984ea58a4741f068ef6e78844a74d6ff2a890cf2c5413b069e9d9ee64831"
        },
        {
          "address": "0x79305dc2b3509212bb043befebb12a46d3cb190b",
          "publicKey": "0xe18a6387b06092bb7cdfb56f18759a5088b748b0c1c0fb2618cff0ea024c0d5d50256b81e2e9f687ce6758864daafebe406bdab5a8ad71decf3afe15d9b239b6",
          "privateKey": "0x556bbe7db0055f894179efe6bbbfa9274dfb2bbde8ca063113318fea435247c0"
        },
        {
          "address": "0x9535ad60bf720baac2e8ab3a9308c46879241968",
          "publicKey": "0xccb514ddafd7e6238923d4ea2f09a27b4f852a855d307efec938fb3c68862deb0058ccca8a799df360ca13cc1979117e2cbbc0f7180c5f57af08828a89e16da5",
          "privateKey": "0x998340f60cbcb8b26b5cd3b851fc0546c2adf7daad6ac30ab1fb227424ade67f"
        }
      ]
    }
  ]
}

```
#### Step3. conffle compile 

```javascript
example:
      conffle compile 
```

if you have multiple contracts, libraries, etc., there is a reference relationship between them. When compiling, conffle will automatically do the linking for you. But you need to deploy your contracts in the order suggested.

````javascript 
.........
.........
--------------------------------------------                                                  │
output: { contracts:                                                                          │
   { 'ConvertLib.sol': { ConvertLib: [Object] },                                              │
     'MetaCoin.sol': { MetaCoin: [Object] },                                                  │
     'Migrations.sol': { Migrations: [Object] } },                                            │
  sources:                                                                                    │
   { 'ConvertLib.sol': { id: 0 },                                                             │
     'MetaCoin.sol': { id: 1 },                                                               │
     'Migrations.sol': { id: 2 } } }

U need first deploy this contract: [ 'ConvertLib.sol', 'Migrations.sol' ]


then deploy this contract: [ 'MetaCoin.sol' ]


````

To compile your contract, will generate build directory down generated abi and the bytecode.

#### Step4. conffle sendbalance 

Give your address some CFX coin.

```javascript
example:
        conffle sendbalance --a "0xe1680683be13895b59c94eaf61818975a0d105dd"
```

#### Step5. conffle  deploy 

######  **default:**  
wallet addressIndex[0] as the default deploy address

Select the address and privatekey you want to deploy in the wallet.json file.

Ensure that your account has plenty of cfx coin, if not you can use **conffle sendbalance**  send some to your account.

```javascript
example： 
conffle deploy --a "0xe1680683be13895b59c94eaf61818975a0d105dd"  --pk "0x91594bd85fec9695a26ed630f536195b5f8c448560f46d68512e2efcd837d0ac" --name ConvertLib
        
```

Will be sent to test network related contracts over the contract.

If you are successful, you will receive the following log:

```javascript
example:

you can find the transaction details on : http://www.confluxscan.io/transactionsdetail/0x5a8234da84f0c066780921a04b2cbc94d6e48a343cd9ae5bda5479d78a883f76

..............

Your contract has been deployed at :0xae2b17be6f7d590510fa7db89f86c02f55e73d2a

````


## Interacting with your contract

contract:  MetaCoin.sol

````javascript

pragma solidity >=0.4.25 <0.6.0;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract MetaCoin {
    mapping (address => uint) balances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor() public {
        balances[tx.origin] = 10000;
    }

    function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
        if (balances[msg.sender] < amount) return false;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Transfer(msg.sender, receiver, amount);
        return true;
    }

    function getBalanceInEth(address addr) public view returns(uint){
        return ConvertLib.convert(getBalance(addr),2);
    }

    function getBalance(address addr) public view returns(uint) {
        return balances[addr];
    }
}

````
### Use a contract at a specific address


In the test directory, you can use/write javascript to test your contract.

````shell
cd test
node mc.js / mc_new.js
````

#### myContract.at('0x1234....')

If you already have an address for a contract, you can create a new abstraction to represent the contract at that address.

````javascript 

MetaCoin.at("0x1234...").then(async function(instance) {
    coin = instance;
    ..........
    )}
    
````

example:

````javascript
const ConfluxWeb = require('conflux-web');
var provider = new ConfluxWeb.providers.HttpProvider("http://0.0.0.0:12537");
var contractTr = require('conffle-contract');
var MC = require("../build/MetaCoin.sol.json");  //Enter the actual path of the file compiled by your contract
const util = require('util');

const ad = "0xe1680683be13895b59c94eaf61818975a0d105dd";
const pk = "0x91594bd85fec9695a26ed630f536195b5f8c448560f46d68512e2efcd837d0ac";

var MetaCoin = contractTr({
    contractName: "MetaCoin",
    abi: MC.abi,
    bytecode: MC.bytecode,
    address: MC.contractAddress, // optional
});

MetaCoin.setProvider(provider);

var account_one = "0xe1680683be13895b59c94eaf61818975a0d105dd";
var account_two = "0x3ba790a9dcf7dd081f6167bc76a1e8279cb7da17";
var account_three = "0x49a583998b1921eded4f2ade09255648db7672d3";

// must be add this code,when you test you contract code
if (typeof MetaCoin.currentProvider.sendAsync !== "function") {
    MetaCoin.currentProvider.sendAsync = function() {
        return MetaCoin.currentProvider.send.apply(
            MetaCoin.currentProvider,
            arguments
        );
    };
}


var contract_address = MC.contractAddress;
var coin;

//coin.constructor.web3.cfx.accounts.wallet.add({
//    privateKey: pk,
//    address: ad
//});
MetaCoin.at(contract_address).then(async function(instance) {
    coin = instance;

    //console.log(util.inspect(coin, {
    //    showHidden: true,
    //    depth: 7
    //}));
    debugger
    coin.getBalance("0xe1680683be13895b59c94eaf61818975a0d105dd").then(function(result) {

        console.log("account_one balance is :", result)
        console.log("--------------------------------")
        coin.sendCoin(account_two, 3).then(async function(res) {
                console.log("send account_two 3 coins result:", res) //0 is success, 1 or 2 is something is wrong
                coin.getBalance(account_two).then(function(re) {
                    console.log("account_two balance is : ", re)
                });
            })
    });
})


````
#### myContract.new('....')
This function returns a Promise that resolves into a new instance of the contract abstraction at the newly deployed address.

you can find the example in the test directory.
````javascript

......................

MetaCoin.new(....).then(async function(instance) {
    coin = instance;
    coin.getBalance("0xe1680683be13895b59c94eaf61818975a0d105dd").then(function(result) {

        console.log("account_one balance is :", result)
        console.log("--------------------------------")
        coin.sendCoin(account_two, 3).then(async function(res) {
                console.log("send account_two 3 coins result:", res) //0 is success, 1 or 2 is something is wrong
                coin.getBalance(account_two).then(function(re) {
                    console.log("account_two balance is : ", re)
                });
            })
    });
})

......................

 ````
#### Step6. conffle  console
![console](./conffle-console.png)
