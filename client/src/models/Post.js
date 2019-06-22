class Post {

    constructor(web3Wrapper) {
        this.web3Wrapper = web3Wrapper;
    }

    async createPost(user_contract_address, text, contentUrl) {
        
        await this.web3Wrapper.contracts["PostFactory"].methods.createPost(user_contract_address, text, contentUrl).send({
            from: this.web3Wrapper.accounts[0]
        })

    }

    async getPostsOfUser(user_contract_address) {
        var postsAddress = await this.web3Wrapper.contracts["PostFactory"].methods.getPostsOfUser(user_contract_address).call();
        return await this.getPosts(postsAddress);
    }

    async getPosts(postsAddress) {

        var user = JSON.parse(await window.sessionStorage.getItem("user"));
        
        var posts = [];

        for (var i = 0; i < postsAddress.length; i++) {

            var PostContract = await this.web3Wrapper.loadContract(postsAddress[i], "OriginalPost");

            var post;

            var valid = await PostContract.methods.checkLastVote().call();

            if (valid) {

                if (!await PostContract.methods.postType().call()) {

                    var SharedPostContract = await this.web3Wrapper.loadContract(postsAddress[i], "SharedPost");
                    post = await this.getPostData(SharedPostContract, postsAddress[i],user);
                    post['timestamp'] = (new Date(parseInt(post.unixTime) * 1000)).toLocaleString();
                    
                    var originalPostData = await SharedPostContract.methods.getOriginalPost().call();
                    post["type"] = false;
                    post["originalPost"] = {
                        address: originalPostData[0],
                        ownerAddress: originalPostData[1],
                        ownerName: originalPostData[2],
                        text: originalPostData[3],
                        contentUrl: originalPostData[4],
                        timestamp: (new Date(parseInt(originalPostData[5]) * 1000)).toLocaleString(),
                        unixTime: originalPostData[5],
                        ownerColor: this.getUserColor(originalPostData[7]),
                        hasStar: originalPostData[7] >= 9 ? 1 : 0,
                        ownerProfilePic:originalPostData[6]
                    }


                } else {

                    post = await this.getPostData(PostContract, postsAddress[i],user);
                    post["type"] = true;
                }
                posts.push(post);
            }

        }
        posts.sort((postA, postB) => { return postB.unixTime - postA.unixTime });
        return posts;
    };


    getUserColor(rate) {
        if (rate >= 9) {
            return "#128c00";
        } else if (rate >= 8) {
            return "#00ff00"
        } else if (rate >= 7) {
            return "#0cff00"
        } else if (rate >= 6) {
            return "#e1e500"
        } else if (rate >= 5) {
            return "#f99a00"
        } else if (rate == 0) {
            return "#000"
        } else {
            return "#ff0000"
        }
    }

    async getPostData(Post, post_address,user) {

        var data = await Post.methods.getPost().call();
        var postTimestamp = new Date(parseInt(data[4]) * 1000);
        var post = {
            address: post_address,
            ownerAddress: data[0],
            ownerName: data[1],
            text: data[2],
            contentUrl :data[3],
            timestamp: postTimestamp.toLocaleString(),
            unixTime: data[4],
            ownerProfilePic: data[6],
            totalVotes: data[7],
            totalShares: data[8],
            ownerColor: this.getUserColor(data[9]),
            hasStar: data[9] >= 9? 1:0
        };

        post["totalComments"] = 0;
        if (data[5]) {

            
            var comments = [];
            var commentsAddress = data[5];
            
            post["totalComments"] = commentsAddress.length;
            for (var i = 0; i < commentsAddress.length; i++) {

                comments.push(await this.getCommentData(commentsAddress[i],user));

            }

            post["comments"] = comments;

        }
        

        var vote = await Post.methods.getUserVote(user.address).call();
        post["vote"]=vote/2;


        return post;

    }

    async getNewsFeed(following_addresses) {

        var allPosts = [];
        for (var i = 0; i < following_addresses.length; i++) {
            var postsOfUser = await this.getPostsOfUser(following_addresses[i]);
            allPosts.push(...postsOfUser);
        }

        allPosts.sort((postA, postB) => { return postB.unixTime - postA.unixTime });

        return allPosts;
    }

    async getCommentData(comment_address,user) {
        console.log('add', comment_address.address)
        const Comment = await this.web3Wrapper.loadContract(comment_address, "Comment");
        var data = await Comment.methods.getComment().call();
        var commentTimestamp = new Date(parseInt(data[3]) * 1000);
        var comment = {
            address: comment_address,
            ownerAddress: data[0],
            ownerName: data[1],
            text: data[2],
            timestamp: commentTimestamp.toLocaleString(),
            contentUrl:data[4],
            ownerProfilePic:data[5],
            ownerRate:data[6]
        }
        var vote = await Comment.methods.getUserVote(user.address).call();
        console.log(comment);
        comment["vote"]=vote/2;
        return comment;

    }

    async createComment(user_contract_address, post_contract_address, text, contentUrl) {

        const post = await this.web3Wrapper.loadContract(post_contract_address, "Post");
        await post.methods.createComment(user_contract_address, text, contentUrl).send({
            from: this.web3Wrapper.accounts[0]
        });

    }

    async sharePost(user_contract_address, post_contract_address, text) {

        await this.web3Wrapper.contracts["PostFactory"].methods.sharePost(user_contract_address, post_contract_address, text).send({
            from: this.web3Wrapper.accounts[0]
        })
    }

    async voteOnPost(post_contract_address,user_contract_address,vote){
        const post = await this.web3Wrapper.loadContract(post_contract_address, "Post");
        await post.methods.vote(user_contract_address, vote*2).send({
            from: this.web3Wrapper.accounts[0]
        });
    }

    async voteOnComment(comment_contract_address,user_contract_address,vote){
        const comment = await this.web3Wrapper.loadContract(comment_contract_address,"Comment");
        await comment.methods.vote(user_contract_address,vote*2).send({
            from: this.web3Wrapper.accounts[0]
        });
    }

}

export default Post;