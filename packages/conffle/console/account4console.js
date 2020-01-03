const account = require("../account/account");

const command = {
  command: "account",
  description: "generate address && private key",
  builder: {},
  help: {
    usage:
      "conffle account",
    options:[] 
  },
  run: account.run
};

module.exports = command;
