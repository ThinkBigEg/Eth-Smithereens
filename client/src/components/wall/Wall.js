import React, { Component, Fragment } from "react";
import ProfileCard from "./ProfileCard";
import FollowingCard from "./FollowingCard";
import "./style.css";
export default class Wall extends Component {
    constructor(props) {
        super();
        this.state = {
            postContent: "",
            commentContent:'',
        };
    }
    changePost(e) {
        this.setState({ postContent: e.target.value });
    }
    
    changeComment(e) {
        this.setState({ commentContent: e.target.value });
    }
    render() {
        const { tweets_num, followers_num, following_num, trends } = this.props;
        let votes = [1,2,3,4,5,6,7,8,9,10];
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
                                        <li onClick={()=>this.props.submitPost(this.state.postContent)}>
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
                                        <img alt="" className="media-object img-rounded" src={post.authorImg} />
                                    </a>
                                    <div className="media-body">
                                        <h4 className="media-heading">{post.author}</h4>
                                        <p>{post.content}</p>
                                        <ul className="nav nav-pills nav-pills-custom">
                                            <li onClick={()=>this.props.sharePost(post.id)}>
                                                <a href="#">
                                                    <span class="glyphicon glyphicon-retweet"></span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" style={{cursor:"default"}}>
                                                    avg votes: {post.avgVoting}
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" style={{cursor:"default"}}>
                                                Vote:
                                                </a>
                                            </li>
                                            {/* start voting */}
                                            {votes.map((ele,i)=>(
                                                <li key={i} onClick={()=>this.props.submitVotePost(post.id,ele)}>
                                                    <a href="#">
                                                        {ele}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                        
                                        
                                    </div>
                                    {post.comments.map((comment,i)=>(
                                        <div className="commentPost showPost" key={i}>
                                            <div className="media">
                                                <a className="media-left" href="#fake">
                                                    <img alt="" className="media-object img-rounded" src="http://placehold.it/35x35" />
                                                </a>
                                                <div className="media-body">
                                                    <h4 className="media-heading">{comment.author}</h4>
                                                    <div className="">
                                                        {comment.content}
                                                    </div>
                                                    <ul className="nav nav-pills nav-pills-custom">
                                                        <li>
                                                            <a href="#" style={{cursor:"default",paddingLeft:"0",paddingRight:"0"}}>
                                                                avg votes: {comment.avgVoting}
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" style={{cursor:"default"}}>
                                                            Vote:
                                                            </a>
                                                        </li>
                                                        {/* start voting */}
                                                        {votes.map((ele,i)=>(
                                                            <li key={i}  onClick={()=>this.props.submitVoteComment(comment.id,ele)}>
                                                                <a href="#">
                                                                    {ele}
                                                                </a>
                                                            </li>
                                                        ))}
                                                        
                                                    </ul>
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
                                            <div className="">
                                                <label className="control-label sr-only" htmlFor="inputSuccess5">
                                                    Hidden label
                                                </label>
                                                <input type="text" className="form-control" id="search2" onChange={this.changeComment.bind(this)} aria-describedby="search" />
                                                <li onClick={()=>this.props.submitComment(post.id,this.state.commentContent)}>
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
