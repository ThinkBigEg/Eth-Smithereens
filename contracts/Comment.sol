pragma solidity ^0.5.0;
import "./User.sol";

contract Comment {
    
    User owner;
    string public text;
    string public contentUrl;
    uint256 public timestamp;
    
    uint public totalVotes = 0;
    uint public totalVotesValue = 0;
    uint256 public lastVoteTime;
    mapping(address => uint) public votes;
    

    constructor(address user_contract_address,string memory comment_text, string memory content_url) public {
        text = comment_text;
        contentUrl = content_url;
        timestamp = now;
        owner = User(user_contract_address);
    }
    

    function getComment() public view returns(address,string memory,string memory,uint256, string memory, string memory, uint ){
        require(checkLastVote(),"the comment have low average votes");
        return (
        address(owner),
        owner.name(),
        text,
        timestamp,
        contentUrl,
        owner.profilePic(),
        owner.getRate()
            );
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
    }
    
    function editVoteValue(address voter, uint voteValue) private {
        require(auth(voter,msg.sender),"user contract address is not yours");
        totalVotesValue -= votes[voter];
        owner.subVoteValue(votes[voter]);
        votes[voter] = voteValue;
        totalVotesValue += voteValue;
        owner.addVoteValue(voteValue);
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
         if(now-lastVoteTime>300&&lastVoteTime!=0){
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
    
}
