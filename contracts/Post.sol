pragma solidity ^0.5.0;
import "./User.sol";
import "./Comment.sol";
contract Post {

    User owner;
    string public text;
    uint256 public timestamp;
    address[] comments;

    uint public totalVotes = 0;
    uint public totalVotesValue = 0;
    mapping(address => uint) public votes;

    constructor (address user_contract_address,string memory post_text) public {
        text = post_text;
        timestamp = now;
        owner = User(user_contract_address);
    }

    function getPost() public view returns(address,string memory,string memory,uint256,address[] memory){
        return (
        address(owner),
        owner.name(),
        text,
        timestamp,
        comments
            );
    }

    function createComment(address user_contract_address,string memory comment_text)public{
        Comment comment = new Comment(user_contract_address,comment_text);
        comments.push(address(comment));
    }

    function vote(address userContractAddress,uint voteValue) public {

        require(votes[userContractAddress]!=0, "you already voted");
        votes[userContractAddress] = voteValue;
        totalVotesValue += voteValue;
        totalVotes++;

    }

}