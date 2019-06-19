import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  web3 = new Web3(window.web3.currentProvider);
} else {
  //for Ganache
  //const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");

  //for Rinkby
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/c38093a8292d46fd9b80eb285f63ab93"
  );

  web3 = new Web3(provider);
}

export default web3;
