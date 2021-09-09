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
                    <Authorization buttonText="S'identifier sur betaseries"
                                   className='button is-medium is-info is-fullwidth'/>
                </div>
                <div className="column"/>
            </div>

        )
    }

}

export default Login;