pragma solidity ^0.5.0;

contract User {
    
    address public walletAddress;
    string public name;
    string public email;
    mapping(address => uint256) public followersIndex;

    constructor (address wallet_address,string memory user_name,string memory user_email) public {
        walletAddress = wallet_address;
        name = user_name;
        email = user_email;
    }

    function getData() public view returns(string memory, string memory,address){
        return (
            name,
            email,
            address(this)
            );
    }
    
    function setName(string memory new_name) public{
        require(walletAddress==msg.sender,"You are not the owner of the contract");
        name = new_name;
    }
    
    function setEmail(string memory new_mail) public{
        require(walletAddress==msg.sender,"You are not the owner of the contract");
        email = new_mail;
    }
}
