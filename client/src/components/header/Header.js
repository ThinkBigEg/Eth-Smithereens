import React from "react";
import logo from "./logo.svg";
const Header = () => {
    return (
        <header className="header-area">
            <div className="main-header-area">
                <div className="classy-nav-container breakpoint-off">
                    <div className="container">
                        <nav className="classy-navbar justify-content-between" id="razoNav">
                            <a className="nav-brand" href="#">
                                <img src={logo} alt="" />
                            </a>

                            <div className="classy-navbar-toggler">
                                <span className="navbarToggler">
                                    <span />
                                    <span />
                                    <span />
                                </span>
                            </div>

                            <div className="classy-menu">
                                <div className="classycloseIcon">
                                    <div className="cross-wrap">
                                        <span className="top" />
                                        <span className="bottom" />
                                    </div>
                                </div>

                                <div className="classynav">
                                    <ul id="nav">
                                        <li>
                                            <a href="#">Log in</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
