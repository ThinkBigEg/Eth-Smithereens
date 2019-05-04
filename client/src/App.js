
import React, { Component } from "react";

import "./App.css";
import Preloader from "./components/preloader/Preloader";
import Header from "./components/header/Header";
import Welcome from "./components/welcome/Welcome";
import Wall from "./components/wall/Wall";
import {registerNewUser,getUser,checkUserExists} from "./utils/UserFunctions"
class App extends Component {


    constructor() {
        super();
        this.state = {
            isLogin: false,
            posts: [],
            user:{}
        };
    }

    register = async (name,email)=>{
        await registerNewUser(name,email);
        var user=await this.initUserData();
        this.setState({user,isLogin: true});

    }

    initUserData = async ()=>{
        var data = await getUser();
            let userObj = {
            name: data[0],
            email: data[1],
            address: data[2]
            };
            await window.sessionStorage.setItem("user", JSON.stringify(userObj));
            return userObj;
            
    }

    

    componentDidMount = async () =>{

        var check = await checkUserExists();
        
        if (check) {
            await this.initUserData();
            let user = JSON.parse(await window.sessionStorage.getItem("user"));
            this.setState({user, isLogin: true });
        
        }
    }

    // componentDidMount() {
    //     let posts = [
    //         {
    //             content: "post number 1 test test",
    //             author: "karim",
    //             date: "12-10-1997",
    //             authorImg: "http://placehold.it/64x64"
    //         },
    //         { content: "this is my second post test", author: "omar", date: "6-10-2007", authorImg: "http://placehold.it/64x64" },
    //         { content: "this is not my post test brdo ;D", author: "amr", date: "2-1-1897", authorImg: "http://placehold.it/64x64" },
    //         { content: "ngrb mara kman", author: "farouk", date: "30-12-1007", authorImg: "http://placehold.it/64x64" }
    //     ];
    //     // get posts from your backend

    //     let tweets_num = 1520,
    //         followers_num = 2145,
    //         following_num = 520,
    //         trends = ["graduation of FCI 2019", "Sama el masry", "m4 3arf eh tany"];
    //     // get the data also

    //     this.setState({ posts, tweets_num, followers_num, following_num, trends });
    // }
    
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
                <Wall posts={this.state.posts} user={this.state.user}/>
            </div>
        );
    }
}

export default App;
