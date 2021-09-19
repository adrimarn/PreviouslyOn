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

    /**
     * Retrieve user token
     * @param {string} code
     */
    getToken(code) {
        return fetch(`${oauthServerUrl}/oauth/access_token`, {
            method: 'POST',
            body: JSON.stringify({code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri}),
            headers: {
                'content-type': 'application/json',
            },
        })
    }

    /**
     * Retrieve user info
     * @param {Object} params
     * @param [params.id] - User ID (optional)
     * @param {string} params.token - Token of the authenticated user
     */
    getUserInfo(params) {
        let queryParam
        params.id ? queryParam = `?id=${params.id}` : queryParam = '';
        return fetch(`${oauthServerUrl}/members/infos${queryParam}`, {
            method: 'GET',
            headers: authHeader(params.token),
        })
    }

    /**
     * Retrieve if token is active
     * @param {Object} params
     * @param {string} params.token - Token of the authenticated user
     */
    getUserIsActive(params) {
        return fetch(`${oauthServerUrl}/members/is_active`, {
            method: 'GET',
            headers: authHeader(params.token),
        })
    }

    /**
     * Retrieve email from user auth
     * @param {Object} params
     * @param {string} params.token - Token of the authenticated user
     */
    getUserEmail(params) {
        return fetch(`${oauthServerUrl}/members/email`, {
            method: 'GET',
            headers: authHeader(params.token),
        })
    }

    /**
     * Retrieve shows from member
     * @param {Object} params
     * @param {string} [params.id] - User ID (optional)
     * @param {'alphabetical', 'popularity', 'followers'} params.order - Print order
     * @param {string} params.token - Token of the authenticated user
     */
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

    /**
     * Retrieve show by ID
     * @param {Object} params
     * @param {string} params.id - Show ID
     * @param {string} [params.token] - Token of the authenticated user (optional)
     */
    getShow(params) {
        return fetch(`${oauthServerUrl}/shows/display?id=${params.id}`, {
            method: 'GET',
            headers: authHeader(params.token),
        })
    }

    /**
     * Retrieve shows
     * @param {Object} params
     * @param {'alphabetical', 'popularity', 'followers'} params.order - Print order
     * @param [params.start] - Print start (optional, default : 0)
     * @param [params.limit] - Print limit (optional, default : 100)
     * @param {string} [params.token] - Token of the authenticated user (optional)
     */
    getShows(params) {
        let queryStart
        let queryLimit
        params.start ? queryStart = params.start : queryStart = 0
        params.limit ? queryLimit = params.limit : queryLimit = 100
        return fetch(`${oauthServerUrl}/shows/list?order=${params.order}&start=${queryStart}&limit=${queryLimit}`, {
            method: 'GET',
            headers: authHeader(params.token),
        })
    }

    /**
     * Add show in member account
     * @param {Object} params
     * @param {string} params.id - Show ID
     * @param {string} params.token - Token of the authenticated user
     */
    addShow(params) {
        return fetch(`${oauthServerUrl}/shows/show?id=${params.id}`, {
            method: 'POST',
            headers: authHeader(params.token),
        })
    }

    /**
     * Remove show from member account
     * @param {Object} params
     * @param {string} params.id - Show ID
     * @param {string} params.token - Token of the authenticated user
     */
    removeShow(params) {
        return fetch(`${oauthServerUrl}/shows/show?id=${params.id}`, {
            method: 'DELETE',
            headers: authHeader(params.token),
        })
    }

    /**
     * Archive show by ID
     * @param {Object} params
     * @param {string} params.id - Show ID
     * @param {string} params.token - Token of the authenticated user
     */
    archiveShow(params) {
        return fetch(`${oauthServerUrl}/shows/archive?id=${params.id}`, {
            method: 'POST',
            headers: authHeader(params.token),
        })
    }

    /**
     * Unarchive show by ID
     * @param {Object} params
     * @param {string} params.id - Show ID
     * @param {string} params.token - Token of the authenticated user
     */
    unarchiveShow(params) {
        return fetch(`${oauthServerUrl}/shows/archive?id=${params.id}`, {
            method: 'DELETE',
            headers: authHeader(params.token),
        })
    }

    /**
     * Retrieve friends list
     * @param {Object} params
     * @param {string} [params.id] - Member ID (optional)
     * @param {string} params.token - Token of the authenticated user
     */
    getFriendsList(params) {
        let urlAPI
        if (params.id == null) {
            urlAPI = `${oauthServerUrl}/friends/list`
        } else {
            urlAPI = `${oauthServerUrl}/friends/list?id=${params.id}`
        }
        return fetch(urlAPI, {
            method: 'GET',
            headers: authHeader(params.token),
        })
    }

    /**
     * Retrieve blocked friends
     * @param {Object} params
     * @param {string} params.token - Token of the authenticated user
     */
    getBlockedFriends(params) {
        return fetch(`${oauthServerUrl}/friends/list?blocked=true`, {
            method: 'GET',
            headers: authHeader(params.token),
        })
    }

    /**
     * Retrieve friends request sent by user
     * @param {Object} params
     * @param {boolean} [params.received] - Set 'true' for retrieve requests received
     * @param {string} params.token - Token of the authenticated user
     */
    getFriendsRequests(params) {
        let queryParam
        params.received ? queryParam = '?received=true' : queryParam = '';

        return fetch(`${oauthServerUrl}/friends/requests${queryParam}`, {
            method: 'GET',
            headers: authHeader(params.token),
        })
    }

    /**
     * Find friends
     * @param {Object} params
     * @param {'facebook', 'twitter', 'emails'} params.type - Search type
     * @param {string} params.emails - Emails separated by comma (Required if type=emails)
     * @param {string} params.token - Token of the authenticated user
     */
    findFriends(params) {
        return fetch(`${oauthServerUrl}/friends/find?type=${params.type}&email=${params.emails}`, {
            method: 'GET',
            headers: authHeader(params.token),
        })
    }

    /**
     * Adding a friend
     * @param {Object} params
     * @param {string} params.id - User ID
     * @param {string} params.token - Token of the authenticated user
     */
    addFriend(params) {
        return fetch(`${oauthServerUrl}/friends/friend?id=${params.id}`, {
            method: 'POST',
            headers: authHeader(params.token),
        })
    }

    /**
     * Removing a friend
     * @param {Object} params
     * @param {string} params.id - User ID
     * @param {string} params.token - Token of the authenticated user
     */
    removeFriend(params) {
        return fetch(`${oauthServerUrl}/friends/friend?id=${params.id}`, {
            method: 'DELETE',
            headers: authHeader(params.token),
        })
    }

    /**
     * Block a friend
     * @param {Object} params
     * @param {string} params.id - User ID
     * @param {string} params.token - Token of the authenticated user
     */
    blockFriend(params) {
        return fetch(`${oauthServerUrl}/friends/block?id=${params.id}`, {
            method: 'POST',
            headers: authHeader(params.token),
        })
    }

    /**
     * Unblock a friend
     * @param {Object} params
     * @param {string} params.id - User ID
     * @param {string} params.token - Token of the authenticated user
     */
    unblockFriend(params) {
        return fetch(`${oauthServerUrl}/friends/block?id=${params.id}`, {
            method: 'DELETE',
            headers: authHeader(params.token),
        })
    }

    /**
     * Search a member
     * @param {Object} params
     * @param {string} params.login - User name
     * @param {string} [params.token] - Token of the authenticated user (optional)
     */
    searchMember(params) {
        return fetch(`${oauthServerUrl}/members/search?login=${params.login}%`, {
            method: 'GET',
            headers: authHeader(params.token),
        })
    }
    /**
     * Retrieves episodes from show
     * @param {Object} params
     * @param {string} params.id - Show ID
     * @param {string} [params.season] - Show season (optional)
     * @param {string} [params.token] - Token of the authenticated user (optional)
     */
    getEpisodes(params) {
        let paramSeason;
        params.season ? paramSeason = `&season=${params.season}` : paramSeason = ''
        return fetch(`${oauthServerUrl}/shows/episodes?id=${params.id}${paramSeason}`, {
            method: 'GET',
            headers: authHeader(params.token),
        })
    }

    /**
     * Retrieves picture from episode
     * @param {Object} params
     * @param {string} params.id - Show ID
     * @param {string} [params.token] - Token of the authenticated user (optional)
     */
    getEpisodePicture(params) {
        return fetch(`${oauthServerUrl}/pictures/episodes?id=${params.id}`, {
            method: 'GET',
            headers: authHeader(params.token),
        })
    }


}

const fetchAPI = new FetchAPI();
Object.freeze(fetchAPI);

export {fetchAPI};