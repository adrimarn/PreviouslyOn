import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import {useCookies} from "react-cookie";
import {fetchAPI} from "../services/FetchAPI";
import {useHistory} from "react-router-dom";
import Loading from "../components/Loading";
import {toast} from "react-hot-toast";
import FriendCard from "../components/FriendCard";
import {faBan, faCheckSquare, faTimes} from "@fortawesome/free-solid-svg-icons";

const Friends = () => {
    const [cookies] = useCookies();
    const token = cookies._auth;
    const [friends, setFriends] = useState([]);
    const [blocked, setBlocked] = useState([]);
    const [isFetched, setFetch] = useState(false);
    const [blockedFetched, setBlockedFetch] = useState(false);
    const history = useHistory();


    function removeFriend(id) {
        return fetchAPI.removeFriend({id, token})
            .then(() => {
                const newList = friends.filter((item) => item.id !== id);
                setFriends(newList);
                toast('Ami supprimé',
                    {
                        icon: '🚫',
                        style: {
                            borderRadius: '10px',
                            background: '#2b2b30',
                            color: '#fff',
                            border: '1px solid #d64356',
                        },
                    }
                );
            })
    }

    function blockFriend(id) {
        return fetchAPI.blockFriend({id, token})
            .then(res => res.json())
                .then((data) => {
                    const newList = friends.filter((item) => item.id !== id);
                    setBlocked((old) => [...old, data.member])
                    setFriends(newList);
                    toast('Utilisateur bloqué',
                        {
                            icon: '🚫',
                            style: {
                                borderRadius: '10px',
                                background: '#2b2b30',
                                color: '#fff',
                                border: '1px solid #d64356',
                            },
                        }
                    );
                })
    }

    function unblockUser(id) {
        return fetchAPI.unblockFriend({id, token})
            .then(() => {
                const newList = blocked.filter((item) => item.id !== id);
                setBlocked(newList);
                toast('Utilisateur débloqué',
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#2b2b30',
                            color: '#fff',
                            border: '1px solid #d64356',
                        },
                    }
                );
            })
    }

    useEffect(() => {
        fetchAPI.getFriendsList({token})
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Something went wrong");
                } else {
                    return res.json();
                }
            })
            .then((res) => {
                setFriends([])
                res.users.map((user) => {
                    return fetchAPI
                        .getUserInfo({id: user.id, token})
                        .then((res) => res.json())
                        .then((data) => {
                            setFriends((old) => [...old, data.member]);
                        });
                });
                setFetch(true);
            })
            .catch((error) => {
                console.log(error);
                history.push("/login");
            });

        fetchAPI.getBlockedFriends({token})
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Something went wrong");
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                setBlocked(data.users)
                setBlockedFetch(true)
            })
    }, [history, token]);

    return (
        <>
            <Navbar/>
            <section className="section">
                <h1 className="has-text-centered is-size-2 mb-3 section__title">
                    Mes amis
                </h1>
                {(isFetched && blockedFetched) ? (
                    <div>
                        {friends.map((user) => (
                            <FriendCard user={user}
                                        primaryCallback={() => removeFriend(user.id)}
                                        primaryIcon={faTimes}
                                        primaryText='Supprimer'
                                        primaryClassName='button is-white is-outlined'
                                        secondaryCallback={() => blockFriend(user.id)}
                                        secondaryIcon={faBan}
                                        secondaryText='Bloquer'
                                        secondaryClassName='button is-danger is-outlined'
                            />
                        ))}

                        {blocked.length !== 0 &&
                        <div>
                            <h1 className="is-size-2 mb-3 section__title_wl">
                                Utilisateur bloqué
                            </h1>

                            {blocked.map((user) => (
                                <FriendCard user={user}
                                            primaryCallback={() => unblockUser(user.id)}
                                            primaryText='Débloquer'
                                            primaryClassName='button is-success is-outlined'
                                            primaryIcon={faCheckSquare}
                                />
                            ))
                            }
                        </div>
                        }
                    </div>
                ) : (
                    <Loading color="#F15154"/>
                )}
            </section>
        </>
    );
};

export default Friends;

