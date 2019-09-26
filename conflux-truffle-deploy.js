/*
const Migrate = require("truffle-conflux-migrate");
const Config = require("truffle-conflux-config");
const Resolver = require("truffle-conflux-resolver");
const Artifactor = require("truffle-conflux-artifactor");
const config = new Config("./", "./demo-test", 'development')
config.artifactor = new Artifactor("./demo-test/build/contracts");
config.resolver = new Resolver(config);
config.networks = {
    development: {
      host: "http://testnet-jsonrpc.conflux-chain.org",
      port: 12537,
      network_id: "*", // Match any network id
      from : "0xfdf045e085d85734a17166c284fceedcde0bd89c"
    }
  },
config.contracts_directory = "contracts" 
config.migrations_directory = "migrations" 

console.log(config.working_directory)
console.log(config.migrations_directory)
console.log(config.contracts_directory)
console.log(config.contracts_build_directory)
console.log(config.artifactor)
console.log(config.resolver)
console.log(config.network)
console.log(config.network_id)
console.log(config.logger)
console.log(config.from)
//async function runMigrations(config) {
console.log(config.provider)
//     }
//
//const conf = Config.detect({}, "truffle-conflux-config.js");//runMigrations(Config)
Migrate.launchReporter();
Migrate.run(config);
*/
