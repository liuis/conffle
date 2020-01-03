const sendcfx = require("../sendbalance/sendbalance");

const command = {
  command: "sendbalance",
  description: "send balance(3 cfx coin) to a address",
  builder: {},
  help: {
    usage:
      "conffle sendbalance",
    options:[] 
  },
  run: sendcfx.run
};

module.exports = command;
