import web3 from "./Web3";

import UserFactoryJSON from "../contracts/UserFactory";
import UserJSON from "../contracts/User";
import PostFactoryJSON from "../contracts/PostFactory.json";
import PostJSON from "../contracts/Post.json";

export const UserFactoryContract = async () => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = UserFactoryJSON.networks[networkId];
  console.log(deployedNetwork.address);
  return await new web3.eth.Contract(
    UserFactoryJSON.abi,
    deployedNetwork && deployedNetwork.address
  );
};

export const PostFactoryContract = async () => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = PostFactoryJSON.networks[networkId];
  return await new web3.eth.Contract(
    PostFactoryJSON.abi,
    deployedNetwork && deployedNetwork.address
  );
};


export const UserContract = async address => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = UserFactoryJSON.networks[networkId];
  return await new web3.eth.Contract(UserJSON.abi, deployedNetwork && address);
};

export const PostContract = async address => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = PostFactoryJSON.networks[networkId];
  return await new web3.eth.Contract(PostJSON.abi, deployedNetwork && address);
};
