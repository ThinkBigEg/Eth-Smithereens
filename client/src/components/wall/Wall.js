
import React, { Component,Fragment } from "react";
import "../register/style.css";
import ProfileCard from "./ProfileCard";
import FollowingCard from "./FollowingCard";
import "./style.css";
import Web3Wrapper from "../../utils/Web3Wrapper";
import Post from "../../models/Post";
import User from "../../models/User";
export default class Wall extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading:true,
            postContent: "",
            posts:[],
            commentContent:'',
            web3Wrapper:{}
        };
    }
    changePost(e) {
        this.setState({ postContent: e.target.value });
    }
    submitPost = async()=> {

        let user = JSON.parse(await window.sessionStorage.getItem("user"));
        var PostM = new Post(this.state.web3Wrapper);
        await PostM.createPost(user.address,this.state.postContent);       
        await this.getPosts();
    }
    changeComment(e) {
        this.setState({ commentContent: e.target.value });
    }

    submitComment = async(post_address)=>{

        let user = JSON.parse(await window.sessionStorage.getItem("user"));
        var PostM = new Post(this.state.web3Wrapper);
        await PostM.createComment(user.address,post_address,this.state.commentContent);
        await this.getPosts();
    }

    getPosts=async ()=>{
        var PostM = new Post(this.state.web3Wrapper);
        var UserM = new User(this.state.web3Wrapper);
        let user = JSON.parse(await window.sessionStorage.getItem("user"));
        var following_addresses = await UserM.getFollowers(user.address);
        var posts = await PostM.getNewsFeed(following_addresses);
        this.setState({posts});
    }

    componentDidMount =async()=>{

        var web3Wrapper = new Web3Wrapper();
        await web3Wrapper.initializeContracts();
        this.setState({web3Wrapper});
        await this.getPosts();

    }

    render() {
        return (

           <Fragment>
                
                <ProfileCard tweets="10" followers="10" following="10"/>
                <div className="col-sm-6">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="media">
                                <a className="media-left" href="#fake">
                                    <img alt="" className="media-object img-rounded" src="http://placehold.it/35x35" />
                                </a>
                                <div className="media-body">
                                    <div className="">
                                        <label className="control-label sr-only" htmlFor="inputSuccess5">
                                            Hidden label
                                        </label>
                                        <input type="text" className="form-control" id="search2" onChange={this.changePost.bind(this)} aria-describedby="search" />
                                        <li onClick={()=>{this.submitPost()}}>
                                            <a href="#">
                                                <span className="glyphicon glyphicon-share-alt" />
                                            </a>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.state.posts.map((post) => (
                            <div className="panel-body" key={post.address}>
                                <div className="media">
                                    <a className="media-left" href="#fake">
                                        <img alt="" className="media-object img-rounded" src="http://placehold.it/64x64" />
                                    </a>
                                    <div className="media-body">
                                        <h4 className="media-heading">{post.ownerName}</h4>
                                        <p>{post.text}</p>
                                        <ul className="nav nav-pills nav-pills-custom">
                                            <li>
                                                <a href="#">
                                                    <span className="glyphicon glyphicon-share-alt" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="glyphicon glyphicon-retweet" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="glyphicon glyphicon-star" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="glyphicon glyphicon-option-horizontal" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                {post.comments.map((comment)=>(
                                    <div className="commentPost" key={comment.address}>
                                    <div className="media">
                                        <a className="media-left" href="#fake">
                                            <img alt="" className="media-object img-rounded" src="http://placehold.it/35x35" />
                                        </a>
                                        <div className="media-body">
                                        <h4 className="media-heading">{comment.ownerName}</h4>
                                            <div className="">
                                                <label className="control-label sr-only" htmlFor="inputSuccess5">
                                                    Hidden label
                                                </label>
                                                <p>{comment.text}</p>
                                                {/* <li onClick={this.submitComment.bind(this,post.id)}>
                                                    <a href="#">
                                                        <span className="glyphicon glyphicon-share-alt" />
                                                    </a>
                                                </li> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                ))}
                                </div>
                                <div className="commentPost">
                                    <div className="media">
                                        <a className="media-left" href="#fake">
                                            <img alt="" className="media-object img-rounded" src="http://placehold.it/35x35" />
                                        </a>
                                        <div className="media-body">
                                        <h4 className="media-heading">{this.props.user.name}</h4>
                                            <div className="">
                                                <label className="control-label sr-only" htmlFor="inputSuccess5">
                                                    Hidden label
                                                </label>
                                                <input type="text" className="form-control" id="search2" onChange={this.changeComment.bind(this)} aria-describedby="search" />
                                                <li onClick={()=>{this.submitComment(post.address)}}>
                                                    <a href="#">
                                                        <span className="glyphicon glyphicon-share-alt" />
                                                    </a>
                                                </li>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <FollowingCard />
                
            </Fragment>
                        

        );
    }
}
