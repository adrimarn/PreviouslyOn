import React from 'react';
import Authorization from "../Authorization";
import {Link} from "react-router-dom";
import {useIsAuthenticated} from "react-auth-kit";
import logo from "../assets/images/previouslyon-logo.png"

const Navbar = () => {
    const [isActive, setisActive] = React.useState(false);
    const isAuthenticated = useIsAuthenticated()
    return (
        <nav className="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to={''}>
                    <img src={logo} width="112" height="28" alt='PreviouslyOn'/>
                </Link>
                <Link
                    to={''}
                    onClick={(e) => {
                        e.preventDefault();
                        setisActive(!isActive);
                    }}
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
                    <Link to={'/shows'} className="navbar-item">
                        Liste des séries
                    </Link>
                    {isAuthenticated() && (
                        <>
                            <Link to="/myshows" className="navbar-item">
                                Mes séries
                            </Link>
                            <div className="navbar-item has-dropdown is-hoverable">
                                <Link to={''}
                                      onClick={(e) => e.preventDefault()}
                                      className="navbar-link">
                                    Amis
                                </Link>
                                <div className="navbar-dropdown">
                                    <Link to='/friends' className="navbar-item">
                                        Mes amis
                                    </Link>
                                    <Link to='/friends/request' className="navbar-item">
                                        Mes demandes
                                    </Link>
                                    <hr className="navbar-divider"/>
                                    <Link to='/members/search' className="navbar-item">
                                        Rechercher un membre
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <Authorization className='header__sign-in'/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;