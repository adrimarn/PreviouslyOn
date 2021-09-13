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

    getUserIsActive(params) {
        return fetch(`${oauthServerUrl}/members/is_active`, {
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

    getShow(params) {
        return fetch(`${oauthServerUrl}/shows/display?id=${params.id}`, {
            method: 'GET',
            headers: authHeader(params.token),
        })
    }

    getShows(params) {
        return fetch(`${oauthServerUrl}/shows/list?order=${params.order}`, {
            method: 'GET',
            headers: authHeader(params.token),
        })
    }

    addShow(params) {
        return fetch(`${oauthServerUrl}/shows/show?id=${params.id}`, {
            method: 'POST',
            headers: authHeader(params.token),
        })
    }

    removeShow(params) {
        return fetch(`${oauthServerUrl}/shows/show?id=${params.id}`, {
            method: 'DELETE',
            headers: authHeader(params.token),
        })
    }

    archiveShow(params) {
        return fetch(`${oauthServerUrl}/shows/archive?id=${params.id}`, {
            method: 'POST',
            headers: authHeader(params.token),
        })
    }

    unarchiveShow(params) {
        return fetch(`${oauthServerUrl}/shows/archive?id=${params.id}`, {
            method: 'DELETE',
            headers: authHeader(params.token),
        })
    }
}

const fetchAPI = new FetchAPI();
Object.freeze(fetchAPI);

export {fetchAPI};