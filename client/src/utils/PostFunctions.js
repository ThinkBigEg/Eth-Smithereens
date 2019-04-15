import web3 from "./Web3";
import { PostFactoryContract, PostContract } from "./Contract";


export const createPost = async (user_contract_address, text) => {
    const accounts = await web3.eth.getAccounts();
    const PostFactory = await PostFactoryContract();
    await PostFactory.methods
      .createPost(user_contract_address, text)
      .send({ from: accounts[0] });
  };


  export const getPostsOfUser = async (user_contract_address) => {
    const PostFactory = await PostFactoryContract();
    const accounts = await web3.eth.getAccounts();
    var postsAddress = await PostFactory.methods
      .getPostsOfUser(user_contract_address)
      .call();
    var posts = [];
  
    for (var i = 0; i < postsAddress.length; i++) {
      const Post = await PostContract(postsAddress[i]);
      var text = await Post.methods.text().call();
      var postData = await Post.methods.getPost().call();
      var postTimestamp=new Date(parseInt(postData[3])*1000);
      var post={ 
        id: postsAddress[i], 
        ownerAddress: postData[0],
        ownerName:postData[1],
        text:postData[2],
        timestamp:postTimestamp.toLocaleString()
      };
      posts.push(post);
    }
  
    return posts;
  };