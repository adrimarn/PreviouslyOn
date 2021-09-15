import React, {useEffect} from 'react';
import {useIsAuthenticated, useSignOut} from "react-auth-kit";
import {useHistory} from "react-router-dom";
import {fetchAPI} from "./FetchAPI";
import {useCookies} from "react-cookie";

function CheckTokenService() {
    const signOut = useSignOut()
    const isAuthenticated = useIsAuthenticated()
    const history = useHistory();
    const [cookies] = useCookies()

    const checkToken = () => fetchAPI.getUserEmail({token: cookies._auth})
        .catch((error) => {
            if (error) {
                signOut()
                history.push("/login");
            }
        })

    useEffect(() => {
        if (isAuthenticated()) {
            checkToken()
            const interval = setInterval(() => {
                checkToken()
            }, 50000);
            return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>

        </>
    );
}

export default CheckTokenService;