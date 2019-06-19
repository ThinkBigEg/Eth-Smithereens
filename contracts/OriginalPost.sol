pragma solidity ^0.5.0;
import "./User.sol";
import "./Comment.sol";
import "./Post.sol";


contract OriginalPost is Post {
    
    constructor (address user_contract_address, string memory post_text, string memory content_url) public {
        text = post_text;
        contentUrl = content_url;
        timestamp = now;
        postType = true;
        owner = User(user_contract_address);
    }

    function getPost() public view returns(address,string memory,string memory,string memory,uint256,address[] memory,string memory,uint,uint){
        require(checkLastVote(),"the post have low average votes");
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




}