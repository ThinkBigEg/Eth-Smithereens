pragma solidity ^0.5.0;
import "./User.sol";

contract Comment {
    
    User owner;
    string public text;
    uint256 public timestamp;
    
    uint public totalVotes = 0;
    uint public totalVotesValue = 0;
    mapping(address => uint) public votes;

    constructor(address user_contract_address,string memory comment_text) public {
        text = comment_text;
        timestamp = now;
        owner = User(user_contract_address);
    }
    
    
    function getComment() public view returns(address,string memory,string memory,uint256 ){
        return (
        address(owner),
        owner.name(),
        text,
        timestamp
            );
    }

    function vote(address userContractAddress,uint voteValue) public {

        require(votes[userContractAddress]!=0, "you already voted");
        votes[userContractAddress] = voteValue;
        totalVotesValue += voteValue;
        totalVotes++;

    }
    
}
