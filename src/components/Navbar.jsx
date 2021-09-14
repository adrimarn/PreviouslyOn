import React from 'react';
import Authorization from "../Authorization";
import {Link} from "react-router-dom";
import {useIsAuthenticated} from "react-auth-kit";

const Navbar = () => {
    const [isActive, setisActive] = React.useState(false);
    const isAuthenticated = useIsAuthenticated()
    return (
        <nav className="navbar is-info" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <span className="navbar-item has-text-weight-bold">PreviouslyOn</span>
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
                    <Link to={'/'} className="navbar-item">
                        Accueil
                    </Link>
                    <Link to={'/shows'} className="navbar-item">
                        Liste des séries
                    </Link>
                    {isAuthenticated() && (
                        <Link to="/myshows" className="navbar-item">
                            Mes séries
                        </Link>
                    )}
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <Authorization className='button is-light is-outlined'/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;