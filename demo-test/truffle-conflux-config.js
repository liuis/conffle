
import Cfx from 'conflux-web';


module.exports = {
  contracts_directory : "../demo-test/contracts",
  contracts_build_directory: "../demo-test/contracts-output",
  migrations_directory : "../demo-test/migrations",
  networks: {
    development: {
      host: "http://testnet-jsonrpc.conflux-chain.org",
      port: 12537,
      network_id: "*" // Match any network id
    }
  },
  compilers: {
    solc: {
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  }
};
