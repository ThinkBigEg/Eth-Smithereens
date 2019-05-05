class Post {

    constructor(web3Wrapper) {
        this.web3Wrapper = web3Wrapper;
    }

    createPost=async(user_contract_address, text)=>{

        await this.web3Wrapper.contracts["PostFactory"].methods.createPost(user_contract_address, text).send({
            from: this.web3Wrapper.accounts[0]
        })
        console.log("fuck");

    }

    async getPostsOfUser(user_contract_address) {

        var postsAddress = await this.web3Wrapper.contracts["PostFactory"].methods.getPostsOfUser(user_contract_address).call();
        var posts = [];

        for (var i = 0; i < postsAddress.length; i++) {

            var PostContract = await this.web3Wrapper.loadContract(postsAddress[i], "Post");

            var post;
            post = await this.getPostData(PostContract, postsAddress[i]);
            posts.push(post);

        }
        posts.sort((postA,postB)=>{return postB.unixTime-postA.unixTime});
        return posts;
    };

    async getPostData(Post, post_address) {

        var data = await Post.methods.getPost().call();
        console.log(data);
        var postTimestamp = new Date(parseInt(data[3]) * 1000);
        var post = {
            address: post_address,
            ownerAddress: data[0],
            ownerName: data[1],
            text: data[2],
            timestamp: postTimestamp.toLocaleString(),
            unixTime:data[3]
        };

        if (data[4]) {

            var comments = [];
            var commentsAddress = data[4];

            for (var i = 0; i < commentsAddress.length; i++) {

                comments.push(await this.getCommentData(commentsAddress[i]));

            }

            post["comments"] = comments;

        }


        return post;

    }

    async getNewsFeed(following_addresses) {

        var allPosts = [];
        for (var i = 0; i < following_addresses.length; i++) {
            var postsOfUser = await this.getPostsOfUser(following_addresses[i]);
            allPosts.push(...postsOfUser);
        }

        allPosts.sort((postA,postB)=>{return postB.unixTime-postA.unixTime});

        return allPosts;
    }

    async getCommentData(comment_address) {

        const Comment = await this.web3Wrapper.loadContract(comment_address, "Comment");
        var data = await Comment.methods.getComment().call();
        var commentTimestamp = new Date(parseInt(data[3]) * 1000);
        var comment = {
            address: comment_address,
            ownerAddress: data[0],
            ownerName: data[1],
            text: data[2],
            timestamp: commentTimestamp.toLocaleString()
        }
        return comment;

    }

    async createComment(user_contract_address, post_contract_address, text) {

        const post = await this.web3Wrapper.loadContract(post_contract_address, "Post");
        await post.methods.createComment(user_contract_address, text).send({
            from: this.web3Wrapper.accounts[0]
        });

    }
}

export default Post;