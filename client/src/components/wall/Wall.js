import React, { Component } from "react";
import "../register/style.css";
import {createPost} from "../../utils/PostFunctions"
import {getPostsOfUser} from "../../utils/PostFunctions";

export default class Wall extends Component {
    constructor(props) {
        super();
        this.state = {
            postContent: "",
            posts:[]
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
        return (
            <div className="container" style={{ maxWidth: "900px", marginTop: "10px" }}>
                <div className="container" ref={this.myRef}>
                    <div id="contact" style={{ margin: "0" }}>
                        <h3 style={{ textAlign: "left" }}>Post</h3>
                        <fieldset>
                            <textarea onChange={this.changePost.bind(this)} placeholder="What's up?" type="text" tabIndex="1" />
                        </fieldset>
                        <fieldset style={{ textAlign: "right" }}>
                            <button onClick={this.submitPost.bind(this)} id="contact-submit" style={{ maxWidth: "min-content" }} data-submit="...Sending">
                                Submit
                            </button>
                        </fieldset>
                    </div>
                </div>
                <div className="container" ref={this.myRef}>
                    <div id="contact" style={{ margin: "0" }}>
                        <h2>Your prev posts</h2>
                        {this.state.posts.map((post) => (
                            <div key={post.id} className="post">
                                <h3>Auther: {post.ownerName}</h3>
                                <p>{post.text}</p>
                                <span>created at: {post.timestamp}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
