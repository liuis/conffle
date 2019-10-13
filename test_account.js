let HDWalletAccounts = require("hdwallet-accounts");

// 12 word mnemonic
let mnemonic = "myth slice august trophy letter display elephant accuse absorb enjoy hawk course"; 

// Generate 10 accounts using the mnemonic
//let walletAccounts = HDWalletAccounts(10, mnemonic);

// Or, alternatively skip the mnemonic and have one auto-created
let walletAccounts = HDWalletAccounts(10);
console.log('Mnemonic:', walletAccounts.mnemonic);
console.log('Mnemonic:', walletAccounts.accounts);
