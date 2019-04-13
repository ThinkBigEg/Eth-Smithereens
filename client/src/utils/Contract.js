import web3 from "./Web3";

import UserFactoryJSON from "../contracts/UserFactory";
import UserJSON from "../contracts/User";

export const UserFactoryContract = async () => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = UserFactoryJSON.networks[networkId];
  console.log(deployedNetwork.address);
  return await new web3.eth.Contract(
    UserFactoryJSON.abi,
    deployedNetwork && deployedNetwork.address
  );
};



export const UserContract = async address => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = UserFactoryJSON.networks[networkId];
  return await new web3.eth.Contract(UserJSON.abi, deployedNetwork && address);
};
