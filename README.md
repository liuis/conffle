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



### Installing

```javascript
npm i -g conffle
```
-----------------

### Documentation
##  **warning** 

All tests are run on mac, because of the case-sensitive nature of Linux, so you can't run it on Linux for the time being.

## start a  local node
Before you start you must locally run a our conflux chain node. https://github.com/liuis/conflux-local-network

```bash
docker pull liqiazero/conflux-chain:v0.1.10


docker run --name conflux-chain  -p 12537:12537 -p 32323:32323 -p 32323:32323/udp -p 14629:14629 -p 12539:12539  -d liqiazero/conflux-chain:v0.1.10


```
***if u want use docker-compose, just following:***

-----------------

### docker-compose

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

## conffle use:

#### Step1. conffle init

```javascript
conffle init
```

Generates the ***demo-test*** directory, the directory include contract dir.
Put your own contract.

#### Step2. conffle account

```javascript
conffle account
```
Generate account and private key . 


You can find the generated **wallet.json** file in the current directory. All address, privatekey, publishkey will be written to this file.

The following content :

```javascript
----------------------mnemonic--------------------------

mnemonic:
lecture stage legend tonight portion virtual behave picture vivid language hammer float
----------------------accounts--------------------------
accounts:
[ '0x3ba790a9dcf7dd081f6167bc76a1e8279cb7da17',
  '0x71b407f8b74a89552cf9deea21df60ffc6a175f1',
  '0x49a583998b1921eded4f2ade09255648db7672d3',
  '0xf21a33854f890696160b448181811593803f62a0',
  '0xbe0e2bd1b062881b382a556e552300d23faddc12',
  '0xb9f262eb75c6722c44e39af6a7a5862248dcb988',
  '0x71e012b2b0041fc80a6f4212344b56df24023b28',
  '0xa71c677f22cdb21cedd83448a8b04efa4def8768',
  '0x1a5adb2c44a22ec3c09d14d46649f8efea6092d1',
  '0x8312783e4571188075902c31e6fe32935b1ed3b9' ]
----------------------privateKeys--------------------------
privateKeys:
[ '3afdd9b132fef52c7a7aed692c64622146965549b4f19052fde4e2ede1723b05',
  '0a3b6349b142b47d4bc0ff77dc3d4f266b63019bd44bbf5c33487c59252ed470',
  'f00601ed7e607da8bfa9772aca3472d26b1a86fd975c1dcb748e5fdbe75ec13b',
  'b78848368381adc73d6c1ec4d95401fe4c92441859ba97fb88bdf1012861cfe1',
  '64a9c5b55ef15e63830c47693395601961c8e979c06dab8c4f865524812233e9',
  'c651188453c08403e573eadbdce33b1ee7fa6f5c005bd43a1e241b70049e9829',
  'ccd0f9f34718dd3d509407e09e9b37495888d464f753cff225cb8899bc5b5d2d',
  '8fcb33e67d6b0a767dc1e3df51858d0d071b936d226710625c101ec94a7dfb6c',
  '2ffa7deef4a7a227306068d49ffcdf0dbb48bec360d4f373b55524373ddb701d',
  'e191452c8ff38a9bb0edf693570f147ec37e2529932143c628cc68f19a01a4b9' ]

```
#### Step3. conffle compile 

```javascript
example:
      conffle compile 
```

To compile your contract, will generate build directory down generated abi and the bytecode.

#### Step4. conffle sendbalance 

Give your address some CFX coin.

```javascript
example:
        conffle sendbalance --a "0xe1680683be13895b59c94eaf61818975a0d105dd"
```

#### Step5. conffle  deploy 

##  **default:**  
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


# Interacting with your contract

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
