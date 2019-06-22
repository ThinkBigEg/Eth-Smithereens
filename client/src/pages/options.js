import React, { Component } from 'react'
import 'font-awesome/css/font-awesome.min.css';
import Footer from '../components/footer/footer';
import Navbar from '../components/navbars/navbar';
import MiniProfile from '../components/profiles/mini_profile';
import OptionsMenu from '../components/options/options_menu';
import UpdateInfoForm from '../components/options/update_info_form';
import CreateGroupForm from '../components/options/create_group_form';
import web3 from "../utils/Web3"
import Web3Wrapper from "../utils/Web3Wrapper"
import User from "../models/User";
import Group from "../models/Group";
import Post from "../models/Post";

import {contracts,initialize} from '../utils/Web3Wrapper.config'
class Options extends Component {

    constructor(props) {
            super(props);
            // Don't call this.setState() here!
            this.state={
                isLoading:true,
                user:{},
                UserModel:{},
                PostModel:{},
                GroupModel:{},
                posts:[],
                option:"update_account"
            }
    }

    selectOption=(option)=>{
        this.setState({option});
    }

    componentDidMount = async ()=>{

        var web3Wrapper = new Web3Wrapper(web3, contracts);
        await web3Wrapper.initializeContracts(initialize);
        var UserModel = new User(web3Wrapper);
        var GroupModel = new Group(web3Wrapper);
        var PostModel = new Post(web3Wrapper);

        let user = JSON.parse(await window.sessionStorage.getItem("user"));
        var following_addresses = await UserModel.getFollowers(user.address);

        var userPosts = await PostModel.getPostsOfUser(user.address);

        this.setState({ user, UserModel, GroupModel, userPosts, following_addresses, isLoading:false})


        
    }

    render() {
        return (
            <div className="bg-grey-light font-sans">
            {!this.state.isLoading&&
            <div>
                <meta charSet="UTF-8" />
                <title>BSN</title>
                 <Navbar user={this.state.user}/>

                <div className="container mx-auto flex flex-col lg:flex-row mt-3 text-sm leading-normal">
                {/*---------Start Left Col--------*/}
                <div className="w-full lg:w-1/4 pl-4 lg:pl-0 pr-6 mb-4">
                            <MiniProfile user={this.state.user} followers={this.state.following_addresses} posts={this.state.userPosts}/>
                    <OptionsMenu selectOption={this.selectOption}/>
                
                </div>
                {/*---------End Left Col--------*/}    

                {/*---------Start Center Col--------*/}
                <div className="w-full lg:w-1/2  mb-4">
                    {this.state.option==="update_account"&&<UpdateInfoForm user={this.state.user} UserModel={this.state.UserModel}/>}
                    {this.state.option==="create_group"&&<CreateGroupForm user={this.state.user} GroupModel={this.state.GroupModel}/>}
                </div>
                {/*---------End Center Col--------*/}

                {/*---------Start Right Col--------*/}
                <div className="w-full lg:w-1/4 pl-4">
                    
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

export default Options;
