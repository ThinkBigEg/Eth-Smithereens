import React, { Component } from "react";
import "./style.css";
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
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-3" />
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
                                            <img alt="" className="media-object img-rounded" src={post.authorImg} />
                                        </a>
                                        <div className="media-body">
                                            <h4 className="media-heading">{post.author}</h4>
                                            <p>{post.content}</p>
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
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
