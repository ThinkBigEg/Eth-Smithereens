import React, { Component } from 'react'
import 'font-awesome/css/font-awesome.min.css';
import Trends from '../components/trends/trends';
import PostEditor from '../components/editors/post_editor';
import OriginalPost from '../components/posts/original_post';
import Users_List from '../components/users/users_list';
import SharedPost from '../components/posts/shared_post';
import Footer from '../components/footer/footer';
import Navbar from '../components/navbars/navbar';
import ProfileInfo from '../components/profiles/profile_info';
import ProfileNavbar from '../components/navbars/profile_navbar';

import {contracts,initialize} from '../utils/Web3Wrapper.config'
import web3 from "../utils/Web3"
import Web3Wrapper from "../utils/Web3Wrapper"
import User from "../models/User";
import Post from "../models/Post";
import Group from "../models/Group";
import PostLists from '../components/posts/posts_list';
import GroupInfo from '../components/groups/group_info';
import { convertToBuffer, submitToIPFS } from "../utils/IPFSWrapper"
class GroupPage extends Component {

    constructor(props) {
        super(props);
        this.state={
            isLoading:true,
            user:{},
            UserModel:{},
            PostModel:{},
            GroupModel:{},
            posts:[],
            group:{},
            owner:{},
            members:[],
            isMember:false
    }
}

    componentDidMount= async()=>{

        var web3Wrapper = new Web3Wrapper(web3, contracts);
        await web3Wrapper.initializeContracts(initialize);
        var UserModel = new User(web3Wrapper);
        var PostModel = new Post(web3Wrapper);
        var GroupModel = new Group(web3Wrapper);
        let user = JSON.parse(await window.sessionStorage.getItem("user"));
        //user = await UserModel.getUser();

        var group = await GroupModel.getGroup(this.props.match.params.address);
        var owner = await UserModel.getUserData(group[0]);
        var isMember = await GroupModel.checkMemberExists(this.props.match.params.address,user.address);
        var members=[];
        for(var i=0;i<group[4].length;i++){
            var member = await UserModel.getUser(group[4][i]);
            members.push(member);
        }
        var posts=[]
        var postsAddresses=[]
        if(isMember){
            var postsAddresses = await GroupModel.getPosts(user.address,this.props.match.params.address);
            posts = await PostModel.getPosts(postsAddresses);
        }
        
        this.setState({isMember,owner,members,group,user,UserModel,PostModel,GroupModel,posts,isLoading:false})

        setInterval(async ()=> {
            if(isMember){
                postsAddresses=await GroupModel.getPosts(user.address,this.props.match.params.address);
                posts = await PostModel.getPosts(postsAddresses);
                this.setState({posts});
            }
        }, 2000);
    }

    createPost = async(postContent,reader)=> {
        let contentUrl = "null"
        if (reader.readyState !== undefined) {
            var buffer = await convertToBuffer(reader);

            submitToIPFS(buffer).then(async (res) => {
                contentUrl = "https://gateway.ipfs.io/ipfs/" + res[0].hash;
                await this.state.GroupModel.createPost(this.props.match.params.address,this.state.user.address, postContent, contentUrl);

            });

        } else {
        await this.state.GroupModel.createPost(this.props.match.params.address,this.state.user.address,postContent,contentUrl);
        }
    }

    render() {
        return (
            
            <div className="bg-grey-light font-sans">
            {!this.state.isLoading&&
                <div>
                    <meta charSet="UTF-8" />
                    <title>BSN</title>
                    
                    <Navbar user={this.state.user}/>
                    {/* <div class="hero h-64 bg-cover h-50"></div>
                    <ProfileNavbar user={this.state.user}/> */}

                    <div className="container mx-auto flex flex-col lg:flex-row mt-3 text-sm leading-normal">
                    {/*---------Start Left Col--------*/}
                    <div className="w-full lg:w-1/4 pl-4 lg:pl-0 pr-6 mt-1 mb-4">
                        {/* <ProfileInfo  user={this.state.user}/> */}
                        <GroupInfo group={this.state.group} owner={this.state.owner} members={this.state.members}/>
                    </div>
                    {/*---------End Left Col--------*/}    

                    {/*---------Start Center Col--------*/}
                    <div className="w-full lg:w-1/2 mb-4">
                        {this.state.isMember?
                            <div>
                                <PostEditor createPost={this.createPost}  user={this.state.user}/>
                                <PostLists posts={this.state.posts} PostModel={this.state.PostModel} user={this.state.user}/>
                            </div>
                            :
                            <div className="mb-3">
                                <div className="p-6 flex border-b border-solid border-grey-light bg-white">
                                    <h2 className="text-black font-bold no-underline hover:underline">You are not member in the group</h2>
                                </div>
                            </div>
                        }
                        
                    </div>
                    {/*---------End Center Col--------*/}

                    {/*---------Start Right Col--------*/}
                    <div className="w-full lg:w-1/4 pl-4">
                        {/* <Users_List/> */}
                        <Footer/>
                    </div>
                    {/*---------End Right Col--------*/}
                    </div>
                    

                </div>
                }
            </div>
        )
    }
}

export default GroupPage;
