import React, { Component } from "react";

import "./App.css";
import Preloader from "./components/preloader/Preloader";
import Header from "./components/header/Header";
import Welcome from "./components/welcome/Welcome";

class App extends Component {
    constructor() {
        super();
        this.state = {
            isLogin: false
        };
    }

    render() {
        
        if (!this.state.isLogin)
            return (
                <div className="container" style={{ padding: "0px", maxWidth: "100%" }}>
                    <Preloader />
                    <Welcome logged={this.state.isLogin}/>
                </div>
            );
        return (
            <div className="container" style={{ padding: "0px", maxWidth: "100%" }}>
                <Header logged={this.state.isLogin} />
                {/* <Wall /> */}
            </div>
        );
    }
}

export default App;
