pragma solidity ^0.5.0;

contract User {

    address public walletAddress;
    string public name;
    string public email;
    string public profilePic;
    string public about;
    uint public votes =  0;
    uint public  totalVotes = 0;
    address[] public followers;
    uint public following=0;
    uint256 public timestamp;
    mapping(address => uint256) public followersIndex;

    constructor (address wallet_address,string memory user_name,string memory user_email) public {
        walletAddress = wallet_address;
        name = user_name;
        email = user_email;
        profilePic = "null";
        timestamp = now;

    }

    function getData() public view returns(string memory, string memory,address,uint,uint, string memory,uint,string memory,uint256){
        if(votes == 0 || totalVotes == 0 ){
          return (
            name,
            email,
            address(this),
            followers.length,
            0,
            profilePic,
            following,
            about,
            timestamp
            );
        }

        return (
            name,
            email,
            address(this),
            followers.length,
            votes/totalVotes,
            profilePic,
            following,
            about,
            timestamp
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

    function updateInfo(string memory new_name,string memory new_mail, string memory profile_pic,string memory about_user) public{
        require(walletAddress==msg.sender,"You are not the owner of the contract");
        name = new_name;
        email = new_mail;
        profilePic = profile_pic;
        about = about_user;
    }

    function follow(address userAddress) public {
        require(followersIndex[userAddress] == 0,"You have followed this user before");
        uint index = followers.push(userAddress);
        followersIndex[userAddress] = index;
        User user = User(userAddress);
        user.increamentFollowing();
    }

    function unfollow (address userAddress) public  {
        require (followersIndex[userAddress] != 0, "You are not following this user");
        delete followers[followersIndex[userAddress]-1];
        followersIndex[userAddress] = 0;
    }

    function getFollowers () public view returns(address[] memory) {
        return followers;
    }

    function isOwner(address wallet_address) public view returns(bool){
        if(walletAddress==wallet_address)
            return true;
        else
            return false;
    }

    function getTotalAverageVotes() public view returns (uint) {
       return votes/totalVotes;
    }

    function addVoteValue(uint vote) public {
        votes += vote;
    }

    function subVoteValue(uint vote) public {
        votes -= vote;
    }

    function addTotalVotes() public {
        totalVotes++;
    }

    function increamentFollowing()public{
        following++;
    }

    function getRate() public view returns (uint) {
         if(votes == 0 || totalVotes == 0 ){
             return 0;
         }else {
             return votes/totalVotes;
         }
    }




}
