import {
    clientId,
    clientSecret,
    redirectUri,
    oauthServerUrl,
} from '../settings';

const authHeader = (token = false) => {
    const headers = {'X-BetaSeries-Key': clientId};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return headers;
}

class FetchAPI {

    getToken(code) {
        return fetch(`${oauthServerUrl}/oauth/access_token`, {
            method: 'POST',
            body: JSON.stringify({code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri}),
            headers: {
                'content-type': 'application/json',
            },
        })
    }

    getUserInfo(token) {
        return fetch(`${oauthServerUrl}/members/infos`, {
            method: 'GET',
            headers: authHeader(token),
        })
    }

    getMoviesDiscover(type) {
        return fetch(`${oauthServerUrl}/members/infos?type=${type}`, {
            method: 'GET',
            headers: authHeader(),
        })
    }
}

const fetchAPI = new FetchAPI();
Object.freeze(fetchAPI);

export {fetchAPI};