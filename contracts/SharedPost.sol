pragma solidity ^0.5.0;
import "./User.sol";
import "./Comment.sol";
import "./Post.sol";
import "./OriginalPost.sol";

contract SharedPost is Post{
    
    OriginalPost originalPost;
    
    constructor (address user_contract_address,address original_post_address,string memory post_text) public {
        text = post_text;
        timestamp = now;
        postType = false;
        originalPost = OriginalPost(original_post_address);
        owner = User(user_contract_address);
    }

    function getPost() public view returns(address,string memory,string memory, string memory,uint256,address[] memory, string memory,uint,uint){
        return (
        address(owner),
        owner.name(),
        text,
        contentUrl,
        timestamp,
        comments,
        owner.profilePic(),
        totalVotes,
        totalShares
            );
    }        
    
    function getOriginalPost() public view returns(address, address, string memory, string memory, string memory, uint256, string memory){
        require(checkLastVote(),"the post have low average votes");
        return(
        address(originalPost),
        address(originalPost.owner()),
        originalPost.owner().name(),
        originalPost.text(),
        originalPost.contentUrl(),
        originalPost.timestamp(),
        originalPost.owner().profilePic()
            );
    }
    
    

    

    
}