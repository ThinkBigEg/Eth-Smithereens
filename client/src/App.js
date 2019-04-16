import React, { Component } from "react";

import "./App.css";
import Preloader from "./components/preloader/Preloader";
import Header from "./components/header/Header";
import Welcome from "./components/welcome/Welcome";
import Wall from "./components/wall/Wall";
class App extends Component {
    constructor() {
        super();
        this.state = {
            isLogin: true,
            posts: []
        };
    }
    componentDidMount() {
        let posts = [{ 
        content: "post number 1 test test", author: "karim", date: "12-10-1997" , authorImg:"http://placehold.it/64x64"}, 
        { content: "this is my second post test", author: "omar", date: "6-10-2007",authorImg:"http://placehold.it/64x64" }, 
        { content: "this is not my post test brdo ;D", author: "amr", date: "2-1-1897" ,authorImg:"http://placehold.it/64x64"}, 
        { content: "ngrb mara kman", author: "farouk", date: "30-12-1007",authorImg:"http://placehold.it/64x64" }];
        // get posts from your backend
        this.setState({ posts });
    }
    render() {
        if (!this.state.isLogin)
            return (
                <div className="container" style={{ padding: "0px", maxWidth: "100%" }}>
                    <Preloader />
                    <Welcome logged={this.state.isLogin} />
                </div>
            );
        return (
            <div className="container" style={{ padding: "0px", maxWidth: "100%" }}>
                <Header logged={this.state.isLogin} />
                <Wall posts={this.state.posts} />
            </div>
        );
    }
}

export default App;
