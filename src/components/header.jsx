import React from "react";
import { Link } from 'react-router-dom';
import { CircleUserRound } from 'lucide-react';

function Header() {
    return (
        <>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light ">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link toggle-button" data-widget="pushmenu" href="#" role="button">
                            <i className="fas fa-bars" />
                        </a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="/starholadmin/admin" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="/starholadmin/admin" className="nav-link">Contact</a>
                    </li>
                </ul>

                {/* Right side */}
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown nn ">
                        <a className="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <CircleUserRound size={44} className="uss pb-2" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right " aria-labelledby="navbarDropdown">
                            <p className="dropdown-item">Welcome back Admin</p>
                            <Link to="/starholadmin/logout" className="nav-link ms-2">
                            <i className="fas fa-sign-out-alt d-inline" />
                            <p className="ms-2 d-inline">Logout</p>
                            </Link>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Header;
