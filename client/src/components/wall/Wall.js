
import React, { Component,Fragment } from "react";
import "../register/style.css";
import {createPost} from "../../utils/PostFunctions"
import {getPostsOfUser} from "../../utils/PostFunctions";
import ProfileCard from "./ProfileCard";
import FollowingCard from "./FollowingCard";
import "./style.css";
export default class Wall extends Component {
    constructor(props) {
        super();
        this.state = {
            postContent: "",
            posts:[],
            commentContent:'',
        };
    }
    changePost(e) {
        this.setState({ postContent: e.target.value });
    }
    submitPost = async(e)=> {
        //  here put your request
        e.preventDefault();
        let user = JSON.parse(await window.sessionStorage.getItem("user"));
        await createPost(user.address,this.state.postContent);
        this.setState({ postContent: "" });
        await this.getPosts();
    }
    changeComment(e) {
        this.setState({ commentContent: e.target.value });
    }
    submitComment(postId) {
        //  here put your request
    }

    getPosts=async ()=>{
        var posts=[];
        let user = JSON.parse(await window.sessionStorage.getItem("user"));
        posts=await getPostsOfUser(user.address);
        this.setState({posts});
    }

    componentDidMount =async()=>{
        
        await this.getPosts();
    }

    render() {
        const { tweets_num, followers_num, following_num, trends } = this.props;
        return (
            <Fragment>
                <ProfileCard tweets={tweets_num} followers={followers_num} following={following_num} trends={trends} />
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
                                        <li onClick={this.submitPost.bind(this)}>
                                            <a href="#">
                                                <span className="glyphicon glyphicon-share-alt" />
                                            </a>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.props.posts.map((post, i) => (
                            <div className="panel-body" key={i}>
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
                                <div className="commentPost">
                                    <div className="media">
                                        <a className="media-left" href="#fake">
                                            <img alt="" className="media-object img-rounded" src="http://placehold.it/35x35" />
                                        </a>
                                        <div className="media-body">
                                            <div className="">
                                                <label className="control-label sr-only" htmlFor="inputSuccess5">
                                                    Hidden label
                                                </label>
                                                <input type="text" className="form-control" id="search2" onChange={this.changeComment.bind(this)} aria-describedby="search" />
                                                <li onClick={this.submitComment.bind(this,post.id)}>
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
