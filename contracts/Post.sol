pragma solidity ^0.5.0;
import "./User.sol";
import "./Comment.sol";

contract Post {
    
    User public owner;
    string public text;
    string public contentUrl;

    uint256 public timestamp;
    address[] comments;
    uint public totalVotes = 0;
    uint public totalVotesValue = 0;
    uint256 public lastVoteTime;
    uint public totalShares = 0;
    mapping(address => uint) public votes;
    
    //1 is original 0 is shared
    bool public postType;
    
    function createComment(address user_contract_address,string memory comment_text, string memory content_url)public{
        require(auth(user_contract_address,msg.sender),"user contract address is not yours");
        Comment comment = new Comment(user_contract_address,comment_text, content_url);
        comments.push(address(comment));
    }
    
    function vote(address userContractAddress,uint voteValue) public {

        require(auth(userContractAddress,msg.sender),"user contract address is not yours");
        require(voteValue >= 1 && voteValue <= 10, "the vote value is between 1 and 10");
        
        if(votes[userContractAddress] != 0 ){
            editVoteValue(userContractAddress,voteValue);
            return;
        }
        votes[userContractAddress] = voteValue;
        totalVotesValue += voteValue;
        owner.addVoteValue(voteValue);
        owner.addTotalVotes();
        totalVotes++;
        lastVoteTime = now;
    }
    
    function editVoteValue(address voter, uint voteValue) private {
        require(auth(voter,msg.sender),"user contract address is not yours");
        totalVotesValue -= votes[voter];
        owner.subVoteValue(votes[voter]);
        votes[voter] = voteValue;
        totalVotesValue += voteValue;
        owner.addVoteValue(voteValue);
        lastVoteTime = now;
    }

    function getUserVote(address user_contract_address) public view returns(uint256){
        return votes[user_contract_address];
    }

    function getAverageOfVotes() public view returns(uint){
        if(totalVotes == 0 || totalVotesValue == 0){
            return 0;
        }
        return totalVotesValue/totalVotes;
    }
    function checkLastVote() public view returns(bool){
         if(now-lastVoteTime>120&&lastVoteTime!=0){
             if(getAverageOfVotes()<5)
                return false;
             else
                return true;
         }
            
        return true;
    }

    function auth(address user_contract_address,address msg_sender) public view returns(bool){
        User user = User(user_contract_address);
        if(user.isOwner(msg_sender))
            return true;
        else
            return false;
    }

    function increamentShares() public {
        totalShares++;
    }
    
}