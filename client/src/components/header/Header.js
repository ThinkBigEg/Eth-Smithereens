import React from "react";
import logo from "./logo.svg";
const Header = props => {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark" style={{ justifyContent: "space-around" }}>
            <div className="navbar-brand" >
                <img src={logo} alt="logo" style={{ width: "40px" }} />
            </div>
            {!props.logged && (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <div onClick={()=>props.changeToRegister()} className="nav-link">
                            Register
                        </div>
                    </li>
                </ul>
            )}
            {props.logged && (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <div className="nav-link">
                            profile
                        </div>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Header;
