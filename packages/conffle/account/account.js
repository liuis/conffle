const mnemonicInfo = require("conffle-utils/mnemonic.js");
var fs = require('fs');

var data = {}
data.wallet = []

function writeJson(mnemonicValue, accountsValue, privateKeysValue) {
    var obj = {
        mnemonic: mnemonicValue,
        accounts: accountsValue,
        privateKeys: privateKeysValue
    }
    data.wallet.push(obj)
    fs.writeFile("wallet.json", JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('write complete, pls check wallet.json in current directory');
    })
};

async function run() {

    try {
        await generatePK();

    } catch (e) {
        printError(e.message)
        console.error(e);
    }
}

function generatePK() {
    const {
        mnemonic,
        accounts,
        privateKeys
    } = mnemonicInfo.getAccountsInfo(
        10
    );

    console.log("----------------------mnemonic--------------------------")
    console.log("mnemonic:");
    console.log(mnemonic);



    console.log("----------------------accounts--------------------------")
    console.log("accounts:")
    console.log(accounts)

    console.log("----------------------privateKeys--------------------------")
    console.log("privateKeys:")
    console.log(privateKeys)
    
    writeJson(mnemonic,accounts,privateKeys);

}

module.exports = {
    run
}
