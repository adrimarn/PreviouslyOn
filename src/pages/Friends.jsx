import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useCookies} from "react-cookie";
import {fetchAPI} from "../services/FetchAPI";
import {useHistory} from "react-router-dom";

const Friends = () => {
    const [cookies] = useCookies();
    const token = cookies._auth
    const [friends, setFriends] = useState([])
    const [isFetched, setFetch] = useState(false)
    const history = useHistory()

    useEffect(() => {
        fetchAPI.getFriendsList({token})
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Something went wrong');
                } else {
                    return res.json();
                }
            })
            .then((res) => {
                res.users.map((user) => {
                    return fetchAPI.getUserInfo({id: user.id, token})
                        .then(res => res.json())
                        .then((data) => {
                            setFriends(old => [...old, data.member])
                        })
                })
                setFetch(true)
            })
            .catch((error) => {
                console.log(error)
                history.push('/login');
            });

    }, [history, token])

    return (
        <>
            <Navbar/>
            <div className="container">
                {isFetched && (
                    <div>
                        <h1 className="is-size-3 has-text-centered mb-3">Mes amis</h1>
                        {friends.map((user) => (
                            <div key={user.id}>
                                <div className="card mb-3">
                                    <div className="card-content">
                                        <div className="media">
                                            <div className="media-left">
                                                <figure className="image is-48x48">
                                                    <img src={user.avatar ?? `https://eu.ui-avatars.com/api/?name=${user.login}`}
                                                         alt="friend_img"/>
                                                </figure>
                                            </div>
                                            <div className="media-content">
                                                <p className="title is-4">{user.login}</p>
                                                <p className="subtitle"
                                                   style={{color: "rgb(255,214,1)"}}>{user.xp} XP</p>
                                            </div>
                                            <div className="has-text-right">
                                                <button className="button is-danger is-outlined">
                            <span className="icon is-small mr-0">
                            <FontAwesomeIcon icon={faBan}/>
                            </span>
                                                    Bloquer
                                                </button>
                                            </div>
                                        </div>
                                        <div className="content">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Phasellus nec iaculis mauris.
                                            <div className="has-text-right">
                                                <button className="button is-danger is-outlined">
                            <span className="icon is-small mr-0">
                            <FontAwesomeIcon icon={faTimes}/>
                            </span>
                                                    Supprimer
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Friends;