pragma solidity ^0.5.0;
import "./User.sol";
import "./Post.sol";
import "./OriginalPost.sol";

contract Group { 
    string public title;
    string public description;
    User public owner;
    address[] public admins;
    mapping(address => uint256) public adminsIndex;
    address[] users;
    uint public members = 0;
    mapping(address  => uint256) public usersIndex; 
    address[] posts; 
    
    constructor(string memory initialTitle, string memory initialDescription, address userContractAddress) public { 
        title = initialTitle; 
        description = initialDescription;
        owner = User(userContractAddress);
        usersIndex[userContractAddress] = users.push(userContractAddress);
        members++;
    }

    function addAdmin(address userAddress) public {
        require(msg.sender == address(owner), "You Are Not the Group Owner");
        require(adminsIndex[userAddress] == 0,"Yor Already Have Added This user as an Admin");
        uint index = admins.push(userAddress);
        adminsIndex[userAddress] = index;
        this.join(userAddress);
    }

    function removeAdmin (address userAddress) public  {
        require(msg.sender == address(owner), "You Are Not the Group Owner");
        require (adminsIndex[userAddress] != 0, "This User Is Not An Admin");
        delete admins[adminsIndex[userAddress]-1];
        adminsIndex[userAddress] = 0;
        this.leave(userAddress);
    }

    function join (address userAddress) public {
        require(usersIndex[userAddress] == 0, "You Already A member of this group");
        uint index = users.push(userAddress);
        usersIndex[userAddress] = index;
        members++;
    }


    function removeUser (address userAddress) public {
        require(User(msg.sender) == owner || adminsIndex[msg.sender]!=0,"You Are Not An Admin");
        require(usersIndex[userAddress] != 0, "user is not a member of the group");
        delete users[usersIndex[userAddress]-1];
        usersIndex[userAddress] = 0;
        members--;
    }

    function leave (address userContractAddress) public {
        require(usersIndex[userContractAddress] != 0, "You Are Not Member of the Group");
        delete users[usersIndex[userContractAddress]-1];
        usersIndex[userContractAddress] = 0;
        members--;
    }

    function getUsers() public view returns (address[] memory) {
        return users;
    }

    function getAdmins() public view returns (address[] memory) {
        return admins;
    }

    
    function getGroup() public view returns(address,string memory,string memory,address[] memory,address[] memory, uint){
        return (
        address(owner),
        title,
        description,
        admins,
        users,
        members
            );
    }

    function createPost(address userContractAddress,string memory post_text, string memory imageUrl) public {
        require(usersIndex[userContractAddress] != 0, "You Are Not Member of the Group");
        Post post = new OriginalPost(userContractAddress,post_text, imageUrl);
        posts.push(address(post));
    }

    function getPosts(address userContractAddress) public view returns (address[] memory) {
        require(usersIndex[userContractAddress] != 0, "You Are Not Member of the Group");
        return posts;
    }
    
    function setTitle(address userContractAddress,string memory newTitle) public{
        require(User(userContractAddress) == owner || adminsIndex[userContractAddress] !=0, "You Are Not An Admin");
        title = newTitle;
    }
    
    function setDescription(address userContractAddress,string memory newDescription) public {
        require(User(userContractAddress) == owner || adminsIndex[userContractAddress] !=0, "You Are Not An Admin");
        description = newDescription;
    }

    function checkMemberExists(address user_contract_address) public view returns(bool){
        if(usersIndex[user_contract_address]!=0)
            return true;
        else
            return false;
    }

}