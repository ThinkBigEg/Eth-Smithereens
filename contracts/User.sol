pragma solidity ^0.5.0;

contract User {
    
    address public walletAddress;
    string public name;
    string public email;

    address[] public followers;
    mapping(address => uint256) public followersIndex;

    constructor (address wallet_address,string memory user_name,string memory user_email) public {
        walletAddress = wallet_address;
        name = user_name;
        email = user_email;
    }

    function getData() public view returns(string memory, string memory,address,uint){
        return (
            name,
            email,
            address(this),
            followers.length
            );
    }
    
    function setName(string memory new_name) public{
        name = new_name;
    }
    
    function setEmail(string memory new_mail) public{
        
        email = new_mail;
    }

    function follow(address userAddress) public {
        uint index = followers.push(userAddress);
        followersIndex[userAddress] = index;
    }
    
    function unfollow (address userAddress) public  {
        delete followers[followersIndex[userAddress]-1];
        followersIndex[userAddress] = 0;
    }

    function getFollowers () public view returns(address[] memory) {
        return followers;
    }

    
}
