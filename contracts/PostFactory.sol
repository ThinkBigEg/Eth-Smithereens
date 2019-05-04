pragma solidity ^0.5.0;
import "./Post.sol";
import "./UserFactory.sol";
contract PostFactory {
    
    //user contract address => user's posts contract addresses
    mapping(address => address[]) public posts;
    // need userfactory to check if user exits or not before create post
    UserFactory private userFactory;

    uint public totalVotes = 0;
    uint public totalVotesValue = 0;
    mapping(address => uint) public votes;
    
    constructor(address user_factory_address)public{
        userFactory=UserFactory(user_factory_address);
    }

    function createPost(address user_contract_address,string memory post_text) public {
        
        require(userFactory.checkUserExists(msg.sender));
        Post post = new Post(user_contract_address,post_text);
        posts[user_contract_address].push(address(post));
    }

    function getPostsOfUser(address user_contract_address) public view returns(address[] memory){
        return posts[user_contract_address];
    }

    function vote(address userContractAddress,uint voteValue) public {

        require(votes[userContractAddress]!=0, "you already voted");
        votes[userContractAddress] = voteValue;
        totalVotesValue += voteValue;
        totalVotes++;

    }
    
    
}
