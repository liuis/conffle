const mnemonicInfo = require("./mnemonic");


const { mnemonic, accounts, privateKeys } = mnemonicInfo.getAccountsInfo(
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