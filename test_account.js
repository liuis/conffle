let HDWalletAccounts = require("hdwallet-accounts");

// 12 word mnemonic
let mnemonic = "myth slice august trophy letter display elephant accuse absorb enjoy hawk course"; 

// Generate 10 accounts using the mnemonic
//let walletAccounts = HDWalletAccounts(10, mnemonic);

// Or, alternatively skip the mnemonic and have one auto-created
let walletAccounts = HDWalletAccounts(1);
console.log('Mnemonic:', walletAccounts.mnemonic);
console.log('Account-00 Address:', walletAccounts.accounts[0].address);
console.log('Account-00 Private Key:', walletAccounts.accounts[0].privateKey);
console.log('Account-00 Public Key:', walletAccounts.accounts[0].publicKey);
