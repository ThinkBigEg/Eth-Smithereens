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
            <div className="">
                <Preloader />
                <Header />
            </div>
        );
    }
}

export default App;
