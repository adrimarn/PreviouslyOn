import React, {useState} from 'react';
import OAuth2Login from "react-simple-oauth2-login";
import {useSignIn, useSignOut, useIsAuthenticated} from 'react-auth-kit'
import {fetchAPI} from "./services/FetchAPI";

import ErrorAlert from './ErrorAlert';
import {
    authorizationUrl,
    clientId,
    redirectUri,
} from './settings';

export default function Authorization(props) {
    const [error, setError] = useState(null);
    const signIn = useSignIn()
    const signOut = useSignOut()
    const isAuthenticated = useIsAuthenticated()

    let userToken


    // You can test this with a GitHub OAuth2 app (provided test server supports GitHub and Spotify)
    const onSuccess = ({code}) => fetchAPI.getToken(code)
        .then(res => res.json())
        .then((data) => {
            userToken = data.access_token;
            return data.access_token;
        })
        .then(token => fetchAPI.getUserInfo({token})
        )
        .then(res => res.json())
        .then((user) => {
            if (signIn({
                token: userToken,
                expiresIn: 1440,
                tokenType: "Bearer",
                authState: {user: user.member},
            })) {
                // Redirect or do-something
            }
        })

    return (
        <div className="column">
            {
                error && <ErrorAlert error={error}/>
            }
            {!isAuthenticated() ? (
                <OAuth2Login
                    id="auth-code-login-btn"
                    className={props.className ?? 'button'}
                    authorizationUrl={authorizationUrl}
                    clientId={clientId}
                    redirectUri={redirectUri}
                    responseType="code"
                    buttonText={props.buttonText ?? 'Connexion'}
                    onSuccess={onSuccess}
                    onFailure={setError}

                />
            ) : (
                <button className='button' onClick={() => signOut()}>Déconnexion</button>
            )
            }
        </div>
    );
}