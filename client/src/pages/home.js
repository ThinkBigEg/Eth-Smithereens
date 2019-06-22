import React, { Component } from 'react'
import 'font-awesome/css/font-awesome.min.css';
import MiniProfile from '../components/profiles/mini_profile';
import PostEditor from '../components/editors/post_editor';
import Users_List from '../components/users/users_list';
import Footer from '../components/footer/footer';
import Navbar from '../components/navbars/navbar';

import { contracts, initialize } from '../utils/Web3Wrapper.config'
import web3 from "../utils/Web3"
import Web3Wrapper from "../utils/Web3Wrapper"
import User from "../models/User";
import Post from "../models/Post";
import Group from "../models/Group";
import PostLists from '../components/posts/posts_list';
import GroupList from '../components/groups/group_list';
import { convertToBuffer, submitToIPFS } from "../utils/IPFSWrapper"

class Home extends Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            isLoading: true,
            user: {},
            UserModel: {},
            PostModel: {},
            GroupModel: {},
            posts: []
        }
    }


    componentDidMount = async () => {

        var web3Wrapper = new Web3Wrapper(web3, contracts);
        await web3Wrapper.initializeContracts(initialize);
        var UserModel = new User(web3Wrapper);
        var PostModel = new Post(web3Wrapper);
        var GroupModel = new Group(web3Wrapper);
        let user = JSON.parse(await window.sessionStorage.getItem("user"));
        var following_addresses = await UserModel.getFollowers(user.address);
        following_addresses.push(user.address);
        var posts = await PostModel.getNewsFeed(following_addresses);
        var userPosts = await PostModel.getPostsOfUser(user.address);
        user = await UserModel.getUser();

        var groups = await GroupModel.getGroups()

        this.setState({ user, web3Wrapper, UserModel, PostModel, GroupModel, userPosts, following_addresses, groups, posts, isLoading: false })

        setInterval(async () => {
            posts = await PostModel.getNewsFeed(following_addresses);
            this.setState({ posts });
        }, 2000);
    }

    createPost = async (postContent, reader) => {

        let contentUrl = "null"
        if (reader.readyState !== undefined) {
            var buffer = await convertToBuffer(reader);

            submitToIPFS(buffer).then(async (res) => {
                contentUrl = "https://gateway.ipfs.io/ipfs/" + res[0].hash;
                await this.state.PostModel.createPost(this.state.user.address, postContent, contentUrl);

            });

        } else {
            await this.state.PostModel.createPost(this.state.user.address, postContent, contentUrl);
        }

    }

    render() {
        return (
            <div className="bg-grey-light font-sans">
                {!this.state.isLoading &&
                    <div>
                        <meta charSet="UTF-8" />
                        <title>BSN</title>
                        <Navbar user = {this.state.user} />

                        <div className="container mx-auto flex flex-col lg:flex-row mt-3 text-sm leading-normal">
                            {/*---------Start Left Col--------*/}
                            <div className="w-full lg:w-1/4 pl-4 lg:pl-0 pr-6 mb-4">
                                <MiniProfile user={this.state.user}  posts={this.state.userPosts} />

                                {/* <Trends/> */}
                                <GroupList user={this.state.user} GroupModel={this.state.GroupModel} userGroups={false} />
                                <GroupList user={this.state.user} GroupModel={this.state.GroupModel} userGroups={true} />

                            </div>
                            {/*---------End Left Col--------*/}

                            {/*---------Start Center Col--------*/}
                            <div className="w-full lg:w-1/2  mb-4">
                                <PostEditor createPost={this.createPost} user={this.state.user} />
                                <PostLists posts={this.state.posts} PostModel={this.state.PostModel} user={this.state.user} />
                            </div>
                            {/*---------End Center Col--------*/}

                            {/*---------Start Right Col--------*/}
                            <div className="w-full lg:w-1/4 pl-4">
                                <Users_List UserModel={this.state.UserModel} followers={this.state.following_addresses} />
                                <Footer />
                            </div>
                            {/*---------End Right Col--------*/}
                        </div>


                    </div>
                }

            </div>
        )
    }
}

export default Home;
