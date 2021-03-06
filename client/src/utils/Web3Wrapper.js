class Web3Wrapper {

  constructor(web3, contracts_json) {

    this.contractsJSON = [];

    for (var i = 0; i < contracts_json.length; i++) {
      this.contractsJSON[contracts_json[i].contractName] = contracts_json[i];
    }
    
    this.web3 = web3;
    this.contracts = [];
  }

  async initializeContracts(contracts_names) {


    this.accounts = await this.web3.eth.getAccounts();

    for (var i = 0; i < contracts_names.length; i++) {

      var contract;
      const networkId = await this.web3.eth.net.getId();
      const deployedNetwork = this.contractsJSON[contracts_names[i]].networks[networkId];
      contract = await new this.web3.eth.Contract(
        this.contractsJSON[contracts_names[i]].abi,
        deployedNetwork && deployedNetwork.address);

      this.contracts[contracts_names[i]] = contract;


    }

  }


  async loadContract(contract_address, contract_name) {

    var contract;
    const networkId = await this.web3.eth.net.getId();
    const deployedNetwork = this.contractsJSON["UserFactory"].networks[networkId];
 
    contract = await new this.web3.eth.Contract(
      this.contractsJSON[contract_name].abi,
      deployedNetwork && contract_address);
    return contract;

  };



}


export default Web3Wrapper;