# Conflux-Dapp-Js
![Build Status](https://api.travis-ci.org/liuis/conflux-dapp-js.svg?branch=refactor)

**Conflux-Dapp-Js** is an conflux framework which helps with Initialize a dapp project.
The framework makes the development of smart contracts in the conflux network pretty easy. It provides commands for    compilation, deployment of smart contracts, running a local node, local compiler and unit testing the contracts.

Conflux-Dapp-Js consists of 5 separated packages. There are two main packages.
- **conflux-dapp-cli** - This package is responsible for reading **Conflux-Dapp-Js** commands from the command line
- **conflux-dapp-lib** - installing this package will give you access to the Deployer, which gives you the ability to deploy    compiled contracts.
- **conflux-dapp-logger** - Using this package will give you the ability to print your historical deployments on the console.   
- **conflux-dapp-config** - This package is used as helper where all the necessary configuration files are included.
- **conflux-dapp-utils** - Similarly to config this package helps with functions like **ReadFile**  & **keyToHex**, etc.


### Installing

```text
npm i -g Conflux-Dapp-Js
```

### Documentation

#### Step1. node init

Generates the demo - the test directory, the directory with related contract testing contract.Put your own contract.

#### Step2. node prKey 

Generate account and private key .
The following content :

```
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
#### Step3. node compile CONTRACT-NAME 

To compile your contract, will generate build directory down generated abi and the bytecode.

#### Step4. node deploy 

Will be sent to test network related contracts over the contract.
