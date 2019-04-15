import React, { Component } from "react";
import "../register/style.css";
export default class Wall extends Component {
    constructor(props) {
        super();
        this.state = {
            postContent: ""
        };
    }
    changePost(e) {
        this.setState({ postContent: e.target.value });
    }
    submitPost() {
        //  here put your request
        this.setState({ postContent: "" });
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
                        {this.props.posts.map((post, i) => (
                            <div key={i} className="post">
                                <h3>Auther: {post.author}</h3>
                                <p>{post.content}</p>
                                <span>created at: {post.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
