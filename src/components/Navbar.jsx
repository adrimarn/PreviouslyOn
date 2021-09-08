import React from 'react';
import Authorization from "../Authorization";
import {Link} from "react-router-dom";

const Navbar = () => {
    const [isActive, setisActive] = React.useState(false);
    return (
        <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    <img src="https://bulma.io/images/bulma-logo-white.png" width="112" height="28" alt='Logo'/>
                </Link>
                <Link
                    onClick={() => {
                        setisActive(!isActive);
                    }}
                    to={''}
                    role="button"
                    className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarApp"
                >
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                </Link>
            </div>

            <div id="navbarApp" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
                <div className="navbar-start">
                    <Link to={''} className="navbar-item">
                        Home
                    </Link>

                    <Link to={''} className="navbar-item">
                        Documentation
                    </Link>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <Authorization className='button is-primary'/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;