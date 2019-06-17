import React, { Component } from "react";

import "./App.css";
import Preloader from "./components/preloader/Preloader";
import Header from "./components/header/Header";
import Welcome from "./components/welcome/Welcome";
import Wall from "./components/wall/Wall";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            posts: [],
            tweets_num: 0,
            followers_num: 0,
            following_num: 0,
            trends: [],
            loggedUser: {}, // it should be used in comments and posts but we will make it later
            commenting_count: 0,
            posting_count: 0,
            votes_count:0,
            shares_count:0,
            author_id:1, // 4ofo b2a ento hat3mlo eh f el backend w n3dlha sa3tha (how will we get this id?)
        };
    }
    componentDidMount() {
        let posts = [
            {
                id: "1",
                content: "post number 1 test test",
                author: "karim",
                date: "12-10-1997",
                authorImg: "http://placehold.it/64x64",
                avgVoting:5,
                comments: [
                    {
                        id: "1",
                        author: "karim",
                        date: "13-10-1997",
                        content: "hello world 1",
                        avgVoting:4,
                    },
                    {
                        id: "2",
                        author: "omar",
                        date: "14-10-1997",
                        content: "hello world 2",
                        avgVoting:4,
                    },
                    {
                        id: "3",
                        author: "amr",
                        date: "16-10-1997",
                        content: "hello world 3",
                        avgVoting:4,
                    }
                ]
            },
            { id: "2", content: "this is my second post test",avgVoting:5, author: "omar", date: "6-10-2007", authorImg: "http://placehold.it/64x64", comments: [] },
            { id: "3", content: "this is not my post test brdo ;D",avgVoting:5, author: "amr", date: "2-1-1897", authorImg: "http://placehold.it/64x64", comments: [] },
            { id: "4", content: "ngrb mara kman", author: "farouk", avgVoting:5,date: "30-12-1007", authorImg: "http://placehold.it/64x64", comments: [] }
        ];
        // get posts from your backend

        let tweets_num = 1520,
            followers_num = 2145,
            following_num = 520,
            trends = ["graduation of FCI 2019", "Sama el masry", "m4 3arf eh tany"];
        // get the data also

        this.setState({ posts, tweets_num, followers_num, following_num, trends });
    }
    submitPost = (post_content) => {
        console.log(this.state)
        let author = this.state.author_id;
        //  here put your request and get back the new posts list
        
        //the next lines will be deleted:
        console.log("post_content",post_content)
        let posts = this.state.posts;
        posts.push({ id: "5"/*this id will be taken from backend for sure*/, content: post_content, author: "farfasd aouk", date: "30-12-1007", authorImg: "http://placehold.it/64x64", comments: [] });
        //end of deleted

        //put the post in the state
        this.setState({ posts, posting_count: this.state.posting_count + 1 });
    }
    submitComment = (post_id, comment_content) => {
        let author = this.state.author_id;
        console.log(post_id, comment_content)
        //  here put your request and get back the new posts list

        this.setState({ commenting_count: this.state.commenting_count + 1 });
    }
    submitVoteComment = (comment_id, vote_val) =>{
        let author = this.state.author;

        this.setState({ votes_count: this.state.votes_count + 1 });
    }
    submitVotePost = (comment_id, vote_val) => {
        let author = this.state.author;
        // your request call here

        this.setState({ votes_count: this.state.votes_count + 1 });
    }
    sharePost = (post_id) => {
        let author = this.state.author_id;

        // create your request


        // if you would like the post to appear immediatly just return the new posts with the request and put it to state 
        this.setState({ shares_count: this.state.shares_count + 1 });
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
                <Wall 
                    submitPost = {this.submitPost}
                    submitComment = {this.submitComment}
                    posts={this.state.posts} 
                    tweets_num={this.state.tweets_num} 
                    followers_num={this.state.followers_num} 
                    following_num={this.state.following_num} 
                    trends={this.state.trends} 
                />
            </div>
        );
    }
}

export default App;
