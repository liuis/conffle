const ConfluxWeb = require('conflux-web');

const confluxWeb = new ConfluxWeb('http://testnet-jsonrpc.conflux-chain.org:12537');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitBlock(Tx) {
    while (true) {
        let receipt = confluxWeb.cfx.getTransactionReceipt(Tx);
        if (receipt && receipt.contractAddress) {
            console.log("Your contract has been deployed at :" + receipt.contractAddress);
            console.log("Note that it might take some sceonds for the block to propagate befor it's visible in etherscan.io");
            break;
        }
        EpochNumber = confluxWeb.cfx.getEpochNumber();
        //Tx =confluxWeb.cfx.getBlockByEpochNumber(EpochNumber);
        console.log("Waiting a mined block to include your contract... currently in epoch :" + EpochNumber.toString());
        await sleep(4000);
    }
}

function test_receipt(Tx) {
    let receipt = confluxWeb.cfx.getTransactionReceipt(Tx);
    console.log("receipt:", receipt)
    if (receipt && receipt.contractAddress) {
        console.log("Your contract has been deployed at :" + receipt.contractAddress);
        console.log("Note that it might take some sceonds for the block to propagate befor it's visible in etherscan.io");
    }
    EpochNumber = confluxWeb.cfx.getEpochNumber();

    console.log("Waiting a mined block to include your contract... currently in epoch :" + EpochNumber.toString());
}
test_receipt("0x9da06f55974060cae03fbe4be9a2d35a538290c7ff87939f5aea287a8e90bc5c");
