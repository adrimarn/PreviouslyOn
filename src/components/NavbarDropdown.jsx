import React from 'react';
import {Link} from "react-router-dom";
import {useAuthUser, useSignOut} from "react-auth-kit";

const NavbarDropdown = () => {
    const auth = useAuthUser()
    const signOut = useSignOut()

    return (
        <div className='navbar-item'>
            <div className="avatar is-hidden-touch">
                <img
                    src={`${auth().user.avatar}`}
                    width="28" height="28" alt={`Avatar de ${auth().user.login}`}/>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">
                    {auth().user.login}
                </div>
                <div className="navbar-dropdown is-boxed">
                    <Link className="navbar-item" to={''}>
                        Paramètres
                    </Link>
                    <hr className="navbar-divider"/>
                    <Link to={''} className='navbar-item has-text-danger' onClick={() => signOut()}>Déconnexion</Link>
                </div>
            </div>
        </div>
    );
};

export default NavbarDropdown;
