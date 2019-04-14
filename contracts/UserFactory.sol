pragma solidity ^0.5.0;
import "./User.sol";

contract UserFactory {

    //user wallet address => index
    mapping(address => uint256) public usersIndexer;
    //array of smart contracts;
    address[] public users;

    function createUser(string memory name,string memory email) public{
        
        require(!checkUserExists(msg.sender),"You already exists");
        User user = new User(msg.sender,name,email);
        users.push(address(user));
        usersIndexer[msg.sender] = users.length;
    }

    // get UserContract address of that user
    function getUserAddress(address wallet_address) public view returns(address){
        require(!checkUserExists(wallet_address),"User doesn't exits");
        return users[usersIndexer[wallet_address]-1];
    }

    //get User data from it's contract;
    function getUser(address wallet_address) public view returns(string memory,string memory,address){
        require(checkUserExists(wallet_address),"User doesn't exits");
        User user = User(users[usersIndexer[wallet_address]-1]);
        return user.getData();
    }

    function getUsers() public view returns(address[] memory){
        return users;
    }

    function checkUserExists(address wallet_address) public view returns(bool){
        if(usersIndexer[wallet_address]!=0)
            return true;
        else
            return false;
    }
    

}

