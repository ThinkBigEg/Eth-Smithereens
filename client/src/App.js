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
            posts: []
        };
    }

    register = async (name,email)=>{
        await registerNewUser(name,email);
        await this.initUserData();
        this.setState({isLogin: true});

    }

    initUserData = async ()=>{
        var data = await getUser();
            let userObj = {
            name: data[0],
            email: data[1],
            address: data[2]
            };
            await window.sessionStorage.setItem("user", JSON.stringify(userObj));
            
    }

    

    componentDidMount = async () =>{

        var check = await checkUserExists();
        
        if (check) {
            await this.initUserData();
            let user = JSON.parse(await window.sessionStorage.getItem("user"));
            this.setState({ isLogin: true });
        
        }




        
        // let posts = [{ content: "post number 1 test test", author: "karim", date: "12-10-1997" }, 
        // { content: "this is my second post test", author: "omar", date: "6-10-2007" }, 
        // { content: "this is not my post test brdo ;D", author: "amr", date: "2-1-1897" }, 
        // { content: "ngrb mara kman", author: "farouk", date: "30-12-1007" }];
        // // get posts from your backend
        
    }
    render() {
        if (!this.state.isLogin)
            return (
                <div className="container" style={{ padding: "0px", maxWidth: "100%" }}>
                    <Preloader />
                    <Welcome logged={this.state.isLogin} register={this.register}/>
                </div>
            );
        return (
            <div className="container" style={{ padding: "0px", maxWidth: "100%" }}>
                <Header logged={this.state.isLogin} />
                <Wall />
            </div>
        );
    }
}

export default App;
