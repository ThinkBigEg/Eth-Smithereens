const path = require("path");

const HDWalletProvider = require("truffle-hdwallet-provider");

const initializedProvider = new HDWalletProvider(
  "scissors theory lamp bone stand lucky crop cool place lock year urge",
  "https://rinkeby.infura.io/v3/c38093a8292d46fd9b80eb285f63ab93",
);

initializedProvider.engine.start();
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks:{
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },
     rinkeby: {
      provider: initializedProvider,
      network_id: 4,
    }
    },
    contracts_build_directory: path.join(__dirname, "client/src/contracts")
};