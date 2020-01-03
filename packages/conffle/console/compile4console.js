const compile = require("../compile/compile");

const command = {
  command: "compile",
  description: "compile contracts",
  builder: {},
  help: {
    usage:
      "conffle compile",
    options:[] 
  },
  run: compile.run
};

module.exports = command;
