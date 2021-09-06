import React, {useState} from 'react';
import OAuth2Login from "react-simple-oauth2-login";
import {useCookies} from "react-cookie";
import ErrorAlert from './ErrorAlert';
import {
    authorizationUrl,
    clientId,
    clientSecret,
    redirectUri,
    oauthServerUrl,
} from './settings';

export default function AuthorizationCodeExample() {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

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
            setAccessToken(data.access_token);
            setCookie('token', data.access_token);
            return data.access_token;
        })
        .then(token => fetch(`${oauthServerUrl}/members/infos`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${token}`,
                'X-BetaSeries-Key': clientId
            },
        }))
        .then(res => res.json())
        .then(setUser)
        .catch(setError);

    return (
        <div className="column">
            {
                error && <ErrorAlert error={error}/>
            }
            {!accessToken ? (
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
                <div className='button'>
                    Déconnexion
                </div>
            )
            }
            {
                accessToken && <p>Access token: {accessToken}</p>
            }
            {
                user && (
                    <div>
                        <h3>User data</h3>
                        <p>Obtained from token-protected API</p>
                        <p>{user.member.login} ({user.member.id})</p>
                        <img src={user.member.avatar} alt={user.member.login}/>
                    </div>
                )
            }
        </div>
    );
}