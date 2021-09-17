import React from 'react';
import {useAuthUser, useIsAuthenticated} from 'react-auth-kit'
import Navbar from "../components/Navbar";

const Welcome = () => {
    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()

    if (isAuthenticated()) {
        return <h1>Bonjour {auth().user.login} 👋</h1>
    } else {
        return ''
    }
}

const Home = () => {
    return (
        <>
            <Navbar/>
            <section className="section">
                <div className="container has-text-centered py-6">
                    <div className="title is-size-6 ">
                        <Welcome/>
                    </div>
                    <p className="has-text-white is-size-3 ">
                        Retrouve toutes tes séries préférées
                        <p className='is-size-2'>sur Previously<span className='text_gradient'>ON</span></p>
                    </p>
                </div>
            </section>
        </>
    );
}

export default Home;