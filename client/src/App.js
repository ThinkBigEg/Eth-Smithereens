import React, { Component } from "react";

import "./App.css";
import Preloader from "./components/preloader/Preloader";
import Header from "./components/header/Header";
class App extends Component {
    constructor() {
        super();
        this.state = {
            isLogin: false
        };
    }
    render() {
        return (
            <div className="container" style={{ padding: "0px", maxWidth: "100%" }}>
                <Preloader />
                <div className="pageContent">
                    <Header />
                    <div className="welcomeScreen">
                        <h1 className="rotate-center">Block Chain Network</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
