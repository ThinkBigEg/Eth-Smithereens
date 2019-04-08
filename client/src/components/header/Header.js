import React from "react";
import logo from "./logo.svg";
const Header = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark" style={{ justifyContent: "space-around" }}>
            <a className="navbar-brand" href="#">
                <img src={logo} alt="logo" style={{ width: "40px" }} />
            </a>

            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        Login
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        Register
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Header;
