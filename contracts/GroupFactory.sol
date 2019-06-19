pragma solidity ^0.5.0;
import "./Group.sol";
import "./UserFactory.sol";

contract GroupFactory { 


    mapping(address => uint256) public groupsIndexs;
    address[] public groups;
    UserFactory public userFactory;
    
    constructor(address UserFactoryAddress) public { 
        userFactory = UserFactory(UserFactoryAddress);
    }
    
    
    function createGroup (string memory initialTitle, string memory initialDescription, address user_contract_address) public {
        require(userFactory.checkUserExists(msg.sender), "you are not registered in the application");
        Group group = new Group(initialTitle, initialDescription, user_contract_address);
        groupsIndexs[address(group)] = groups.push(address(group));
    }
    
    function getGroups () public view returns (address[] memory) { 
        return groups;        
    }
    
    function getGroup(address group_address ) public view returns(address,string memory,string memory,address[] memory,address[] memory) { 
        uint256 index = groupsIndexs[group_address];
        return Group(groups[index-1]).getGroup();
    }
    
}