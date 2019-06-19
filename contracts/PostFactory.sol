pragma solidity ^0.5.0;
import "./Post.sol";
import "./UserFactory.sol";
import "./OriginalPost.sol";
import "./SharedPost.sol";
contract PostFactory {
    
    //user contract address => user's posts contract addresses
    mapping(address => address[]) public posts;
    // need userfactory to check if user exits or not before create post
    UserFactory private userFactory;
    
    constructor(address user_factory_address)public{
        userFactory=UserFactory(user_factory_address);
    }

    function createPost(address user_contract_address,string memory post_text, string memory imageUrl) public {
        
        require(userFactory.checkUserExists(msg.sender));
        require(auth(user_contract_address,msg.sender),"user contract address is not yours");
        
        Post post = new OriginalPost(user_contract_address,post_text,imageUrl);
        posts[user_contract_address].push(address(post));
    }

    function getPostsOfUser(address user_contract_address) public view returns(address[] memory){
        return posts[user_contract_address];
    }
    
    function sharePost(address user_contract_address,address original_post_address, string memory post_text) public {

        require(userFactory.checkUserExists(msg.sender));
        require(auth(user_contract_address,msg.sender),"user contract address is not yours");
        
        OriginalPost originalPost = OriginalPost(original_post_address);
        originalPost.increamentShares();
        Post post = new SharedPost(user_contract_address,original_post_address,post_text);
        posts[user_contract_address].push(address(post));
    }

    function auth(address user_contract_address,address msg_sender) public view returns(bool){
            User user = User(user_contract_address);
            if(user.isOwner(msg_sender))
                return true;
            else
                return false;
        }
    
}
