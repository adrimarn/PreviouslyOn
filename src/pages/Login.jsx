import React from 'react';
import {Redirect} from "react-router-dom";
import {useIsAuthenticated} from "react-auth-kit";
import Authorization from "../Authorization";

const Login = () => {
    const isAuthenticated = useIsAuthenticated()
    if (isAuthenticated()) {
        return <Redirect to="/"/>
    } else {
        return (
            <div className="columns">
                <div className="column"/>
                <div className="column is-three-quarters">
                    <h1 className='is-size-2 section__title'>Vous devez vous identifier pour continuer</h1>
                    <Authorization buttonText="S'identifier sur betaseries"
                                   className='button is-medium is-info is-fullwidth'/>
                </div>
                <div className="column"/>
            </div>

        )
    }

}

export default Login;