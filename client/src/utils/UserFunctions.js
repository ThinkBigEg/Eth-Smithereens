import web3 from "./Web3";
import { UserFactoryContract, UserContract } from "./Contracts";

export const getUser = async () => {
  const UserFactory = await UserFactoryContract();
  const accounts = await web3.eth.getAccounts();
  
  var data = await UserFactory.methods
    .getUser(accounts[0])
    .call();

  return data;
};

export const getUsers = async () => { 
  const UserFactory = await UserFactoryContract();
  const accounts = await web3.eth.getAccounts();
  let users = await UserFactory.methods.getUsers().call();
  console.log("user : ", users);
}

export const checkUserExists = async () => {
  const UserFactory = await UserFactoryContract();
  const accounts = await web3.eth.getAccounts();
  var bool = await UserFactory.methods
    .checkUserExists(accounts[0])
    .call();
  return bool;
};

export const registerNewUser = async (name,email) => {
  const UserFactory = await UserFactoryContract();
  const accounts = await web3.eth.getAccounts();
  await UserFactory.methods
    .createUser(name, email)
    .send({ from: accounts[0] });
};