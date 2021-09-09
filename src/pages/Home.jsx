import React from 'react';
import {useAuthUser, useIsAuthenticated} from 'react-auth-kit'
import Navbar from "../components/Navbar";
import {useCookies} from "react-cookie";

const Welcome = () => {
    const [cookies] = useCookies();

    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()

    // get token from cookie

    console.log(cookies._auth)
    if (isAuthenticated()) {
        return <p>Bonjour {auth().user.login} ({auth().user.id})</p>
    } else {
        return <p>Bonjour</p>
    }
}


const Home = () => {
    return (
        <>
            <Navbar/>
            <section className="section">
                <div className="container">
                    <h1 className="title">
                        <Welcome/>
                    </h1>
                    <p className="subtitle">
                        My first website with <strong>Bulma</strong>!
                    </p>
                </div>
            </section>
        </>
    );
}

export default Home;