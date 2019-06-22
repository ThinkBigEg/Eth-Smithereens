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
import GroupList from '../components/groups/group_list';
import {contracts,initialize} from '../utils/Web3Wrapper.config'
import web3 from "../utils/Web3"
import Web3Wrapper from "../utils/Web3Wrapper"
import User from "../models/User";
import Post from "../models/Post";
import Group from "../models/Group";
import PostLists from '../components/posts/posts_list';
import { convertToBuffer, submitToIPFS } from "../utils/IPFSWrapper"
class Profile extends Component {

    constructor(props) {
        super(props);
        this.state={
            isLoading:true,
            user:{},
            UserModel:{},
            PostModel:{},
            GroupModel:{},
            posts:[],
            isOwner:false
    }
}

    componentDidMount= async()=>{
        var web3Wrapper = new Web3Wrapper(web3, contracts);
        await web3Wrapper.initializeContracts(initialize);
        var UserModel = new User(web3Wrapper);
        var PostModel = new Post(web3Wrapper);
        var GroupModel = new Group(web3Wrapper);
        let currentUser = JSON.parse(await window.sessionStorage.getItem("user"));
        var isOwner=false;
        if(currentUser.address==this.props.match.params.address){
            
            isOwner=true;
        }
        console.log("fuck",isOwner);
        var user = await UserModel.getUserData(this.props.match.params.address);
        var posts = await PostModel.getPostsOfUser(this.props.match.params.address);
        this.setState({UserModel,PostModel,GroupModel,posts,user,isOwner,isLoading:false})

        setInterval(async ()=> {
             posts = await PostModel.getPostsOfUser(this.props.match.params.address);
             this.setState({posts});
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
            {!this.state.isLoading&&
                <div>
                    <meta charSet="UTF-8" />
                    <title>BSN</title>
                    
                    <Navbar user = {this.state.user}/>
                    <div class="hero h-64 bg-cover h-50"></div>
                    <ProfileNavbar user={this.state.user} isOwner={this.state.isOwner} numOfPosts={this.state.posts.length}/>

                    <div className="container mx-auto flex flex-col lg:flex-row mt-3 text-sm leading-normal">
                    {/*---------Start Left Col--------*/}
                    <div className="w-full lg:w-1/4 pl-4 lg:pl-0 pr-6 mt-8 mb-4">
                        <ProfileInfo  user={this.state.user} />
                        
                    </div>
                    {/*---------End Left Col--------*/}    

                    {/*---------Start Center Col--------*/}
                    <div className="w-full lg:w-1/2 mb-4">
                        {this.state.isOwner&&<PostEditor createPost={this.createPost}  user={this.state.user}/>}
                        <PostLists posts={this.state.posts} PostModel={this.state.PostModel} user={this.state.user}/>
                    </div>
                    {/*---------End Center Col--------*/}

                    {/*---------Start Right Col--------*/}
                    <div className="w-full lg:w-1/4 pl-4">
                        {/* <Users_List/> */}
                        <GroupList user={this.state.user} GroupModel={this.state.GroupModel} userGroups={true} />
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

export default Profile;
