import React, {useEffect, useState} from 'react';
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {fetchAPI} from "../../services/FetchAPI";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";
import Navbar from "../../components/Navbar";
import FriendCard from "../../components/FriendCard";

const FriendRequest = () => {
    const [cookies] = useCookies();
    const token = cookies._auth
    const [isFetched, setFetch] = useState(false)
    const [friends, setFriends] = useState([])
    const history = useHistory()

    function addFriend(id) {
        return fetchAPI.addFriend({id, token})
            .then(res => {
                if (res.ok) {
                    const newList = friends.filter((item) => item.id !== id);
                    setFriends(newList);
                }
            })
    }

    useEffect(() => {
        fetchAPI.getFriendsRequests({received: true, token})
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Something went wrong');
                } else {
                    return res.json();
                }
            })
            .then((res) => {
                setFriends([])
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
        <div>
            {isFetched && (
                <div>
                    <Navbar/>
                    <div className="section">
                        <h1 className="has-text-centered is-size-2 mb-3 section__title">Mes demandes d'amis</h1>
                        {friends.length !== 0 ? (
                            friends.map((user) => (
                                <FriendCard user={user}
                                            key={user.id}
                                            primaryCallback={() => addFriend(user.id)}
                                            primaryClassName='button is-white is-outlined'
                                            primaryText='Accepter'
                                            primaryIcon={faCheck}
                                />
                            ))
                        ) : (
                            <p className='has-text-centered'>Vous n'avez pas de demande d'amis</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FriendRequest;