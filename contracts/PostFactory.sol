pragma solidity ^0.5.0;
import "./Post.sol";

contract PostFactory {

    mapping(address => address[]) public posts;

    function createPost(string memory post_text) public {
        Post post = new Post(msg.sender,post_text);
        posts[msg.sender].push(address(post));
    }

    function getPostsOfUser() public view returns(address[] memory){
        return posts[msg.sender];
    }


}
 
