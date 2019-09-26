const Contracts = require("truffle-conflux-workflow-compile");
// expected config object
const config = {
  //这里制定你的合约的路径
  contracts_directory: "./demo-test/contracts", // dir where contracts are located
  contracts_build_directory: "./demo-test/build/contracts" // dir where contract artifacts will be saved
};

// compiles contracts found in contracts_directory,
// saves them in contracts_build_directory
Contracts.compile(config)
  .then(() => console.log("Compilation complete!"))
  .catch(e => console.error(e))


