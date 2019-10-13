const ConfluxWeb = require('conflux-web');
const confluxWeb = new ConfluxWeb('http://testnet-jsonrpc.conflux-chain.org:12537');

function verify() {

    const fd = require("./demo-test/build/SampleContract.sol.json");
    const abi = fd.abi;
    const myContract = new confluxWeb.cfx.Contract(abi, "0xf53f71ce122a52b5885c912273e681c454731b0a", {
        defaultGasPrice: '10'
    });
    myContract.methods.f().call().then((result) => {
        console.log("contract call function result will be  88888888:" + result);
    }).catch(console.error);


}


verify()
