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

    getUserInfo(params) {
        return fetch(`${oauthServerUrl}/members/infos`, {
            method: 'GET',
            headers: authHeader(params.token),
        })
    }

    getShowsMember(params) {
        let urlAPI
        if (params.id == null) {
            urlAPI = `${oauthServerUrl}/shows/member?order=${params.order}&limit=${params.limit}`
        } else {
            urlAPI = `${oauthServerUrl}/shows/member?id=${params.id}&order=${params.order}&limit=${params.limit}`
        }
        return fetch(urlAPI, {
            method: 'GET',
            headers: authHeader(params.token),
        })
    }
}

const fetchAPI = new FetchAPI();
Object.freeze(fetchAPI);

export {fetchAPI};