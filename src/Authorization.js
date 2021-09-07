import React, {useState} from 'react';
import OAuth2Login from "react-simple-oauth2-login";
import {useSignIn, useSignOut, useIsAuthenticated} from 'react-auth-kit'

import ErrorAlert from './ErrorAlert';
import {
    authorizationUrl,
    clientId,
    clientSecret,
    redirectUri,
    oauthServerUrl,
} from './settings';

export default function Authorization() {
    const [error, setError] = useState(null);
    const signIn = useSignIn()
    const signOut = useSignOut()
    const isAuthenticated = useIsAuthenticated()

    let userToken


    // You can test this with a GitHub OAuth2 app (provided test server supports GitHub and Spotify)
    const onSuccess = ({code}) => fetch(`${oauthServerUrl}/oauth/access_token`, {
        method: 'POST',
        body: JSON.stringify({code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri}),
        headers: {
            'content-type': 'application/json',
        },
    })
        .then(res => res.json())
        .then((data) => {
            userToken = data.access_token;
            return data.access_token;
        })
        .then(token => fetch(`${oauthServerUrl}/members/infos`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${token}`,
                    'X-BetaSeries-Key': clientId
                },
            })
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
                    className='button'
                    authorizationUrl={authorizationUrl}
                    clientId={clientId}
                    redirectUri={redirectUri}
                    responseType="code"
                    buttonText="Connexion"
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