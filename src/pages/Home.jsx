import React from 'react';
import {useAuthUser, useIsAuthenticated} from 'react-auth-kit'

const Welcome = () => {
    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()
    if (isAuthenticated()) {
        return <p>Bonjour {auth().user.login} ({auth().user.id})</p>
    } else {
        return <p>Bonjour</p>
    }
}


const Home = () => {
    return (
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
    );
}

export default Home;