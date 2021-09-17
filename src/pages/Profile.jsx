import React from 'react';
import {useAuthUser} from "react-auth-kit";
import Navbar from "../components/Navbar";

const Profile = () => {
    const auth = useAuthUser()
    return (
        <>
            <Navbar/>
            <section className='section'>
                <div className="profile__bg"
                     style={{
                         backgroundImage: `linear-gradient(to top, rgba(238, 150, 30, 0), rgba(255, 14, 81, 0.50)), url("${auth().user.profile_banner}")`
                     }}/>
                <h1 className='section__title_wl has-text-centered is-size-2 mb-3 '>Profil de {auth().user.login}</h1>
                <figure className="image is-128x128">
                    <img className="is-rounded" src={auth().user.avatar} alt={`Avatar de ${auth().user.login}`}/>
                </figure>

                <p>XP : {auth().user.xp}</p>
                <p>Année d'inscription : {auth().user.subscription}</p>
                <p>Amis: {auth().user.stats.friends}</p>
                <p>Nombre de séries: {auth().user.stats.shows}</p>
                <p>Badges: {auth().user.stats.badges}</p>
            </section>
        </>
    );
};

export default Profile;
