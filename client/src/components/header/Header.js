import React from "react";
import logo from "./logo.svg";
const Header = props => {
    return (
        <div className="navbar navbar-default navbar-static-top">
            <div className="container">
                <div className="navbar-collapse navbar-collapse-1 collapse" aria-expanded="true">
                    <div className="navbar-brand" style={{ marginLeft: "11em" }}>
                        <img src={logo} alt="logo" style={{ width: "40px", margin: "-11px" }} />
                    </div>
                    <ul className="nav navbar-nav" style={{ float: "right", marginRight: "11em" }}>
                        {!props.logged && (
                            <li className="active">
                                <a href="#fake">
                                    <div onClick={() => props.changeToRegister()} className="nav-link">
                                        <span className="glyphicon glyphicon-home" /> Register
                                    </div>
                                </a>
                            </li>
                        )}
                        {props.logged && (
                            <li className="active">
                                <a href="#fake">
                                    <div className="nav-link">
                                        <span className="glyphicon glyphicon-bell" /> profile
                                    </div>
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark" style={{ justifyContent: "space-around" }}>
            <div className="navbar-brand">
                <img src={logo} alt="logo" style={{ width: "40px" }} />
            </div>
            {!props.logged && (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <div onClick={() => props.changeToRegister()} className="nav-link">
                            Register
                        </div>
                    </li>
                </ul>
            )}
            {props.logged && (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <div className="nav-link">profile</div>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Header;
