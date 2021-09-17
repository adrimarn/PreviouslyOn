import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faCheckSquare, faTimes} from "@fortawesome/free-solid-svg-icons";
import {fetchAPI} from "../services/FetchAPI";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";
import Navbar from "../components/Navbar";

const FriendRequest = (props) => {
    const [cookies] = useCookies();
    const token = cookies._auth
    const [isFetched, setFetch] = useState(false)
    const [friends, setFriends] = useState([])
    const history = useHistory()

function addFriend(id){
        return fetchAPI.addFriend({id, token})
            .then(res => {
                if (res.ok){
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
                        {friends.map((user) => (
                            <div key={user.id}>
                                <div className="card mb-3">
                                    <div className="card-content">
                                        <div className="media">
                                            <div className="media-left">
                                                <figure className="image is-48x48">
                                                    <img
                                                        src={user.avatar ?? `https://eu.ui-avatars.com/api/?name=${user.login}`}
                                                        alt="friend_img"/>
                                                </figure>
                                            </div>
                                            <div className="media-content">
                                                <p className="title is-4">{user.login}</p>
                                                <p className="subtitle"
                                                   style={{color: "rgb(255,214,1)"}}>{user.xp} XP</p>
                                            </div>
                                        </div>
                                        <div className="content">
                                            <div className="has-text-right">
                                                <button className="button is-success is-outlined" onClick={ () => addFriend(user.id)}>
                                                <span className="icon is-small mr-0">
                                                    <FontAwesomeIcon icon={faCheckSquare}/>
                                                         </span>
                                                    Ajouter en ami
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FriendRequest;