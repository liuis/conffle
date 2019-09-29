const mnemonicInfo = require("../../conflux-dapp-utils/mnemonic.js");

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


}

module.exports = {
    run
}
